// Copyright 2020, University of Colorado Boulder

/**
 * This file is to prototype mechamarkers as an input controller to a phetsim, see https://github.com/phetsims/a11y-research/issues/153
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const timer = require( 'AXON/timer' );

  // constants
  const MARKER_NUMBER = 18; // change this marker number to toggle constant radius

  class MarkerInput {

    /**
     * @param {GravityForceLabModel} model
     */
    static init( model ) {

      let previousButtonPresent = false;

      function update() {

        // Mechamarkers stuff
        Mechamarkers.update( Date.now() );


        if ( Mechamarkers.getMarker( MARKER_NUMBER ).present !== previousButtonPresent ) {

          Mechamarkers.getMarker( MARKER_NUMBER ).present && model.constantRadiusProperty.toggle();
          previousButtonPresent = Mechamarkers.getMarker( MARKER_NUMBER ).present;
        }
      }

      timer.addListener( update );

      const canvas = document.createElement( 'canvas' );
      const ctx = canvas.getContext( '2d' );
      document.body.appendChild( canvas );
      Mechamarkers.init( canvas, ctx );
    }
  }

  return gravityForceLab.register( 'MarkerInput', MarkerInput );
} );