// Copyright 2019, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const PositionDescriber = require( 'INVERSE_SQUARE_LAW_COMMON/view/describers/PositionDescriber' );
  const Util = require( 'DOT/Util' );

  class GravityForceLabPositionDescriber extends PositionDescriber {

    /**
     * @param {GravityForceLabModel} model
     * @param {string} object1Label
     * @param {string} object2Label
     * @param {Object} [options]
     */
    constructor( model, object1Label, object2Label, options ) {

      options = _.extend( {
        centerOffset: 4.8,
        convertDistanceMetric: distance => Util.toFixedNumber( distance, 1 )
      }, options );

      super( model, object1Label, object2Label, options );
    }

    /**
     * @param {number} distance
     * @returns {number}
     * @protected
     * @override
     */
    getDistanceIndex( distance ) {
      assert && assert( distance > 0, 'Distance between spheres should always be positive.' );

      if ( distance === 9.6 ) {
        return 0;
      }
      if ( distance >= 8.5 ) {
        return 1;
      }
      if ( distance >= 6.9 ) {
        return 2;
      }
      if ( distance >= 5.3 ) {
        return 3;
      }
      if ( distance >= 3.7 ) {
        return 4;
      }
      if ( distance >= 2.2 ) {
        return 5;
      }
      if ( distance >= 1.0 ) {
        return 6;
      }
      if ( distance >= 0.4 ) {
        return 7;
      }
      if ( distance <= 0.3 ) {
        return 8;
      }
      assert && assert( false, 'Invalid distance value' );
    }
  }

  return gravityForceLab.register( 'GravityForceLabPositionDescriber', GravityForceLabPositionDescriber );
} );