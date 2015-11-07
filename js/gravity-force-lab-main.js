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
  var GravityForceLabView = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/GravityForceLabView' );

  // strings
  var simTitle = require( 'string!GRAVITY_FORCE_LAB/gravity-force-lab.title' );

  var simOptions = {
    credits: {
      softwareDevelopment: 'Sam Reid, John Blanco',
      team: 'Wendy Adams, Trish Loeblein, Noah Podolefsky, Carl Wieman',
      thanks: 'Thanks to Mobile Learner Labs for working with the PhET development team to convert this simulation to HTML5.'
    }
  };

  SimLauncher.launch( function() {
    //Create and start the sim
    new Sim( simTitle, [
      new Screen( simTitle, null,
        function() { return new GravityForceLabModel( 768, 504 ); },
        function( model ) { return new GravityForceLabView( model ); },
        { backgroundColor: '#FFFFFF' }
      )
    ], simOptions ).start();
  } );
} );
