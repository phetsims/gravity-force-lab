// Copyright 2018, University of Colorado Boulder

/**
 * A node to control the PDOM content for the Screen Summary of the sim.
 *
 * @author Michael Barlow (PhET Interactive Simulations)
 */

define( require => {
  'use strict';

  // modules
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const Node = require( 'SCENERY/nodes/Node' );

  class GravityForceLabScreenSummaryNode extends Node {

    constructor() {
      super();
    }
  }

  return gravityForceLab.register( 'GravityForceLabScreenSummaryNode', GravityForceLabScreenSummaryNode );
} );