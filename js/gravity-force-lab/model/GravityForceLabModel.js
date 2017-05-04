// Copyright 2013-2015, University of Colorado Boulder

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
  var Color = require( 'SCENERY/util/Color' );
  var gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  var GravityForceLabConstants = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Mass = require( 'INVERSE_SQUARE_LAW_COMMON/model/Mass' );
  var Property = require( 'AXON/Property' );
  var Range = require( 'DOT/Range' );
  var Vector2 = require( 'DOT/Vector2' );
  var InverseSquareLawModel = require( 'INVERSE_SQUARE_LAW_COMMON/model/InverseSquareLawModel' );
  var TVector2 = require( 'DOT/TVector2' );
  var InverseSquareLawCommonConstants = require( 'INVERSE_SQUARE_LAW_COMMON/InverseSquareLawCommonConstants' );

  // phet-io modules
  var TBoolean = require( 'ifphetio!PHET_IO/types/TBoolean' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function GravityForceLabModel( tandem ) {

    this.rulerPositionProperty = new Property( new Vector2( 120, 270 ), {
      tandem: tandem.createTandem( 'rulerPositionProperty' ),
      phetioValueType: TVector2
    } ); // @public

    this.constantRadiusProperty = new Property( false, {
      tandem: tandem.createTandem( 'constantRadiusProperty' ),
      phetioValueType: TBoolean
    } ); // @public

    // pass initial masses and positions into the model
    var massValue1 = 50; // mass in kg
    var massValue2 = 200; // mass in kg

    var position1 = -2; // in meters
    var position2 = 2; // in meters

    var minMassValue = 1; // in kg
    var maxMassValue = 1000; // in kg
    var valueRange = new Range(minMassValue, maxMassValue);

    var baseColor1 = new Color( '#00f' );
    var baseColor2 = new Color( '#f00' );

    var density = 150; // in kg/m^3

    var mass1 = new Mass(massValue1, position1, valueRange, density, this.constantRadiusProperty, baseColor1, tandem.createTandem( 'mass1' ) );
    var mass2 = new Mass(massValue2, position2, valueRange, density, this.constantRadiusProperty, baseColor2, tandem.createTandem( 'mass2' ) );

    // leverage InverseSquareLawModel, in "mass" mode
    InverseSquareLawModel.call( this, InverseSquareLawCommonConstants.G, mass1, mass2, GravityForceLabConstants.LEFT_MASS_BOUNDARY, GravityForceLabConstants.RIGHT_MASS_BOUNDARY, tandem, {
      snapToNearest: 0.1 // in meters
    } );
  }

  gravityForceLab.register( 'GravityForceLabModel', GravityForceLabModel );

  return inherit( InverseSquareLawModel, GravityForceLabModel, {

    // @public
    reset: function() {
      this.rulerPositionProperty.reset();
      InverseSquareLawModel.prototype.reset.call( this );
    }
  } );
} );
