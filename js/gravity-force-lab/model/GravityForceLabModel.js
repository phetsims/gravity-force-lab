// Copyright 2013-2019, University of Colorado Boulder

/**
 * Main model for the Gravity Force Lab simulation, which contains physical objects as well as user settings.
 *
 * @author Anton Ulyanov (Mlearner)
 * @author Aadish Gupta (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  var GravityForceLabConstants = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ISLCModel = require( 'INVERSE_SQUARE_LAW_COMMON/model/ISLCModel' );
  var Mass = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/model/Mass' );
  var PhysicalConstants = require( 'PHET_CORE/PhysicalConstants' );
  var Range = require( 'DOT/Range' );
  var Vector2 = require( 'DOT/Vector2' );
  var Vector2Property = require( 'DOT/Vector2Property' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function GravityForceLabModel( tandem ) {

    // @public
    this.rulerPositionProperty = new Vector2Property( new Vector2( 0, -0.90 ), {
      tandem: tandem.createTandem( 'rulerPositionProperty' ),
      phetioDocumentation: 'The position of the ruler in model coodinates'
    } );

    // @public
    this.constantRadiusProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'constantRadiusProperty' ),
      phetioDocumentation: 'Use this to toggle if the masses have a constantly sized radius, even when the mass changes.'
    } );

    // @public {Boolean} - whether or not the sim is in 'scientific notation mode'
    this.scientificNotationProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'scientificNotationProperty' ),
      phetioDocumentation: 'Whether or not to display the force using scientific notation'
    } );

    // pass initial masses and positions into the model
    var massValue1 = 50; // mass in kg
    var massValue2 = 200; // mass in kg

    var position1 = -2; // in meters
    var position2 = 2; // in meters

    var minMassValue = 1; // in kg
    var maxMassValue = 1000; // in kg
    var valueRange = new Range( minMassValue, maxMassValue );

    var baseColor1 = GravityForceLabConstants.MASS_BLUE_COLOR;
    var baseColor2 = GravityForceLabConstants.MASS_RED_COLOR;

    var density = 150; // in kg/m^3

    var mass1 = new Mass( massValue1, position1, valueRange, density, this.constantRadiusProperty, baseColor1, tandem.createTandem( 'mass1' ) );
    var mass2 = new Mass( massValue2, position2, valueRange, density, this.constantRadiusProperty, baseColor2, tandem.createTandem( 'mass2' ) );

    // leverage ISLCModel, in "mass" mode
    ISLCModel.call( this, PhysicalConstants.GRAVITATIONAL_CONSTANT, mass1, mass2, GravityForceLabConstants.PULL_LOCATION_RANGE, tandem, {
      snapObjectsToNearest: 0.1 // in meters
    } );
  }

  gravityForceLab.register( 'GravityForceLabModel', GravityForceLabModel );

  return inherit( ISLCModel, GravityForceLabModel, {

    // @public
    reset: function() {
      this.rulerPositionProperty.reset();
      this.scientificNotationProperty.reset();
      this.constantRadiusProperty.reset();
      ISLCModel.prototype.reset.call( this );
    }
  } );
} );
