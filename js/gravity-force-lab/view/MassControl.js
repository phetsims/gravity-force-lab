// Copyright 2013-2018, University of Colorado Boulder

/**
 * Arrow buttons, slider and text box for editing the mass amount.
 *
 * @author Anton Ulyanov (Mlearner)
 * @author Aadish Gupta (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  // const ISLCA11yStrings = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCA11yStrings' );
  const GravityForceLabAlertManager = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/GravityForceLabAlertManager' );
  const Dimension2 = require( 'DOT/Dimension2' );
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const inherit = require( 'PHET_CORE/inherit' );
  const ISLCObjectControlPanel = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectControlPanel' );
  const MassDescriber = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/describers/MassDescriber' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );

  // strings
  const unitsKgString = require( 'string!GRAVITY_FORCE_LAB/units.kg' );
  // const valueKilogramsPatternString = ISLCA11yStrings.valueKilogramsPattern.value;

  // constants
  const TRACK_SIZE = new Dimension2( 170, 3 );
  const THUMB_SIZE = new Dimension2( 22, 42 );

  /**
   * @param {string} titleString
   * @param {Property.<number>} valueProperty
   * @param {Range} massRange
   * @param {Color} thumbColor
   * @param {Tandem} tandem
   * @constructor
   */
  // TODO: place tandem in options object
  function MassControl( titleString, valueProperty, massRange, thumbColor, massEnum, tandem ) {
    const massDescriber = MassDescriber.getDescriber();
    const alertManager = GravityForceLabAlertManager.getManager();
    const options = {
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
          thumbFillEnabled: thumbColor.colorUtilsBrighter( 0.15 ),
          thumbFillHighlighted: thumbColor.colorUtilsBrighter( 0.35 ),

          // a11y
          keyboardStep: 50,
          pageKeyboardStep: 100,
          accessibleName: titleString,
          // accessibleValuePattern: valueKilogramsPatternString, // {{value}} kilograms
          createAriaValueText: massDescriber.getAriaValueTextCreator( massEnum )
        },
        titleNodeOptions: { font: new PhetFont( 24 ) },
        numberDisplayOptions: {
          font: new PhetFont( 18 ),
          xMargin: 20,
          yMargin: 4
        }

      },

      numberControlListener: {
        focus() {
          alertManager.alertMassControlFocused();
        }
      },

      tickLabelOptions: {
        font: new PhetFont( 14 )
      },

      tandem: tandem
    };
    ISLCObjectControlPanel.call( this, titleString, unitsKgString, valueProperty, massRange, options );
  }

  gravityForceLab.register( 'MassControl', MassControl );

  return inherit( ISLCObjectControlPanel, MassControl );
} );
