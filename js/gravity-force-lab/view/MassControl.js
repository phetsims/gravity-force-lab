// Copyright 2013-2015, University of Colorado Boulder

/**
 * slider and buttons for changing a mass
 *
 * @author Anton Ulyanov (Mlearner)
 * @author Aadish Gupta (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var Dimension2 = require( 'DOT/Dimension2' );
  var gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );
  var NumberControl = require( 'SCENERY_PHET/NumberControl' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  // strings
  var pattern0Value1UnitsString = require( 'string!GRAVITY_FORCE_LAB/pattern_0value_1units' );
  var unitsKgString = require( 'string!GRAVITY_FORCE_LAB/units.kg' );

  // constants
  var TRACK_SIZE = new Dimension2( 170, 3 );
  var THUMB_SIZE = new Dimension2( 22, 42 );

  /**
   * @param {string} titleString
   * @param {Property.<number>} massProperty
   * @param {Range} massRange
   * @param {Color} thumbColor
   * @constructor
   */
  function MassControl( titleString, massProperty, massRange, thumbColor ) {

    // major ticks
    var tickLabelOptions = { font: new PhetFont( 14 ), pickable: false };

    var numberControl = new NumberControl( titleString, massProperty, massRange, {
      titleFont: new PhetFont( 24 ),
      valueFont: new PhetFont( 18 ),

      // Don't fill in the {0}, it will be filled in by NumberControl
      valuePattern: StringUtils.format( pattern0Value1UnitsString, '{0}', unitsKgString ),
      majorTicks: [ {
        value: massRange.min,
        label: new Text( massRange.min, tickLabelOptions )
      }, {
        value: massRange.max,
        label: new Text( massRange.max, tickLabelOptions )
      } ],
      layoutFunction: NumberControl.createLayoutFunction3(),
      thumbFillEnabled: thumbColor.colorUtilsBrighter( 0.15 ),
      thumbFillHighlighted: thumbColor,
      arrowButtonScale: 1,
      trackSize: TRACK_SIZE,
      trackFillEnabled: 'black',
      thumbSize: THUMB_SIZE,
      majorTickLength: ( THUMB_SIZE.height / 2 ) + ( TRACK_SIZE.height / 2 ) + 2,
      valueXMargin: 20,
      valueYMargin: 4,
      valueBackgroundStroke: 'black'
    } );

    Panel.call( this, numberControl, {
      fill: '#FDF498',
      xMargin: 15,
      yMargin: 10,
      maxWidth: 224,
      minWidth: 224,
      resize: false,
      align: 'right'
    } );
  }

  gravityForceLab.register( 'MassControl', MassControl );

  return inherit( Panel, MassControl );
} );
