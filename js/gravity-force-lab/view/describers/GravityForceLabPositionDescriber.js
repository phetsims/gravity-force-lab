// Copyright 2019, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const GravityForceLabConstants = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabConstants' );
  const PositionDescriber = require( 'INVERSE_SQUARE_LAW_COMMON/view/describers/PositionDescriber' );
  const Util = require( 'DOT/Util' );

  // constants
  // In km. Model coordinates have the center as 0, but some descriptions, like "X meter mark", need to
  // count starting at the absolute left location. This offset get's us from the center to the edge of Object/puller
  // space.
  const CENTER_OFFSET = GravityForceLabConstants.PULL_LOCATION_RANGE.max;

  class GravityForceLabPositionDescriber extends PositionDescriber {

    /**
     * @param {GravityForceLabModel} model
     * @param {string} object1Label
     * @param {string} object2Label
     * @param {Object} [options]
     */
    constructor( model, object1Label, object2Label, options ) {

      options = _.extend( {
        convertDistanceMetric: distance => Util.toFixedNumber( distance, 1 )
      }, options );

      super( model, object1Label, object2Label, options );
    }

    /**
     * get the converted position of the provided ISLCObject offset from the edge of the track, see CENTER_OFFSET.
     * @param {ISLCObject} object
     * @returns {number}
     */
    getConvertedPosition( object ) {

      // offset the position because the position is normally based on the center as 0
      return this.convertDistanceMetric( object.positionProperty.get() + CENTER_OFFSET );
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