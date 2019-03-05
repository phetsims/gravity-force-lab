// Copyright 2018-2019, University of Colorado Boulder

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
    screenSummaryMainDescription: {
      value: 'The Play Area has a blue sphere labeled m1 and a red sphere labeled m2. A force vector arrow starts at the center of each sphere and points directly at the opposite sphere. Spheres can be moved closer or farther from one another. The mass of each sphere can be increased or decreased. Each sphere is held in place by a robot.'
    },
    screenSummarySecondaryDescription: {
      value: 'In the Control Area, checkboxes change what things are shown and how they behave, and a button resets the sim. There is a moveable ruler to take measurements, if needed.'
    },
    simStateListLabel: {
      value: 'Currently, force on m1 by m2 is equal in magnitude and opposite in direction of force on m2 by m1.'
    },
    massValuesAndComparisonSummaryPattern: {
      value: 'Mass of {{mass1Label}} is {{m1Mass}} kilograms, {{comparativeValue}} {{mass2Label}} at {{m2Mass}} kilograms.'
    },

    ///////////////////////////////////////
    // Object/sphere descriptions and labels
    ///////////////////////////////////////

    blueSpherePattern: {
      value: '{{objectLabel}}, Blue Sphere'
    },
    redSpherePattern: {
      value: '{{objectLabel}}, Red Sphere'
    },
    valueUnitsPattern: {
      value: '{{value}} {{units}}'
    },
    positionMeterPattern: {
      value: '{{position}} meter'
    },

    // for GFL
    sizeAndPositionPattern: {
      value: '{{thisObjectLabel}} is {{size}} at {{massValue}} kilograms and at {{position}} {{unit}} mark.'
    },

    // for GFL:B
    sizePattern: {
      value: '{{thisObjectLabel}} is {{massValue}} kilograms'
    },
    sizeAndDistancePattern: {
      value: '{{size}} and {{distance}}.'
    },


    ////////////////////////
    // Qualitative values //
    ////////////////////////

    objectsRelativeSizePattern: {
      value: '{{firstObjectLabel}} {{relativeSize}} {{secondObjectLabel}}'
    },
    massAndUnitPattern: {
      value: '{{massValue}} kilograms'
    },
    massSizeRelativeSizePattern: {
      value: '{{massAndUnit}}, {{size}}, {{relativeSize}} {{otherObjectLabel}}'
    },
    massValueRelativeSizePattern: {
      value: '{{massAndUnit}}, {{relativeSize}} {{otherObjectLabel}}'
    },
    massAndForceClausesPattern: {
      value: '{{massClause}}, {{forceClause}}.'
    },
    massChangeClausePattern: {
      value: 'As mass {{changeDirection}}'
    },
    massChangesAndMovesClausePattern: {
      value: 'As mass {{changeDirection}} and moves {{leftOrRight}}'
    },
    massChangesMovesOtherClausePattern: {
      value: 'As mass {{changeDirection}} and moves {{otherObjectLabel}} {{leftOrRight}}'
    },

    // relative mass sizes
    muchMuchSmallerThan: {
      value: 'much much smaller than'
    },
    halfTheSizeOf: {
      value: 'half the size of'
    },
    muchSmallerThan: {
      value: 'much smaller than'
    },
    smallerButComparableTo: {
      value: 'smaller but comparable to'
    },
    sameSizeAs: {
      value: 'same size as'
    },
    largerButComparableTo: {
      value: 'larger but comparable to'
    },
    muchLargerThan: {
      value: 'much larger than'
    },
    twiceTheSizeOf: {
      value: 'twice the size of'
    },
    muchMuchLargerThan: {
      value: 'much much larger than'
    },
    getsSmaller: {
      value: 'gets smaller'
    },
    getsBigger: {
      value: 'gets bigger'
    },

    // mass sphere density
    notAtAllDense: {
      value: 'not at all dense'
    },
    notVeryDense: {
      value: 'not very dense'
    },
    somewhatDense: {
      value: 'somewhat dense'
    },
    ofMediumDensity: {
      value: 'of medium density'
    },
    dense: {
      value: 'dense'
    },
    veryDense: {
      value: 'very dense'
    },
    veryVeryDense: {
      value: 'very very dense'
    },

    // Controls and checkboxes

    massControlsLabel: {
      value: 'Mass Controls'
    },
    massControlsHelpText: {
      value: 'Change mass of spheres in kilograms.'
    },
    massControlsHelpTextDensity: {
      value: 'Change density of spheres in kilograms.'
    },
    massControlsHelpTextBillions: {
      value: 'Change mass of spheres in billions of kilograms.'
    },
    massControlsHelpTextDensityBillions: {
      value: 'Change density of spheres in billions of kilograms.'
    },
    constantSizeCheckboxHelpText: {
      value: 'Keep size of spheres constant while changing mass.'
    },
    constantRadiusThinkDensityPattern: {
      value: '{{mass1}} and {{mass2}} set to same size.'
    },
    forceValuesCheckboxHelpText: {
      value: 'Explore force values in micronewtons.'
    },

    /************************************
     Keyboard Help Content
     ************************************/

    moveSphereDescription: {
      value: 'Move sphere left and right with the Left and Right Arrow keys.'
    },
    moveInSmallerStepsDescription: {
      value: 'Move in smaller steps with shift plus arrow keys.'
    },
    moveInLargerStepsDescription: {
      value: 'Move in larger steps with Page Up and Page Down keys.'
    },
    jumpToLeftDescription: {
      value: 'Jump to left with Home key.'
    },
    jumpToRightDescription: {
      value: 'Jump to right with End key.'
    },
    increaseMassDescription: {
      value: 'Increase mass with Up or Right Arrow key.'
    },
    decreaseMassDescription: {
      value: 'Decrease mass with Down or Left Arrow key.'
    },
    changeMassInLargerStepsDescription: {
      value: 'Change mass in larger steps with Page Up and Page Down keys.'
    },
    changeMassInSmallerStepsDescription: {
      value: 'Change mass in smaller steps with shift plus arrow keys.'
    },
    jumpToMaximumMassDescription: {
      value: 'Jump to maximum mass with End key.'
    },
    jumpToMinimumMassDescription: {
      value: 'Jump to minimum mass with Home key.'
    },

    ///////////
    // Units //
    ///////////

    micronewtons: {
      value: 'micronewtons'
    }
  };

  if ( assert ) { Object.freeze( GravityForceLabA11yStrings ); }

  return gravityForceLab.register( 'GravityForceLabA11yStrings', GravityForceLabA11yStrings );
} );