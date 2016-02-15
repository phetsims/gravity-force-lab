// Copyright 2016, University of Colorado Boulder
define( function( require ) {
  'use strict';

  // modules
  var Color = require( 'SCENERY/util/Color' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var RadialGradient = require( 'SCENERY/util/RadialGradient' );

  //constants
  var DENSITY = 150; // kg/m^3
  var CONSTANT_RADIUS = 0.5; // in meters
  var CONSTANT_MASS_COLOR = new Color( 'mediumpurple' );
  var COLOR_REDUCTION_CONSTANT = 2000; // empirically determined

  function calculateGradient( color, radius ){
    var viewRadius = radius * 50; // empirically determined to convert radius from model to view space
    return new RadialGradient( viewRadius * 0.6, -viewRadius * 0.6, 1, viewRadius * 0.6, -viewRadius * 0.6, viewRadius )
      .addColorStop( 0, color.colorUtilsBrighter( 0.5 ).toCSS() )
      .addColorStop( 1, color.toCSS() );
  }

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
      baseColor: baseColor,
      colorGradient: calculateGradient( baseColor, radius )
    });

    this.massProperty.lazyLink( function( mass ){
      if( !constantRadiusProperty.get() ) {
        self.radius = self.calculateRadius( mass );
      }
      else{
        self.baseColor = CONSTANT_MASS_COLOR.colorUtilsDarker( mass / COLOR_REDUCTION_CONSTANT );
      }
    });

    this.baseColorProperty.lazyLink( function( color ){
      self.colorGradient = calculateGradient( color, self.radius );
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
    //TODO prototypes
    //TODO Calculate Radius
    calculateRadius: function( mass ) {

      return Math.pow( ( mass * 3 * 7 / DENSITY / 4 / 22 ), 1/3);
    },

    reset: function() {
      PropertySet.prototype.reset.call( this );
      //this.colorGradient = this.calculateGradient( this.baseColor );
    }
    //TODO Calculate Position
  } );
} );