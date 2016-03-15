// Copyright 2013-2015, University of Colorado Boulder

/**
 * Main entry point for the 'Gravity Force Lab' sim.
 *
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var Screen = require( 'JOIST/Screen' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var Sim = require( 'JOIST/Sim' );
  var GravityForceLabModel = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/model/GravityForceLabModel' );
  var GravityForceLabScreenView = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/GravityForceLabScreenView' );

  // strings
  var gravityForceLabTitleString = require( 'string!GRAVITY_FORCE_LAB/gravity-force-lab.title' );

  var simOptions = {
    credits: {
      softwareDevelopment: 'John Blanco, Aadish Gupta, Sam Reid',
      team: 'Wendy Adams, Trish Loeblein, Ariel Paul, Noah Podolefsky, Amy Rouinfar, Carl Wieman',
      qualityAssurance: 'Steele Dalton, Bryce Griebenow, Elise Morgan, Oliver Orejola, Ben Roberts, Bryan Yoelin',
      thanks: 'Thanks to Mobile Learner Labs for working with the PhET development team to convert this simulation to HTML5.'
    }
  };

  SimLauncher.launch( function() {
    // create and start the sim
    new Sim( gravityForceLabTitleString, [
      new Screen( gravityForceLabTitleString, null,
        function() { return new GravityForceLabModel(); },
        function( model ) { return new GravityForceLabScreenView( model ); },
        { backgroundColor: '#FFFFFF' }
      )
    ], simOptions ).start();
  } );
} );
