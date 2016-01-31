// Copyright 2016, University of Colorado Boulder
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );

  function Mass( mass, position, color) {
    var self = this;
    PropertySet.call( this, {
      mass: mass,
      position: position,
      radius: this.calculateRadius( mass ),
      baseColor: color
    });

    this.massProperty.lazyLink( function( mass ){
      self.radius = self.calculateRadius( mass );
    });

  }

  return inherit( PropertySet, Mass, {
    //TODO prototypes
    //TODO Calculate Radius
    calculateRadius: function( mass ) {
      var radius = Math.pow( ( mass * 3 * 7 / 150 / 4 / 22 ), 1/3);
      return radius;
    },

    reset: function() {
      PropertySet.prototype.reset.call( this );
    }
    //TODO Calculate Position
  } );
} );