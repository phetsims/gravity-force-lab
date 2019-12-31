// Copyright 2013-2019, University of Colorado Boulder

/**
 * Main model for the Gravity Force Lab simulation, which contains physical objects as well as user settings.
 *
 * @author Anton Ulyanov (Mlearner)
 * @author Aadish Gupta (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const EnumerationProperty = require( 'AXON/EnumerationProperty' );
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const GravityForceLabConstants = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabConstants' );
  const inherit = require( 'PHET_CORE/inherit' );
  const ISLCModel = require( 'INVERSE_SQUARE_LAW_COMMON/model/ISLCModel' );
  const ForceValuesDisplayEnum = require( 'INVERSE_SQUARE_LAW_COMMON/model/ForceValuesDisplayEnum' );
  const Mass = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/model/Mass' );
  const PhysicalConstants = require( 'PHET_CORE/PhysicalConstants' );
  const Vector2 = require( 'DOT/Vector2' );
  const Vector2Property = require( 'DOT/Vector2Property' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function GravityForceLabModel( tandem ) {

    // @public
    this.rulerPositionProperty = new Vector2Property( new Vector2( 0, -1 ), {
      tandem: tandem.createTandem( 'rulerPositionProperty' ),
      phetioDocumentation: 'The position of the ruler in model coordinates'
    } );

    // @public
    this.constantRadiusProperty = new BooleanProperty( false, {
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
      this.constantRadiusProperty, baseColor1, tandem.createTandem( 'mass1' ) );
    const mass2 = new Mass( massValue2, position2, GravityForceLabConstants.MASS_RANGE, density,
      this.constantRadiusProperty, baseColor2, tandem.createTandem( 'mass2' ) );

    // leverage ISLCModel, in "mass" mode
    ISLCModel.call( this, PhysicalConstants.GRAVITATIONAL_CONSTANT, mass1, mass2,
      GravityForceLabConstants.PULL_LOCATION_RANGE, tandem, {
        snapObjectsToNearest: 0.1 // in meters
      } );

    // @public
    this.forceValuesDisplayProperty = new EnumerationProperty( ForceValuesDisplayEnum, ForceValuesDisplayEnum.DECIMAL, {
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

  gravityForceLab.register( 'GravityForceLabModel', GravityForceLabModel );

  return inherit( ISLCModel, GravityForceLabModel, {

    // @public
    reset: function() {
      this.rulerPositionProperty.reset();
      this.forceValuesDisplayProperty.reset();
      this.constantRadiusProperty.reset();
      ISLCModel.prototype.reset.call( this );
    }
  } );
} );
