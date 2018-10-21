// Copyright 2018, University of Colorado Boulder

/**
 * The string manager is responsible for any dynamic strings in the sim. Usually this is in the form of a string pattern
 * that takes on different values based on model properties. It is also useful when a description or alert is comprised
 * of a series of different complete phrases or sentences that must be concatenated in a dynamic fashion.
 *
 * @author Michael Barlow (PhET Interactive Simulations)
 */

define( require => {
  'use strict';

  // modules
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const GravityForceLabA11yStrings = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabA11yStrings' );
  const ISLCStringManager = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCStringManager' );

  // strings
  const micronewtonsString = GravityForceLabA11yStrings.micronewtons.value;

  class GravityForceLabStringManager extends ISLCStringManager {
    constructor( model ) {

      super( model, {
        distanceUnits: micronewtonsString,
        valueUnitConversion: 1e6
      } );

      // @private
      this.model = model;
    }

    // @override
    getForceVectorIndex( force ) {
      const convertedForce = Math.abs( force ) * 1e6;
      if ( convertedForce < 0.041713 ) {
        return 0;
      }
      if ( convertedForce < 0.074155 ) {
        return 1;
      }
      if ( convertedForce < 0.260698 ) {
        return 2;
      }
      if ( convertedForce < 0.789805 ) {
        return 3;
      }
      if ( convertedForce < 1.564182 ) {
        return 4;
      }
      if ( convertedForce < 2.309288 ) {
        return 5;
      }
      if ( convertedForce >= 2.309288 ) {
        return 6;
      }
      throw new Error( 'Invalid force value' );
    }

    /////////////////////
    // Summary Strings //
    /////////////////////

  }

  return gravityForceLab.register( 'GravityForceLabStringManager', GravityForceLabStringManager );
} );