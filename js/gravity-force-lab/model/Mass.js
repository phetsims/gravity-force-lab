// Copyright 2016, University of Colorado Boulder

/**
 * Model for one of the spherical draggable masses.
 *
 * @author Aadish Gupta (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var Color = require( 'SCENERY/util/Color' );
  var gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );

  // constants
  var DENSITY = 150; // kg/m^3
  var CONSTANT_RADIUS = 0.5; // in meters
  var CONSTANT_MASS_COLOR = new Color( 'indigo' );
  var COLOR_REDUCTION_CONSTANT = 1000; // empirically determined

  /**
   * @param {number} initialMass
   * @param {number} initialPosition
   * @param {string} baseColor
   * @param {Property.<boolean>} constantRadiusProperty
   * @param {Tandem} tandem
   * @constructor
   */
  function Mass( initialMass, initialPosition, baseColor, constantRadiusProperty, tandem ) {
    var self = this;
    var initialRadius = this.calculateRadius( initialMass );

    this.massProperty = new Property( initialMass ); // @public
    this.positionProperty = new Property( initialPosition ); // @public
    this.radiusProperty = new Property( initialRadius ); // @public (read-only)
    this.baseColorProperty = new Property( new Color( baseColor ) ); // @public (read-only)

    this.massProperty.lazyLink( function( mass ) {
      if ( !constantRadiusProperty.get() ) {
        self.radiusProperty.set( self.calculateRadius( mass ) );
      }
      else {
        self.baseColorProperty.set( CONSTANT_MASS_COLOR.colorUtilsBrighter( 1 - mass / COLOR_REDUCTION_CONSTANT ) );
      }
    } );

    constantRadiusProperty.lazyLink( function( prop ) {
      if ( !prop ) {
        self.radiusProperty.set( self.calculateRadius( self.massProperty.get() ) );
        self.baseColorProperty.reset();
      }
      else {
        self.radiusProperty.set( CONSTANT_RADIUS );
        self.baseColorProperty.set( CONSTANT_MASS_COLOR.colorUtilsBrighter( 1 - self.massProperty.get() /
                                                                                COLOR_REDUCTION_CONSTANT ) );
      }
    } );

  }

  gravityForceLab.register( 'Mass', Mass );

  return inherit( Object, Mass, {

    /**
     * calculates the radius based on mass of object maintaining constant density
     * calculations are made using the density formula and volume of a sphere
     * @private
     */
    calculateRadius: function( mass ) {
      var sphereVolume = mass / DENSITY;
      var sphereRadius = Math.pow( ( 3 * sphereVolume ) / ( 4 * Math.PI ), 1 / 3 );
      return sphereRadius;
    },

    // @public
    reset: function() {
      this.massProperty.reset();
      this.positionProperty.reset();
      this.radiusProperty.reset();
      this.baseColorProperty.reset();
    }
  } );
} );