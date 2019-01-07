// Copyright 2018, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const ISLCA11yStrings = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCA11yStrings' );
  const ISLCObjectEnum = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectEnum' );
  const PositionDescriber = require( 'INVERSE_SQUARE_LAW_COMMON/view/describers/PositionDescriber' );
  // const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Util = require( 'DOT/Util' );

  // strings
  const leftString = ISLCA11yStrings.left.value;
  const rightString = ISLCA11yStrings.right.value;

  // constants
  const { OBJECT_ONE, OBJECT_TWO } = ISLCObjectEnum;

  // let describer = null;

  class GravityForceLabPositionDescriber extends PositionDescriber {

    constructor( model, object1Label, object2Label, options ) {

      options = _.extend( {
        centerOffset: 4.8,
        convertDistanceMetric: distance => Util.toFixedNumber( distance, 1 )
      }, options );

      super( model, object1Label, object2Label, options );

      // @public
      this.pushedMassEnum = null;

      this.object1.positionProperty.lazyLink( position => {
        this.pushedMassEnum = this.object1.isDragging ? null : OBJECT_ONE;
      } );

      this.object2.positionProperty.lazyLink( position => {
        this.pushedMassEnum = this.object2.isDragging ? null : OBJECT_TWO;
      } );
    }

    get massPushed() {
      return this.pushedMassEnum !== null;
    }

    get pushedMassDirection() {
      assert && assert( this.pushedMassEnum !== null, 'cannot get pushedMassDirection when pushedMassEnum is null' );
      return this.pushedMassEnum === OBJECT_ONE ? leftString : rightString;
    }

    // @override
    getDistanceIndex( distance ) {
      assert && assert( distance > 0, 'Distance between spheres should always be positive.' );

      if ( distance >= 8.2 ) {
        return 0;
      }
      if ( distance >= 6.7 ) {
        return 1;
      }
      if ( distance >= 5.2 ) {
        return 2;
      }
      if ( distance >= 3.7 ) {
        return 3;
      }
      if ( distance >= 2.2 ) {
        return 4;
      }
      if ( distance >= 0.9 ) {
        return 5;
      }
      if ( distance < 0.9 ) {
        return 6;
      }
      throw new Error( 'Invalid distance value' );
    }

    /**
     * Uses the singleton pattern to keep one instance of this describer for the entire lifetime of the sim.
     * @returns {GravityForceLabPositionDescriber}
     */
    static getDescriber() {
      // assert && assert( describer, 'describer has not yet been initialized' );
      return PositionDescriber.getDescriber();
      // return describer;
    }

    /**
     * Initialize the describer singleton
     * @throws Error
     */
    static initialize( model, object1Label, object2Label, options ) {
      // assert && assert( describer === null, 'cannot call initialize more than once per ForceDescriber instance' );
      const describer = new GravityForceLabPositionDescriber( model, object1Label, object2Label, options );
      return PositionDescriber.initialize( describer );
    }
  }

  return gravityForceLab.register( 'GravityForceLabPositionDescriber', GravityForceLabPositionDescriber );
} );