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
  var Dimension2 = require( 'DOT/Dimension2' );
  var gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ISLCObjectControlPanel = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectControlPanel' );
  var MassDescriber = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/describers/MassDescriber' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );

  // strings
  var unitsKgString = require( 'string!GRAVITY_FORCE_LAB/units.kg' );

  // constants
  var TRACK_SIZE = new Dimension2( 170, 3 );
  var THUMB_SIZE = new Dimension2( 22, 42 );

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
    var massDescriber = MassDescriber.getDescriber();
    var options = {
      // panel options
      fill: '#FDF498',
      xMargin: 15,
      yMargin: 10,

      numberControlOptions: {

        arrowButtonOptions: {
          scale: 1
        },

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
          // accessibleValuePattern: valueKilogramsPatternString // {{value}} kilograms
          createAriaValueText: massDescriber.ariaValueTextCreator( massEnum )
        },

        numberDisplayOptions: {
          font: new PhetFont( 18 ),
          xMargin: 20,
          yMargin: 4
        },
        titleFont: new PhetFont( 24 )
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
