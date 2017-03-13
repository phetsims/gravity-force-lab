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
  var gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  var Vector2 = require( 'DOT/Vector2' );
  var InverseSquareLawModel = require( 'INVERSE_SQUARE_LAW_COMMON/model/InverseSquareLawModel' );
  var InverseSquareLawModes = require( 'INVERSE_SQUARE_LAW_COMMON/InverseSquareLawModes' );
  var TVector2 = require( 'DOT/TVector2' );

  /**
   * @param {number} mass1 - value of mass 1 in kg
   * @param {number} mass2 - value of mass2 in kg
   * @param {Tandem} tandem
   * @constructor
   */
  function GravityForceLabModel( mass1, mass2, position1, position2, tandem, options ) {

    // leverage InverseSquareLawModel, in "mass" mode
    InverseSquareLawModel.call( this, InverseSquareLawModes.MASS, mass1, mass2, position1, position2, tandem, options );

    this.rulerPositionProperty = new Property( new Vector2( 120, 270 ), {
      tandem: tandem.createTandem( 'rulerPositionProperty' ),
      phetioValueType: TVector2
    } ); // @public
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
