/* eslint-disable */
import asyncLoader from '../../phet-core/js/asyncLoader.js';
import base64SoundToByteArray from '../../tambo/js/base64SoundToByteArray.js';
import WrappedAudioBuffer from '../../tambo/js/WrappedAudioBuffer.js';
import phetAudioContext from '../../tambo/js/phetAudioContext.js';

const soundURI = 'data:audio/mpeg;base64,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';
const soundByteArray = base64SoundToByteArray( phetAudioContext, soundURI );
const unlock = asyncLoader.createLock( soundURI );
const wrappedAudioBuffer = new WrappedAudioBuffer();

// safe way to unlock
let unlocked = false;
const safeUnlock = () => {
  if ( !unlocked ) {
    unlock();
    unlocked = true;
  }
};

const onDecodeSuccess = decodedAudio => {
  if ( wrappedAudioBuffer.audioBufferProperty.value === null ) {
    wrappedAudioBuffer.audioBufferProperty.set( decodedAudio );
    safeUnlock();
  }
};
const onDecodeError = decodeError => {
  console.warn( 'decode of audio data failed, using stubbed sound, error: ' + decodeError );
  wrappedAudioBuffer.audioBufferProperty.set( phetAudioContext.createBuffer( 1, 1, phetAudioContext.sampleRate ) );
  safeUnlock();
};
const decodePromise = phetAudioContext.decodeAudioData( soundByteArray.buffer, onDecodeSuccess, onDecodeError );
if ( decodePromise ) {
  decodePromise
    .then( decodedAudio => {
      if ( wrappedAudioBuffer.audioBufferProperty.value === null ) {
        wrappedAudioBuffer.audioBufferProperty.set( decodedAudio );
        safeUnlock();
      }
    } )
    .catch( e => {
      console.warn( 'promise rejection caught for audio decode, error = ' + e );
      safeUnlock();
    } );
}
export default wrappedAudioBuffer;