// Copyright 2019-2020, University of Colorado Boulder

/**
 * Simple PDOM node to hold the two interactive mass spheres.
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const ISLCA11yStrings = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCA11yStrings' );
  const merge = require( 'PHET_CORE/merge' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Property = require( 'AXON/Property' );

  // a11y strings
  const spherePositionsString = ISLCA11yStrings.spherePositions.value;

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

      Property.multilink( [

          // Linking to `model.separationProperty` caused the same bug as in GFLB#103, so we are linking to
          // both objects' positionProperty instead.
          model.object1.positionProperty,
          model.object2.positionProperty ].concat( options.additionalDescriptionDependencies ),
        () => { this.descriptionContent = positionDescriber.getSpherePositionsHelpText(); }
      );
    }
  }

  return gravityForceLab.register( 'SpherePositionsDescriptionNode', SpherePositionsDescriptionNode );
} );