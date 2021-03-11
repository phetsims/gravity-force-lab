// Copyright 2019-2020, University of Colorado Boulder

/**
 * This describer is responsible for all gravity-force-lab specific string forming related to position.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import Utils from '../../../../dot/js/Utils.js';
import PositionDescriber from '../../../../inverse-square-law-common/js/view/describers/PositionDescriber.js';
import merge from '../../../../phet-core/js/merge.js';
import gravityForceLab from '../../gravityForceLab.js';

class GravityForceLabPositionDescriber extends PositionDescriber {

  /**
   * @param {GravityForceLabModel} model
   * @param {string} object1Label
   * @param {string} object2Label
   * @param {Object} [options]
   */
  constructor( model, object1Label, object2Label, options ) {

    options = merge( {
      formatDisplayDistance: distance => Utils.toFixedNumber( distance, 1 )
    }, options );

    super( model, object1Label, object2Label, options );
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
    assert && assert( distance >= 0, 'Distance between spheres should always be positive.' );
    assert && assert( numberOfRegions === 9, 'If numberOfRegions changes, this function should too.' );

    // Though this is technically the min, the model can be set to the wrong value, and the rely on that "snap"
    // functionality to bring the distance back into the correct range on next model step. So support values less than.
    if ( distance <= 0.6 ) {
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

gravityForceLab.register( 'GravityForceLabPositionDescriber', GravityForceLabPositionDescriber );
export default GravityForceLabPositionDescriber;