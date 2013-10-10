// Copyright 2002-2013, University of Colorado Boulder

/*
 * RequireJS configuration file for the 'Gravity Force Lab' sim.
 * Paths are relative to the location of this file.
 *
 * @author Anton Ulyanov (Mlearner)
 */

require.config( {

  deps: ['gravity-force-lab-main'],

  paths: {

    // third party libs
    text: '../../sherpa/text',

    // plugins
    audio: '../../chipper/requirejs-plugins/audio',
    image: '../../chipper/requirejs-plugins/image',
    string: '../../chipper/requirejs-plugins/string',

    // PhET libs, uppercase names to identify them in require.js imports
    ASSERT: '../../assert/js',
    AXON: '../../axon/js',
    DOT: '../../dot/js',
    JOIST: '../../joist/js',
    KITE: '../../kite/js',
    NITROGLYCERIN: '../../nitroglycerin/js',
    PHET_CORE: '../../phet-core/js',
    PHETCOMMON: '../../phetcommon/js',
    SCENERY: '../../scenery/js',
    SCENERY_PHET: '../../scenery-phet/js',
    SUN: '../../sun/js',

    // this sim
    GRAVITY_FORCE_LAB: '.'
  },

  urlArgs: new Date().getTime()  // cache buster to make browser refresh load all included scripts
} );
