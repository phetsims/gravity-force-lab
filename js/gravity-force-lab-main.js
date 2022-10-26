// Copyright 2013-2022, University of Colorado Boulder

/**
 * Main entry point for the 'Gravity Force Lab' sim.
 *
 * @author Anton Ulyanov (Mlearner)
 */

import Screen from '../../joist/js/Screen.js';
import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import GravityForceLabConstants from './GravityForceLabConstants.js';
import GravityForceLabStrings from './GravityForceLabStrings.js';
import GravityForceLabModel from './model/GravityForceLabModel.js';
import GravityForceLabKeyboardHelpContent from './view/GravityForceLabKeyboardHelpContent.js';
import GravityForceLabScreenView from './view/GravityForceLabScreenView.js';

// constants
const tandem = Tandem.ROOT;

const gravityForceLabTitleStringProperty = GravityForceLabStrings[ 'gravity-force-lab' ].titleStringProperty;

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
  phetioDesigned: true
};

simLauncher.launch( () => {

  const gravityForceLabScreenTandem = tandem.createTandem( 'gravityForceLabScreen' );

  // create and start the sim
  new Sim( gravityForceLabTitleStringProperty, [
    new Screen(
      () => new GravityForceLabModel( gravityForceLabScreenTandem.createTandem( 'model' ) ),
      model => new GravityForceLabScreenView( model, gravityForceLabScreenTandem.createTandem( 'view' ) ),
      {
        backgroundColorProperty: GravityForceLabConstants.BACKGROUND_COLOR_PROPERTY,
        tandem: gravityForceLabScreenTandem,
        createKeyboardHelpNode: () => new GravityForceLabKeyboardHelpContent()
      }
    )
  ], simOptions ).start();
} );