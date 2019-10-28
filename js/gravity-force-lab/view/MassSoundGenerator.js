// Copyright 2019, University of Colorado Boulder

/**
 * sound generator for mass changes
 *
 * @author John Blanco (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const SoundClip = require( 'TAMBO/sound-generators/SoundClip' );
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );

  // sounds
  const massSound = require( 'sound!GRAVITY_FORCE_LAB/rubber-band-v3.mp3' );

  // constants
  const PITCH_RANGE_IN_SEMI_TONES = 30;

  class MassSoundGenerator extends SoundClip {

    /**
     * @param {NumberProperty} massProperty
     * @param {Range} massRange
     * @param {BooleanProperty} resetInProgressProperty
     * @param {Object} [options]
     * @constructor
     */
    constructor( massProperty, massRange, resetInProgressProperty, options ) {

      // Rate changes should never affect the mass sound that is already playing.
      options.rateChangesAffectPlayingSounds = false;

      super( massSound, options );

      // function for playing the mass sound
      const massListener = mass => {

        // range checking
        assert && assert( massRange.contains( mass ), 'mass value out of range' );

        if ( !resetInProgressProperty.value ) {

          // convert the mass to a playback rate, see the design document for an explanation
          const normalizedMass = ( mass - massRange.min ) / ( massRange.max - massRange.min );
          const centerAndFlippedNormMass = ( ( 1 - normalizedMass ) - 0.5 );
          const midiNote = PITCH_RANGE_IN_SEMI_TONES / 2 * centerAndFlippedNormMass;
          const playbackSpeed = Math.pow( 2, midiNote / 12 );
          this.setPlaybackRate( playbackSpeed );
          this.play();
        }
      };
      massProperty.lazyLink( massListener );

      // @private {function}
      this.disposeMassSoundGenerator = () => { massProperty.unlink( massListener ); };
    }

    /**
     * @public
     */
    dispose() {
      this.disposeMassSoundGenerator();
      super.dispose();
    }
  }

  gravityForceLab.register( 'MassSoundGenerator', MassSoundGenerator );

  return MassSoundGenerator;
} );