// Copyright 2013-2019, University of Colorado Boulder

/**
 * Main entry point for the 'Gravity Force Lab' sim.
 *
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  const GravityForceLabConstants = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabConstants' );
  var GravityForceLabKeyboardHelpContent = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/GravityForceLabKeyboardHelpContent' );
  var GravityForceLabModel = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/model/GravityForceLabModel' );
  var GravityForceLabScreenView = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/GravityForceLabScreenView' );
  var Screen = require( 'JOIST/Screen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var Tandem = require( 'TANDEM/Tandem' );

  // constants
  var tandem = Tandem.rootTandem;

  // strings
  var gravityForceLabTitleString = require( 'string!GRAVITY_FORCE_LAB/gravity-force-lab.title' );
  var keyboardHelpContent = new GravityForceLabKeyboardHelpContent();

  var simOptions = {
    credits: {
      softwareDevelopment: 'John Blanco, Aadish Gupta, Sam Reid',
      team: 'Wendy Adams, Trish Loeblein, Ariel Paul, Noah Podolefsky, Amy Rouinfar, Carl Wieman',
      qualityAssurance: 'Steele Dalton, Bryce Griebenow, Elise Morgan, Oliver Orejola, Ben Roberts, Bryan Yoelin',
      thanks: 'Thanks to Mobile Learner Labs for working with the PhET development team to convert this simulation to HTML5.'
    },
    keyboardHelpNode: keyboardHelpContent,
    accessibility: true
  };

  SimLauncher.launch( function() {

    var gravityForceLabScreenTandem = tandem.createTandem( 'gravityForceLabScreen' );

    // create and start the sim
    new Sim( gravityForceLabTitleString, [
      new Screen(
        function() {
          return new GravityForceLabModel( gravityForceLabScreenTandem.createTandem( 'model' ) );
        },
        function( model ) {
          return new GravityForceLabScreenView( model, gravityForceLabScreenTandem.createTandem( 'view' ) );
        },
        {
          backgroundColorProperty: GravityForceLabConstants.BACKGROUND_COLOR_PROPERTY,
          tandem: gravityForceLabScreenTandem
        }
      )
    ], simOptions ).start();
  } );
} );
