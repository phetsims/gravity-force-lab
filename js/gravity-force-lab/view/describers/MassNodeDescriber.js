// Copyright 2019, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const GravityForceLabPositionDescriber = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/describers/GravityForceLabPositionDescriber' );
  const GravityForceLabA11yStrings = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabA11yStrings' );
  const ISLCDescriber = require( 'INVERSE_SQUARE_LAW_COMMON/view/describers/ISLCDescriber' );
  const ISLCObjectEnum = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectEnum' );
  const MassDescriber = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/describers/MassDescriber' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  // strings
  const mass1AbbreviatedString = require( 'string!GRAVITY_FORCE_LAB/mass1Abbreviated' );
  const mass2AbbreviatedString = require( 'string!GRAVITY_FORCE_LAB/mass2Abbreviated' );

  const sizeAndPositionPatternString = GravityForceLabA11yStrings.sizeAndPositionPattern.value;
  const sizePatternString = GravityForceLabA11yStrings.sizePattern.value;
  const positionPatternString = GravityForceLabA11yStrings.positionPattern.value;
  const distancePatternString = GravityForceLabA11yStrings.distancePattern.value;
  const redSpherePatternString = GravityForceLabA11yStrings.redSpherePattern.value;
  const blueSpherePatternString = GravityForceLabA11yStrings.blueSpherePattern.value;

  // constants
  const { OBJECT_ONE } = ISLCObjectEnum;

  class MassNodeDescriber extends ISLCDescriber {
    constructor( model, objectEnum, options ) {

      options = _.extend( {
        object1Label: mass1AbbreviatedString,
        object2Label: mass2AbbreviatedString
      }, options );

      super( model, options.object1Label, options.object2Label );

      // @private
      this.enum = objectEnum;
      this.mass = this.getObjectFromEnum( objectEnum );
      this.otherMass = this.getOtherObjectFromEnum( objectEnum );
      this.massLabel = this.getObjectLabelFromEnum( objectEnum );
      this.otherMassLabel = this.getOtherObjectLabelFromEnum( objectEnum );

      this.positionDescriber = GravityForceLabPositionDescriber.getDescriber();
      this.massDescriber = MassDescriber.getDescriber();

      this.atEdge = false;
      this.closestToOtherObject = false;

      this.mass.positionProperty.link( x => {
        this.atEdge = x === model.leftObjectBoundary || x === model.rightObjectBoundary;

        const { min, max } = this.mass.enabledRangeProperty.get();

        this.closestToOtherObject = this.enum === OBJECT_ONE ? x === max : x === min;
      } );
    }

    get convertedPosition() {
      return this.positionDescriber.getConvertedPositionFromEnum( this.enum );
    }

    get size() {
      return this.massDescriber.getMassSize( this.mass.valueProperty.get() );
    }

    get massValue() {
      return this.massDescriber.getFormattedMass( this.mass.valueProperty.get() );
    }

    get relativeSize() {
      return this.massDescriber.getMassRelativeSize( this.enum );
    }

    /**
     * Used for GFL
     * @returns {string}
     */
    getSizeAndPositionItemText() {
      const thisObjectLabel = this.massLabel;
      let massValue = this.mass.valueProperty.get();
      const size = this.size;
      massValue = this.massDescriber.getFormattedMass( massValue );
      const position = this.convertedPosition;
      const unit = this.positionDescriber.unit;
      const pattern = sizeAndPositionPatternString;
      return StringUtils.fillIn( pattern, { thisObjectLabel: thisObjectLabel, size: size, massValue: massValue, position: position, unit: unit } );
    }

    getMassSphereString() {
      const pattern = this.enum === OBJECT_ONE ? blueSpherePatternString : redSpherePatternString;
      return StringUtils.fillIn( pattern, { objectLabel: this.massLabel } );
    }


    /**
     * Used for GFL:B
     * @returns {string}
     */
    getSizeItemText() {
      const thisObjectLabel = this.massLabel;
      let massValue = this.mass.valueProperty.get();
      massValue = this.massDescriber.getFormattedMass( massValue );
      const unit = this.massDescriber.unit; // TODO fdsafdsafdsafd
      const pattern = sizePatternString;
      return StringUtils.fillIn( pattern, { thisObjectLabel: thisObjectLabel, massValue: massValue, unit: unit } );
    }

    /**
     * Used for GFL:B
     * @returns {string}
     */
    getDistanceClause() {
      const distance = this.positionDescriber.convertedDistance;
      const units = this.positionDescriber.units;
      const otherObjectLabel = this.otherMassLabel;
      return StringUtils.fillIn( distancePatternString, {
        distance: distance,
        units: units,
        otherObjectLabel: otherObjectLabel
      } );

    }

    /**
     * Used for GFL:B
     * @returns {string}
     */
    getPositionItemText() {
      const thisObjectLabel = this.massLabel;
      const position = this.convertedPosition;
      const unit = this.positionDescriber.unit;
      assert && assert( this.model instanceof phet.gravityForceLabBasics.GFLBModel );
      const distanceClause = this.model.showDistanceProperty.value ? this.getDistanceClause() : '';
      const pattern = positionPatternString;
      return StringUtils.fillIn( pattern, {
        thisObjectLabel: thisObjectLabel,
        position: position,
        unit: unit,
        distanceClause: distanceClause
      } );

    }
  }

  return gravityForceLab.register( 'MassNodeDescriber', MassNodeDescriber );
} );