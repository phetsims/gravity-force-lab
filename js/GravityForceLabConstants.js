// Copyright 2016-2021, University of Colorado Boulder

/**
 * Constants that are shared between the various portions of the Gravity Force Lab simulation.
 *
 * @author John Blanco
 * @author Michael Barlow
 */

import Property from '../../axon/js/Property.js';
import Range from '../../dot/js/Range.js';
import { Color } from '../../scenery/js/imports.js';
import gravityForceLab from './gravityForceLab.js';

// constants
const MIN_MASS = 10; // kg
const MAX_MASS = 1000; // kg
const MAX_DISTANCE_FROM_CENTER = 5; // meters, empirically determined boundary for masses
const MASS_BLUE_COLOR = new Color( '#00f' );
const MASS_RED_COLOR = new Color( '#f00' );

const GravityForceLabConstants = {
  BACKGROUND_COLOR_PROPERTY: new Property( 'white' ),
  MASS_RED_COLOR: MASS_RED_COLOR,
  MASS_BLUE_COLOR: MASS_BLUE_COLOR,
  PULL_POSITION_RANGE: new Range( -MAX_DISTANCE_FROM_CENTER, MAX_DISTANCE_FROM_CENTER ),
  POSITION_SNAP_VALUE: 0.1,
  POSITION_STEP_SIZE: 0.5,
  MASS_RANGE: new Range( MIN_MASS, MAX_MASS ),
  MASS_DENSITY: 150 // kg/m^3
};

gravityForceLab.register( 'GravityForceLabConstants', GravityForceLabConstants );
export default GravityForceLabConstants;