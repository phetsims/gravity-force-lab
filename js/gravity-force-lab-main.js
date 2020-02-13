// Copyright 2013-2020, University of Colorado Boulder

/**
 * Main entry point for the 'Gravity Force Lab' sim.
 *
 * @author Anton Ulyanov (Mlearner)
 */
define( require => {
  'use strict';

  // modules
  const GravityForceLabConstants = require( 'GRAVITY_FORCE_LAB/GravityForceLabConstants' );
  const GravityForceLabKeyboardHelpContent = require( 'GRAVITY_FORCE_LAB/view/GravityForceLabKeyboardHelpContent' );
  const GravityForceLabModel = require( 'GRAVITY_FORCE_LAB/model/GravityForceLabModel' );
  const GravityForceLabScreenView = require( 'GRAVITY_FORCE_LAB/view/GravityForceLabScreenView' );
  const Screen = require( 'JOIST/Screen' );
  const Sim = require( 'JOIST/Sim' );
  const SimLauncher = require( 'JOIST/SimLauncher' );
  const Tandem = require( 'TANDEM/Tandem' );

  // constants
  const tandem = Tandem.ROOT;

  // strings
  const gravityForceLabTitleString = require( 'string!GRAVITY_FORCE_LAB/gravity-force-lab.title' );
  const keyboardHelpContent = new GravityForceLabKeyboardHelpContent();

  const simOptions = {
    credits: {
      softwareDevelopment: 'Michael Barlow, John Blanco, Aadish Gupta, Michael Kauzmann, Sam Reid',
      team: 'Wendy Adams, Trish Loeblein, Emily B. Moore, Ariel Paul, Noah Podolefsky, Amy Rouinfar, Taliesin Smith, ' +
            'Brianna Tomlinson, Carl Wieman',
      qualityAssurance: 'Jaspe Arias, Logan Bray, Steele Dalton, Bryce Griebenow, Elise Morgan, Liam Mulhall, Oliver ' +
                        'Orejola, Ben Roberts, Kathryn Woessner, Bryan Yoelin',
      graphicArts: 'Mariah Hermsmeyer',
      soundDesign: 'Ashton Morris',
      thanks: 'Thanks to Mobile Learner Labs for working with the PhET development team to convert this simulation to HTML5.'
    },
    keyboardHelpNode: keyboardHelpContent,
    accessibility: true
  };

  SimLauncher.launch( function() {

    const gravityForceLabScreenTandem = tandem.createTandem( 'gravityForceLabScreen' );

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
