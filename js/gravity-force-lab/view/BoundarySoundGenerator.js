// Copyright 2019, University of Colorado Boulder

/**
 * BoundarySoundGenerator generates the sounds that indicate when the masses have reached their inner and outer motion
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

  class BoundarySoundGenerator extends SoundGenerator {

    /**
     * @param {ISLCObject} movableObject
     * @param {ISLCModel} model
     * @param {Object} [options]
     */
    constructor( movableObject, model, options ) {

      super( options );

      const innerBoundarySoundClip = new SoundClip( innerBoundarySoundInfo );
      innerBoundarySoundClip.connect( this.masterGainNode );
      const outerBoundarySoundClip = new SoundClip( outerBoundarySoundInfo );
      outerBoundarySoundClip.connect( this.masterGainNode );

      // function for starting the force sound or adjusting the volume
      const positionListener = position => {
        if ( position === model.getObjectMinPosition( movableObject ) ) {
          innerBoundarySoundClip.play();
        }
        else if ( position === model.getObjectMaxPosition( movableObject ) ) {
          outerBoundarySoundClip.play();
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

  gravityForceLab.register( 'BoundarySoundGenerator', BoundarySoundGenerator );

  return BoundarySoundGenerator;
} );