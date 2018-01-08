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
  // var NumberControl = require( 'SCENERY_PHET/NumberControl' );
  // var Panel = require( 'SUN/Panel' );
  // var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  // var Text = require( 'SCENERY/nodes/Text' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var ISLCObjectControlPanel = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectControlPanel' );

  // strings
  // var pattern0Value1UnitsString = require( 'string!GRAVITY_FORCE_LAB/pattern_0value_1units' );
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
  function MassControl( titleString, valueProperty, massRange, thumbColor, tandem ) {

    // major ticks
    var tickLabelOptions = { font: new PhetFont( 14 ), pickable: false };

    // var numberControl = new NumberControl( titleString, valueProperty, massRange, {
    // titleFont: new PhetFont( 24 ),
    // valueFont: new PhetFont( 18 ),

    // Don't fill in the {0}, it will be filled in by NumberControl
    // valuePattern: StringUtils.format( pattern0Value1UnitsString, '{0}', unitsKgString ),
    // majorTicks: [ {
    //   value: massRange.min,
    //   label: new Text(
    //     massRange.min,
    //     _.extend( { tandem: tandem.createTandem( 'majorTickMinLabel' ) }, tickLabelOptions )
    //   )
    // }, {
    //   value: massRange.max,
    //   label: new Text(
    //     massRange.max,
    //     _.extend( { tandem: tandem.createTandem( 'majorTickMaxLabel' ) }, tickLabelOptions )
    //   )
    // } ],
    // layoutFunction: NumberControl.createLayoutFunction3( { xSpacing: 10 } ),
    // trackSize: TRACK_SIZE,
    // trackFillEnabled: 'black',
    // thumbSize: THUMB_SIZE,
    //   valueBackgroundStroke: 'black',
    //   valueBackgroundCornerRadius: 3,
    //   tickLabelSpacing: 2,
    //   tandem: tandem.createTandem( 'numberControl' )
    // } );


    ISLCObjectControlPanel.call( this, titleString, unitsKgString, valueProperty, massRange, {
      fill: '#FDF498',
      xMargin: 15,
      yMargin: 10,
      arrowButtonScale: 1,
      thumbSize: THUMB_SIZE,
      trackSize: TRACK_SIZE,
      titleFontSize: 24,
      valueFontSize: 18,
      valueXMargin: 20,
      valueYMargin: 4,
      majorTickLength: ( THUMB_SIZE.height / 2 ) + ( TRACK_SIZE.height / 2 ) + 2,
      minorTickSpacing: 0,
      thumbFillEnabled: thumbColor.colorUtilsBrighter( 0.15 ),
      thumbFillHighlighted: thumbColor,
      tickLabelOptions: tickLabelOptions,
      tandem: tandem
    } );
  }

  gravityForceLab.register( 'MassControl', MassControl );

  return inherit( ISLCObjectControlPanel, MassControl );
} );
