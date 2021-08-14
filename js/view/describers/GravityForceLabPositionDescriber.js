// Copyright 2019-2021, University of Colorado Boulder

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
}

gravityForceLab.register( 'GravityForceLabPositionDescriber', GravityForceLabPositionDescriber );
export default GravityForceLabPositionDescriber;