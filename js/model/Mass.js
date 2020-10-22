// Copyright 2018-2020, University of Colorado Boulder

/**
 * Model for one of the spherical draggable masses.
 *
 * @author Aadish Gupta (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../axon/js/DerivedProperty.js';
import ISLCObject from '../../../inverse-square-law-common/js/model/ISLCObject.js';
import gravityForceLab from '../gravityForceLab.js';

// constants
// scale to brighten the base color to achieve rgba(150, 150, 255) but still be red or blue
const baseColorModifier = 0.59;

class Mass extends ISLCObject {

  /**
   * @param {number} initialMass
   * @param {Vector2} initialPosition
   * @param {Range} valueRange
   * @param {number} density
   * @param {Property.<boolean>} constantRadiusProperty
   * @param {Color} baseColor
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( initialMass, initialPosition, valueRange, density, constantRadiusProperty, baseColor, tandem, options ) {

    super( initialMass, initialPosition, valueRange, constantRadiusProperty,
      mass => Mass.calculateRadius( mass, density ),
      tandem, options );

    // @private
    this.density = density;


    // see ISLCObject, mass color is will change with value of constantRadiusProperty (set within sim)
    this.baseColorProperty = new DerivedProperty( [ this.valueProperty, constantRadiusProperty ],
      ( value, constantRadius ) => {
        return constantRadius ?
               baseColor.colorUtilsBrighter( 1 - Math.abs( value ) / valueRange.max ) :
               baseColor.colorUtilsBrighter( baseColorModifier );
      } );

  }

  /**
   * calculates the radius based on mass of object maintaining constant density
   * calculations are made using the density formula and volume of a sphere
   * @public
   * @override
   * @param {number} mass
   * @param {number} density
   */
  static calculateRadius( mass, density ) {
    return Math.pow( ( 3 * mass / density ) / ( 4 * Math.PI ), 1 / 3 );
  }
}

gravityForceLab.register( 'Mass', Mass );
export default Mass;