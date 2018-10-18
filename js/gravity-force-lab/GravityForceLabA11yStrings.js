// Copyright 2018, University of Colorado Boulder

/**
 * Strings for accessible content: alerts and descriptions in the PDOM.
 *
 * @author Michael Barlow (PhET Interactive Simulations)
 */

define( require => {
  'use strict';

  // modules
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );

  const GravityForceLabA11yStrings = {

    // Screen Summary Strings
    screenSummaryDescription: {
      value: 'The Play Area has a blue sphere labelled m1 and a red sphere labelled m2 and each sphere is held in place by a robot. A force vector starts at the center of each sphere and points directly at the opposite sphere. Spheres can be moved closer or further from one another, and the mass of each sphere can be increased or decreased. A ten-meter ruler can be moved around to take measurements. In the Control Area there are checkboxes and buttons to display force values with or without scientific notation, set the spheres to a constant size, and to reset the sim.'
    },
    simStateListLabel: {
      value: 'Currently, force on m1 by m2 is of equal magnitude and pointing directly opposite to the force on m2 by m1.'
    },
    forceSizeAndValueSummaryPattern: {
      value: 'Force vectors are {{size}} at {{micronewtons}} micronewtons.'
    },
    distanceSpaceAndValueSummaryPattern: {
      value: 'm1 and m2 are {{distnace}} each other, exactly {{meters}} meters apart.'
    },
    massValuesAndComparisonSummaryPattern: {
      value: 'Mass of m1 is {{m1Mass}} kilograms, {{comparitiveValue}} than m2 at {{m2Mass}} kilograms.'
    },
    robotPullSummaryPattern: {
      value: 'Robots {{pullAmount}} keeping spheres in place.'
    },
    summaryInteractionHint: {
      value: 'Move spheres or change their mass to begin observations.'
    }
  };

  if ( assert ) { Object.freeze( GravityForceLabA11yStrings ); }

  return gravityForceLab.register( 'GravityForceLabA11yStrings', GravityForceLabA11yStrings );
} );