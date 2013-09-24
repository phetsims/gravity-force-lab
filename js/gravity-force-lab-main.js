// Copyright 2002-2013, University of Colorado Boulder

/**
 * Main entry point for the 'Gravity Force Lab' sim.
 *
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var SimLauncher = require( 'JOIST/SimLauncher' ),
    Sim = require( 'JOIST/Sim' ),
    Strings = require( 'Strings' ),
    GravityForceLabModel = require( 'model/GravityForceLabModel' ),
    GravityForceLabView = require( 'view/GravityForceLabView' );

  var simOptions = {
    credits: 'PhET Development Team -\n' +
             'Software Development: Sam Reid, John Blanco, Chris Malley\n' +
             'Design Team: Carl Wieman, Trish Loeblein, Wendy Adams\n',
    thanks: 'Thanks -\n' +
            'Thanks to Mobile Learner Labs for working with the PhET development team to convert this simulation to HTML5.'
  };
  SimLauncher.launch( function() {
    //Create and start the sim
    new Sim( Strings['GFL.name'], [
      {
        name: Strings['GFL.name'],
        createModel: function() { return new GravityForceLabModel( 768, 504 ); },
        createView: function( model ) { return new GravityForceLabView( model ); },
        backgroundColor: "#FFFFFF"
      }
    ], simOptions ).start();
  } );
} );
