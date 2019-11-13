// Copyright 2019, University of Colorado Boulder

/**
 * MassBoundarySoundGenerator generates the sounds that indicate when the masses have reached their inner and outer motion
 * limits.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const SoundClip = require( 'TAMBO/sound-generators/SoundClip' );
  const SoundGenerator = require( 'TAMBO/sound-generators/SoundGenerator' );

  // sounds
  const innerBoundarySoundInfo = require( 'sound!GRAVITY_FORCE_LAB/scrunched-mass-collision-sonic-womp.mp3' );
  const outerBoundarySoundInfo = require( 'sound!TAMBO/boundary-reached.mp3' );

  class MassBoundarySoundGenerator extends SoundGenerator {

    /**
     * @param {ISLCObject} movableObject
     * @param {ISLCModel} model
     * @param {string} massSidePosition - 'left' or 'right' depending on the side of the sim where this mass appears
     * @param {Object} [options]
     */
    constructor( movableObject, model, massSidePosition, options ) {

      super( options );

      // parameter checking
      assert && assert( massSidePosition === 'left' || massSidePosition === 'right' );

      const innerBoundarySoundClip = new SoundClip( innerBoundarySoundInfo );
      innerBoundarySoundClip.connect( this.masterGainNode );
      const outerBoundarySoundClip = new SoundClip( outerBoundarySoundInfo );
      outerBoundarySoundClip.connect( this.masterGainNode );

      // function for playing the appropriate boundary sound
      const positionListener = position => {
        if ( !model.massWasPushed() ) {
          if ( position === model.getObjectMinPosition( movableObject ) ) {
            massSidePosition === 'left' ? outerBoundarySoundClip.play() : innerBoundarySoundClip.play();
          }
          else if ( position === model.getObjectMaxPosition( movableObject ) ) {
            massSidePosition === 'left' ? innerBoundarySoundClip.play() : outerBoundarySoundClip.play();
          }
        }
      };
      movableObject.positionProperty.link( positionListener );

      // @private {function}
      this.disposeBoundarySoundGenerator = () => { movableObject.positionProperty.unlink( positionListener ); };
    }

    /**
     * @public
     */
    dispose() {
      this.disposeBoundarySoundGenerator();
      super.dispose();
    }
  }

  gravityForceLab.register( 'MassBoundarySoundGenerator', MassBoundarySoundGenerator );

  return MassBoundarySoundGenerator;
} );