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