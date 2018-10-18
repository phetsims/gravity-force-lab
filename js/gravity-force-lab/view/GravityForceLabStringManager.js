// Copyright 2018, University of Colorado Boulder

/**
 * The string manager is responsible for any dynamic strings in the sim. Usually this is in the form of a string pattern
 * that takes on different values based on model properties. It is also useful when a description or alert is comprised
 * of a series of different complete phrases or sentences that must be concatenated in a dynamic fashion.
 *
 * @author Michael Barlow (PhET Interactive Simulations)
 */

define( require => {
  'use strict';

  // modules
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const GravityForceLabA11yStrings = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabA11yStrings' );

  // a11y strings
  const forceSizeAndValueSummaryPatternString = GravityForceLabA11yStrings.forceSizeAndValueSummaryPattern.value;
  const distanceSpaceAndValueSummaryPatternString = GravityForceLabA11yStrings.distanceSpaceAndValueSummaryPattern.value;

  class GravityForceLabStringManager {
    constructor( model ) {

      // @private
      this.model = model;
    }

    /////////////////////
    // Summary Strings //
    /////////////////////

    getForceVectorSummary() {
      return forceSizeAndValueSummaryPatternString;
    }

    getObjectDistanceSummary() {
      return distanceSpaceAndValueSummaryPatternString;
    }
  }

  return gravityForceLab.register( 'GravityForceLabStringManager', GravityForceLabStringManager );
} );