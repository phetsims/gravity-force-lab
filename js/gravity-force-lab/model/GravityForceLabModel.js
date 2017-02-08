// Copyright 2013-2015, University of Colorado Boulder

/**
 * Main model for the Gravity Force Lab simulation, which contains physical objects as well as user settings.
 *
 * @author Anton Ulyanov (Mlearner)
 * @author Aadish Gupta (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var Color = require( 'SCENERY/util/Color' );
  var gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  var GravityForceLabConstants = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Mass = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/model/Mass' );
  var Property = require( 'AXON/Property' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var Vector2 = require( 'DOT/Vector2' );

  // phet-io modules
  var TBoolean = require( 'ifphetio!PHET_IO/types/TBoolean' );
  var TNumber = require( 'ifphetio!PHET_IO/types/TNumber' );
  var TVector2 = require( 'ifphetio!PHET_IO/types/dot/TVector2' );

  // constants
  var G = 6.67384E-11; // gravitational constant
  var MIN_SEPARATION_BETWEEN_MASSES = 0.1; // in meters
  var PULL_OBJECT_WIDTH = 1.62; // empirically determined for model space in meters

  /**
   * @param {number} mass1 - value of mass 1 in kg
   * @param {number} mass2 - value of mass2 in kg
   * @param {Tandem} tandem
   * @constructor
   */
  function GravityForceLabModel( mass1, mass2, position1, position2, tandem, options ) {

    options = _.extend( {
      // mass properties
      massDensity: GravityForceLabConstants.MASS_DENSITY,
      massConstantRadius: GravityForceLabConstants.CONSTANT_RADIUS,
      massRange: GravityForceLabConstants.MASS_RANGE,

      // boundaries for locations of the masses in meters
      leftMassBoundary: GravityForceLabConstants.LEFT_MASS_BOUNDARY,
      rightMassBoundary: GravityForceLabConstants.RIGHT_MASS_BOUNDARY
    }, options );

    // @private
    this.leftMassBoundary = options.leftMassBoundary;
    this.rightMassBoundary = options.rightMassBoundary;

    this.showValuesProperty = new Property( true, {
      tandem: tandem.createTandem( 'showValuesProperty' ),
      phetioValueType: TBoolean
    } ); // @public
    this.constantRadiusProperty = new Property( false, {
      tandem: tandem.createTandem( 'constantRadiusProperty' ),
      phetioValueType: TBoolean
    } ); // @public
    this.rulerPositionProperty = new Property( new Vector2( 120, 270 ), {
      tandem: tandem.createTandem( 'rulerPositionProperty' ),
      phetioValueType: TVector2
    } ); // @public

    // @public
    var massOptions = {
      massConstantRadius: options.massConstantRadius,
      leftMassBoundary: options.leftMassBoundary,
      rightMassBoundary: options.rightMassBoundary,
      massRange: options.massRange
    };
    this.mass1 = new Mass( mass1, position1, options.massDensity, new Color( '#00f' ), this.constantRadiusProperty, tandem.createTandem( 'mass1' ), massOptions );
    this.mass2 = new Mass( mass2, position2, options.massDensity, new Color( '#f00' ), this.constantRadiusProperty, tandem.createTandem( 'mass2' ), massOptions );

    // @public, the force between the two objects as a positive scalar
    this.forceProperty = new DerivedProperty(
      [
        this.mass1.massProperty,
        this.mass2.massProperty,
        this.mass1.positionProperty,
        this.mass2.positionProperty
      ],
      function( m1, m2, x1, x2 ) {
        var distance = Math.abs( x2 - x1 );
        return G * m1 * m2 / ( distance * distance );
      },
      { tandem: tandem.createTandem( 'forceProperty' ), phetioValueType: TNumber( { units: 'newtons' } ) }
    );
  }

  gravityForceLab.register( 'GravityForceLabModel', GravityForceLabModel );

  return inherit( Object, GravityForceLabModel, {

    /**
     * step function makes sure masses doesn't goes out of bounds and don't overlap each other at each time step
     * @public
     */
    step: function() {
      var minX = this.leftMassBoundary + PULL_OBJECT_WIDTH + this.mass1.radiusProperty.get();
      var maxX = this.rightMassBoundary - PULL_OBJECT_WIDTH - this.mass2.radiusProperty.get();
      var locationMass1 = this.mass1.positionProperty.get();
      var locationMass2 = this.mass2.positionProperty.get();

      var change_factor = 0.0001; // this is empirically determined larger change factor may make masses farther but converges faster
      var sumRadius = this.mass1.radiusProperty.get() + this.mass2.radiusProperty.get() + MIN_SEPARATION_BETWEEN_MASSES;
      var changed = false;

      // for loop is to make sure after checking the boundaries constraints masses don't overlap
      for ( var i = 0; i < 10; i++ ) {

        // check for overlap and move both masses so that they don't overlap
        if ( Math.abs( locationMass1 - locationMass2 ) < sumRadius ) {
          while ( Math.abs( locationMass1 - locationMass2 ) < sumRadius ) {
            locationMass1 = locationMass1 - change_factor;
            locationMass2 = locationMass2 + change_factor;
            changed = true;
          }
        }

        // make sure mass1 doesn't go out of left boundary
        if ( locationMass1 < minX ) {
          locationMass1 = Math.max( minX, locationMass1 );
          changed = true;
        }

        // make sure mass2 doesn't go out of right boundary
        if ( locationMass2 > maxX ) {
          locationMass2 = Math.min( maxX, locationMass2 );
          changed = true;
        }
        if ( !changed ) {
          break;
        }
      }
      this.mass1.positionProperty.set( locationMass1 );
      this.mass2.positionProperty.set( locationMass2 );
      // Force might not have been changed but positions might have changed, therefore to ensure everything is in bounds
      // inside the view
      this.forceProperty.notifyObserversStatic();
    },

    // @public
    reset: function() {
      this.showValuesProperty.reset();
      this.constantRadiusProperty.reset();
      this.rulerPositionProperty.reset();
      this.mass1.reset();
      this.mass2.reset();
    }
  }, { // statics
    MIN_SEPARATION_BETWEEN_MASSES: MIN_SEPARATION_BETWEEN_MASSES
  } );
} );
