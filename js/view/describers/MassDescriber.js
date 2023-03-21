// Copyright 2019-2023, University of Colorado Boulder

/**
 * Responsible for logic associated with the formation of audio description strings related to the mass of the
 * ISLCObjects.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 * @author Michael Barlow (PhET Interactive Simulations)
 */

import InverseSquareLawCommonStrings from '../../../../inverse-square-law-common/js/InverseSquareLawCommonStrings.js';
import ISLCDescriber from '../../../../inverse-square-law-common/js/view/describers/ISLCDescriber.js';
import ISLCObjectEnum from '../../../../inverse-square-law-common/js/model/ISLCObjectEnum.js';
import merge from '../../../../phet-core/js/merge.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import gravityForceLab from '../../gravityForceLab.js';
import GravityForceLabStrings from '../../GravityForceLabStrings.js';

// constants
const mass1AbbreviatedString = GravityForceLabStrings.mass1Abbreviated;
const mass2AbbreviatedString = GravityForceLabStrings.mass2Abbreviated;

const valuePatternString = InverseSquareLawCommonStrings.a11y.valuePattern;
const massValuesAndComparisonSummaryPatternString = GravityForceLabStrings.a11y.screenSummary.massValuesAndComparisonSummaryPattern;
const massAndUnitPatternString = GravityForceLabStrings.a11y.qualitative.massAndUnitPattern;
const objectsRelativeSizePatternString = GravityForceLabStrings.a11y.qualitative.objectsRelativeSizePattern;
const massMaxMinBorderTextWithForceString = GravityForceLabStrings.a11y.controls.massMaxMinBorderTextWithForce;
const massMaxMinBorderTextWithoutForceString = GravityForceLabStrings.a11y.controls.massMaxMinBorderTextWithoutForce;

// size
const tinyString = InverseSquareLawCommonStrings.a11y.qualitative.tiny;
const verySmallString = InverseSquareLawCommonStrings.a11y.qualitative.verySmall;
const smallString = InverseSquareLawCommonStrings.a11y.qualitative.small;
const mediumSizeString = InverseSquareLawCommonStrings.a11y.qualitative.mediumSize;
const largeString = InverseSquareLawCommonStrings.a11y.qualitative.large;
const veryLargeString = InverseSquareLawCommonStrings.a11y.qualitative.veryLarge;
const hugeString = InverseSquareLawCommonStrings.a11y.qualitative.huge;

// relative size
const muchMuchSmallerThanString = GravityForceLabStrings.a11y.relativeMassSize.muchMuchSmallerThan;
const halfTheSizeOfString = GravityForceLabStrings.a11y.relativeMassSize.halfTheSizeOf;
const muchSmallerThanString = GravityForceLabStrings.a11y.relativeMassSize.muchSmallerThan;
const smallerButComparableToString = GravityForceLabStrings.a11y.relativeMassSize.smallerButComparableTo;
const comparableToString = GravityForceLabStrings.a11y.relativeMassSize.sameSizeAs;
const largerButComparableToString = GravityForceLabStrings.a11y.relativeMassSize.largerButComparableTo;
const muchLargerThanString = GravityForceLabStrings.a11y.relativeMassSize.muchLargerThan;
const twiceTheSizeOfString = GravityForceLabStrings.a11y.relativeMassSize.twiceTheSizeOf;
const muchMuchLargerThanString = GravityForceLabStrings.a11y.relativeMassSize.muchMuchLargerThan;

// relative size capitalized
const muchMuchSmallerThanCapitalizedString = GravityForceLabStrings.a11y.relativeMassSizeCapitalized.muchMuchSmallerThan;
const halfTheSizeOfCapitalizedString = GravityForceLabStrings.a11y.relativeMassSizeCapitalized.halfTheSizeOf;
const muchSmallerThanCapitalizedString = GravityForceLabStrings.a11y.relativeMassSizeCapitalized.muchSmallerThan;
const smallerButComparableToCapitalizedString = GravityForceLabStrings.a11y.relativeMassSizeCapitalized.smallerButComparableTo;
const comparableToCapitalizedString = GravityForceLabStrings.a11y.relativeMassSizeCapitalized.sameSizeAs;
const largerButComparableToCapitalizedString = GravityForceLabStrings.a11y.relativeMassSizeCapitalized.largerButComparableTo;
const muchLargerThanCapitalizedString = GravityForceLabStrings.a11y.relativeMassSizeCapitalized.muchLargerThan;
const twiceTheSizeOfCapitalizedString = GravityForceLabStrings.a11y.relativeMassSizeCapitalized.twiceTheSizeOf;
const muchMuchLargerThanCapitalizedString = GravityForceLabStrings.a11y.relativeMassSizeCapitalized.muchMuchLargerThan;

// relative density
const notDenseComparedToString = GravityForceLabStrings.a11y.relativeMassDensity.notDenseComparedTo;
const halfAsDenseAsString = GravityForceLabStrings.a11y.relativeMassDensity.halfAsDenseAs;
const muchLessDenseThanString = GravityForceLabStrings.a11y.relativeMassDensity.muchLessDenseThan;
const lessDenseButComparableToString = GravityForceLabStrings.a11y.relativeMassDensity.lessDenseButComparableTo;
const asDenseAsString = GravityForceLabStrings.a11y.relativeMassDensity.asDenseAs;
const denseButComparableToString = GravityForceLabStrings.a11y.relativeMassDensity.denseButComparableTo;
const muchDenseThanString = GravityForceLabStrings.a11y.relativeMassDensity.muchDenseThan;
const twiceAsDenseAsString = GravityForceLabStrings.a11y.relativeMassDensity.twiceAsDenseAs;
const extremelyDenseComparedToString = GravityForceLabStrings.a11y.relativeMassDensity.extremelyDenseComparedTo;

// relative density capitalized
const notDenseComparedToCapitalizedString = GravityForceLabStrings.a11y.relativeMassDensityCapitalized.notDenseComparedTo;
const halfAsDenseAsCapitalizedString = GravityForceLabStrings.a11y.relativeMassDensityCapitalized.halfAsDenseAs;
const muchLessDenseThanCapitalizedString = GravityForceLabStrings.a11y.relativeMassDensityCapitalized.muchLessDenseThan;
const lessDenseButComparableToCapitalizedString = GravityForceLabStrings.a11y.relativeMassDensityCapitalized.lessDenseButComparableTo;
const asDenseAsCapitalizedString = GravityForceLabStrings.a11y.relativeMassDensityCapitalized.asDenseAs;
const denseButComparableToCapitalizedString = GravityForceLabStrings.a11y.relativeMassDensityCapitalized.denseButComparableTo;
const muchDenseThanCapitalizedString = GravityForceLabStrings.a11y.relativeMassDensityCapitalized.muchDenseThan;
const twiceAsDenseAsCapitalizedString = GravityForceLabStrings.a11y.relativeMassDensityCapitalized.twiceAsDenseAs;
const extremelyDenseComparedToCapitalizedString = GravityForceLabStrings.a11y.relativeMassDensityCapitalized.extremelyDenseComparedTo;

const massChangeClausePatternString = GravityForceLabStrings.a11y.qualitative.massChangeClausePattern;
const massChangesAndMovesClausePatternString = GravityForceLabStrings.a11y.qualitative.massChangesAndMovesClausePattern;
const massChangesMovesOtherClausePatternString = GravityForceLabStrings.a11y.qualitative.massChangesMovesOtherClausePattern;
const massGetsBiggerString = GravityForceLabStrings.a11y.propertyChange.massGetsBigger;
const massGetsSmallerString = GravityForceLabStrings.a11y.propertyChange.massGetsSmaller;
const densityIncreasesString = GravityForceLabStrings.a11y.propertyChange.densityIncreases;
const densityDecreasesString = GravityForceLabStrings.a11y.propertyChange.densityDecreases;
const leftString = InverseSquareLawCommonStrings.a11y.qualitative.left;
const rightString = InverseSquareLawCommonStrings.a11y.qualitative.right;

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
    this.showForceValuesProperty = model.showForceValuesProperty;

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
    assert && assert( Number.isInteger( massIndex ) && massIndex < SIZE_STRINGS.length, 'wrong index for size strings' );
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
    const leftOrRight = this.getPushDirectionText( thisObjectEnum );
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
    const leftOrRight = this.getPushDirectionText( ISLCObjectEnum.getOtherObjectEnum( thisObjectEnum ) );
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
   * Get a description of the mass relative to the other mass, when a mass value is at its min or max
   * value. Certain information is excluded if that content is invisible:
   * Will return something like:
   *
   * "Half the size of mass 1, force arrows tiny, force arrows 8.3 newtons." OR
   * "Much much larger than mass 1, force arrows very small."
   *
   * @public
   *
   * @param {ISLCObjectEnum} thisObjectEnum
   * @returns {string}
   */
  getMassMaxMinText( thisObjectEnum ) {
    let descriptionString = '';

    const relativeSizeString = this.getRelativeSizeOrDensity( thisObjectEnum, true );
    const otherObjectLabelString = this.getOtherObjectLabelFromEnum( thisObjectEnum );
    const forceVectorSizeString = this.forceDescriber.getForceVectorsSize();

    if ( this.showForceValuesProperty.value ) {
      descriptionString = StringUtils.fillIn( massMaxMinBorderTextWithForceString, {
        relativeSize: relativeSizeString,
        otherObjectLabel: otherObjectLabelString,
        forceVectorSize: forceVectorSizeString,
        force: this.forceDescriber.getFormattedForce(),
        unit: this.forceDescriber.units
      } );
    }
    else {
      descriptionString = StringUtils.fillIn( massMaxMinBorderTextWithoutForceString, {
        relativeSize: relativeSizeString,
        otherObjectLabel: otherObjectLabelString,
        forceVectorSize: forceVectorSizeString
      } );
    }

    return descriptionString;
  }

  /**
   * Each object can only be pushed in one direction. Returns 'left' or 'right' based on the object passed in.
   * @public
   *
   * @param  {ISLCObjectEnum} objectEnum
   * @returns {string}
   */
  getPushDirectionText( objectEnum ) {
    return ISLCObjectEnum.isObject1( objectEnum ) ? leftString : rightString;
  }
}

/**
 * @param {number} index - should be an index
 * @param {boolean} capitalized - if the phrase should be capitalized
 * @returns {string}
 */
const getRelativeSizeFromIndex = ( index, capitalized ) => {
  const array = capitalized ? RELATIVE_SIZE_CAPITALIZED_STRINGS : RELATIVE_SIZE_STRINGS;
  assert && assert( Number.isInteger( index ) && index < array.length );
  return array[ index ];
};

/**
 * @param {number} index - should be an index
 * @param {boolean} capitalized - if the phrase should be capitalized
 * @returns {string}
 */
const getRelativeDensityFromIndex = ( index, capitalized ) => {
  const array = capitalized ? RELATIVE_DENSITY_CAPITALIZED_STRINGS : RELATIVE_DENSITY_STRINGS;
  assert && assert( Number.isInteger( index ) && index < array.length );
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

  if ( ratio < 0.5 ) {
    return 0;
  }
  if ( ratio === 0.5 ) {
    return 1;
  }
  if ( ratio < 0.75 ) {
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

  throw new Error( `unrecognized ratio: ${ratio}` );
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
  throw new Error( 'Invalid mass value.' );
};

gravityForceLab.register( 'MassDescriber', MassDescriber );
export default MassDescriber;