// Copyright 2019, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const GravityForceLabA11yStrings = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabA11yStrings' );
  const ISLCA11yStrings = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCA11yStrings' );
  const ISLCDescriber = require( 'INVERSE_SQUARE_LAW_COMMON/view/describers/ISLCDescriber' );
  const ISLCObjectEnum = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectEnum' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Util = require( 'DOT/Util' );

  // strings
  const mass1AbbreviatedString = require( 'string!GRAVITY_FORCE_LAB/mass1Abbreviated' );
  const mass2AbbreviatedString = require( 'string!GRAVITY_FORCE_LAB/mass2Abbreviated' );

  // a11y strings
  const valuePatternString = ISLCA11yStrings.valuePattern.value;
  const massValuesAndComparisonSummaryPatternString = GravityForceLabA11yStrings.massValuesAndComparisonSummaryPattern.value;
  const massValueRelativeSizePatternString = GravityForceLabA11yStrings.massValueRelativeSizePattern.value;
  const massAndUnitPatternString = GravityForceLabA11yStrings.massAndUnitPattern.value;
  const objectsRelativeSizePatternString = GravityForceLabA11yStrings.objectsRelativeSizePattern.value;

  // size
  const tinyString = ISLCA11yStrings.tiny.value;
  const verySmallString = ISLCA11yStrings.verySmall.value;
  const smallString = ISLCA11yStrings.small.value;
  const mediumSizeString = ISLCA11yStrings.mediumSize.value;
  const largeString = ISLCA11yStrings.large.value;
  const veryLargeString = ISLCA11yStrings.veryLarge.value;
  const hugeString = ISLCA11yStrings.huge.value;

  // relative size
  const muchMuchSmallerThanString = GravityForceLabA11yStrings.muchMuchSmallerThan.value;
  const halfTheSizeOfString = GravityForceLabA11yStrings.halfTheSizeOf.value;
  const muchSmallerThanString = GravityForceLabA11yStrings.muchSmallerThan.value;
  const smallerButComparableToString = GravityForceLabA11yStrings.smallerButComparableTo.value;
  const comparableToString = GravityForceLabA11yStrings.sameSizeAs.value;
  const largerButComparableToString = GravityForceLabA11yStrings.largerButComparableTo.value;
  const muchLargerThanString = GravityForceLabA11yStrings.muchLargerThan.value;
  const twiceTheSizeOfString = GravityForceLabA11yStrings.twiceTheSizeOf.value;
  const muchMuchLargerThanString = GravityForceLabA11yStrings.muchMuchLargerThan.value;

  // relative density
  const notDenseComparedToString = GravityForceLabA11yStrings.notDenseComparedTo.value;
  const halfAsDenseAsString = GravityForceLabA11yStrings.halfAsDenseAs.value;
  const muchLessDenseThanString = GravityForceLabA11yStrings.muchLessDenseThan.value;
  const lessDenseButComparableToString = GravityForceLabA11yStrings.lessDenseButComparableTo.value;
  const asDenseAsString = GravityForceLabA11yStrings.asDenseAs.value;
  const denseButComparableToString = GravityForceLabA11yStrings.denseButComparableTo.value;
  const muchDenseThanString = GravityForceLabA11yStrings.muchDenseThan.value;
  const twiceAsDenseAsString = GravityForceLabA11yStrings.twiceAsDenseAs.value;
  const extremelyDenseComparedToString = GravityForceLabA11yStrings.extremelyDenseComparedTo.value;

  const massChangeClausePatternString = GravityForceLabA11yStrings.massChangeClausePattern.value;
  const massChangesAndMovesClausePatternString = GravityForceLabA11yStrings.massChangesAndMovesClausePattern.value;
  const massChangesMovesOtherClausePatternString = GravityForceLabA11yStrings.massChangesMovesOtherClausePattern.value;
  const massGetsBiggerString = GravityForceLabA11yStrings.massGetsBigger.value;
  const massGetsSmallerString = GravityForceLabA11yStrings.massGetsSmaller.value;
  const densityIncreasesString = GravityForceLabA11yStrings.densityIncreases.value;
  const densityDecreasesString = GravityForceLabA11yStrings.densityDecreases.value;
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

  assert && assert( RELATIVE_DENSITY_STRINGS.length === RELATIVE_SIZE_STRINGS.length, 'same number of strings expected' );

  const { OBJECT_ONE } = ISLCObjectEnum;

  // should be similar to the node describer and set various properties, in fact, since mass is quite specific to each
  // object, I think it's pertinent to roll them all into one.
  let describer = null;

  class MassDescriber extends ISLCDescriber {
    constructor( model, options ) {
      options = _.extend( {
        object1Label: mass1AbbreviatedString,
        object2Label: mass2AbbreviatedString,

        // number -> number
        convertMassValue: mass => mass,

        // number -> string
        formatMassValue: mass => StringUtils.fillIn( valuePatternString, { value: mass } )
      }, options );

      super( model, options.object1Label, options.object2Label );

      this.mass1Growing = false;
      this.mass2Growing = false;
      this.convertMassValue = options.convertMassValue;
      this.formatMassValue = options.formatMassValue;

      // @private
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
     */
    getM1RelativeSize() {
      return this.getMassRelativeSizeOrDensityToOther( OBJECT_ONE );
    }

    /**
     * @param {ISLCObjectEnum} objectEnum
     * @returns {string}
     */
    getMassRelativeSizeOrDensityToOther( objectEnum ) {
      const relativeSize = this.getRelativeSizeOrDensity( objectEnum );
      const firstObjectLabel = this.getObjectLabelFromEnum( objectEnum );
      const secondObjectLabel = this.getOtherObjectLabelFromEnum( objectEnum );
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
     */
    getFormattedMass( mass ) {
      return this.formatMassValue( this.convertMassValue( mass ) );
    }

    /**
     * @param {number} massValue
     * @returns {string}
     */
    getMassSize( massValue ) {
      const massIndex = this.getMassSizeIndex( massValue );
      return this.getSizeFromIndex( massIndex );
    }

    /**
     * @param {ISLCObjectEnum} objectEnum
     * @returns {string}
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
     */
    getMassChangesAndMovesClause( thisObjectEnum ) {

      const changeDirectionPhrase = this.getMassOrDensityChangeDirectionPhrase( thisObjectEnum );
      const leftOrRight = this.getPushDirection( thisObjectEnum );
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
     */
    getMassChangesAndMovesOtherClause( thisObjectEnum ) {
      const changeDirectionPhrase = this.getMassOrDensityChangeDirectionPhrase( thisObjectEnum );
      const otherObjectLabel = this.getOtherObjectLabelFromEnum( thisObjectEnum );
      const leftOrRight = this.getPushDirection( this.getOtherObjectEnum( thisObjectEnum ) );
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
     */
    getMassOrDensityChangeDirectionPhrase( objectEnum ) {
      const isGrowing = objectEnum === OBJECT_ONE ? this.mass1Growing : this.mass2Growing;

      let directionPhrase = isGrowing ? massGetsBiggerString : massGetsSmallerString;

      // specific density related verbage 
      if ( this.constantRadiusProperty.get() ) {
        directionPhrase = isGrowing ? densityIncreasesString : densityDecreasesString;
      }
      return directionPhrase;
    }

    /**
     * Each object can only be pushed in one direction. Returns 'left' or 'right' based on the object passed in.
     *
     * @param  {ISLCObjectEnum} objectEnum
     * @returns {string}
     */
    getPushDirection( objectEnum ) {
      return objectEnum === OBJECT_ONE ? leftString : rightString;
    }

    /**
     * @param {number} index - should be an index
     * @returns {string}
     */
    getSizeFromIndex( index ) {
      assert && assert( Util.isInteger( index ) && index < SIZE_STRINGS.length );
      return SIZE_STRINGS[ index ];
    }

    /**
     * @param {number} index - should be an index
     * @returns {string}
     */
    getRelativeSizeFromIndex( index ) {
      assert && assert( Util.isInteger( index ) && index < RELATIVE_SIZE_STRINGS.length );
      return RELATIVE_SIZE_STRINGS[ index ];
    }

    /**
     * @param {number} index - should be an index
     * @returns {string}
     */
    getRelativeDensityFromIndex( index ) {
      assert && assert( Util.isInteger( index ) && index < RELATIVE_DENSITY_STRINGS.length );
      return RELATIVE_DENSITY_STRINGS[ index ];
    }

    /**
     * @param {ISLCObjectEnum} thisObjectEnum
     * @returns {string}
     */
    getRelativeSizeOrDensity( thisObjectEnum ) {
      const thisObject = this.getObjectFromEnum( thisObjectEnum );
      const otherObject = this.getOtherObjectFromEnum( thisObjectEnum );
      const ratio = thisObject.valueProperty.value / otherObject.valueProperty.value;
      const index = this.getRelativeSizeOrDensityIndex( ratio );

      // use size or density depending on if constant checkbox is checked.
      return this.constantRadiusProperty.get() ? this.getRelativeDensityFromIndex( index ) : this.getRelativeSizeFromIndex( index );
    }


    /**
     * Get the function that fills in the correct aria-valuetext for a given mass control slider
     * @param {ISLCObjectEnum} objectEnum
     * @returns {string} - function that, given mass inputs, returns the aria value text
     */
    getVerboseMassAriaValueText( objectEnum ) {
      const massAndUnit = this.getMassAndUnit( objectEnum );
      const relativeSize = this.getRelativeSizeOrDensity( objectEnum );
      const otherObjectLabel = this.getOtherObjectLabelFromEnum( objectEnum );
      return StringUtils.fillIn( massValueRelativeSizePatternString, {
        massAndUnit: massAndUnit,
        relativeSize: relativeSize,
        otherObjectLabel: otherObjectLabel
      } );
    }

    /**
     * Returns the mapped integer corresponding to the appropriate qualitative size/density comparison between masses.
     * There are the same number of size strings as density strings
     * See https://github.com/phetsims/gravity-force-lab-basics/issues/96#issuecomment-469248664
     * @param  {number} ratio
     * @returns {number} - an integer
     */
    getRelativeSizeOrDensityIndex( ratio ) {
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
    }

    /**
     * @param {number} mass - given the mass of the object.
     * @returns {number}
     */
    getMassSizeIndex( mass ) {
      assert && assert( ( typeof mass ) === 'number' );
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
    }
  }

  return gravityForceLab.register( 'MassDescriber', MassDescriber );
} );