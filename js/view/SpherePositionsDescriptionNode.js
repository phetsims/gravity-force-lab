// Copyright 2019-2022, University of Colorado Boulder

/**
 * Simple PDOM node to hold the two interactive mass spheres.
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import Multilink from '../../../axon/js/Multilink.js';
import InverseSquareLawCommonStrings from '../../../inverse-square-law-common/js/InverseSquareLawCommonStrings.js';
import merge from '../../../phet-core/js/merge.js';
import { Node } from '../../../scenery/js/imports.js';
import gravityForceLab from '../gravityForceLab.js';

// constants
const spherePositionsString = InverseSquareLawCommonStrings.a11y.sphere.spherePositions;

class SpherePositionsDescriptionNode extends Node {

  /**
   * @param {ISLCModel} model
   * @param {PositionDescriber} positionDescriber
   * @param {Object} [options]
   */
  constructor( model, positionDescriber, options ) {

    options = merge( {
      tagName: 'div',
      labelTagName: 'h3',
      labelContent: spherePositionsString,
      additionalDescriptionDependencies: [] // {Property[]} to be added to the multilink
    }, options );

    super( options );

    Multilink.multilink( [

        // Linking to `model.separationProperty` caused the same bug as in GFLB#103, so we are linking to
        // both objects' positionProperty instead.
        model.object1.positionProperty,
        model.object2.positionProperty ].concat( options.additionalDescriptionDependencies ),
      () => { this.descriptionContent = positionDescriber.getSpherePositionsHelpText(); }
    );
  }
}

gravityForceLab.register( 'SpherePositionsDescriptionNode', SpherePositionsDescriptionNode );
export default SpherePositionsDescriptionNode;