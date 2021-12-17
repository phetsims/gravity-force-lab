// Copyright 2019-2021, University of Colorado Boulder

/**
 * sound generator for mass changes
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../axon/js/BooleanProperty.js';
import merge from '../../../phet-core/js/merge.js';
import SoundClip from '../../../tambo/js/sound-generators/SoundClip.js';
import rubberBand_v3_mp3 from '../../sounds/rubberBand_v3_mp3.js';
import gravityForceLab from '../gravityForceLab.js';

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

    options = merge( {

      // {BooleanProperty} - When true, sounds are only played when a threshold is reached or crossed instead of on
      // every change of the massProperty value.  If used, the threshold values must also be provided.
      playBasedOnThresholdsProperty: null,

      // {number[]} - threshold value where sound should be played if playBasedOnThresholdsProperty's value is true
      thresholdValues: [],

      // pass through options
      rateChangesAffectPlayingSounds: false
    }, options );

    // parameter checking
    assert && assert(
      options.rateChangesAffectPlayingSounds === false,
      'rate changes should not affect playing mass sounds'
    );
    if ( options.playBasedOnThresholdsProperty ) {
      assert && assert( options.thresholdValues.length > 0, 'must supply thresholds if providing property' );
    }

    // if no property is provided, create one that is always false so that sounds are played on every change
    const playBasedOnThresholdsProperty = options.playBasedOnThresholdsProperty || new BooleanProperty( false );

    super( rubberBand_v3_mp3, options );

    // function for playing the mass sound
    const massListener = ( mass, previousMass ) => {

      // range checking
      assert && assert( massRange.contains( mass ), 'mass value out of range' );

      if ( !resetInProgressProperty.value ) {

        let playForThisChange;
        if ( playBasedOnThresholdsProperty.value ) {

          // only play if a threshold has been reached or crossed
          playForThisChange = _.some( options.thresholdValues, thresholdValue => {
            return mass === thresholdValue ||
                   ( mass > thresholdValue && previousMass < thresholdValue ) ||
                   ( mass < thresholdValue && previousMass > thresholdValue );
          } );
        }
        else {

          // play the sound on every change in this case
          playForThisChange = true;
        }

        if ( playForThisChange ) {

          // determine a playback rate based on the mass, see the design document for an explanation
          const normalizedMass = ( mass - massRange.min ) / ( massRange.max - massRange.min );
          const centerAndFlippedNormMass = ( ( 1 - normalizedMass ) - 0.5 );
          const midiNote = PITCH_RANGE_IN_SEMI_TONES / 2 * centerAndFlippedNormMass;
          const playbackRate = Math.pow( 2, midiNote / 12 );
          this.setPlaybackRate( playbackRate );
          this.play();
        }
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

export default MassSoundGenerator;