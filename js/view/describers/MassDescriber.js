// Copyright 2019-2020, University of Colorado Boulder

/**
 * Responsible for logic associated with the formation of audio description strings related to the mass of the
 * ISLCObjects.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 * @author Michael Barlow (PhET Interactive Simulations)
 */

import Utils from '../../../../dot/js/Utils.js';
import ISLCA11yStrings from '../../../../inverse-square-law-common/js/ISLCA11yStrings.js';
import ISLCDescriber from '../../../../inverse-square-law-common/js/view/describers/ISLCDescriber.js';
import ISLCObjectEnum from '../../../../inverse-square-law-common/js/view/ISLCObjectEnum.js';
import merge from '../../../../phet-core/js/merge.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import gravityForceLab from '../../gravityForceLab.js';
import gravityForceLabStrings from '../../gravity-force-lab-strings.js';

const mass1AbbreviatedString = gravityForceLabStrings.mass1Abbreviated;
const mass2AbbreviatedString = gravityForceLabStrings.mass2Abbreviated;

// a11y strings
const valuePatternString = ISLCA11yStrings.valuePattern.value;
const massValuesAndComparisonSummaryPatternString = gravityForceLabStrings.a11y.screenSummary.massValuesAndComparisonSummaryPattern;
const massAndUnitPatternString = gravityForceLabStrings.a11y.qualitative.massAndUnitPattern;
const objectsRelativeSizePatternString = gravityForceLabStrings.a11y.qualitative.objectsRelativeSizePattern;
const massMaxMinBorderTextString = gravityForceLabStrings.a11y.controls.massMaxMinBorderText;

// size
const tinyString = ISLCA11yStrings.tiny.value;
const verySmallString = ISLCA11yStrings.verySmall.value;
const smallString = ISLCA11yStrings.small.value;
const mediumSizeString = ISLCA11yStrings.mediumSize.value;
const largeString = ISLCA11yStrings.large.value;
const veryLargeString = ISLCA11yStrings.veryLarge.value;
const hugeString = ISLCA11yStrings.huge.value;

// relative size
const muchMuchSmallerThanString = gravityForceLabStrings.a11y.relativeMassSize.muchMuchSmallerThan;
const halfTheSizeOfString = gravityForceLabStrings.a11y.relativeMassSize.halfTheSizeOf;
const muchSmallerThanString = gravityForceLabStrings.a11y.relativeMassSize.muchSmallerThan;
const smallerButComparableToString = gravityForceLabStrings.a11y.relativeMassSize.smallerButComparableTo;
const comparableToString = gravityForceLabStrings.a11y.relativeMassSize.sameSizeAs;
const largerButComparableToString = gravityForceLabStrings.a11y.relativeMassSize.largerButComparableTo;
const muchLargerThanString = gravityForceLabStrings.a11y.relativeMassSize.muchLargerThan;
const twiceTheSizeOfString = gravityForceLabStrings.a11y.relativeMassSize.twiceTheSizeOf;
const muchMuchLargerThanString = gravityForceLabStrings.a11y.relativeMassSize.muchMuchLargerThan;

// relative size capitalized
const muchMuchSmallerThanCapitalizedString = gravityForceLabStrings.a11y.relativeMassSizeCapitalized.muchMuchSmallerThan;
const halfTheSizeOfCapitalizedString = gravityForceLabStrings.a11y.relativeMassSizeCapitalized.halfTheSizeOf;
const muchSmallerThanCapitalizedString = gravityForceLabStrings.a11y.relativeMassSizeCapitalized.muchSmallerThan;
const smallerButComparableToCapitalizedString = gravityForceLabStrings.a11y.relativeMassSizeCapitalized.smallerButComparableTo;
const comparableToCapitalizedString = gravityForceLabStrings.a11y.relativeMassSizeCapitalized.sameSizeAs;
const largerButComparableToCapitalizedString = gravityForceLabStrings.a11y.relativeMassSizeCapitalized.largerButComparableTo;
const muchLargerThanCapitalizedString = gravityForceLabStrings.a11y.relativeMassSizeCapitalized.muchLargerThan;
const twiceTheSizeOfCapitalizedString = gravityForceLabStrings.a11y.relativeMassSizeCapitalized.twiceTheSizeOf;
const muchMuchLargerThanCapitalizedString = gravityForceLabStrings.a11y.relativeMassSizeCapitalized.muchMuchLargerThan;

// relative density
const notDenseComparedToString = gravityForceLabStrings.a11y.relativeMassDensity.notDenseComparedTo;
const halfAsDenseAsString = gravityForceLabStrings.a11y.relativeMassDensity.halfAsDenseAs;
const muchLessDenseThanString = gravityForceLabStrings.a11y.relativeMassDensity.muchLessDenseThan;
const lessDenseButComparableToString = gravityForceLabStrings.a11y.relativeMassDensity.lessDenseButComparableTo;
const asDenseAsString = gravityForceLabStrings.a11y.relativeMassDensity.asDenseAs;
const denseButComparableToString = gravityForceLabStrings.a11y.relativeMassDensity.denseButComparableTo;
const muchDenseThanString = gravityForceLabStrings.a11y.relativeMassDensity.muchDenseThan;
const twiceAsDenseAsString = gravityForceLabStrings.a11y.relativeMassDensity.twiceAsDenseAs;
const extremelyDenseComparedToString = gravityForceLabStrings.a11y.relativeMassDensity.extremelyDenseComparedTo;

// relative density capitalized
const notDenseComparedToCapitalizedString = gravityForceLabStrings.a11y.relativeMassDensityCapitalized.notDenseComparedTo;
const halfAsDenseAsCapitalizedString = gravityForceLabStrings.a11y.relativeMassDensityCapitalized.halfAsDenseAs;
const muchLessDenseThanCapitalizedString = gravityForceLabStrings.a11y.relativeMassDensityCapitalized.muchLessDenseThan;
const lessDenseButComparableToCapitalizedString = gravityForceLabStrings.a11y.relativeMassDensityCapitalized.lessDenseButComparableTo;
const asDenseAsCapitalizedString = gravityForceLabStrings.a11y.relativeMassDensityCapitalized.asDenseAs;
const denseButComparableToCapitalizedString = gravityForceLabStrings.a11y.relativeMassDensityCapitalized.denseButComparableTo;
const muchDenseThanCapitalizedString = gravityForceLabStrings.a11y.relativeMassDensityCapitalized.muchDenseThan;
const twiceAsDenseAsCapitalizedString = gravityForceLabStrings.a11y.relativeMassDensityCapitalized.twiceAsDenseAs;
const extremelyDenseComparedToCapitalizedString = gravityForceLabStrings.a11y.relativeMassDensityCapitalized.extremelyDenseComparedTo;

const massChangeClausePatternString = gravityForceLabStrings.a11y.qualitative.massChangeClausePattern;
const massChangesAndMovesClausePatternString = gravityForceLabStrings.a11y.qualitative.massChangesAndMovesClausePattern;
const massChangesMovesOtherClausePatternString = gravityForceLabStrings.a11y.qualitative.massChangesMovesOtherClausePattern;
const massGetsBiggerString = gravityForceLabStrings.a11y.propertyChange.massGetsBigger;
const massGetsSmallerString = gravityForceLabStrings.a11y.propertyChange.massGetsSmaller;
const densityIncreasesString = gravityForceLabStrings.a11y.propertyChange.densityIncreases;
const densityDecreasesString = gravityForceLabStrings.a11y.propertyChange.densityDecreases;
const leftString = ISLCA11yStrings.left.value;
const rightString = ISLCA11yStrings.right.value;

// constants
const SIZE_STRINGS = [
  tinyString,
  verySmallString,
  smallString,
  mediumSizeString,
  largeString,
  veryLargeString,
  hugeString
];

const RELATIVE_SIZE_STRINGS = [
  muchMuchSmallerThanString,
  halfTheSizeOfString,
  muchSmallerThanString,
  smallerButComparableToString,
  comparableToString,
  largerButComparableToString,
  muchLargerThanString,
  twiceTheSizeOfString,
  muchMuchLargerThanString
];
const RELATIVE_DENSITY_STRINGS = [
  notDenseComparedToString,
  halfAsDenseAsString,
  muchLessDenseThanString,
  lessDenseButComparableToString,
  asDenseAsString,
  denseButComparableToString,
  muchDenseThanString,
  twiceAsDenseAsString,
  extremelyDenseComparedToString
];
const RELATIVE_SIZE_CAPITALIZED_STRINGS = [
  muchMuchSmallerThanCapitalizedString,
  halfTheSizeOfCapitalizedString,
  muchSmallerThanCapitalizedString,
  smallerButComparableToCapitalizedString,
  comparableToCapitalizedString,
  largerButComparableToCapitalizedString,
  muchLargerThanCapitalizedString,
  twiceTheSizeOfCapitalizedString,
  muchMuchLargerThanCapitalizedString
];
const RELATIVE_DENSITY_CAPITALIZED_STRINGS = [
  notDenseComparedToCapitalizedString,
  halfAsDenseAsCapitalizedString,
  muchLessDenseThanCapitalizedString,
  lessDenseButComparableToCapitalizedString,
  asDenseAsCapitalizedString,
  denseButComparableToCapitalizedString,
  muchDenseThanCapitalizedString,
  twiceAsDenseAsCapitalizedString,
  extremelyDenseComparedToCapitalizedString
];
assert && assert( RELATIVE_DENSITY_STRINGS.length === RELATIVE_SIZE_STRINGS.length, 'same number of strings expected' );

const { OBJECT_ONE } = ISLCObjectEnum;

class MassDescriber extends ISLCDescriber {

  /**
   * @param {GravityForceLabModel} model
   * @param {ForceDescriber} forceDescriber
   * @param {Object} [options]
   */
  constructor( model, forceDescriber, options ) {
    options = merge( {
      object1Label: mass1AbbreviatedString,
      object2Label: mass2AbbreviatedString,

      // number -> number
      convertMassValue: mass => mass,

      // number -> string
      formatMassValue: mass => StringUtils.fillIn( valuePatternString, { value: mass } )
    }, options );

    super( model, options.object1Label, options.object2Label );

    // @private
    this.forceDescriber = forceDescriber;
    this.mass1Growing = false;
    this.mass2Growing = false;
    this.convertMassValue = options.convertMassValue;
    this.formatMassValue = options.formatMassValue;
    this.constantRadiusProperty = model.constantRadiusProperty;

    model.object1.valueProperty.link( ( newMass, oldMass ) => {
      this.mass1Growing = ( newMass - oldMass ) > 0;
    } );

    model.object2.valueProperty.link( ( newMass, oldMass ) => {
      this.mass2Growing = ( newMass - oldMass ) > 0;
    } );
  }

  /**
   * summary bullet for mass comparison in the screen summary
   * @returns {string}
   * @public
   */
  getMassValuesSummaryText() {
    const relativeSize = this.getRelativeSizeOrDensity( OBJECT_ONE );

    return StringUtils.fillIn( massValuesAndComparisonSummaryPatternString, {
      mass1Label: this.object1Label,
      mass2Label: this.object2Label,
      m1Mass: this.getFormattedMass( this.object1.valueProperty.get() ),
      m2Mass: this.getFormattedMass( this.object2.valueProperty.get() ),
      comparativeValue: relativeSize
    } );
  }

  /**
   * Helper function, hard coded from the first object's perspective
   * @returns {string}
   * @public
   */
  getM1RelativeSize() {
    const relativeSize = this.getRelativeSizeOrDensity( OBJECT_ONE );
    const firstObjectLabel = this.getObjectLabelFromEnum( OBJECT_ONE );
    const secondObjectLabel = this.getOtherObjectLabelFromEnum( OBJECT_ONE );
    return StringUtils.fillIn( objectsRelativeSizePatternString, {
      firstObjectLabel: firstObjectLabel,
      relativeSize: relativeSize,
      secondObjectLabel: secondObjectLabel
    } );
  }

  /**
   * See options.formatMassValue
   * @param {number} mass
   * @returns {string}
   * @public
   */
  getFormattedMass( mass ) {
    return this.formatMassValue( this.convertMassValue( mass ) );
  }

  /**
   * @param {number} massValue
   * @returns {string}
   * @public
   */
  getMassSize( massValue ) {
    const massIndex = getMassSizeIndex( massValue, SIZE_STRINGS.length );
    assert && assert( Utils.isInteger( massIndex ) && massIndex < SIZE_STRINGS.length, 'wrong index for size strings' );
    return SIZE_STRINGS[ massIndex ];
  }

  /**
   * @param {ISLCObjectEnum} objectEnum
   * @returns {string}
   * @public
   */
  getMassAndUnit( objectEnum ) {
    const thisObjectMass = this.getObjectFromEnum( objectEnum ).valueProperty.get();
    const massValue = this.getFormattedMass( thisObjectMass );
    return StringUtils.fillIn( massAndUnitPatternString, { massValue: massValue } );
  }

  /**
   * Returns the string 'As mass gets bigger/smaller' for use in larger string patterns.
   * If the radii are set to constant size, then use "density increasing/decreasing" terminology instead
   *
   * @param  {ISLCObjectEnum} thisObjectEnum
   * @returns {string}
   * @public
   */
  getMassOrDensityChangeClause( thisObjectEnum ) {
    const changeDirectionPhrase = this.getMassOrDensityChangeDirectionPhrase( thisObjectEnum );
    return StringUtils.fillIn( massChangeClausePatternString, { changeDirectionPhrase: changeDirectionPhrase } );
  }

  /**
   * Returns the string 'As mass gets bigger/smaller and moves left/right' for use in larger string patterns.
   * If the radii are set to constant size, then use "density increasing/decreasing" terminology instead
   *
   * @param  {ISLCObjectEnum} thisObjectEnum
   * @returns {string}
   * @public
   */
  getMassChangesAndMovesClause( thisObjectEnum ) {
    const changeDirectionPhrase = this.getMassOrDensityChangeDirectionPhrase( thisObjectEnum );
    const leftOrRight = getPushDirection( thisObjectEnum );
    return StringUtils.fillIn( massChangesAndMovesClausePatternString, {
      changeDirectionPhrase: changeDirectionPhrase,
      leftOrRight: leftOrRight
    } );
  }

  /**
   * Returns the string 'As mass gets bigger/smaller and moves {{otherObjectLabel}} left/right' for use in larger string patterns.
   * If the radii are set to constant size, then use "density increasing/decreasing" terminology instead
   *
   * @param  {ISLCObjectEnum} thisObjectEnum
   * @returns {string}
   * @public
   */
  getMassChangesAndMovesOtherClause( thisObjectEnum ) {
    const changeDirectionPhrase = this.getMassOrDensityChangeDirectionPhrase( thisObjectEnum );
    const otherObjectLabel = this.getOtherObjectLabelFromEnum( thisObjectEnum );
    const leftOrRight = getPushDirection( ISLCObjectEnum.getOtherObjectEnum( thisObjectEnum ) );
    return StringUtils.fillIn( massChangesMovesOtherClausePatternString, {
      changeDirectionPhrase: changeDirectionPhrase,
      otherObjectLabel: otherObjectLabel,
      leftOrRight: leftOrRight
    } );
  }

  /**
   * Returns 'mass gets bigger/smaller' based on the most recent change to the passed-in mass.
   * If the radii are set to constant size, then use "density increasing/decreasing" terminology instead
   *
   * @param  {ISLCObjectEnum} objectEnum
   * @returns {string}
   * @private
   */
  getMassOrDensityChangeDirectionPhrase( objectEnum ) {
    const isGrowing = ISLCObjectEnum.isObject1( objectEnum ) ? this.mass1Growing : this.mass2Growing;

    let directionPhrase = isGrowing ? massGetsBiggerString : massGetsSmallerString;

    // specific density related verbage 
    if ( this.constantRadiusProperty.get() ) {
      directionPhrase = isGrowing ? densityIncreasesString : densityDecreasesString;
    }
    return directionPhrase;
  }

  /**
   * @param {ISLCObjectEnum} thisObjectEnum
   * @param {boolean} capitalized
   * @returns {string}
   * @public
   */
  getRelativeSizeOrDensity( thisObjectEnum, capitalized = false ) {
    const thisObject = this.getObjectFromEnum( thisObjectEnum );
    const otherObject = this.getOtherObjectFromEnum( thisObjectEnum );
    const ratio = thisObject.valueProperty.value / otherObject.valueProperty.value;
    const index = getRelativeSizeOrDensityIndex( ratio );

    // use size or density depending on if constant checkbox is checked.
    return this.constantRadiusProperty.get() ? getRelativeDensityFromIndex( index, capitalized ) : getRelativeSizeFromIndex( index, capitalized );
  }

  /**
   * @public
   * @param {ISLCObjectEnum} thisObjectEnum
   * @returns {string}
   */
  getMassMaxMinText( thisObjectEnum ) {
    return StringUtils.fillIn( massMaxMinBorderTextString, {
      relativeSize: this.getRelativeSizeOrDensity( thisObjectEnum, true ),
      otherObjectLabel: this.getOtherObjectLabelFromEnum( thisObjectEnum ),
      forceVectorSize: this.forceDescriber.getForceVectorsSize(),
      force: this.forceDescriber.getFormattedForce(),
      unit: this.forceDescriber.units
    } );
  }
}

/**
 * Each object can only be pushed in one direction. Returns 'left' or 'right' based on the object passed in.
 * @param  {ISLCObjectEnum} objectEnum
 * @returns {string}
 */
const getPushDirection = objectEnum => ISLCObjectEnum.isObject1( objectEnum ) ? leftString : rightString;

/**
 * @param {number} index - should be an index
 * @param {boolean} capitalized - if the phrase should be capitalized
 * @returns {string}
 */
const getRelativeSizeFromIndex = ( index, capitalized ) => {
  const array = capitalized ? RELATIVE_SIZE_CAPITALIZED_STRINGS : RELATIVE_SIZE_STRINGS;
  assert && assert( Utils.isInteger( index ) && index < array.length );
  return array[ index ];
};

/**
 * @param {number} index - should be an index
 * @param {boolean} capitalized - if the phrase should be capitalized
 * @returns {string}
 */
const getRelativeDensityFromIndex = ( index, capitalized ) => {
  const array = capitalized ? RELATIVE_DENSITY_CAPITALIZED_STRINGS : RELATIVE_DENSITY_STRINGS;
  assert && assert( Utils.isInteger( index ) && index < array.length );
  return array[ index ];
};

/**
 * Returns the mapped integer corresponding to the appropriate qualitative size/density comparison between masses.
 * There are the same number of size strings as density strings
 * These empirically determined values were designed, see https://docs.google.com/document/d/1-37qAgde2XrlXBQae2SgjartM35_EnzDD9pdtd3nXAM/edit#heading=h.nhqxjbby3dgu
 *
 * @param  {number} ratio
 * @returns {number} - an integer
 */
const getRelativeSizeOrDensityIndex = ratio => {
  assert && assert( ratio > 0, 'ratio less than or equal to zero?' );

  if ( ratio < .5 ) {
    return 0;
  }
  if ( ratio === .5 ) {
    return 1;
  }
  if ( ratio < .75 ) {
    return 2;
  }
  if ( ratio < 1 ) {
    return 3;
  }
  if ( ratio === 1 ) {
    return 4;
  }
  if ( ratio < 1.5 ) {
    return 5;
  }
  if ( ratio < 2 ) {
    return 6;
  }
  if ( ratio === 2 ) {
    return 7;
  }
  if ( ratio > 2 ) {
    return 8;
  }

  assert && assert( false, `unrecognized ratio: ${ratio}` );
};

/**
 * These empirically determined values were designed, see https://docs.google.com/document/d/1-37qAgde2XrlXBQae2SgjartM35_EnzDD9pdtd3nXAM/edit#heading=h.nhqxjbby3dgu
 * @param {number} mass - given the mass of the object.
 * @param {number} numberOfRegions - for cross checking
 * @returns {number} - integer array index
 */
const getMassSizeIndex = ( mass, numberOfRegions ) => {
  assert && assert( ( typeof mass ) === 'number' );

  assert && assert( numberOfRegions === 7, 'If numberOfRegions changes, this function should too.' );
  if ( mass < 26 ) {
    return 0;
  }
  if ( mass < 101 ) {
    return 1;
  }
  if ( mass < 401 ) {
    return 2;
  }
  if ( mass < 601 ) {
    return 3;
  }
  if ( mass < 801 ) {
    return 4;
  }
  if ( mass < 901 ) {
    return 5;
  }
  if ( mass <= 1000 ) {
    return 6;
  }
  assert && assert( false, 'Invalid mass value.' );
};

gravityForceLab.register( 'MassDescriber', MassDescriber );
export default MassDescriber;