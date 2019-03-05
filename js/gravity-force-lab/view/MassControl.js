// Copyright 2013-2019, University of Colorado Boulder

/**
 * Arrow buttons, slider and text box for editing the mass amount.
 *
 * @author Anton Ulyanov (Mlearner)
 * @author Aadish Gupta (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const GravityForceLabAlertManager = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/GravityForceLabAlertManager' );
  const Dimension2 = require( 'DOT/Dimension2' );
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const ISLCObjectControlPanel = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectControlPanel' );
  const MassDescriber = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/describers/MassDescriber' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );

  // strings
  const unitsKgString = require( 'string!GRAVITY_FORCE_LAB/units.kg' );

  // constants
  const TRACK_SIZE = new Dimension2( 170, 3 );
  const THUMB_SIZE = new Dimension2( 22, 42 );

  class MassControl extends ISLCObjectControlPanel {

    /**
     * @param {string} titleString
     * @param {Property.<number>} valueProperty
     * @param {Range} massRange
     * @param {Color} thumbColor
     * @param {ISLCObjectEnum} massEnum
     * @param {Property.<number>} forceProperty - useful to update aria-valuetext of the number control.
     * @param {Tandem} tandem
     */
    constructor( titleString, valueProperty, massRange, thumbColor, massEnum, forceProperty, tandem ) {
      const massDescriber = MassDescriber.getDescriber();
      const alertManager = GravityForceLabAlertManager.getManager();

      // We only want the more verbose aria value text on focus, see https://github.com/phetsims/gravity-force-lab/issues/146
      const setOnFocusAriaValueText = () => {
        this.numberControl.ariaValueText = massDescriber.getVerboseMassAriaValueText( massEnum );
      };

      super( titleString, unitsKgString, valueProperty, massRange, {
        // panel options
        fill: '#FDF498',
        xMargin: 15,
        yMargin: 10,

        numberControlOptions: {
          sliderOptions: {
            thumbSize: THUMB_SIZE,
            trackSize: TRACK_SIZE,
            majorTickLength: ( THUMB_SIZE.height / 2 ) + ( TRACK_SIZE.height / 2 ) + 2,
            minorTickSpacing: 0,
            thumbFill: thumbColor.colorUtilsBrighter( 0.15 ),
            thumbFillHighlighted: thumbColor.colorUtilsBrighter( 0.35 ),

            // a11y
            keyboardStep: 50,
            pageKeyboardStep: 100,
            accessibleName: titleString,
            createAriaValueText: () => massDescriber.getMassAndUnit( massEnum )
          },
          titleNodeOptions: { font: new PhetFont( 24 ) },
          numberDisplayOptions: {
            font: new PhetFont( 18 ),
            xMargin: 20,
            yMargin: 4
          }

        },

        numberControlListener: {
          focus: () => alertManager.alertMassControlFocused(),

          // so the next time this control is focused, we have the proper verbose value text
          blur: () => setOnFocusAriaValueText()
        },

        tickLabelOptions: {
          font: new PhetFont( 14 )
        },

        tandem: tandem
      } );

      // Update the aria-valuetext whenever the force changes.
      forceProperty.link( () => setOnFocusAriaValueText() );
    }
  }

  return gravityForceLab.register( 'MassControl', MassControl );
} );
