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

  // sounds

  // The saturated sine loop is precisely optimized for good looping, which is why it is a .wav and not a .mp3 file
  const forceSound = require( 'sound!GRAVITY_FORCE_LAB/saturated-sine-loop-trimmed.wav' );

  class ForceSoundGenerator extends SoundClip {

    /**
     * @param {NumberProperty} forceProperty
     * @param {Range} forceRange
     * @param {BooleanProperty} resetInProgressProperty
     * @param {Object} [options]
     * @constructor
     */
    constructor( forceProperty, forceRange, resetInProgressProperty, options ) {

      options = merge( {
        initialOutputLevel: 0.7,

        // {number} - number of octaves that the playback rate will span, larger numbers increase pitch range
        playbackRateSpanOctaves: 2,

        // {number} - Center offset of playback rate, positive numbers move the pitch range up, negative numbers move it
        // down, and a value of zero indicates no offset, so the pitch range will center around the inherent pitch of
        // the source loop.  This offset is added to the calculated playback rate, so a value of 1 would move the range
        // up an octave, -1 would move it down an octave, 0.5 would move it up a perfect fifth, etc.
        playbackRateCenterOffset: 0
      }, options );

      // these options must be set in order for the sound generation to work properly
      options.loop = true;
      options.trimSilence = false;

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

        if ( !resetInProgressProperty.value ) {

          // calculate the playback rate based on the amount of force, see the design document for detailed explanation
          const normalizedForce = Math.log( force / forceRange.min ) / Math.log( forceRange.max / forceRange.min );
          const playbackRate = Math.pow( 2, ( normalizedForce - 0.5 ) * options.playbackRateSpanOctaves ) +
                               options.playbackRateCenterOffset;

          this.setPlaybackRate( playbackRate );
          this.setOutputLevel( this.nonFadedOutputLevel );
          if ( !this.playing ) {
            this.play();
          }

          // reset the fade countdown
          this.fadeCountdownTime = FADE_START_DELAY + FADE_TIME + DELAY_BEFORE_STOP;
        }
      };
      forceProperty.lazyLink( forceListener );

      // @private {function}
      this.disposeForceSoundGenerator = () => { forceProperty.unlink( forceListener ); };
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