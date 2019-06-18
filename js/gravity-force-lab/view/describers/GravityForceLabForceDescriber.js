// Copyright 2018-2019, University of Colorado Boulder

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

        // TODO: forceValueToString is used in both alerts and descriptive text. These contexts will need to be distinguished
        // in order to use ForceDescriber.getForceInScientificNotationNoHtml for alerts - screen readers don't properly
        // read the &times; entity
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
     *
     * @override
     * @param  {number} force
     * @param {number} numberOfRegions - for crosscheck
     * @returns {number} - integer within the range of force strings, see ForceDescriber.js
     */
    getForceVectorIndex( force, numberOfRegions ) {
      const convertedForce = convertForceToMicronewtons( force );
      assert && assert( numberOfRegions === 7, 'If numberOfRegions changes, this function should too.' );

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
  }

  return gravityForceLab.register( 'GravityForceLabForceDescriber', GravityForceLabForceDescriber );
} );