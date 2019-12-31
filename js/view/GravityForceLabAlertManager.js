// Copyright 2018-2019, University of Colorado Boulder

/**
 * This alert manager is responsible for all gravity-force-lab specific aria-live alerts.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const ActivationUtterance = require( 'UTTERANCE_QUEUE/ActivationUtterance' );
  const ForceValuesDisplayEnum = require( 'INVERSE_SQUARE_LAW_COMMON/model/ForceValuesDisplayEnum' );
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const GravityForceLabA11yStrings = require( 'GRAVITY_FORCE_LAB/GravityForceLabA11yStrings' );
  const GravityForceLabModel = require( 'GRAVITY_FORCE_LAB/model/GravityForceLabModel' );
  const ISLCAlertManager = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCAlertManager' );
  const merge = require( 'PHET_CORE/merge' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const ValueChangeUtterance = require( 'UTTERANCE_QUEUE/ValueChangeUtterance' );

  // a11y strings
  const constantRadiusThinkDensityPatternString = GravityForceLabA11yStrings.constantRadiusThinkDensityPattern.value;
  const massAndForceClausesPatternString = GravityForceLabA11yStrings.massAndForceClausesPattern.value;
  const sentencePatternString = GravityForceLabA11yStrings.sentencePattern.value;

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
      const constantRadiusAlert = StringUtils.fillIn( constantRadiusThinkDensityPatternString, {

        // use forceDescriber just for the sim specific object labels, could be any ISLCDescriber
        mass1: forceDescriber.object1Label,
        mass2: forceDescriber.object2Label
      } );

      model.constantRadiusProperty.lazyLink( constantRadius => {
        constantRadiusUtterance.alert = constantRadius ? constantRadiusAlert :
                                        massDescriber.getM1RelativeSize();
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
      phet.joist.sim.utteranceQueue.addToBack( this.massChangedUtterance );
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

  return gravityForceLab.register( 'GravityForceLabAlertManager', GravityForceLabAlertManager );
} );