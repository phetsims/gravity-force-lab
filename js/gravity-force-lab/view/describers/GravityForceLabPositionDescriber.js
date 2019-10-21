// Copyright 2019, University of Colorado Boulder

/**
 * This describer is responsible for all gravity-force-lab specific string forming related to position.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const GravityForceLabConstants = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabConstants' );
  const merge = require( 'PHET_CORE/merge' );
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

      options = merge( {
        formatDisplayDistance: distance => Util.toFixedNumber( distance, 1 )
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
      return this.formatDisplayDistance( object.positionProperty.get() + CENTER_OFFSET );
    }

    /**
     * These empirically determined values were designed, see https://docs.google.com/document/d/1-37qAgde2XrlXBQae2SgjartM35_EnzDD9pdtd3nXAM/edit#heading=h.nhqxjbby3dgu
     * @param {number} distance
     * @param {number} numberOfRegions - for crosscheck
     * @returns {number}
     * @protected
     * @override
     */
    getDistanceIndex( distance, numberOfRegions ) {
      assert && assert( distance >=.6, 'Distance between spheres should always be positive.' );
      assert && assert( numberOfRegions === 9, 'If numberOfRegions changes, this function should too.' );

      if ( distance === .6 ) {
        return 8;
      }
      if ( distance < 1.6 ) {
        return 7;
      }
      if ( distance < 2.6 ) {
        return 6;
      }
      if ( distance < 3.6 ) {
        return 5;
      }
      if ( distance < 5.6 ) {
        return 4;
      }
      if ( distance < 7.6 ) {
        return 3;
      }
      if ( distance < 8.6 ) {
        return 2;
      }
      if ( distance < 9.6 ) {
        return 1;
      }
      return 0;

    }
  }

  return gravityForceLab.register( 'GravityForceLabPositionDescriber', GravityForceLabPositionDescriber );
} );