// Copyright 2014-2015, University of Colorado Boulder

/**
 * Constants that are shared between the various portions of the Gravity Force Lab simulation.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  var Range = require( 'DOT/Range' );

  // constants
  var MIN_MASS = 1; // kg
  var MAX_MASS = 1000; // kg

  var GravityForceLabConstants = {
    MIN_MASS: MIN_MASS,
    MAX_MASS: MAX_MASS,
    MASS_RANGE: new Range( MIN_MASS, MAX_MASS )
  };

  gravityForceLab.register( 'GravityForceLabConstants', GravityForceLabConstants );

  return GravityForceLabConstants;
} );