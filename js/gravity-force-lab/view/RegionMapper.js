// Copyright 2018, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );

  // the region mapper takes in an array of values, Range types?, Bounds2 objects?, and maps a given input to its appropriate
  // string.
  // use LinearFunction for guidance
  class RegionMapper {

    constructor( values, strings ) {
      assert && assert( typeof values === typeof strings === 'array', 'both arguments must be arrays' );
      assert && assert( values.length === strings.length, 'arrays must be of the same length' );

      this._value = values;
      this._strings = strings;
    }

    map( value ) {

    }
  }


  return gravityForceLab.register( 'RegionMapper', RegionMapper );
} );