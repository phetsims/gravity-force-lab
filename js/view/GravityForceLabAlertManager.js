// Copyright 2018-2020, University of Colorado Boulder

/**
 * This alert manager is responsible for all gravity-force-lab specific aria-live alerts.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import inverseSquareLawCommonStrings from '../../../inverse-square-law-common/js/inverseSquareLawCommonStrings.js';
import ISLCQueryParameters from '../../../inverse-square-law-common/js/ISLCQueryParameters.js';
import ForceValuesDisplayEnum from '../../../inverse-square-law-common/js/model/ForceValuesDisplayEnum.js';
import cursorSpeakerModel from '../../../inverse-square-law-common/js/view/CursorSpeakerModel.js';
import ISLCAlertManager from '../../../inverse-square-law-common/js/view/ISLCAlertManager.js';
import ISLCObjectEnum from '../../../inverse-square-law-common/js/view/ISLCObjectEnum.js';
import levelSpeakerModel from '../../../inverse-square-law-common/js/view/levelSpeakerModel.js';
import webSpeaker from '../../../scenery/js/accessibility/speaker/webSpeaker.js';
import merge from '../../../phet-core/js/merge.js';
import StringUtils from '../../../phetcommon/js/util/StringUtils.js';
import ActivationUtterance from '../../../utterance-queue/js/ActivationUtterance.js';
import ValueChangeUtterance from '../../../utterance-queue/js/ValueChangeUtterance.js';
import gravityForceLab from '../gravityForceLab.js';
import gravityForceLabStrings from '../gravityForceLabStrings.js';
import GravityForceLabModel from '../model/GravityForceLabModel.js';

const constantRadiusThinkDensityPatternString = gravityForceLabStrings.a11y.controls.constantRadiusThinkDensityPattern;
const massAndForceClausesPatternString = gravityForceLabStrings.a11y.qualitative.massAndForceClausesPattern;
const sentencePatternString = gravityForceLabStrings.a11y.sentencePattern;
const selfVoicingBriefMassChangeForceAlertWithValuePatternString = gravityForceLabStrings.a11y.selfVoicing.briefMassChangeForceAlertWithValuePattern;
const selfVoicingBriefMassChangeForceAlertPatternString = gravityForceLabStrings.a11y.selfVoicing.briefMassChangeForceAlertPattern;
const selfVoicingBiggerString = inverseSquareLawCommonStrings.a11y.selfVoicing.bigger;
const selfVoicingSmallerString = inverseSquareLawCommonStrings.a11y.selfVoicing.smaller;
const selfVoicingBriefMassPushAlertPatternString = gravityForceLabStrings.a11y.selfVoicing.briefMassPushAlertPattern;
const briefDensityChangeForceAlertPatternString = gravityForceLabStrings.a11y.selfVoicing.briefDensityChangeForceAlertPattern;
const selfVoicingMoreString = gravityForceLabStrings.a11y.selfVoicing.more;
const selfVoicingLessString = gravityForceLabStrings.a11y.selfVoicing.less;
const briefMassChangeAlertPatternString = gravityForceLabStrings.a11y.selfVoicing.briefMassChangeAlertPattern;
const selfVoicingBriefNewForcePatternString = gravityForceLabStrings.a11y.selfVoicing.briefNewForcePattern;
const selfVoicingBriefPositionChangeInteractionPatternString = gravityForceLabStrings.a11y.selfVoicing.briefPositionChangeInteractionPattern;

class GravityForceLabAlertManager extends ISLCAlertManager {

  /**
   * @param {GravityForceLabModel|GFLBModel} model
   * @param {MassDescriber} massDescriber
   * @param {ForceDescriber} forceDescriber - GFLBForceDescriber inherits directly from ForceDescriber
   * @param options
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

    super( model, forceDescriber );

    // @private
    this.massDescriber = massDescriber;

    // @private {Utterance} - utterances for various channels of information
    this.massChangedUtterance = new ValueChangeUtterance();
    this.scientificNotationUtterance = new ActivationUtterance();

    const constantRadiusUtterance = new ActivationUtterance();

    model.constantRadiusProperty.lazyLink( constantRadius => {
      constantRadiusUtterance.alert = this.getConstantRadiusAlert( constantRadius );
      phet.joist.sim.utteranceQueue.addToBack( constantRadiusUtterance );
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
    // "mass 1 get's bigger and moves mass 2 right"
    const secondaryPositionChangedListener = objectEnum => {

      // handle the case where the position changed from the constant radius being toggled
      if ( model.object1.constantRadiusChangedSinceLastStep || model.object2.constantRadiusChangedSinceLastStep ) {
        this.alertConstantSizeChangedPosition();
      }
      else { // value specific assumption
        this.alertMassValueChanged( objectEnum, true );

        if ( ISLCQueryParameters.selfVoicing === 'paradigm1' ) {
          if ( cursorSpeakerModel.getInteractiveModeBrief() ) {
            webSpeaker.speak( this.getSelfVoicingForceChangeFromMassWithPushAlert( objectEnum ) );
          }
        }
        else if ( ISLCQueryParameters.selfVoicing === 'paradigm2' || ISLCQueryParameters.selfVoicing === 'paradigm3' ) {
          const valueText = this.massDescriber.getMassAndUnit( objectEnum );
          const massChangedUtterance = this.getMassValueChangedAlert( objectEnum );
          levelSpeakerModel.speakAllResponses( valueText, massChangedUtterance.alert, null );
        }
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
    phet.joist.sim.utteranceQueue.addToBack( this.scientificNotationUtterance );
  }

  /**
   * @param {ISLCObjectEnum} objectEnum
   * @param {boolean} [forceBiggerOverride] - when true, manually override the value of the force "direction change"
   *                                          from the model. This is to solve a bug where the model decreases force
   *                                          after a mass pushes the other away, see https://github.com/phetsims/gravity-force-lab-basics/issues/151
   * @private
   */
  alertMassValueChanged( objectEnum, forceBiggerOverride ) {
    phet.joist.sim.utteranceQueue.addToBack( this.getMassValueChangedAlert( objectEnum, forceBiggerOverride ) );
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
   * PROTOTYPE CODE: Get an alert that describes the changing mass value, with varying information depending on whether
   * force values are visible and masses are at constant size. To be used on the "brief interactive" mode of
   * self voicing output.
   * @public
   *
   * @param {ISLCObjectEnum} objectEnum
   * @param {number} currentMass
   * @param {number} oldMass
   * @param {string} otherObjectLabel
   * @returns {string}
   */
  getSelfVoicingForceChangeFromMassAlert( objectEnum, currentMass, oldMass, otherObjectLabel ) {
    let alert;

    const biggerSmallerChangeString = currentMass > oldMass ? selfVoicingBiggerString : selfVoicingSmallerString;
    const valueString = this.forceDescriber.getFormattedForce();

    const constantSize = this.model.constantRadiusProperty.get();
    const forceValuesShown = this.model.showForceValuesProperty.get();

    if ( constantSize ) {
      const moreLessChangeString = currentMass > oldMass ? selfVoicingMoreString : selfVoicingLessString;
      const densityChangeString = StringUtils.fillIn( briefDensityChangeForceAlertPatternString, {
        densityChange: moreLessChangeString,
        forceChange: biggerSmallerChangeString
      } );
      if ( !forceValuesShown ) {

        // forces are not shown, show just describe impact on forces
        alert = densityChangeString;
      }
      else {

        // forces are shown, read the new force value too
        const newForceString = StringUtils.fillIn( selfVoicingBriefNewForcePatternString, {
          value: valueString
        } );
        alert = StringUtils.fillIn( briefMassChangeAlertPatternString, {
          propertyChange: densityChangeString,
          forceChange: newForceString
        } );
      }
    }
    else {
      if ( forceValuesShown ) {
        alert = StringUtils.fillIn( selfVoicingBriefMassChangeForceAlertWithValuePatternString, {
          forceChange: biggerSmallerChangeString,
          value: valueString
        } );
      }
      else {
        alert = StringUtils.fillIn( selfVoicingBriefMassChangeForceAlertPatternString, {
          forceChange: biggerSmallerChangeString
        } );
      }
    }

    return alert;
  }

  /**
   * PROTOTYPE CODE: Gets an alert to be read when the mass changes AND due to increasing size pushes the other mass a bit.
   * This is used in the self voicing prototype, when in "brief interactive" output.
   * @private
   *
   * @param {ISLCObjectEnum} objectEnum
   * @returns {string}
   */
  getSelfVoicingForceChangeFromMassWithPushAlert( objectEnum ) {

    const forceValuesShown = this.model.showForceValuesProperty.get();
    const valueString = this.forceDescriber.getFormattedForce();

    let newForceString;
    if ( forceValuesShown ) {
      newForceString = StringUtils.fillIn( selfVoicingBriefMassChangeForceAlertWithValuePatternString, {
        forceChange: selfVoicingBiggerString,
        value: valueString
      } );
    }
    else {
      newForceString = StringUtils.fillIn( selfVoicingBriefMassChangeForceAlertPatternString, {
        forceChange: selfVoicingBiggerString
      } );
    }

    const pushAlertString = StringUtils.fillIn( selfVoicingBriefMassPushAlertPatternString, {
      object1: this.forceDescriber.getObjectLabelFromEnum( objectEnum ),
      object2: this.forceDescriber.getOtherObjectLabelFromEnum( objectEnum ),
      direction: this.massDescriber.getPushDirectionText( ISLCObjectEnum.getOtherObjectEnum( objectEnum ) ),
      forceAlert: newForceString
    } );

    const valueText = this.massDescriber.getMassAndUnit( objectEnum );
    return StringUtils.fillIn( selfVoicingBriefPositionChangeInteractionPatternString, {
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
    phet.joist.sim.utteranceQueue.addToBack( this.massChangedUtterance );
  }

  /**
   * @private
   */
  alertConstantSizeChangedPosition() {
    this.massChangedUtterance.alert = StringUtils.fillIn( sentencePatternString, {
      sentence: this.forceDescriber.getVectorChangeClause( false, true )
    } );
    phet.joist.sim.utteranceQueue.addToBack( this.massChangedUtterance );
  }
}

gravityForceLab.register( 'GravityForceLabAlertManager', GravityForceLabAlertManager );
export default GravityForceLabAlertManager;