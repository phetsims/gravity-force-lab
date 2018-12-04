// Copyright 2018, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const GravityForceLabA11yStrings = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabA11yStrings' );
  // const ISLCObjectEnum = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectEnum' );
  const ISLCA11yStrings = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCA11yStrings' );
  const ISLCAlertManager = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCAlertManager' );
  const Utterance = require( 'SCENERY_PHET/accessibility/Utterance' );
  const utteranceQueue = require( 'SCENERY_PHET/accessibility/utteranceQueue' );

  // constants
  // const { OBJECT_ONE } = ISLCObjectEnum;

  // strings
  const forcesInScientificNotationString = ISLCA11yStrings.forcesInScientificNotation.value;
  const constantRadiusThinkDensityString = GravityForceLabA11yStrings.constantRadiusThinkDensity.value;

  class GravityForceLabAlertManager extends ISLCAlertManager{
    constructor( model, stringManager ) {

      super( model, stringManager );

      // this.stringManager = stringManager;

      model.scientificNotationProperty.lazyLink( displayInScientificNotation => {
        this.alertScientificNotation( displayInScientificNotation );
      } );

      model.constantRadiusProperty.lazyLink( constantRadius => {
        this.alertConstantRadius( constantRadius );
      } );

      model.forceValuesProperty.lazyLink( showValues => {

        const scientificNotation = model.scientificNotationProperty.get();
        if ( !showValues || !scientificNotation ) {
          this.alertForceValues( showValues );
        }
        else {
          this.alertScientificNotation( scientificNotation );
        }
      } );

      // model.object1.valueProperty.lazyLink( ( value, oldValue ) => {
      //   utteranceQueue.clear();
      //   this.alertMassValueChanged( value, oldValue );
      // } );
      //
      // model.object2.valueProperty.lazyLink( ( value, oldValue ) => {
      //   utteranceQueue.clear();
      //   this.alertMassValueChanged( value, oldValue );
      // } );
    }

    alertScientificNotation( displayInScientificNotation ) {
      const alert = displayInScientificNotation ? forcesInScientificNotationString : this.stringManager.getForceValuesInUnitsText();
      const utterance = new Utterance( { alert, uniqueGroupId: 'scientificNotation' } );
      utteranceQueue.addToBack( utterance );
    }

    alertConstantRadius( constantRadius ) {
      const alert = constantRadius ? constantRadiusThinkDensityString : this.stringManager.getM1RelativeSize();
      const utterance = new Utterance( { alert, uniqueGroupId: 'constantRadius' } );
      utteranceQueue.addToBack( utterance );
    }

    alertMassControlFocus( objectEnum ) {
      const alert = this.stringManager.getMassControlFocusAlertText( objectEnum );
      utteranceQueue.addToBack( alert );
    }

    alertMassValueChanged( value, oldValue ) {
      const alert = this.stringManager.getMassValueChangedAlertText( value, oldValue );
      const utterance = new Utterance( { alert, uniqueGroupId: 'massChanged' } );
      utteranceQueue.addToBack( utterance );
    }
  }

  return gravityForceLab.register( 'GravityForceLabAlertManager', GravityForceLabAlertManager );
} );