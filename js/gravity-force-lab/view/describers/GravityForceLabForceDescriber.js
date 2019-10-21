// Copyright 2018-2019, University of Colorado Boulder

/**
 * This describer is responsible for all gravity-force-lab specific string forming related to force.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const ForceDescriber = require( 'INVERSE_SQUARE_LAW_COMMON/view/describers/ForceDescriber' );
  const GravityForceLabA11yStrings = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabA11yStrings' );
  const Util = require( 'DOT/Util' );

  // strings
  const unitsNewtonsString = require( 'string!INVERSE_SQUARE_LAW_COMMON/units.newtons' );

  // a11y strings
  const micronewtonsString = GravityForceLabA11yStrings.micronewtons.value;

  // constants
  const MICRO_CONVERSION_FACTOR = 1e6;
  const convertForceToMicronewtons = force => {
    return Util.toFixedNumber( force * MICRO_CONVERSION_FACTOR, 6 );
  };

  class GravityForceLabForceDescriber extends ForceDescriber {

    /**
     * @param {GravityForceLabModel} model
     * @param {string} object1Label
     * @param {string} object2Label
     * @param {PositionDescriber} positionDescriber
     */
    constructor( model, object1Label, object2Label, positionDescriber ) {
      const options = {
        units: micronewtonsString,

        convertForce: force => {
          if ( !this.displayInScientificNotion ) {
            return convertForceToMicronewtons( force );
          }
          return force;
        },

        // TODO: forceValueToString is used in both alerts and descriptive text.
        forceValueToString: convertedForce => {
          if ( this.displayInScientificNotion ) {
            return ForceDescriber.getForceInScientificNotation( convertedForce, 2 );
          }
          return convertedForce + '';
        }
      };

      super( model, object1Label, object2Label, positionDescriber, options );

      model.scientificNotationProperty.link( showScientificNotation => {
        this.units = showScientificNotation ? unitsNewtonsString : micronewtonsString;
      } );
    }

    /**
     * @private
     * @returns {boolean}
     */
    get displayInScientificNotion() {
      return this.scientificNotationProperty.get();
    }

    /**
     * Returns the mapped index based on the given force value. Force values in ISLC sims range from piconewtons to
     * newtons, so it's necessary for sim-specific subtypes to specify this logic.
     * These empirically determined values were designed, see https://docs.google.com/document/d/1-37qAgde2XrlXBQae2SgjartM35_EnzDD9pdtd3nXAM/edit#heading=h.nhqxjbby3dgu
     *
     * @override
     * @param  {number} force
     * @param {number} numberOfRegions - for crosscheck
     * @returns {number} - integer within the range of force strings, see ForceDescriber.js
     */
    getForceVectorIndex( force, numberOfRegions ) {
      const convertedForce = convertForceToMicronewtons( force );
      assert && assert( numberOfRegions === 7, 'If numberOfRegions changes, this function should too.' );

      if ( convertedForce < 0.166852 ) {
        return 0;
      }
      if ( convertedForce < 2.206307 ) {
        return 1;
      }
      if ( convertedForce < 4.412615 ) {
        return 2;
      }
      if ( convertedForce < 8.687337 ) {
        return 3;
      }
      if ( convertedForce < 19.856768 ) {
        return 4;
      }
      if ( convertedForce < 35.300920 ) {
        return 5;
      }
      return 6;
    }
  }

  return gravityForceLab.register( 'GravityForceLabForceDescriber', GravityForceLabForceDescriber );
} );