// Copyright 2016, University of Colorado Boulder

/**
 * model for the mass objects
 *
 * @author Aadish Gupta
 */
define( function( require ) {
  'use strict';

  // modules
  var Color = require( 'SCENERY/util/Color' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );

  //constants
  var DENSITY = 150; // kg/m^3
  var CONSTANT_RADIUS = 0.5; // in meters
  var CONSTANT_MASS_COLOR = new Color( 'thistle' );
  var COLOR_REDUCTION_CONSTANT = 2500; // empirically determined

   /**
   *
   * @param {number} mass
   * @param {number} position
   * @param {String} color
   * @param {Property.<boolean>} constantRadiusProperty
   * @constructor
   */
  function Mass( mass, position, color, constantRadiusProperty ) {
    var self = this;
    var baseColor = new Color( color );
    var radius = this.calculateRadius( mass );
    PropertySet.call( this, {
      mass: mass,
      position: position,
      radius: radius,
      baseColor: baseColor
    });

    this.massProperty.lazyLink( function( mass ){
      if( !constantRadiusProperty.get() ) {
        self.radius = self.calculateRadius( mass );
      }
      else{
        self.baseColor = CONSTANT_MASS_COLOR.colorUtilsDarker( mass / COLOR_REDUCTION_CONSTANT );
      }
    });

    constantRadiusProperty.lazyLink( function( prop ){
      if( !prop ){
        self.radius = self.calculateRadius( self.mass );
        self.baseColorProperty.reset();
      }
      else{
        self.radius = CONSTANT_RADIUS;
        self.baseColor = CONSTANT_MASS_COLOR.colorUtilsDarker( self.mass / COLOR_REDUCTION_CONSTANT );
      }
    });

  }

  return inherit( PropertySet, Mass, {
    // calculates the radius based on mass of object maintaining constant density
    // calculations are made using the density formula and volume of a sphere
    calculateRadius: function( mass ) {
      return Math.pow( ( mass * 3 * 7 / DENSITY / 4 / 22 ), 1/3);
    },

    reset: function() {
      PropertySet.prototype.reset.call( this );
    }
  } );
} );