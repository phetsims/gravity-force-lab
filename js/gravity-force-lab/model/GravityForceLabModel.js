// Copyright 2013-2015, University of Colorado Boulder

/**
 * main model for the Gravity Force Lab simulation
 *
 * @author Anton Ulyanov (Mlearner)
 * @author Aadish Gupta
 */
define( function( require ) {
  'use strict';

  // modules
  var gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Mass = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/model/Mass' );
  var PropertySet = require( 'AXON/PropertySet' );
  var Range = require( 'DOT/Range' );

  // constants
  var G = 6.67384E-11; // gravitational constant
  var MIN_SEPARATION_BETWEEN_MASSES = 0.1; // in meters
  var LEFT_BOUNDARY = -7.48; // empirically determined for model space in meters
  var RIGHT_BOUNDARY = 7.48; // empirically determined for model space in meters
  var PULL_OBJECT_WIDTH = 1.62; // empirically determined for model space in meters

  // utility function to calculate force given two masses and distance between them
  var calculateForce = function( mass1, mass2, distance ) {
    return ( G * mass1 * mass2 ) / ( distance * distance );
  };

  // utility function to calculate distance given x coordinates of two points
  var calculateDistance = function( x1, x2 ) {
    return Math.abs( x1 - x2 );
  };

  /**
   * @constructor
   */
  function GravityForceLabModel() {
    var self = this;
    this.massRange = new Range( 1, 1000 ); // @public

    PropertySet.call( this, {
      force: 0, // @public (read-only)
      showValues: true, // @public
      constantRadius: false, // @public
      ruler: { x: 120, y: 270 } // @public
    } );

    this.mass1 = new Mass( 50, -2, '#00f', this.constantRadiusProperty ); // @public
    this.mass2 = new Mass( 200,  2, '#f00', this.constantRadiusProperty ); // @public

    this.mass1.massProperty.link( function(){ self.updateForce(); } );
    this.mass2.massProperty.link( function(){ self.updateForce(); } );
    this.mass1.positionProperty.link( function(){ self.updateForce(); } );
    this.mass2.positionProperty.link( function(){ self.updateForce(); } );
  }

  gravityForceLab.register( 'GravityForceLabModel', GravityForceLabModel);

  return inherit( PropertySet, GravityForceLabModel, {

    /**
     * step function makes sure masses doesn't goes out of bounds and don't overlap each other at each time step
     * @public
     */
    step: function() {
      var minX = LEFT_BOUNDARY + PULL_OBJECT_WIDTH + this.mass1.radius;
      var maxX = RIGHT_BOUNDARY - PULL_OBJECT_WIDTH - this.mass2.radius;
      var locationMass1 = this.mass1.position;
      var locationMass2 = this.mass2.position;

      var change_factor = 0.0001; // this is empirically determined larger change factor may make masses farther but converges faster
      var sumRadius = this.mass1.radius + this.mass2.radius + MIN_SEPARATION_BETWEEN_MASSES;
      var changed = false;
      var i = 0;
      // for loop is to make sure after checking the boundaries constraints masses don't overlap
      for (i = 0; i < 10; i++) {
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
        if ( ! changed ){
          break;
        }
      }
      this.mass1.positionProperty.set( locationMass1 );
      this.mass2.positionProperty.set( locationMass2 );
    },

    /**
     * updateForce calculates the force between the objects and update the force variable
     * @private
     */
    updateForce: function() {
      var distance = calculateDistance( this.mass1.position, this.mass2.position );
      this.force = calculateForce( this.mass1.mass, this.mass2.mass, distance );
    },

    // @public
    reset: function() {
      PropertySet.prototype.reset.call( this );
      this.mass1.reset();
      this.mass2.reset();
      this.updateForce();
    }
  }, { MinSeparationBetweenMasses: MIN_SEPARATION_BETWEEN_MASSES } );
} );
