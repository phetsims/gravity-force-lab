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
     * @param {ForceDescriber} forceDescriber - GFLBForceDescriber inherits directly from ForceDescriber
     * @param options
     */
    constructor( model, massDescriber, forceDescriber, options ) {

      // Basically these options try to support BASICS and REGULAR logic duplication.
      options = _.extend( {

        // {boolean} This should only used for gravity-force-lab
        linkToScientificNotationProperty: true,

        // {function} - listener to link to the forceValuesProperty, default listener for REGULAR
        showForceValuesListener: showValues => {

          const displayScientificNotation = model.scientificNotationProperty.get();

          if ( !showValues || !displayScientificNotation ) {
            this.alertShowForceValues( showValues );
          }
          else {
            this.alertScientificNotation();
          }
        }
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
        utteranceQueue.addToBack( constantRadiusUtterance );
      } );

      if ( options.linkToScientificNotationProperty ) {
        assert && assert( model instanceof GravityForceLabModel, 'unsupported model for scientific notation' );
        options.linkToScientificNotationProperty && model.scientificNotationProperty.lazyLink( () => this.alertScientificNotation() );
      }

      // use an option to support REGULAR and BASICS
      model.forceValuesProperty.lazyLink( options.showForceValuesListener );

      // link to alert when the value changes
      model.object1.valueProperty.lazyLink( () => this.alertMassValueChanged( OBJECT_ONE ) );
      model.object2.valueProperty.lazyLink( () => this.alertMassValueChanged( OBJECT_TWO ) );

      // when the value changes position, the position will change after the valueProperty has, so link a listener to
      // alert one the positions are correct, this is important to get the alerts like
      // "mass 1 get's bigger and moves mass 2 right"
      model.object1.valueChangedPositionEmitter.addListener( objectEnum => this.alertMassValueChanged( objectEnum, true ) );
      model.object2.valueChangedPositionEmitter.addListener( objectEnum => this.alertMassValueChanged( objectEnum, true ) );
    }

    /**
     * @private
     */
    alertScientificNotation() {
      this.scientificNotationUtterance.alert = this.forceDescriber.getScientificNotationAlertText();
      utteranceQueue.addToBack( this.scientificNotationUtterance );
    }

    /**
     * @param {ISLCObjectEnum} objectEnum
     * @param {boolean} [forceBiggerOverride] - when true, manually override the value of the force "direction change"
     *                                          from the model. This is to solve a bug where the model decreases force
     *                                          after a mass pushes the other away, see https://github.com/phetsims/gravity-force-lab-basics/issues/151
     * @public
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
        forceClause: this.forceDescriber.getVectorChangeClause( forceBiggerOverride )
      } );
      utteranceQueue.addToBack( this.massChangedUtterance );
    }
  }

  return gravityForceLab.register( 'GravityForceLabAlertManager', GravityForceLabAlertManager );
} );