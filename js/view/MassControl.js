// Copyright 2013-2022, University of Colorado Boulder

/**
 * Arrow buttons, slider and text box for editing the mass amount.
 *
 * @author Anton Ulyanov (Mlearner)
 * @author Aadish Gupta (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Property from '../../../axon/js/Property.js';
import Dimension2 from '../../../dot/js/Dimension2.js';
import Utils from '../../../dot/js/Utils.js';
import ISLCObjectControlPanel from '../../../inverse-square-law-common/js/view/ISLCObjectControlPanel.js';
import EnumerationDeprecated from '../../../phet-core/js/EnumerationDeprecated.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import nullSoundPlayer from '../../../tambo/js/shared-sound-players/nullSoundPlayer.js';
import gravityForceLab from '../gravityForceLab.js';
import GravityForceLabStrings from '../GravityForceLabStrings.js';

const unitsKgString = GravityForceLabStrings.units.kg;

// constants
const TRACK_SIZE = new Dimension2( 170, 3 );
const THUMB_SIZE = new Dimension2( 22, 42 );
const SliderDragState = EnumerationDeprecated.byKeys( [ 'NOT_DRAGGING', 'DRAGGING_VIA_POINTER', 'DRAGGING_VIA_KEYBOARD' ] );
const CONTROL_SCALE = 0.72;

class MassControl extends ISLCObjectControlPanel {

  /**
   * @param {string} titleString
   * @param {NumberProperty} valueProperty
   * @param {Range} massRange
   * @param {Color} thumbColor
   * @param {ISLCObjectEnum} massEnum
   * @param {Property[]} updateDescriptionProperties - Properties to monitor to keep descriptions up to date
   * @param {GravityForceLabAlertManager} alertManager
   * @param {MassDescriber} massDescriber
   * @param {Tandem} tandem
   */
  constructor( titleString, valueProperty, massRange, thumbColor, massEnum, updateDescriptionProperties,
               alertManager, massDescriber, tandem ) {

    let currentMass = valueProperty.value;

    super( titleString, unitsKgString, valueProperty, massRange, {
      // panel options
      fill: '#FDF498',
      xMargin: 9,
      yMargin: 9,

      numberControlOptions: {
        scale: CONTROL_SCALE, // scale down the control to fit the screen a bit better
        sliderOptions: {
          thumbSize: THUMB_SIZE,
          trackSize: TRACK_SIZE,
          majorTickLength: ( THUMB_SIZE.height / 2 ) + ( TRACK_SIZE.height / 2 ) + 2,
          minorTickSpacing: 0,
          thumbFill: thumbColor.colorUtilsBrighter( 0.15 ),
          thumbFillHighlighted: thumbColor.colorUtilsBrighter( 0.35 ),
          constrainValue: v => Utils.roundToInterval( v, 10 ),
          startDrag: event => {
            currentMass = valueProperty.value;
            if ( event.type === 'enter' || event.type === 'move' || event.type === 'down' ) {
              this.sliderDragStateProperty.set( SliderDragState.DRAGGING_VIA_POINTER );
            }
            else if ( event.type === 'keydown' ) {
              this.sliderDragStateProperty.set( SliderDragState.DRAGGING_VIA_KEYBOARD );
            }
          },
          endDrag: () => {
            this.sliderDragStateProperty.set( SliderDragState.NOT_DRAGGING );
          },

          // pdom
          keyboardStep: 50,
          roundToStepSize: true,
          pageKeyboardStep: 100,
          accessibleName: titleString,

          // on end interaction, if alert a special alert if the mass started at the min/max and didnt' change.
          a11yCreateContextResponseAlert: () => {

            // no change and at max or min
            if ( currentMass === valueProperty.value && ( currentMass === massRange.max || currentMass === massRange.min ) ) {
              return alertManager.alertMassMinMaxEdge( massEnum );
            }
            return null; // regular mass changed alerts come from model changes
          },
          a11yCreateAriaValueText: () => massDescriber.getMassAndUnit( massEnum )
        },
        titleNodeOptions: {
          font: new PhetFont( 24 ),
          phetioVisiblePropertyInstrumented: true
        },
        numberDisplayOptions: {
          textOptions: {
            font: new PhetFont( 18 )
          },
          xMargin: 20,
          yMargin: 4
        },
        arrowButtonOptions: {
          soundPlayer: nullSoundPlayer
        }
      },

      tickLabelOptions: {
        font: new PhetFont( 14 )
      },

      tandem: tandem
    } );

    // @public (read-only) - drag state of the slider
    this.sliderDragStateProperty = new Property( SliderDragState.NOT_DRAGGING );
  }
}

// statics
MassControl.SliderDragState = SliderDragState;

gravityForceLab.register( 'MassControl', MassControl );
export default MassControl;