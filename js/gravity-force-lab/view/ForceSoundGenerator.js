// Copyright 2019, University of Colorado Boulder

/**
 * sound generator for changes to the force between two masses
 *
 * @author John Blanco (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const merge = require( 'PHET_CORE/merge' );
  const SoundClip = require( 'TAMBO/sound-generators/SoundClip' );

  // constants
  const FADE_START_DELAY = 0.2; // in seconds, time to wait before starting fade
  const FADE_TIME = 0.15; // in seconds, duration of fade out
  const DELAY_BEFORE_STOP = 0.1; // in seconds, amount of time from full fade to stop of sound, done to avoid glitches
  const PITCH_RANGE_IN_SEMI_TONES = 36;
  const PITCH_CENTER_OFFSET = 2;

  // sounds

  // The saturated sine loop is precisely optimized for good looping, which is why it is a .wav and not a .mp3 file
  const forceSound = require( 'sound!GRAVITY_FORCE_LAB/saturated-sine-loop-trimmed.wav' );

  class ForceSoundGenerator extends SoundClip {

    /**
     * @param {GFLBModel} model
     * @param {BooleanProperty} resetInProgressProperty
     * @param {Object} [options]
     * @constructor
     */
    constructor( model, options ) {

      options = merge( {
        initialOutputLevel: 0.7,
        loop: true,
        trimSilence: false
      }, options );

      // options checking
      assert && assert( !options || !options.loop || options.loop === true, 'must be a loop to work correctly' );

      super( forceSound, options );

      // @private {number} - the output level before fade out starts
      this.nonFadedOutputLevel = options.initialOutputLevel;

      // @private {number} - countdown time used for fade out
      this.fadeCountdownTime = 0;

      // start with the output level at zero so that the initial sound generation has a bit of fade in
      this.setOutputLevel( 0, 0 );

      // function for starting the force sound or adjusting the volume
      const forceListener = force => {

        if ( !model.resetInProgressProperty.value ) {

          // calculate the playback rate based on the amount of force, see the design document for detailed explanation
          const normalizedForce = Math.log( force / model.getMinForce() ) / Math.log( model.getMaxForce() / model.getMinForce() );
          const centerForce = normalizedForce - 0.5;
          const midiNote = PITCH_RANGE_IN_SEMI_TONES / 2 * centerForce + PITCH_CENTER_OFFSET;
          const playbackRate = Math.pow( 2, midiNote / 12 );

          this.setPlaybackRate( playbackRate );
          this.setOutputLevel( this.nonFadedOutputLevel );
          if ( !this.playing ) {
            this.play();
          }

          // reset the fade countdown
          this.fadeCountdownTime = FADE_START_DELAY + FADE_TIME + DELAY_BEFORE_STOP;
        }
      };
      model.forceProperty.lazyLink( forceListener );

      // @private {function}
      this.disposeForceSoundGenerator = () => { model.forceProperty.unlink( forceListener ); };
    }

    /**
     * @public
     */
    dispose() {
      this.disposeForceSoundGenerator();
      super.dispose();
    }

    /**
     * step this sound generator, used for fading out the sound in the absence of user interaction
     * @param dt
     */
    step( dt ) {
      if ( this.fadeCountdownTime > 0 ) {
        this.fadeCountdownTime = Math.max( this.fadeCountdownTime - dt, 0 );

        if ( this.fadeCountdownTime < FADE_TIME + DELAY_BEFORE_STOP && this.outputLevel > 0 ) {

          // the sound is fading out, adjust the output level
          const outputLevel = Math.max(
            ( this.fadeCountdownTime - DELAY_BEFORE_STOP ) / FADE_TIME * this.nonFadedOutputLevel,
            0
          );
          this.setOutputLevel( outputLevel );
        }

        // fade out complete, stop playback
        if ( this.fadeCountdownTime === 0 && this.isPlaying ) {
          this.stop( 0 );
        }
      }
    }

    /**
     * stop any in-progress sound generation
     * @public
     */
    reset() {
      this.stop();
      this.fadeCountdownTime = 0;
    }
  }

  gravityForceLab.register( 'ForceSoundGenerator', ForceSoundGenerator );

  return ForceSoundGenerator;
} );