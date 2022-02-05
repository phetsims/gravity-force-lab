// Copyright 2019-2022, University of Colorado Boulder

/**
 * MassBoundarySoundGenerator generates the sounds that indicate when the masses have reached their inner and outer motion
 * limits.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import SoundClip from '../../../tambo/js/sound-generators/SoundClip.js';
import SoundGenerator from '../../../tambo/js/sound-generators/SoundGenerator.js';
import boundaryReached_mp3 from '../../../tambo/sounds/boundaryReached_mp3.js';
import scrunchedMassCollisionSonicWomp_mp3 from '../../sounds/scrunchedMassCollisionSonicWomp_mp3.js';
import gravityForceLab from '../gravityForceLab.js';

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

    const innerBoundarySoundClip = new SoundClip( scrunchedMassCollisionSonicWomp_mp3 );
    innerBoundarySoundClip.connect( this.soundSourceDestination );
    const outerBoundarySoundClip = new SoundClip( boundaryReached_mp3 );
    outerBoundarySoundClip.connect( this.soundSourceDestination );

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

export default MassBoundarySoundGenerator;