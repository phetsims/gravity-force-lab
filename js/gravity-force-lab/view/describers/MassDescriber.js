// Copyright 2018, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const ISLCA11yStrings = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCA11yStrings' );
  const ISLCObjectEnum = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectEnum' );
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const GravityForceLabA11yStrings = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabA11yStrings' );
  const LinearFunction = require( 'DOT/LinearFunction' );
  const Property = require( 'AXON/Property' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Util = require( 'DOT/Util' );
  const ISLCDescriber = require( 'INVERSE_SQUARE_LAW_COMMON/view/describers/ISLCDescriber' );

  // strings
  const mass1AbbreviatedString = require( 'string!GRAVITY_FORCE_LAB/mass1Abbreviated' );
  const mass2AbbreviatedString = require( 'string!GRAVITY_FORCE_LAB/mass2Abbreviated' );

  // a11y strings
  const valuePatternString = ISLCA11yStrings.valuePattern.value;

  const massValuesAndComparisonSummaryPatternString = GravityForceLabA11yStrings.massValuesAndComparisonSummaryPattern.value;
  const massValueRelativeSizePatternString = GravityForceLabA11yStrings.massValueRelativeSizePattern.value;
  const massAndUnitPatternString = GravityForceLabA11yStrings.massAndUnitPattern.value;

  const tinyString = ISLCA11yStrings.tiny.value;
  const verySmallString = ISLCA11yStrings.verySmall.value;
  const smallString = ISLCA11yStrings.small.value;
  const mediumSizeString = ISLCA11yStrings.mediumSize.value;
  const largeString = ISLCA11yStrings.large.value;
  const veryLargeString = ISLCA11yStrings.veryLarge.value;
  const hugeString = ISLCA11yStrings.huge.value;

  const objectsRelativeSizePatternString = GravityForceLabA11yStrings.objectsRelativeSizePattern.value;
  const muchMuchSmallerThanString = GravityForceLabA11yStrings.muchMuchSmallerThan.value;
  const muchSmallerThanString = GravityForceLabA11yStrings.muchSmallerThan.value;
  const slightlySmallerThanString = GravityForceLabA11yStrings.slightlySmallerThan.value;
  const comparableToString = GravityForceLabA11yStrings.comparableTo.value;
  const somewhatLargerThanString = GravityForceLabA11yStrings.somewhatLargerThan.value;
  const muchLargerThanString = GravityForceLabA11yStrings.muchLargerThan.value;
  const muchMuchLargerThanString = GravityForceLabA11yStrings.muchMuchLargerThan.value;

  const massChangeClausePatternString = GravityForceLabA11yStrings.massChangeClausePattern.value;
  const massChangesAndMovesClausePatternString = GravityForceLabA11yStrings.massChangesAndMovesClausePattern.value;
  const massChangesMovesOtherClausePatternString = GravityForceLabA11yStrings.massChangesMovesOtherClausePattern.value;
  const getsBiggerString = GravityForceLabA11yStrings.getsBigger.value;
  const getsSmallerString = GravityForceLabA11yStrings.getsSmaller.value;
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
    muchSmallerThanString,
    slightlySmallerThanString,
    comparableToString,
    somewhatLargerThanString,
    muchLargerThanString,
    muchMuchLargerThanString
  ];

  const { OBJECT_ONE } = ISLCObjectEnum;
  const radiusDifferenceToIndex = new LinearFunction( -0.6, 0.6, 0, 6, true );

  /*
   * should be similar to the node describer and set various properties, in fact, since mass is quite specific to each
   * object, I think it's pertinent to roll them all into one.
   */
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

      this.radiusDifference = 0;
      this.mass1Growing = false;
      this.mass2Growing = false;
      this.convertMassValue = options.convertMassValue;
      this.formatMassValue = options.formatMassValue;

      Property.multilink(
        [ this.object1.radiusProperty, this.object2.radiusProperty ],
        ( r1, r2 ) => { this.radiusDifference = r1 - r2; } );

      model.object1.valueProperty.link( ( newMass, oldMass ) => {
        this.mass1Growing = ( newMass - oldMass ) > 0;
      } );

      model.object2.valueProperty.link( ( newMass, oldMass ) => {
        this.mass2Growing = ( newMass - oldMass ) > 0;
      } );
    }

    getMassValuesSummaryText() {
      const relativeSizeIndex = Util.roundSymmetric( this.getRelativeSizeIndex( this.radiusDifference ) );

      const fillObject = {
        mass1Label: this.object1Label,
        mass2Label: this.object2Label,
        m1Mass: this.getFormattedMass( this.object1.valueProperty.get() ),
        m2Mass: this.getFormattedMass( this.object2.valueProperty.get() ),
        comparitiveValue: RELATIVE_SIZE_STRINGS[ relativeSizeIndex ]
      };
      return StringUtils.fillIn( massValuesAndComparisonSummaryPatternString, fillObject );
    }

    getM1RelativeSize() {
      return this.getMassRelativeSizeToOther( OBJECT_ONE );
    }

    getMassRelativeSizeToOther( objectEnum ) {
      const comparitiveValue = this.getMassRelativeSize( objectEnum );
      const firstObjectLabel = this.getObjectLabelFromEnum( objectEnum );
      const secondObjectLabel = this.getOtherObjectLabelFromEnum( objectEnum );
      return StringUtils.fillIn( objectsRelativeSizePatternString, {
        firstObjectLabel: firstObjectLabel,
        comparitiveValue: comparitiveValue,
        secondObjectLabel: secondObjectLabel
      } );
    }

    getMassRelativeSize( objectEnum ) {
      const multiplier = objectEnum === OBJECT_ONE ? 1 : -1;
      const difference = this.radiusDifference * multiplier;
      const index = this.getRelativeSizeIndex( difference );
      return this.getRelativeSizeFromIndex( index );
    }

    /**
     * See options.formatMassValue
     * @param {number} mass
     * @returns {string}
     */
    getFormattedMass( mass ) {
      return this.formatMassValue( this.convertMassValue( mass ) );
    }

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
     *
     * @param  {ISLCObjectEnum} thisObjectEnum
     * @returns {string}
     */
    getMassChangeClause( thisObjectEnum ) {
      const changeDirection = this.getMassChangeDirection( thisObjectEnum );
      return StringUtils.fillIn( massChangeClausePatternString, { changeDirection: changeDirection } );
    }

    /**
     * Returns the string 'As mass gets bigger/smaller and moves left/right' for use in larger string patterns.
     *
     * @param  {ISLCObjectEnum} thisObjectEnum
     * @returns {string}
     */
    getMassChangesAndMovesClause( thisObjectEnum ) {
      const changeDirection = this.getMassChangeDirection( thisObjectEnum );
      const leftOrRight = this.getPushDirection( thisObjectEnum );
      return StringUtils.fillIn( massChangesAndMovesClausePatternString, { changeDirection: changeDirection, leftOrRight: leftOrRight } );
    }

    /**
     * Returns the string 'As mass gets bigger/smaller and moves {{otherObjectLabel}} left/right' for use in larger string patterns.
     *
     * @param  {ISLCObjectEnum} thisObjectEnum
     * @returns {string}
     */
    getMassChangesAndMovesOtherClause( thisObjectEnum ) {
      const changeDirection = this.getMassChangeDirection( thisObjectEnum );
      const otherObjectLabel = this.getOtherObjectLabelFromEnum( thisObjectEnum );
      const leftOrRight = this.getPushDirection( this.getOtherObjectEnum( thisObjectEnum ) );
      return StringUtils.fillIn( massChangesMovesOtherClausePatternString, {
        changeDirection: changeDirection,
        otherObjectLabel: otherObjectLabel,
        leftOrRight: leftOrRight
      } );
    }

    /**
     * Returns 'gets bigger/smaller' based on the most recent change to the passed-in mass.
     *
     * @param  {ISLCObjectEnum} objectEnum
     * @returns {string}
     */
    getMassChangeDirection( objectEnum ) {
      const isGrowing = objectEnum === OBJECT_ONE ? this.mass1Growing : this.mass2Growing;
      return isGrowing ? getsBiggerString : getsSmallerString;
    }

    /**
     * Each object can only be pushed in one direction. Returns 'left' or 'right' based on the object passed in.
     *
     * @param  {ISLCObjectEnum} pushedMassEnum
     * @returns {string}
     */
    getPushDirection( pushedMassEnum ) {
      return pushedMassEnum === OBJECT_ONE ? leftString : rightString;
    }

    getSizeFromIndex( index ) {
      return SIZE_STRINGS[ index ];
    }

    getRelativeSizeFromIndex( index ) {
      return RELATIVE_SIZE_STRINGS[ index ];
    }

    getRelativeSizeIndex( difference ) {
      return Util.roundSymmetric( radiusDifferenceToIndex( difference ) );
    }

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
      throw Error( 'Invalid mass value.' );
    }


    /**
     * Get the function that fills in the correct aria-valuetext for a given mass control slider
     * @param {ISLCObjectEnum} objectEnum
     * @returns {string} - function that, given mass inputs, returns the aria value text
     */
    getVerboseMassAriaValueText( objectEnum ) {
      const massAndUnit = this.getMassAndUnit( objectEnum );
      const relativeSize = this.getMassRelativeSize( objectEnum );
      const otherObjectLabel = this.getOtherObjectLabelFromEnum( objectEnum );
      return StringUtils.fillIn( massValueRelativeSizePatternString, {
        massAndUnit: massAndUnit,
        relativeSize: relativeSize,
        otherObjectLabel: otherObjectLabel
      } );
    }

    /**
     * Uses the singleton pattern to keep one instance of this describer for the entire lifetime of the sim.
     * @returns {ForceDescriber}
     */
    static getDescriber() {
      assert && assert( describer, 'describer has not yet been initialized' );
      return describer;
    }

    /**
     * Initialize the describer singleton
     * @throws Error
     */
    static initialize( newDescriber ) {
      assert && assert( describer === null, 'cannot call initialize more than once per ForceDescriber instance' );
      describer = newDescriber;
      return describer;
    }
  }

  return gravityForceLab.register( 'MassDescriber', MassDescriber );
} );