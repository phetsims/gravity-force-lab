// Copyright 2013-2022, University of Colorado Boulder

/**
 * Main model for the Gravity Force Lab simulation, which contains physical objects as well as user settings.
 *
 * @author Anton Ulyanov (Mlearner)
 * @author Aadish Gupta (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../axon/js/BooleanProperty.js';
import EnumerationDeprecatedProperty from '../../../axon/js/EnumerationDeprecatedProperty.js';
import Vector2 from '../../../dot/js/Vector2.js';
import Vector2Property from '../../../dot/js/Vector2Property.js';
import ForceValuesDisplayEnum from '../../../inverse-square-law-common/js/model/ForceValuesDisplayEnum.js';
import ISLCModel from '../../../inverse-square-law-common/js/model/ISLCModel.js';
import PhysicalConstants from '../../../phet-core/js/PhysicalConstants.js';
import gravityForceLab from '../gravityForceLab.js';
import GravityForceLabConstants from '../GravityForceLabConstants.js';
import Mass from './Mass.js';

// constants
const MASS_OPTIONS = {
  leftObjectBoundary: GravityForceLabConstants.PULL_POSITION_RANGE.min,
  rightObjectBoundary: GravityForceLabConstants.PULL_POSITION_RANGE.max
};

class GravityForceLabModel extends ISLCModel {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {

    const constantRadiusProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'constantRadiusProperty' ),
      phetioDocumentation: 'Use this to toggle if the masses have a constantly sized radius, even when the mass changes.'
    } );

    // pass initial masses and positions into the model
    const massValue1 = 100; // mass in kg
    const massValue2 = 400; // mass in kg

    const position1 = -3; // in meters
    const position2 = 1; // in meters

    const baseColor1 = GravityForceLabConstants.MASS_BLUE_COLOR;
    const baseColor2 = GravityForceLabConstants.MASS_RED_COLOR;

    const density = 150; // in kg/m^3

    const mass1 = new Mass( massValue1, position1, GravityForceLabConstants.MASS_RANGE, density,
      constantRadiusProperty, baseColor1, tandem.createTandem( 'mass1' ), MASS_OPTIONS );
    const mass2 = new Mass( massValue2, position2, GravityForceLabConstants.MASS_RANGE, density,
      constantRadiusProperty, baseColor2, tandem.createTandem( 'mass2' ), MASS_OPTIONS );

    // leverage ISLCModel, in "mass" mode
    super( PhysicalConstants.GRAVITATIONAL_CONSTANT, mass1, mass2,
      GravityForceLabConstants.PULL_POSITION_RANGE, tandem, {
        snapObjectsToNearest: 0.1 // in meters
      } );

    // @public
    this.constantRadiusProperty = constantRadiusProperty;

    // @public
    this.rulerPositionProperty = new Vector2Property( new Vector2( 0, -1 ), {
      tandem: tandem.createTandem( 'rulerPositionProperty' ),
      phetioDocumentation: 'The position of the ruler in model coordinates'
    } );

    // @public
    this.forceValuesDisplayProperty = new EnumerationDeprecatedProperty( ForceValuesDisplayEnum, ForceValuesDisplayEnum.DECIMAL, {
      tandem: tandem.createTandem( 'forceValuesDisplayProperty' ),
      phetioDocumentation: 'This determines the display type for the force values: in decimal or scientific ' +
                           'notation, and also hidden.'
    } );

    // ISLC code listens substantially to showForceValuesProperty, so keep that in sync as the display type changes.
    this.forceValuesDisplayProperty.lazyLink( newValue => {
      this.showForceValuesProperty.value = newValue === ForceValuesDisplayEnum.DECIMAL ||
                                           newValue === ForceValuesDisplayEnum.SCIENTIFIC;
    } );
  }

  // @public
  reset() {
    this.rulerPositionProperty.reset();
    this.forceValuesDisplayProperty.reset();
    this.constantRadiusProperty.reset();
    super.reset();
  }
}

gravityForceLab.register( 'GravityForceLabModel', GravityForceLabModel );

export default GravityForceLabModel;