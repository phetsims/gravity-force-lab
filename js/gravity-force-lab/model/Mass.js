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
  var CONSTANT_RADIUS_COLOR = new Color( 'indigo' );

  /**
   * @param {number} initialMass
   * @param {number} initialPosition
   * @param {number} density
   * @param {string} baseColor
   * @param {Property.<boolean>} constantRadiusProperty
   * @param {Tandem} tandem
   * @param {Object} options
   * @constructor
   */
  function Mass( initialMass, initialPosition, density, baseColor, constantRadiusProperty, tandem, options ) {

    options = _.extend( {
      massConstantRadius: GravityForceLabConstants.CONSTANT_RADIUS, // in meters
      massRange: GravityForceLabConstants.MASS_RANGE,

      // boundaries for locations of the masses in meters
      leftMassBoundary: GravityForceLabConstants.LEFT_MASS_BOUNDARY,
      rightMassBoundary: GravityForceLabConstants.RIGHT_MASS_BOUNDARY
    }, options );

    var self = this;

    // @private
    this.density = density;

    this.massProperty = new Property( initialMass, {
      tandem: tandem.createTandem( 'massProperty' ),
      phetioValueType: TNumber( { units: 'kilograms', range: options.massRange } )
    } ); // @public

    this.positionProperty = new Property( initialPosition, {
      tandem: tandem.createTandem( 'positionProperty' ),
      phetioValueType: TNumber( {
        units: 'meters',
        range: new Range( options.leftMassBoundary, options.rightMassBoundary )
      } )
    } ); // @public

    this.radiusProperty = new DerivedProperty(
      [ this.massProperty, constantRadiusProperty ],
      function( mass, constantRadius ) {
        return constantRadius ? options.massConstantRadius : self.calculateRadius( mass );
      },
      { tandem: tandem.createTandem( 'radiusProperty' ), phetioValueType: TNumber( { units: 'meters' } ) }
    ); // @public

    this.baseColorProperty = new DerivedProperty(
      [ this.massProperty, constantRadiusProperty ],
      function( mass, constantRadius ) {
        return constantRadius ?
               CONSTANT_RADIUS_COLOR.colorUtilsBrighter( 1 - self.massProperty.get() / options.massRange.max ) :
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
      var sphereVolume = mass / this.density;
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