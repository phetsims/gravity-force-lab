// Copyright 2018, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );

  // the region mapper takes in an array of values, Range types?, Bounds2 objects?, and maps a given input to its appropriate
  // string.
  // use LinearFunction for guidance
  class RegionMapper {
    constructor( values, strings, options ) {

      options = _.extend( {
        compareFunction: null // must be of the form (inputValue, valueFromArray) and return a boolean
      }, options );
      assert && assert( typeof values === typeof strings === 'array', 'both arguments must be arrays' );
      assert && assert( values.length === strings.length, 'arrays must be of the same length' );

      const lte = ( a, b ) => {
          return a <= b;
      };

      const map = value => {
        const compare = options.compareFunction ? options.compareFunction : lte;

        for ( let i; i < values.length; i++ ) {
          if ( compare( value, values[ i ] ) ) {
            return strings[ i ];
          }
        }
      };

      return map;
    }
  }


  gravityForceLab.register( 'RegionMapper', RegionMapper );

  return RegionMapper;
} );