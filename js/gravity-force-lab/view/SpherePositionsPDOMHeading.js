// Copyright 2019, University of Colorado Boulder

/**
 * Simple PDOM node to hold the two interactive mass spheres.
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const ISLCA11yStrings = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCA11yStrings' );
  const Node = require( 'SCENERY/nodes/Node' );

  // a11y strings
  const spherePositionsString = ISLCA11yStrings.spherePositions.value;
  const spherePositionHelpTextString = ISLCA11yStrings.spherePositionHelpText.value;

  class SpherePositionsPDOMHeading extends Node {

    /**
     * @param {Object} [options]
     */
    constructor( options ) {

      super( _.extend( {
        tagName: 'div',
        labelTagName: 'h3',
        labelContent: spherePositionsString,
        descriptionContent: spherePositionHelpTextString
      }, options ) );
    }
  }

  return gravityForceLab.register( 'SpherePositionsPDOMHeading', SpherePositionsPDOMHeading );
} );