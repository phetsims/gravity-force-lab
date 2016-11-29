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
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  var GravityForceLabConstants = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  var Range = require( 'DOT/Range' );

  // phet-io modules
  var TColor = require( 'ifphetio!PHET_IO/types/scenery/util/TColor' );
  var TNumber = require( 'ifphetio!PHET_IO/types/TNumber' );

  // constants
  var DENSITY = 150; // kg/m^3
  var CONSTANT_RADIUS = 0.5; // in meters
  var CONSTANT_RADIUS_COLOR = new Color( 'indigo' );
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

    this.massProperty = new Property( initialMass, {
      tandem: tandem.createTandem( 'massProperty' ),
      phetioValueType: TNumber( { units: 'kilograms', range: GravityForceLabConstants.MASS_RANGE } )
    } ); // @public

    this.positionProperty = new Property( initialPosition, {
      tandem: tandem.createTandem( 'positionProperty' ),
      phetioValueType: TNumber( {
        units: 'meters',
        range: new Range( GravityForceLabConstants.LEFT_MASS_BOUNDARY, GravityForceLabConstants.RIGHT_MASS_BOUNDARY )
      } )
    } ); // @public

    this.radiusProperty = new DerivedProperty(
      [ this.massProperty, constantRadiusProperty ],
      function( mass, constantRadius ) {
        return constantRadius ? CONSTANT_RADIUS : self.calculateRadius( mass );
      },
      { tandem: tandem.createTandem( 'radiusProperty' ), phetioValueType: TNumber( { units: 'meters' } ) }
    ); // @public

    this.baseColorProperty = new DerivedProperty(
      [ this.massProperty, constantRadiusProperty ],
      function( mass, constantRadius ) {
        return constantRadius ?
               CONSTANT_RADIUS_COLOR.colorUtilsBrighter( 1 - self.massProperty.get() / COLOR_REDUCTION_CONSTANT ) :
               baseColor;
      },
      { tandem: tandem.createTandem( 'baseColorProperty' ), phetioValueType: TColor }
    );
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
    }
  } );
} );