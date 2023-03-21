// Copyright 2018-2023, University of Colorado Boulder

/**
 * This alert manager is responsible for all gravity-force-lab specific aria-live alerts.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import InverseSquareLawCommonStrings from '../../../inverse-square-law-common/js/InverseSquareLawCommonStrings.js';
import ForceValuesDisplayEnum from '../../../inverse-square-law-common/js/model/ForceValuesDisplayEnum.js';
import ISLCAlertManager from '../../../inverse-square-law-common/js/view/ISLCAlertManager.js';
import ISLCObjectEnum from '../../../inverse-square-law-common/js/model/ISLCObjectEnum.js';
import merge from '../../../phet-core/js/merge.js';
import StringUtils from '../../../phetcommon/js/util/StringUtils.js';
import { Voicing } from '../../../scenery/js/imports.js';
import ActivationUtterance from '../../../utterance-queue/js/ActivationUtterance.js';
import responseCollector from '../../../utterance-queue/js/responseCollector.js';
import Utterance from '../../../utterance-queue/js/Utterance.js';
import ValueChangeUtterance from '../../../utterance-queue/js/ValueChangeUtterance.js';
import gravityForceLab from '../gravityForceLab.js';
import GravityForceLabStrings from '../GravityForceLabStrings.js';
import GravityForceLabModel from '../model/GravityForceLabModel.js';

const constantRadiusThinkDensityPatternString = GravityForceLabStrings.a11y.controls.constantRadiusThinkDensityPattern;
const massAndForceClausesPatternString = GravityForceLabStrings.a11y.qualitative.massAndForceClausesPattern;
const sentencePatternString = GravityForceLabStrings.a11y.sentencePattern;
const voicingBriefMassChangeForceAlertWithValuePatternString = GravityForceLabStrings.a11y.voicing.briefMassChangeForceAlertWithValuePattern;
const voicingBriefMassChangeForceAlertPatternString = GravityForceLabStrings.a11y.voicing.briefMassChangeForceAlertPattern;
const voicingBiggerString = InverseSquareLawCommonStrings.a11y.voicing.bigger;
const voicingBriefMassPushAlertPatternString = GravityForceLabStrings.a11y.voicing.briefMassPushAlertPattern;
const voicingBriefPositionChangeInteractionPatternString = GravityForceLabStrings.a11y.voicing.briefPositionChangeInteractionPattern;

class GravityForceLabAlertManager extends ISLCAlertManager {

  /**
   * @param {GravityForceLabModel|GFLBModel} model
   * @param {MassDescriber} massDescriber
   * @param {ForceDescriber} forceDescriber - GFLBForceDescriber inherits directly from ForceDescriber
   * @param {Object} [options]
   */
  constructor( model, massDescriber, forceDescriber, options ) {

    // Basically these options try to support BASICS and REGULAR logic duplication.
    options = merge( {

      // {boolean} This should only used for gravity-force-lab
      linkToForceValuesDisplayProperty: true,

      // {function} - listener to link to the showForceValuesProperty, default listener for REGULAR is null because
      // this is only used in BASICS
      showForceValuesListener: null
    }, options );

    super( model, forceDescriber, options );

    // @private
    this.massDescriber = massDescriber;

    // @private {Utterance} - utterances for various channels of information
    this.massChangedUtterance = new ValueChangeUtterance();
    this.scientificNotationUtterance = new ActivationUtterance();

    // @public {Utterance} - When the 'constant size' changes and masses push each other away. Needs to be an Utterance
    // that does not interrupt the response from the UI control that triggered that.
    this.constantSizeChangedContextResponseUtterance = new Utterance( {
      announcerOptions: {
        cancelOther: false
      }
    } );

    const constantRadiusUtterance = new ActivationUtterance();

    model.constantRadiusProperty.lazyLink( constantRadius => {
      constantRadiusUtterance.alert = this.getConstantRadiusAlert( constantRadius );
      this.alertDescriptionUtterance( constantRadiusUtterance );
    } );

    // use an option to support REGULAR and BASICS
    if ( options.linkToForceValuesDisplayProperty ) {
      assert && assert( model instanceof GravityForceLabModel, 'unsupported model for scientific notation' );
      options.linkToForceValuesDisplayProperty && model.forceValuesDisplayProperty.lazyLink( () => {

        if ( model.forceValuesDisplayProperty.value === ForceValuesDisplayEnum.SCIENTIFIC ) {
          this.alertScientificNotation();
        }
        else {
          this.alertShowForceValues( model.forceValuesDisplayProperty.value !== ForceValuesDisplayEnum.HIDDEN );
        }
      } );
    }
    else {
      assert && assert( options.showForceValuesListener,
        'showForceValuesProperty is linked to if not linking to forceValuesDisplayProperty.' );
      model.showForceValuesProperty.lazyLink( options.showForceValuesListener );
    }

    // link to alert when the value changes
    model.object1.valueProperty.lazyLink( () => this.alertMassValueChanged( model.object1.enum ) );
    model.object2.valueProperty.lazyLink( () => this.alertMassValueChanged( model.object2.enum ) );

    // When the value changes position, the position will change after the valueProperty has, so link a listener to
    // alert one the positions are correct, this is important to get the alerts like
    // "mass 1 gets bigger and moves mass 2 right"
    const secondaryPositionChangedListener = objectEnum => {

      // handle the case where the position changed from the constant radius being toggled
      if ( model.object1.constantRadiusChangedSinceLastStep || model.object2.constantRadiusChangedSinceLastStep ) {
        this.alertConstantSizeChangedPosition();
      }
      else { // value specific assumption
        this.alertMassValueChanged( objectEnum, true );
      }
    };
    model.object1.positionChangedFromSecondarySourceEmitter.addListener( secondaryPositionChangedListener );
    model.object2.positionChangedFromSecondarySourceEmitter.addListener( secondaryPositionChangedListener );
  }

  /**
   * @private
   */
  alertScientificNotation() {
    this.scientificNotationUtterance.alert = this.forceDescriber.getScientificNotationAlertText();
    this.alertDescriptionUtterance( this.scientificNotationUtterance );
  }

  /**
   * @param {ISLCObjectEnum} objectEnum
   * @param {boolean} [forceBiggerOverride] - when true, manually override the value of the force "direction change"
   *                                          from the model. This is to solve a bug where the model decreases force
   *                                          after a mass pushes the other away, see https://github.com/phetsims/gravity-force-lab-basics/issues/151
   * @private
   */
  alertMassValueChanged( objectEnum, forceBiggerOverride ) {
    const contextResponse = this.getMassValueChangedAlert( objectEnum, forceBiggerOverride );
    this.alertDescriptionUtterance( contextResponse );
  }

  /**
   * Get the alert content for when the mass value changes.
   * @public
   *
   * @param {ISLCObjectEnum} objectEnum
   * @param {boolean} [forceBiggerOverride]
   * @returns {Utterance}
   */
  getMassValueChangedAlert( objectEnum, forceBiggerOverride ) {
    let massClause = this.massDescriber.getMassOrDensityChangeClause( objectEnum );

    // if changing the mass of an object caused one of the masses to move position
    if ( this.model.massWasPushed() ) {
      massClause = this.massDescriber.getMassChangesAndMovesClause( objectEnum );
      if ( this.model.pushedObjectEnumProperty.value !== objectEnum ) {
        massClause = this.massDescriber.getMassChangesAndMovesOtherClause( objectEnum );
      }
    }

    this.massChangedUtterance.alert = StringUtils.fillIn( massAndForceClausesPatternString, {
      massClause: massClause,
      forceClause: this.forceDescriber.getVectorChangeClause( forceBiggerOverride, false )
    } );
    return this.massChangedUtterance;
  }

  /**
   * PROTOTYPE CODE: Gets an alert to be read when the mass changes AND due to increasing size pushes the other mass a bit.
   * This is used in the voicing prototype, when in "brief interactive" output.
   * @private
   *
   * @param {ISLCObjectEnum} objectEnum
   * @returns {string}
   */
  getVoicingForceChangeFromMassWithPushAlert( objectEnum ) {

    const forceValuesShown = this.model.showForceValuesProperty.get();
    const valueString = this.forceDescriber.getFormattedForce();

    let newForceString;
    if ( forceValuesShown ) {
      newForceString = StringUtils.fillIn( voicingBriefMassChangeForceAlertWithValuePatternString, {
        forceChange: voicingBiggerString,
        value: valueString
      } );
    }
    else {
      newForceString = StringUtils.fillIn( voicingBriefMassChangeForceAlertPatternString, {
        forceChange: voicingBiggerString
      } );
    }

    const pushAlertString = StringUtils.fillIn( voicingBriefMassPushAlertPatternString, {
      object1: this.forceDescriber.getObjectLabelFromEnum( objectEnum ),
      object2: this.forceDescriber.getOtherObjectLabelFromEnum( objectEnum ),
      direction: this.massDescriber.getPushDirectionText( ISLCObjectEnum.getOtherObjectEnum( objectEnum ) ),
      forceAlert: newForceString
    } );

    const valueText = this.massDescriber.getMassAndUnit( objectEnum );
    return StringUtils.fillIn( voicingBriefPositionChangeInteractionPatternString, {
      valueText: valueText,
      forceAlert: pushAlertString
    } );
  }

  /**
   * Get an alert for when masses radius becomes constant or dynamic.
   * @public
   *
   * @param {boolean} constantRadius
   * @returns {string}
   */
  getConstantRadiusAlert( constantRadius ) {
    const constantRadiusAlert = StringUtils.fillIn( constantRadiusThinkDensityPatternString, {

      // use forceDescriber just for the sim specific object labels, could be any ISLCDescriber
      mass1: this.forceDescriber.object1Label,
      mass2: this.forceDescriber.object2Label
    } );

    return constantRadius ? constantRadiusAlert : this.massDescriber.getM1RelativeSize();
  }

  /**
   * Alert the "border" alert when attempting to change the mass, but already at the min or max of it, see https://github.com/phetsims/gravity-force-lab/issues/155
   * @private
   * @param {ISLCObjectEnum} thisObjectEnum
   */
  alertMassMinMaxEdge( thisObjectEnum ) {
    this.massChangedUtterance.alert = this.massDescriber.getMassMaxMinText( thisObjectEnum );
    this.alertDescriptionUtterance( this.massChangedUtterance );
  }

  /**
   * @private
   */
  alertConstantSizeChangedPosition() {
    const contextResponse = StringUtils.fillIn( sentencePatternString, {
      sentence: this.forceDescriber.getVectorChangeClause( false, true )
    } );

    this.massChangedUtterance.alert = contextResponse;
    this.alertDescriptionUtterance( this.massChangedUtterance );

    // voicing - Create the alert to be used with voicing. Ideally this would be the context response for the
    // UI component that controls whether masses are of constant size. But this alert needs information about
    // whether positions were changed, which happens later in the model during step, so it needs to be
    // created here.

    // include information as selected by user preferences
    const voicingAlertString = responseCollector.collectResponses( {
      contextResponse: contextResponse
    } );

    this.constantSizeChangedContextResponseUtterance.alert = voicingAlertString;
    Voicing.alertUtterance( this.constantSizeChangedContextResponseUtterance );
  }
}

gravityForceLab.register( 'GravityForceLabAlertManager', GravityForceLabAlertManager );
export default GravityForceLabAlertManager;