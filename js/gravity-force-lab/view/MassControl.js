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
  var ISLCA11yStrings = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCA11yStrings' );
  var ISLCObjectControlPanel = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectControlPanel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );

  // strings
  var unitsKgString = require( 'string!GRAVITY_FORCE_LAB/units.kg' );
  var valueKilogramsPatternString = ISLCA11yStrings.valueKilogramsPattern.value;

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
  function MassControl( titleString, valueProperty, massRange, thumbColor, options, tandem ) {
    ISLCObjectControlPanel.call( this, titleString, unitsKgString, valueProperty, massRange, {

      // panel options
      fill: '#FDF498',
      xMargin: 15,
      yMargin: 10,

      numberControlOptions: {
        arrowButtonScale: 1,
        thumbSize: THUMB_SIZE,
        trackSize: TRACK_SIZE,
        titleFont: new PhetFont( 24 ),
        valueFont: new PhetFont( 18 ),
        valueXMargin: 20,
        valueYMargin: 4,
        majorTickLength: ( THUMB_SIZE.height / 2 ) + ( TRACK_SIZE.height / 2 ) + 2,
        minorTickSpacing: 0,
        thumbFillEnabled: thumbColor.colorUtilsBrighter( 0.15 ),
        thumbFillHighlighted: thumbColor.colorUtilsBrighter( 0.35 ),

        // a11y
        keyboardStep: 50,
        pageKeyboardStep: 100,
        accessibleName: titleString,
        accessibleValuePattern: valueKilogramsPatternString, // {{value}} kilograms
        onFocus: options.onFocus
      },

      tickLabelOptions: {
        font: new PhetFont( 14 )
      },

      tandem: tandem
    } );
  }

  gravityForceLab.register( 'MassControl', MassControl );

  return inherit( ISLCObjectControlPanel, MassControl );
} );
