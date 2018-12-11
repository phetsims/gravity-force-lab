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
  const ISLCObjectEnum = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectEnum' );
  const ISLCStringManager = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCStringManager' );
  const LinearFunction = require( 'DOT/LinearFunction' );
  const Property = require( 'AXON/Property' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Util = require( 'DOT/Util' );

  // strings
  const micronewtonsString = GravityForceLabA11yStrings.micronewtons.value;
  const unitsNewtonsString = require( 'string!INVERSE_SQUARE_LAW_COMMON/units.newtons' );

  const massValuesAndComparisonSummaryPatternString = GravityForceLabA11yStrings.massValuesAndComparisonSummaryPattern.value;
  const sizeAndPositionPatternString = GravityForceLabA11yStrings.sizeAndPositionPattern.value;
  const valueUnitsPatternString = GravityForceLabA11yStrings.valueUnitstPattern.value;
  const positionMeterPatternString = GravityForceLabA11yStrings.positionMeterPattern.value;

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
  const { OBJECT_ONE } = ISLCObjectEnum;
  // const exponentToIndex = new LinearFunction( -1, 1, 0, 6 );
  // const massDifferenceToIndex = new LinearFunction( -500, 500, 0, 6, true );
  const radiusDifferenceToIndex = new LinearFunction( -0.6, 0.6, 0, 6, true );
  const { min, max } = GravityForceLabConstants.PULL_FORCE_RANGE;
  const forceToPullIndex = new LinearFunction( min, max, 6, 0, true );

  class GravityForceLabStringManager extends ISLCStringManager {
    constructor( model, object1Label, object2Label, options ) {

      const convertForceValue = forceValue => {
        let units;
        let value;
        if ( model.scientificNotationProperty.get() ) {
          units = unitsNewtonsString;
          value = ISLCStringManager.getForceInScientificNotation( forceValue, 2 );
        }
        else {
          units = micronewtonsString;
          value = Util.toFixedNumber( forceValue * MICRO_CONVERSION_FACTOR, 6 );
        }

        return StringUtils.fillIn( valueUnitsPatternString, { value, units } );
      };

      options = _.extend( {
        valueUnits: micronewtonsString,
        centerOffset: 4.8,
        convertForceValue,
        convertDistanceMetric: distance => Util.toFixedNumber( distance, 1 ),
        formatPositionUnitMark: position => {
          position = Util.toFixedNumber( position, 1 );
          return StringUtils.fillIn( positionMeterPatternString, { position } );
        },
        formatMassValue: mass => mass
      }, options );

      super( model, object1Label, object2Label, options );

      // @private

      this._radiusDifference = 0;
      this._object1MassGrowing = false;
      this._object2MassGrowing = false;
      this.formatMassValue = options.formatMassValue;
      this.centerOffset = options.centerOffset;
      this.formatPositionUnitMark = options.formatPositionUnitMark;

      Property.multilink(
        [ model.object1.radiusProperty, model.object2.radiusProperty ],
        ( r1, r2 ) => {
          this._radiusDifference = r1 - r2;
        }
      );

      Property.multilink(
        [ model.object1.valueProperty, model.object2.valueProperty ],
        ( m1, m2 ) => {
          /*
           * TS noted in the design doc about using 'steps' instead of ratios
           * this implies that I should take the actual difference between the two
           * values
           */
          // this._object1ToObject2Ratio = r1 / r2;
          // this._object2ToObject1Ratio = 1 / this._object1ToObject2Ratio;
          // if r2 is larger than r1 then the value will be negative
          this._objectMassDifference = m1 - m2;
        }
      );

      model.object1.valueProperty.link( ( newMass, oldMass ) => {
        this._object1MassGrowing = ( newMass - oldMass ) > 0;
      } );

      model.object2.valueProperty.link( ( newMass, oldMass ) => {
        this._object2MassGrowing = ( newMass - oldMass ) > 0;
      } );
    }

    /////////////////////
    // Summary Strings //
    /////////////////////

    getMassValuesSummaryText() {
      const relativeSizeIndex = Util.roundSymmetric( this.getRelativeSizeIndex( this._radiusDifference ) );
      const fillObject = {
        mass1Label: this.object1Label,
        mass2Label: this.object2Label,
        m1Mass: this.formatMassValue( this.object1.valueProperty.get() ),
        m2Mass: this.formatMassValue( this.object2.valueProperty.get() ),
        comparitiveValue: RELATIVE_SIZE_STRINGS[ relativeSizeIndex ]
      };
      return StringUtils.fillIn( massValuesAndComparisonSummaryPatternString, fillObject );
    }

    // Mass/sphere strings
    getSizeAndPositionItemText( massLabel ) {
      const modelObject = massLabel === this.object1Label ? this.object1 : this.object2;
      const thisObject = massLabel;
      let massValue = modelObject.valueProperty.get();
      const size = this.getSizeOfMass( massValue );
      massValue = this.formatMassValue( massValue );
      const positionUnitMark = this.formatPositionUnitMark( modelObject.positionProperty.get() + this.centerOffset );
      const pattern = sizeAndPositionPatternString;
      return StringUtils.fillIn( pattern, { thisObject, size, massValue, positionUnitMark } );
    }

    getM1RelativeSize() {
      // const relativeSizeIndex = Util.roundSymmetric( this.getRelativeSizeIndex( this._radiusDifference ) );
      const comparitiveValue = this.getObjectRelativeSize( OBJECT_ONE );
      return StringUtils.fillIn( 'm1 {{comparitiveValue}} m2', { comparitiveValue } );
    }

    // TODO: proper string usage
    getMassSphereString( objectEnum ) {
      const massLabel = objectEnum === OBJECT_ONE ? this.object1Label : this.object2Label;
      const massRedSpherePatternString = `${massLabel}, Red Sphere`;
      const massBlueSpherePatternString = `${massLabel}, Blue Sphere`;
      return objectEnum === OBJECT_ONE ? massBlueSpherePatternString : massRedSpherePatternString;
    }

    getMassControlFocusAlertText( objectEnum ) {
      const pattern = '{{massValue}}, {{size}}, {{relativeSize}} {{otherObject}}';
      const thisObject = objectEnum === OBJECT_ONE ? this.object1 : this.object2;
      const massValue = this.formatMassValue( thisObject.valueProperty.get() );
      const size = this.getSizeOfMass( massValue );
      const relativeSize = this.getObjectRelativeSize( objectEnum );
      const otherObject = objectEnum === OBJECT_ONE ? this.object2Label : this.object1Label;
      return StringUtils.fillIn( pattern, { massValue, size, relativeSize, otherObject } );
    }

    getSpherePositionAriaValueText( newPosition, objectNode ) {
      newPosition = this.convertDistanceMetric( newPosition + this.centerOffset );
      return super.getSpherePositionAriaValueText( newPosition, objectNode );
    }

    getSpherePositionAndRegionText( position, objectEnum ) {
      position = this.convertDistanceMetric( position + this.centerOffset );
      return super.getSpherePositionAndRegionText( position, objectEnum );
    }

    getMassValueChangedAlertText( newMass, oldMass ) {
      let pattern = 'As mass {{massChange}}, vectors {{vectorChange}}.';
      const objectIsGrowing = ( newMass - oldMass ) > 0;
      const massChange = objectIsGrowing ? 'gets bigger' : 'gets smaller';
      const vectorChange = objectIsGrowing ? 'get bigger' : 'get smaller';

      const fillObject = { massChange, vectorChange };

      if ( this.model.forceValuesProperty.get() ) {
        pattern = 'As mass {{massChange}}, vectors {{vectorChange}}, forces now {{forceValue}}';
        fillObject.forceValue = this.getForceValueText();
      }
      return StringUtils.fillIn( pattern, fillObject );
    }

    getSizeOfMass( massValue ) {
      const massIndex = this.getMassSizeIndex( massValue );
      return this.getSizeFromIndex( massIndex );
    }

    getObjectRelativeSize( objectEnum ) {
      // const ratio = objectEnum === OBJECT_ONE ? this._object1ToObject2Ratio : this._object2ToObject1Ratio;
      const difference = objectEnum === OBJECT_ONE ? this._radiusDifference : this._radiusDifference * -1;
      const index = this.getRelativeSizeIndex( difference );
      return this.getRelativeSizeFromIndex( index );
    }

    getRelativeSizeFromIndex( index ) {
      // negative values => much smaller than (this < other)
      // positive values =>
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
      throw Error( 'Invalid mass value.');
    }

    ///////////////
    // Overrides //
    ///////////////
    // see ISLCStringManager.js for more details

    // NOTE: these are pure functions, so it may be possible to pass them into the supertype constructor
    // as a config object

    getPositionRegionChanged( newDistance, oldDistance ) {
      if ( newDistance === oldDistance ) {
        return false;
      }

      var min = Math.min( newDistance, oldDistance );
      var max = Math.max( newDistance, oldDistance );
      // TODO: Move to constants
      var regionBoundaries = [
        8.2, 6.7, 5.2, 3.7, 2.2, 0.9
      ];

      for ( let boundary of regionBoundaries ) {
        if ( min < boundary && boundary <= max ) {
          return true;
        }
      }
    }

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

      if ( distance >= 8.2 ) {
        return 0;
      }
      if ( distance >= 6.7 ) {
        return 1;
      }
      if ( distance >= 5.2 ) {
        return 2;
      }
      if ( distance >= 3.7 ) {
        return 3;
      }
      if ( distance >= 2.2 ) {
        return 4;
      }
      if ( distance >= 0.9 ) {
        return 5;
      }
      if ( distance < 0.9 ) {
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