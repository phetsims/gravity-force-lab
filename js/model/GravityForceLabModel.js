// Copyright 2002-2013, University of Colorado Boulder

/**
 * main Model container.
 *
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';
  var PropertySet = require( 'AXON/PropertySet' );
  var inherit = require( 'PHET_CORE/inherit' );

  function GravityForceLabModel( width, height ) {
    var model = this;
    this.width = width;
    this.height = height;
    this.radius = 100;
    PropertySet.call( this, {
      mass1: 38.00,
      mass2: 25.00,
      showValues: true,
      distance: 4,
      force: 0,
      locationX1: this.width / 2 - 100,
      locationX2: this.width / 2 + 100,
      ruler: {x: 250, y: 330}
    } );


    this.mass1Property.link( function( value ) {
      model.force = model.gravityForce( model.mass1, model.mass2, model.distance );
    } );
    this.mass2Property.link( function( value ) {
      model.force = model.gravityForce( model.mass1, model.mass2, model.distance );
    } );
    this.distanceProperty.link( function( value ) {
      model.force = model.gravityForce( model.mass1, model.mass2, model.distance );
    } );
    this.forceProperty.link( function( value ) {
    } );
    this.locationX1Property.link( function( value ) {
      model.distance = Math.abs(Math.round( ( model.locationX2 - model.locationX1 ) / 50 * 100 ) / 100);
    } );
    this.locationX2Property.link( function( value ) {
      model.distance =  Math.abs(Math.round( ( model.locationX2 - model.locationX1 ) / 50 * 100 ) / 100);
    } );

    this.reset();
  }

  inherit( PropertySet, GravityForceLabModel, {
    step: function() {
    },
    reset: function() {
      this.mass1 = 38.00;
      this.mass2 = 25.00;
      this.locationX1 = this.width / 2 - 100;
      this.locationX2 = this.width / 2 + 100;
      this.showValues = true;
      this.distance = 4;
      this.force = this.gravityForce( this.mass1, this.mass2, this.distance );
      this.ruler = { x: 250, y: 330 };
    },
    gravityForce: function( mass1, mass2, distance ) {
      var G = 6.67384E-11;
      return ( G * mass1 * mass2 ) / ( distance * distance );
    }

  } );

  return GravityForceLabModel;
} );