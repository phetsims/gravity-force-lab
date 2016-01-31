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

  // Constants
  var G = 6.67384E-11; // gravitational constant
  var MIN_SEPARATION_BETWEEN_MASSES = 0.1; // in meters
  var LEFT_BOUNDARY = -7.68; // empirically determined for model space in meters
  var RIGHT_BOUNDARY = 7.68; // empirically determined for model space in meters
  var PULL_OBJECT_WIDTH = 1.62; // empirically determined for model space in meters

  var calculateForce = function( mass1, mass2, distance ) {
    return ( G * mass1 * mass2 ) / ( distance * distance );
  };

  var calculateDistance = function( x1, x2 ) {
    return Math.abs( x1 - x2 );
  };

  function GravityForceLabModel() {

    var self = this;
    this.massRange = new Range( 1, 1000 );
    this.mass1 = new Mass( 38, -2, 'white' );
    this.mass2 = new Mass( 25,  2, 'white' );
    this.forceRange = new Range( ( 2.8287421332465277e-13 ), ( 4.387797501643656e-8 ) );

    PropertySet.call( this, {
      force: 0,
      showValues: true,
      changeRadius: false,
      ruler: { x: 120, y: 270 }
    } );

    this.updateForce = function() {
      var distance = calculateDistance( self.mass1.position, self.mass2.position );
      self.force = calculateForce( self.mass1.mass, self.mass2.mass, distance );
    };

    this.mass1.massProperty.link( self.updateForce );
    this.mass2.massProperty.link( self.updateForce );
    this.mass1.positionProperty.link( self.updateForce );
    this.mass2.positionProperty.link( self.updateForce );
  }

  inherit( PropertySet, GravityForceLabModel, {
    step: function() {
      // Check overlap and check if it is out of bounds
      // Bounds so that mass 1 don't go out of bounds
      var minX = LEFT_BOUNDARY + PULL_OBJECT_WIDTH + this.mass1.radius;
      var maxX = RIGHT_BOUNDARY - PULL_OBJECT_WIDTH - this.mass2.radius;
      var locationMass1 = this.mass1.position;
      var locationMass2 = this.mass2.position;


      // Check for overlap and move both masses so that they don't overlap
      var change_factor = 0.0001;
      var sumRadius = this.mass1.radius + this.mass2.radius + MIN_SEPARATION_BETWEEN_MASSES;
      var changed = false;
      var i = 0;
      for (i = 0; i < 100; i++) {
        if ( Math.abs( locationMass1 - locationMass2 ) < sumRadius ) {
          while ( Math.abs( locationMass1 - locationMass2 ) < sumRadius ) {
            locationMass1 = locationMass1 - change_factor;
            locationMass2 = locationMass2 + change_factor;
            changed = true;
          }

        }
        if ( locationMass1 < minX ) {
          locationMass1 = Math.max( minX, locationMass1 );
          changed = true;
        }
        // Bounds So that mass 2 don't go out of bounds

        if ( locationMass2 > maxX ) {
          locationMass2 = Math.min( maxX, locationMass2 );
          changed = true;
        }

        if ( changed ){
          continue;
        }
        else{
          break;
        }
      }
      this.mass1.positionProperty.set( locationMass1 );
      this.mass2.positionProperty.set( locationMass2 );
    },

    reset: function() {
      PropertySet.prototype.reset.call( this );
      this.mass1.reset();
      this.mass2.reset();
      this.updateForce();
    }
  }, { MinSeparationBetweenMasses: MIN_SEPARATION_BETWEEN_MASSES} );

  return GravityForceLabModel;
} );
