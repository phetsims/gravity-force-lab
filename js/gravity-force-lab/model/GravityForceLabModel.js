// Copyright 2013-2017, University of Colorado Boulder

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
  var ISLCConstants = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCConstants' );
  var ISLCModel = require( 'INVERSE_SQUARE_LAW_COMMON/model/ISLCModel' );
  var Mass = require( 'INVERSE_SQUARE_LAW_COMMON/model/Mass' );
  var Property = require( 'AXON/Property' );
  var Range = require( 'DOT/Range' );
  var PropertyIO = require( 'AXON/PropertyIO' );
  var TVector2 = require( 'DOT/TVector2' );
  var Vector2 = require( 'DOT/Vector2' );

  // phet-io modules
  var TBoolean = require( 'ifphetio!PHET_IO/types/TBoolean' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function GravityForceLabModel( tandem ) {

    this.rulerPositionProperty = new Property( new Vector2( 0, -0.90 ), {
      tandem: tandem.createTandem( 'rulerPositionProperty' ),
      phetioType: PropertyIO( TVector2 )
    } ); // @public

    this.constantRadiusProperty = new Property( false, {
      tandem: tandem.createTandem( 'constantRadiusProperty' ),
      phetioType: PropertyIO( TBoolean )
    } ); // @public

    // @public {Boolean} - whether or not the sim is in 'scientific notation mode'
    this.scientificNotationProperty = new Property( false, {
      tandem: tandem.createTandem( 'scientificNotationProperty' ),
      phetioType: PropertyIO( TBoolean )
    } );

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

    // leverage ISLCModel, in "mass" mode
    ISLCModel.call( this, ISLCConstants.G, mass1, mass2, GravityForceLabConstants.LEFT_MASS_BOUNDARY, GravityForceLabConstants.RIGHT_MASS_BOUNDARY, tandem, {
      snapObjectsToNearest: 0.1 // in meters
    } );
  }

  gravityForceLab.register( 'GravityForceLabModel', GravityForceLabModel );

  return inherit( ISLCModel, GravityForceLabModel, {

    // @public
    reset: function() {
      this.rulerPositionProperty.reset();
      this.scientificNotationProperty.reset();
      ISLCModel.prototype.reset.call( this );
    }
  } );
} );
