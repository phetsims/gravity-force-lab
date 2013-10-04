// Copyright 2002-2013, University of Colorado Boulder

/**
 * Main entry point for the 'Gravity Force Lab' sim.
 *
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // Imports
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var Sim = require( 'JOIST/Sim' );
  var GravityForceLabModel = require( 'model/GravityForceLabModel' );
  var GravityForceLabView = require( 'view/GravityForceLabView' );

  // Resources
  var simTitle = require( 'string!GRAVITY_FORCE_LAB/gravity-force-lab.name' );

  var simOptions = {
    credits: 'PhET Development Team -\n' +
             'Software Development: Sam Reid, John Blanco, Chris Malley\n' +
             'Design Team: Carl Wieman, Trish Loeblein, Wendy Adams\n',
    thanks: 'Thanks -\n' +
            'Thanks to Mobile Learner Labs for working with the PhET development team to convert this simulation to HTML5.'
  };
  SimLauncher.launch( function() {
    //Create and start the sim
    new Sim( simTitle, [
      {
        name: simTitle,
        createModel: function() { return new GravityForceLabModel( 768, 504 ); },
        createView: function( model ) { return new GravityForceLabView( model ); },
        backgroundColor: "#FFFFFF"
      }
    ], simOptions ).start();
  } );
} );
