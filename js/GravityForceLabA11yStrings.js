// Copyright 2018-2020, University of Colorado Boulder

/**
 * Strings for accessible content: alerts and descriptions in the PDOM.
 *
 * @author Michael Barlow (PhET Interactive Simulations)
 */

import gravityForceLab from './gravityForceLab.js';

const GravityForceLabA11yStrings = {


  // relative densities
  // vertical ruler positions
  coveringM2: {
    value: 'Covering force vector of m2.'
  },
  coveringM1: {
    value: 'Covering force vector of m1.'
  },
  justAboveCenters: {
    value: 'Just above centers.'
  },
  coveringCenters: {
    value: 'Covering centers.'
  },
  justBelowCenters: {
    value: 'Just below centers.'
  },
  inHomePosition: {
    value: 'In home position below mass spheres.'
  },
  behindMassControls: {
    value: 'Behind mass controls.'
  },

  ///////////
  // Units //
  ///////////

  micronewtons: {
    value: 'micronewtons'
  },
  mass: {
    value: 'mass'
  }
};

if ( assert ) { Object.freeze( GravityForceLabA11yStrings ); }

gravityForceLab.register( 'GravityForceLabA11yStrings', GravityForceLabA11yStrings );
export default GravityForceLabA11yStrings;