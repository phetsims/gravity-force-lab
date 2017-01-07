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
  var MAX_DISTANCE_FROM_CENTER = 7.48; // meters, empirically determined boundary for masses

  var GravityForceLabConstants = {
    MIN_MASS: MIN_MASS,
    MAX_MASS: MAX_MASS,
    RIGHT_MASS_BOUNDARY: MAX_DISTANCE_FROM_CENTER,
    LEFT_MASS_BOUNDARY: -MAX_DISTANCE_FROM_CENTER,
    MASS_RANGE: new Range( MIN_MASS, MAX_MASS ),
    CONSTANT_RADIUS: 0.5, // in meters
    MASS_DENSITY: 150 // kg/m^3
  };

  gravityForceLab.register( 'GravityForceLabConstants', GravityForceLabConstants );

  return GravityForceLabConstants;
} );