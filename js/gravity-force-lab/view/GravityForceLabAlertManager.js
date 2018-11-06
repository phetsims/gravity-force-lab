// Copyright 2017-2018, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const GravityForceLabA11yStrings = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabA11yStrings' );
  const ISLCA11yStrings = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCA11yStrings' );
  const ISLCAlertManager = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCAlertManager' );
  const Utterance = require( 'SCENERY_PHET/accessibility/Utterance' );
  const utteranceQueue = require( 'SCENERY_PHET/accessibility/utteranceQueue' );

  // strings
  const forcesInScientificNotationString = ISLCA11yStrings.forcesInScientificNotation.value;
  const forcesInDecimalString = ISLCA11yStrings.forcesInDecimal.value;
  const constantRadiusThinkDensityString = GravityForceLabA11yStrings.constantRadiusThinkDensity.value;
  const massesDifferentSizesString = GravityForceLabA11yStrings.massesDifferentSizes.value;

  class GravityForceLabAlertManager extends ISLCAlertManager{
    constructor( model ) {

      super( model, {} );

      model.scientificNotationProperty.lazyLink( displayInScientificNotation => {
        this.alertScientificNotation( displayInScientificNotation );
      } );

      model.constantRadiusProperty.lazyLink( constantRadius => {
        this.alertConstantRadius( constantRadius );
      } );
    }

    alertScientificNotation( displayInScientificNotation ) {
      const alert = displayInScientificNotation ? forcesInScientificNotationString : forcesInDecimalString;
      const utterance = new Utterance( { alert, uniqueGroupId: 'scientificNotation' } );
      utteranceQueue.addToBack( utterance );
    }

    alertConstantRadius( constantRadius ) {
      const alert = constantRadius ? constantRadiusThinkDensityString : massesDifferentSizesString;
      const utterance = new Utterance( { alert, uniqueGroupId: 'constantRadius' } );
      utteranceQueue.addToBack( utterance );
    }
  }

  return gravityForceLab.register( 'GravityForceLabAlertManager', GravityForceLabAlertManager );
} );