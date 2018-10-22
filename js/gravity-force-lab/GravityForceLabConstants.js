// Copyright 2016-2017, University of Colorado Boulder

/**
 * Constants that are shared between the various portions of the Gravity Force Lab simulation.
 *
 * @author John Blanco
 * @author Michael Barlow
 */
define( require => {
  'use strict';

  // modules
  const Color = require( 'SCENERY/util/Color' );
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const Range = require( 'DOT/Range' );

  // constants
  const MIN_MASS = 1; // kg
  const MAX_MASS = 1000; // kg
  const MAX_DISTANCE_FROM_CENTER = 4.8; // meters, empirically determined boundary for masses
  const MASS_BLUE_COLOR = new Color( '#00f' );
  const MASS_RED_COLOR = new Color( '#f00' );
  const PULL_FORCE_RANGE = new Range( ( 0.5e-10 ), ( 1.1e-6 ) ); // empirically determined for linear mapping of pull objects

  const GravityForceLabConstants = {
    MASS_RED_COLOR,
    MASS_BLUE_COLOR,
    MIN_MASS,
    MAX_MASS,
    PULL_FORCE_RANGE,
    RIGHT_MASS_BOUNDARY: MAX_DISTANCE_FROM_CENTER,
    LEFT_MASS_BOUNDARY: -MAX_DISTANCE_FROM_CENTER,
    LOCATION_SNAP_VALUE: 0.1,
    MASS_RANGE: new Range( MIN_MASS, MAX_MASS ),
    CONSTANT_RADIUS: 0.5, // in meters
    MASS_DENSITY: 150 // kg/m^3
  };

  return gravityForceLab.register( 'GravityForceLabConstants', GravityForceLabConstants );
} );