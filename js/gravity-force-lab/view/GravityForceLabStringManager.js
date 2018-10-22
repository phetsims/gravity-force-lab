// Copyright 2018, University of Colorado Boulder

/**
 * The string manager is responsible for any dynamic strings in the sim. Usually this is in the form of a string pattern
 * that takes on different values based on model properties. It is also useful when a description or alert is comprised
 * of a series of different complete phrases or sentences that must be concatenated in a dynamic fashion.
 *
 * @author Michael Barlow (PhET Interactive Simulations)
 */

define( require => {
  'use strict';

  // modules
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const GravityForceLabA11yStrings = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabA11yStrings' );
  const GravityForceLabConstants = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabConstants' );
  const ISLCStringManager = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCStringManager' );
  const LinearFunction = require( 'DOT/LinearFunction' );
  const Property = require( 'AXON/Property' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Util = require( 'DOT/Util' );

  // strings
  const micronewtonsString = GravityForceLabA11yStrings.micronewtons.value;
  const mass1AbbreviatedString = require( 'string!GRAVITY_FORCE_LAB/mass1Abbreviated' );
  const mass2AbbreviatedString = require( 'string!GRAVITY_FORCE_LAB/mass2Abbreviated' );

  const massValuesAndComparisonSummaryPatternString = GravityForceLabA11yStrings.massValuesAndComparisonSummaryPattern.value;

  const muchMuchSmallerThanString = GravityForceLabA11yStrings.muchMuchSmallerThan.value;
  const muchSmallerThanString = GravityForceLabA11yStrings.muchSmallerThan.value;
  const slightlySmallerThanString = GravityForceLabA11yStrings.slightlySmallerThan.value;
  const comparableToString = GravityForceLabA11yStrings.comparableTo.value;
  const somewhatLargerThanString = GravityForceLabA11yStrings.somewhatLargerThan.value;
  const muchLargerThanString = GravityForceLabA11yStrings.muchLargerThan.value;
  const muchMuchLargerThanString = GravityForceLabA11yStrings.muchMuchLargerThan.value;
  const RELATIVE_SIZE_STRINGS = [ muchMuchSmallerThanString, muchSmallerThanString, slightlySmallerThanString,
                                  comparableToString, somewhatLargerThanString, muchLargerThanString,
                                  muchMuchLargerThanString ];

  // constants
  const MICRO_CONVERSION_FACTOR = 1e6;
  const exponentToIndex = new LinearFunction( -1, 1, 0, 6 );
  const { min, max } = GravityForceLabConstants.PULL_FORCE_RANGE;
  const forceToPullIndex = new LinearFunction( min, max, 6, 0, true );

  class GravityForceLabStringManager extends ISLCStringManager {
    constructor( model ) {
      super( model, mass1AbbreviatedString, mass2AbbreviatedString, {
        valueUnits: micronewtonsString,
        valueUnitConversion: MICRO_CONVERSION_FACTOR
      } );

      // @private
      this._object1ToObject2Ratio = 0;
      this._object2ToObject1Ratio = 0;

      Property.multilink(
        [ model.object1.radiusProperty, model.object2.radiusProperty ],
        ( r1, r2 ) => {
          this._object1ToObject2Ratio = r1 / r2;
          this._object2ToObject1Ratio = 1 / this._object1ToObject2Ratio;
        }
      );
    }

    /////////////////////
    // Summary Strings //
    /////////////////////

    getMassValuesSummaryText() {
      const relativeSizeIndex = Util.roundSymmetric( this.getRelativeSizeIndex( this._object1ToObject2Ratio ) );
      const fillObject = {
        m1Mass: this.object1.valueProperty.get(),
        m2Mass: this.object2.valueProperty.get(),
        comparitiveValue: RELATIVE_SIZE_STRINGS[ relativeSizeIndex ]
      };
      return StringUtils.fillIn( massValuesAndComparisonSummaryPatternString, fillObject );
    }

    getRelativeSizeIndex( ratio ) {
      const exp = Math.log10( ratio );
      return Util.roundSymmetric( exponentToIndex( exp ) );
    }

    ///////////////
    // Overrides //
    ///////////////
    // see ISLCStringManager.js for more details

    // NOTE: these are pure functions, so it may be possible to pass them into the supertype constructor
    // as a config object

    getForceVectorIndex( force ) {
      const convertedForce = Math.abs( force ) * MICRO_CONVERSION_FACTOR;
      if ( convertedForce < 0.041713 ) {
        return 0;
      }
      if ( convertedForce < 0.074155 ) {
        return 1;
      }
      if ( convertedForce < 0.260698 ) {
        return 2;
      }
      if ( convertedForce < 0.789805 ) {
        return 3;
      }
      if ( convertedForce < 1.564182 ) {
        return 4;
      }
      if ( convertedForce < 2.309288 ) {
        return 5;
      }
      if ( convertedForce >= 2.309288 ) {
        return 6;
      }
      throw new Error( 'Invalid force value' );
    }

    // @override
    getDistanceIndex( distance ) {
      assert && assert( distance > 0, 'Distance between spheres should always be positive.' );

      if ( distance >= 8.8 ) {
        return 0;
      }
      if ( distance >= 7 ) {
        return 1;
      }
      if ( distance >= 5 ) {
        return 2;
      }
      if ( distance >= 3 ) {
        return 3;
      }
      if ( distance >= 1 ) {
        return 4;
      }
      if ( distance >= 0.6 ) {
        return 5;
      }
      if ( distance < 0.6 ) {
        return 6;
      }
      throw new Error( 'Invalid distance value' );
    }

    // @override
    getEffortIndex( force ) {
      return Util.roundSymmetric( forceToPullIndex( force ) );
    }
  }

  return gravityForceLab.register( 'GravityForceLabStringManager', GravityForceLabStringManager );
} );