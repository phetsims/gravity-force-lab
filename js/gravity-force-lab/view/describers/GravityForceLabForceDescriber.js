// Copyright 2018, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const ForceDescriber = require( 'INVERSE_SQUARE_LAW_COMMON/view/describers/ForceDescriber' );
  const GravityForceLabA11yStrings = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabA11yStrings' );
  const Util = require( 'DOT/Util' );
  const GravityForceLabConstants = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabConstants' );
  const LinearFunction = require( 'DOT/LinearFunction' );

  // strings
  const unitsNewtonsString = require( 'string!INVERSE_SQUARE_LAW_COMMON/units.newtons' );

  // a11y strings
  const micronewtonsString = GravityForceLabA11yStrings.micronewtons.value;

  // constants
  const MICRO_CONVERSION_FACTOR = 1e6;
  const { min, max } = GravityForceLabConstants.PULL_FORCE_RANGE;
  const forceToPullIndex = new LinearFunction( min, max, 6, 0, true );

  let describer = null;

  class GravityForceLabForceDescriber extends ForceDescriber {

    constructor( model, object1Label, object2Label ) {
      const options = {
        units: micronewtonsString,

        convertForce: force => {
          if ( !this.forceInScientificNotation ) {
            return GravityForceLabForceDescriber.convertForceToMicronewtons( force );
          }
          return force;
        },

        forceValueToString: convertedForce => {
          if ( this.forceInScientificNotation ) {
            return ForceDescriber.getForceInScientificNotation( convertedForce, 2 );
          }
          return convertedForce + '';
        }
      };

      super( model, object1Label, object2Label, options );

      model.scientificNotationProperty.link( showScientificNotation => {
        this.units = showScientificNotation ? micronewtonsString : unitsNewtonsString;
      } );
    }

    get forceInScientificNotation() {
      return this.model.scientificNotationProperty.get();
    }

    /**
     * Returns the mapped index based on the given force value. Force values in ISLC sims range from piconewtons to
     * newtons, so it's necessary for sim-specific subtypes to specify this logic.
     *
     * @override
     * @param  {Number} force
     * @return {Integer}
     */
    getForceVectorIndex( force ) {
      const convertedForce = GravityForceLabForceDescriber.convertForceToMicronewtons( force );
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

    /**
     * Returns the mapped puller index based on the provided force.
     *
     * @override
     * @param  {Number} force
     * @return {Integer}
     */
    getEffortIndex( force ) {
      return Util.roundSymmetric( forceToPullIndex( force ) );
    }

    /**
     * Uses the singleton pattern to keep one instance of this describer for the entire lifetime of the sim.
     * @returns {ForceDescriber}
     */
    static getDescriber() {
      assert && assert( describer, 'describer has not yet been initialized' );
      return describer;
    }

    /**
     * Initialize the describer singleton
     * @throws Error
     */
    static initialize( model, object1Label, object2Label ) {
      describer = new GravityForceLabForceDescriber( model, object1Label, object2Label );
    }

    static convertForceToMicronewtons( force ) {
      return Util.toFixedNumber( force * MICRO_CONVERSION_FACTOR, 6 );
    }
  }

  return gravityForceLab.register( 'GravityForceLabForceDescriber', GravityForceLabForceDescriber );
} );