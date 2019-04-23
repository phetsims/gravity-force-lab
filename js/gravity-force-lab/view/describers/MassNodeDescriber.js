// Copyright 2019, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const GravityForceLabA11yStrings = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabA11yStrings' );
  const ISLCDescriber = require( 'INVERSE_SQUARE_LAW_COMMON/view/describers/ISLCDescriber' );
  const ISLCObjectEnum = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectEnum' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  // strings
  const mass1AbbreviatedString = require( 'string!GRAVITY_FORCE_LAB/mass1Abbreviated' );
  const mass2AbbreviatedString = require( 'string!GRAVITY_FORCE_LAB/mass2Abbreviated' );

  const sizeAndPositionPatternString = GravityForceLabA11yStrings.sizeAndPositionPattern.value;
  const sizePatternString = GravityForceLabA11yStrings.sizePattern.value;
  const sizeAndDistancePatternString = GravityForceLabA11yStrings.sizeAndDistancePattern.value;
  const redSpherePatternString = GravityForceLabA11yStrings.redSpherePattern.value;
  const blueSpherePatternString = GravityForceLabA11yStrings.blueSpherePattern.value;

  // constants
  const { OBJECT_ONE } = ISLCObjectEnum;

  class MassNodeDescriber extends ISLCDescriber {

    /**
     * @param {ISLCModel} model
     * @param {ISLCObjectEnum} objectEnum
     * @param {MassDescriber} massDescriber
     * @param {GravityForceLabPositionDescriber} positionDescriber
     * @param {options} [options]
     */
    constructor( model, objectEnum, massDescriber, positionDescriber, options ) {

      options = _.extend( {
        object1Label: mass1AbbreviatedString, // string
        object2Label: mass2AbbreviatedString // string
      }, options );

      super( model, options.object1Label, options.object2Label );

      // @private
      this.enum = objectEnum;
      this.mass = this.getObjectFromEnum( objectEnum );
      this.massLabel = this.getObjectLabelFromEnum( objectEnum );
      this.otherMassLabel = this.getOtherObjectLabelFromEnum( objectEnum );

      this.positionDescriber = positionDescriber;
      this.massDescriber = massDescriber;

      this.atEdge = false;
      this.closestToOtherObject = false;

      this.mass.positionProperty.link( x => {
        this.atEdge = x === model.leftObjectBoundary || x === model.rightObjectBoundary;

        const { min, max } = this.mass.enabledRangeProperty.get();

        this.closestToOtherObject = this.enum === OBJECT_ONE ? x === max : x === min;
      } );
    }

    // @private
    get convertedPosition() {
      return this.positionDescriber.getConvertedPositionFromEnum( this.enum );
    }

    // @private
    get size() {
      return this.massDescriber.getMassSize( this.mass.valueProperty.get() );
    }

    // @private
    get massValue() {
      return this.massDescriber.getFormattedMass( this.mass.valueProperty.get() );
    }

    /**
     * Used for GFL
     * @returns {string}
     * @public
     */
    getSizeAndPositionItemText() {
      const thisObjectLabel = this.massLabel;
      const size = this.size;
      const massValue = this.massValue;
      const position = this.convertedPosition;
      const unit = this.positionDescriber.unit;
      return StringUtils.fillIn( sizeAndPositionPatternString, {
        thisObjectLabel: thisObjectLabel,
        size: size,
        massValue: massValue,
        position: position,
        unit: unit
      } );
    }

    /**
     * @returns {*|string}
     * @public
     */
    getMassSphereString() {
      const pattern = this.enum === OBJECT_ONE ? blueSpherePatternString : redSpherePatternString;
      return StringUtils.fillIn( pattern, { objectLabel: this.massLabel } );
    }


    /**
     * Used for GFL:B
     * @returns {string}
     * @public
     */
    getSizeItemText() {
      const thisObjectLabel = this.massLabel;
      const massValue = this.massValue;
      return StringUtils.fillIn( sizePatternString, {
        thisObjectLabel: thisObjectLabel,
        massValue: massValue,
        unit: this.massDescriber.unit
      } );
    }

    /**
     * Used in GFL:B
     * @returns {string} - the size and distance bullet for the Mass
     */
    getSizeAndDistanceClause() {
      return StringUtils.fillIn( sizeAndDistancePatternString, {
        size: this.getSizeItemText(),
        distance: this.positionDescriber.getDistanceClause( this.enum )
      } );
    }
  }

  return gravityForceLab.register( 'MassNodeDescriber', MassNodeDescriber );
} );