// Copyright 2018-2019, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const ActivationUtterance = require( 'SCENERY_PHET/accessibility/ActivationUtterance' );
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const GravityForceLabA11yStrings = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabA11yStrings' );
  const GravityForceLabModel = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/model/GravityForceLabModel' );
  const ISLCAlertManager = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCAlertManager' );
  const ISLCObjectEnum = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectEnum' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const utteranceQueue = require( 'SCENERY_PHET/accessibility/utteranceQueue' );
  const ValueChangeUtterance = require( 'SCENERY_PHET/accessibility/ValueChangeUtterance' );

  // a11y strings
  const constantRadiusThinkDensityPatternString = GravityForceLabA11yStrings.constantRadiusThinkDensityPattern.value;
  const massAndForceClausesPatternString = GravityForceLabA11yStrings.massAndForceClausesPattern.value;

  // constants
  const { OBJECT_ONE, OBJECT_TWO } = ISLCObjectEnum;

  class GravityForceLabAlertManager extends ISLCAlertManager {

    /**
     * @param {GravityForceLabModel|GFLBModel} model
     * @param {MassDescriber} massDescriber
     * @param {GravityForceLabForceDescriber} forceDescriber
     * @param {GravityForceLabPositionDescriber} positionDescriber
     * @param options
     */
    constructor( model, massDescriber, forceDescriber, positionDescriber, options ) {

      // Basically these options try to support BASICS and REGULAR logic duplication.
      options = _.extend( {

        // only used for gravity-force-lab
        linkToScientificNotationProperty: true,

        // default listener for when forceValues change
        showForceValuesListener: showValues => {

          const scientificNotation = model.scientificNotationProperty.get();

          if ( !showValues || !scientificNotation ) {
            this.alertShowForceValues( showValues );
          }
          else {
            this.alertScientificNotation( scientificNotation );
          }
        }
      }, options );

      super( model, forceDescriber, positionDescriber );

      // @protected - initialized outside the class declaration as they should be treated like helper functions
      this.massDescriber = massDescriber;

      // @private {Utterance} - utterances for various categories of information, to use Utterance alertStable feature
      this.scientificNotationUtterance = new ActivationUtterance();
      this.constantRadiusUtterance = new ActivationUtterance();
      this.massChangedUtterance = new ValueChangeUtterance();
      this.constantRadiusAlert = StringUtils.fillIn( constantRadiusThinkDensityPatternString, {

        // use forceDescriber just for the sim specific object labels, could be any ISLCDescriber
        mass1: forceDescriber.object1Label,
        mass2: forceDescriber.object2Label
      } );

      assert && options.linkToScientificNotationProperty && assert( model instanceof GravityForceLabModel, 'unsupported model for scientific notation' );

      options.linkToScientificNotationProperty && model.scientificNotationProperty.lazyLink( displayInScientificNotation => {
        this.alertScientificNotation( displayInScientificNotation );
      } );

      model.forceValuesProperty.lazyLink( options.showForceValuesListener );

      model.constantRadiusProperty.lazyLink( constantRadius => {
        this.alertConstantRadius( constantRadius );
      } );

      // link to alert when the value changes
      model.object1.valueProperty.lazyLink( () => this.alertMassValueChanged( OBJECT_ONE ) );
      model.object2.valueProperty.lazyLink( () => this.alertMassValueChanged( OBJECT_TWO ) );

      // when the value changes position, the position will change after the valueProperty has, so link a listener to
      // alert one the positions are correct, this is important to get the alerts like
      // "mass 1 get's bigger and moves mass 2 right"
      model.object1.valueChangedPositionEmitter.addListener( () => this.alertMassValueChanged( OBJECT_ONE ) );
      model.object2.valueChangedPositionEmitter.addListener( () => this.alertMassValueChanged( OBJECT_TWO ) );
    }

    /**
     * @private
     */
    alertScientificNotation() {
      this.scientificNotationUtterance.alert = this.forceDescriber.getScientificNotationAlertText();
      utteranceQueue.addToBack( this.scientificNotationUtterance );
    }

    /**
     * @param {boolean} constantRadius
     * @private
     */
    alertConstantRadius( constantRadius ) {
      this.constantRadiusUtterance.alert = constantRadius ? this.constantRadiusAlert :
                                           this.massDescriber.getM1RelativeSize();
      utteranceQueue.addToBack( this.constantRadiusUtterance );
    }

    /**
     * @param {ISLCObjectEnum} objectEnum
     */
    alertMassValueChanged( objectEnum ) {
      this.massChangedUtterance.alert = this.getMassValueChangedAlertText( objectEnum );
      utteranceQueue.addToBack( this.massChangedUtterance );
    }

    /**
     * Get the value text for when the mass changes for a given object
     * @param {ISLCObjectEnum} objectEnum
     * @returns {string}
     */
    getMassValueChangedAlertText( objectEnum ) {

      let massClause = this.massDescriber.getMassOrDensityChangeClause( objectEnum );

      // if changing the mass of an object caused one of the masses to move position
      if ( this.model.massWasPushed() ) {
        massClause = this.massDescriber.getMassChangesAndMovesClause( objectEnum );
        if ( this.model.pushedObjectEnumProperty.value !== objectEnum ) {
          massClause = this.massDescriber.getMassChangesAndMovesOtherClause( objectEnum );
        }
      }

      let forceClause = this.forceDescriber.getVectorChangeClause();

      if ( this.model.forceValuesProperty.get() ) {
        forceClause = this.forceDescriber.getVectorChangeForcesNowClause();
      }

      return StringUtils.fillIn( massAndForceClausesPatternString, {
        massClause: massClause,
        forceClause: forceClause
      } );
    }
  }

  return gravityForceLab.register( 'GravityForceLabAlertManager', GravityForceLabAlertManager );
} );