// Copyright 2018-2020, University of Colorado Boulder

/**
 * Strings for accessible content: alerts and descriptions in the PDOM.
 *
 * @author Michael Barlow (PhET Interactive Simulations)
 */

import gravityForceLab from './gravityForceLab.js';

const GravityForceLabA11yStrings = {

  // Screen Summary Strings
  screenSummaryPlayAreaOverview: {
    value: 'The Play Area has two mass spheres, a blue sphere labeled m1 and a red sphere labeled m2. A force vector arrow starts at the center of each sphere and points directly at the opposite sphere.'
  },
  screenSummaryPlayAreaControls: {
    value: 'Spheres can be moved closer or farther from one another along a measured track. The mass of each sphere can be increased or decreased. Each sphere is held in place by a robot. Optionally, a moveable ruler can be used to measure distance between the spheres\' centers.'
  },
  screenSummarySecondaryDescription: {
    value: 'In the Control Area, there are options to change force notations and mass representations, and a button to reset the sim.'
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

  sizeAndDistancePattern: {
    value: '{{size}}, {{relativeSize}} {{otherObjectLabel}}, and also {{distance}}.'
  },
  sizePattern: {
    value: '{{thisObjectLabel}} is {{massValue}} kilograms'
  },


  ////////////////////////
  // Qualitative values //
  ////////////////////////

  objectsRelativeSizePattern: {
    value: '{{firstObjectLabel}} {{relativeSize}} {{secondObjectLabel}}.'
  },
  massAndUnitPattern: {
    value: '{{massValue}} kilograms'
  },
  massSizeRelativeSizePattern: {
    value: '{{massAndUnit}}, {{size}}, {{relativeSize}} {{otherObjectLabel}}'
  },
  massAndForceClausesPattern: {
    value: '{{massClause}}, {{forceClause}}.'
  },
  massChangeClausePattern: {
    value: 'As {{changeDirectionPhrase}}'
  },
  massChangesAndMovesClausePattern: {
    value: 'As {{changeDirectionPhrase}} and moves {{leftOrRight}}'
  },
  massChangesMovesOtherClausePattern: {
    value: 'As {{changeDirectionPhrase}} and moves {{otherObjectLabel}} {{leftOrRight}}'
  },

  sentencePattern: {
    value: '{{sentence}}.'
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

  // relative mass sizes capitalized
  muchMuchSmallerThanCapitalized: {
    value: 'Much much smaller than'
  },
  halfTheSizeOfCapitalized: {
    value: 'Half the size of'
  },
  muchSmallerThanCapitalized: {
    value: 'Much smaller than'
  },
  smallerButComparableToCapitalized: {
    value: 'Smaller but comparable to'
  },
  sameSizeAsCapitalized: {
    value: 'Same size as'
  },
  largerButComparableToCapitalized: {
    value: 'Larger but comparable to'
  },
  muchLargerThanCapitalized: {
    value: 'Much larger than'
  },
  twiceTheSizeOfCapitalized: {
    value: 'Twice the size of'
  },
  muchMuchLargerThanCapitalized: {
    value: 'Much much larger than'
  },

  // relative densities
  notDenseComparedTo: {
    value: 'not dense compared to'
  },
  halfAsDenseAs: {
    value: 'half as dense as'
  },
  muchLessDenseThan: {
    value: 'much less dense than'
  },
  lessDenseButComparableTo: {
    value: 'less dense but comparable to'
  },
  asDenseAs: {
    value: 'as dense as'
  },
  denseButComparableTo: {
    value: 'denser but comparable to'
  },
  muchDenseThan: {
    value: 'much denser than'
  },
  twiceAsDenseAs: {
    value: 'twice as dense as'
  },
  extremelyDenseComparedTo: {
    value: 'extremely dense compared to'
  },

  // relative densities capitalized
  notDenseComparedToCapitalized: {
    value: 'Not dense compared to'
  },
  halfAsDenseAsCapitalized: {
    value: 'Half as dense as'
  },
  muchLessDenseThanCapitalized: {
    value: 'Much less dense than'
  },
  lessDenseButComparableToCapitalized: {
    value: 'Less dense but comparable to'
  },
  asDenseAsCapitalized: {
    value: 'As dense as'
  },
  denseButComparableToCapitalized: {
    value: 'Denser but comparable to'
  },
  muchDenseThanCapitalized: {
    value: 'Much denser than'
  },
  twiceAsDenseAsCapitalized: {
    value: 'Twice as dense as'
  },
  extremelyDenseComparedToCapitalized: {
    value: 'Extremely dense compared to'
  },

  massGetsSmaller: {
    value: 'mass gets smaller'
  },
  massGetsBigger: {
    value: 'mass gets bigger'
  },
  densityIncreases: {
    value: 'density increases'
  },
  densityDecreases: {
    value: 'density decreases'
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
    value: 'Change density of spheres in kilograms per unit volume.'
  },
  constantSizeCheckboxHelpText: {
    value: 'Keep size of spheres constant while changing mass.'
  },
  constantRadiusThinkDensityPattern: {
    value: '{{mass1}} and {{mass2}} set to same size.'
  },
  massMaxMinBorderText: {
    value: '{{relativeSize}} {{otherObjectLabel}}, {{forceVectorSize}}, forces {{force}} {{unit}}.'
  },

  /************************************
   Keyboard Help Content
   ************************************/

  moveSphereDescription: {
    value: 'Move sphere left and right with Left and Right Arrow keys.'
  },
  moveInSmallerStepsDescription: {
    value: 'Move in smaller steps with Shift plus Left and Right Arrow keys.'
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
  changeMassPDOM: {
    value: 'Change mass with Left and Right Arrow keys.'
  },
  changeMassBasicsPDOM: {
    value: 'Change mass with Up and Down Arrow keys.'
  },
  changeMassInLargerStepsDescription: {
    value: 'Change mass in larger steps with Page Up and Page Down keys.'
  },
  changeMassInSmallerStepsDescription: {
    value: 'Change mass in smaller steps with Shift plus Left and Right Arrow keys.'
  },
  jumpToMaximumMassDescription: {
    value: 'Jump to maximum mass with End key.'
  },
  jumpToMinimumMassDescription: {
    value: 'Jump to minimum mass with Home key.'
  },
  moveGrabbedRulerPDOM: {
    value: 'Move grabbed ruler up, left, down, or right with Arrow keys, or with letter keys W, A, S, or D.'
  },
  moveInSmallerStepsPDOM: {
    value: 'Move in smaller steps with Shift plus Arrow keys, or Shift plus letter keys W, A, S, or D.'
  },
  jumpStartOfSpherePDOM: {
    value: 'Jump start of ruler to center of m1 sphere with J plus C.'
  },
  jumpHomePDOM: {
    value: 'Jump and release ruler to home position with J plus H.'
  },

  ///////////
  // Ruler //
  ///////////

  regionAndDistancePattern: {
    value: '{{verticalRegion}} {{centersApart}}'
  },
  releaseAndExploreHint: {
    value: 'Release ruler to explore position and mass of spheres.'
  },
  grabbedAlertPattern: {
    value: 'Grabbed. {{regionAndDistance}} {{supplementalHint}}'
  },
  hintPattern: {
    value: '{{playHint}} {{releaseHint}}'
  },
  grabbedJumpKeyboardHint: {
    value: 'Hold J plus C keys to jump ruler to center of m1.'
  },
  jumpCenterKeyboardHint: {
    value: 'Hold J plus H keys to release ruler in home position.'
  },
  gestureHint: {
    value: 'Drag finger to move ruler. Lift to release.'
  },
  keyboardReleaseHint: {
    value: 'Space to release.'
  },
  centersApartPattern: {
    value: 'Centers of spheres {{distanceAndUnits}} apart.'
  },
  jumpCenterMassAlert: {
    value: 'Ruler zero mark at center of {{object1}}. {{centersApart}} {{supplementalHint}}'
  },

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