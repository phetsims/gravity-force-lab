// Copyright 2018, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const GravityForceLabPositionDescriber = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/describers/GravityForceLabPositionDescriber' );
  const GravityForceLabA11yStrings = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabA11yStrings' );
  const ISLCDescriber = require( 'INVERSE_SQUARE_LAW_COMMON/view/describers/ISLCDescriber' );
  const ISLCObjectEnum = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectEnum' );
  const MassDescriber = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/describers/MassDescriber' );
  // const PositionDescriber = require( 'INVERSE_SQUARE_LAW_COMMON/view/describers/PositionDescriber' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  // strings
  const mass1AbbreviatedString = require( 'string!GRAVITY_FORCE_LAB/mass1Abbreviated' );
  const mass2AbbreviatedString = require( 'string!GRAVITY_FORCE_LAB/mass2Abbreviated' );

  const sizeAndPositionPatternString = GravityForceLabA11yStrings.sizeAndPositionPattern.value;
  const redSpherePatternString = GravityForceLabA11yStrings.redSpherePattern.value;
  const blueSpherePatternString = GravityForceLabA11yStrings.blueSpherePattern.value;

  // constants
  const { OBJECT_ONE } = ISLCObjectEnum;

  class MassNodeDescriber extends ISLCDescriber {
    constructor( model, objectEnum ) {
      super( model, mass1AbbreviatedString, mass2AbbreviatedString );

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

    getSizeAndPositionItemText() {
      const thisObjectLabel = this.massLabel;
      let massValue = this.mass.valueProperty.get();
      const size = this.size;
      massValue = this.massDescriber.getFormattedMass( massValue );
      const position = this.convertedPosition;
      const unit = this.positionDescriber.unit;
      const pattern = sizeAndPositionPatternString;
      return StringUtils.fillIn( pattern, { thisObjectLabel, size, massValue, position, unit } );
    }

    getMassSphereString() {
      const pattern = this.enum === OBJECT_ONE ? blueSpherePatternString : redSpherePatternString;
      return StringUtils.fillIn( pattern, { objectLabel: this.massLabel } );
    }
  }

  return gravityForceLab.register( 'MassNodeDescriber', MassNodeDescriber );
} );