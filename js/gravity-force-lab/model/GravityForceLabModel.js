// Copyright 2013-2015, University of Colorado Boulder

/**
 * main Model container.
 *
 * @author Anton Ulyanov (Mlearner)
 * @author Aadish Gupta
 */
define( function( require ) {
  'use strict';

  // modules
  var Mass = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/model/Mass' );
  var PropertySet = require( 'AXON/PropertySet' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Range = require( 'DOT/Range' );

  var G = 6.67384E-11; // gravitational constant

  var calculateForce = function( mass1, mass2, distance ) {
    return ( G * mass1 * mass2 ) / ( distance * distance );
  };

  var calculateDistance = function( x1, x2 ) {
    return Math.abs( Math.round( ( x2 - x1 ) / 50 * 100 ) / 100 );
  };

  function GravityForceLabModel( width, height ) {

    var model = this;
    this.massRange = new Range( 1, 100 );
    this.forceRange = new Range( ( 2.8287421332465277e-13 ), ( 4.387797501643656e-8 ) );

    // dimensions of the model's space
    this.width = width;
    this.height = height;

    PropertySet.call( this, {
      mass1: 38.00,
      mass2: 25.00,
      showValues: true,
      distance: 4, // separation between the 2 masses
      force: 0,
      locationX1: this.width / 2 - 100, // x-coordinate of mass 1
      locationX2: this.width / 2 + 100, // x-coordinate of mass 2
      ruler: { x: 120, y: 270 }
    } );

    var updateForce = function() {model.force = calculateForce( model.mass1, model.mass2, model.distance );};
    var updateDistance = function() {model.distance = calculateDistance( model.locationX1, model.locationX2 );};

    this.mass1Property.link( updateForce );
    this.mass2Property.link( updateForce );
    this.distanceProperty.link( updateForce );
    this.locationX1Property.link( updateDistance );
    this.locationX2Property.link( updateDistance );

    this.reset();
  }

  inherit( PropertySet, GravityForceLabModel, {
    step: function() {
      this.trigger( 'mass1Step' );
      this.trigger( 'mass2Step' );
    },
    reset: function() {
      this.mass1Property.reset();
      this.mass2Property.reset();
      this.locationX1Property.reset();
      this.locationX2Property.reset();
      // locationX1Property is reset again because for the initial reset of location X1 it depends on X2 which is not
      // yet reset so doing it again to set it properly.
      this.locationX1Property.reset();
      this.showValuesProperty.reset();
      this.distanceProperty.reset();
      this.force = calculateForce( this.mass1, this.mass2, this.distance );
      this.rulerProperty.reset();
    }
  } );

  return GravityForceLabModel;
} );
