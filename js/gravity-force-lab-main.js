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
    Rectangle = require( 'SCENERY/nodes/Rectangle' ),
    GravityForceLabModel = require( 'model/GravityForceLabModel' ),
    GravityForceLabTabView = require( 'view/GravityForceLabTabView' ),
    gravityForceLabImages = require( 'gravity-force-lab-images' );

  var simOptions = {
    credits: 'PhET Development Team -\n' +
             'Software Development: Sam Reid\n' +
             'Design Team: Carl Wieman, Trish Loeblein, Wendy Adams\n',
    thanks: 'Thanks -\n' +
            'Thanks to Mobile Learner Labs for their work in converting this simulation to HTML5.'
  };
  SimLauncher.launch( gravityForceLabImages, function() {
    //Create and start the sim
    new Sim( Strings['GFL.name'], [
      {
        name: Strings['GFL.name'],
        createModel: function() { return new GravityForceLabModel( 768, 504 ); },
        createView: function( model ) { return new GravityForceLabTabView( model ); },
        backgroundColor: "#FFFFFF"
      }
    ], simOptions ).start();
  } );
} );
