// Copyright 2013-2015, University of Colorado Boulder

/**
 * slider and buttons for changing a mass
 *
 * @author Anton Ulyanov (Mlearner)
 * @author Aadish Gupta
 */
define( function( require ) {
  'use strict';

  // modules
  var ArrowButton = require( 'SCENERY_PHET/buttons/ArrowButton' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  var HSlider = require( 'SUN/HSlider' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var pattern0Value1UnitsString = require( 'string!GRAVITY_FORCE_LAB/pattern_0value_1units' );
  var unitsKgString = require( 'string!GRAVITY_FORCE_LAB/units.kg' );

  // constants
  var TRACK_SIZE = new Dimension2( 170, 3 );
  var THUMB_SIZE = new Dimension2( 22, 42 );

  /**
   * @param {String} titleString
   * @param {Property.<number>} massProperty
   * @param {Range} massRange
   * @param {Color} thumbColor
   * @param {Object} [options]
   * @constructor
   */
  function MassControl( titleString, massProperty, massRange, thumbColor, options ) {

    options = _.extend( {
      fill: '#FDF498',
      xMargin: 15,
      yMargin: 10,
      maxWidth: 224,
      minWidth: 224,
      resize: false
    }, options );

    var content = new Node();
    var slider = new HSlider( massProperty, massRange, {
      trackSize: TRACK_SIZE,
      trackFill: 'black',
      thumbSize: THUMB_SIZE,
      majorTickLength: ( THUMB_SIZE.height / 2 ) + ( TRACK_SIZE.height / 2 ) + 2,
      thumbFillEnabled: thumbColor.colorUtilsBrighter( 0.15 ),
      thumbFillHighlighted: thumbColor
    } );

    var tickLabelOptions = { font: new PhetFont( 14 ) };
    // major ticks
    slider.addMajorTick( massRange.min, new Text( massRange.min, tickLabelOptions ) );
    slider.addMajorTick( massRange.max, new Text( massRange.max, tickLabelOptions ) );

    var plusButton = new ArrowButton( 'right', function propertyPlus() {
      massProperty.set( Math.min( massProperty.get() + 1, massRange.max ) );
    } );

    var minusButton = new ArrowButton( 'left', function propertyMinus() {
      massProperty.set( Math.max( massProperty.get() - 1, massRange.min ) );
    } );

    var valueField = new Rectangle( 0, 0, 100, 30, 3, 3, {
      fill: '#FFF',
      stroke: 'black',
      lineWidth: 1,
      pickable: false
    } );

    var valueLabel = new Text( '', { font: new PhetFont( 18 ), pickable: false, maxWidth: valueField.width * 0.9 } );

    var title = new Text( titleString, {
      font: new PhetFont( 24 ),
      pickable: false,
      maxWidth: slider.width
    } );

    // rendering order
    content.addChild( valueField );
    content.addChild( valueLabel );
    content.addChild( title );
    content.addChild( slider );
    content.addChild( plusButton );
    content.addChild( minusButton );

    // relative layout, everything relative to the track
    valueField.centerX = slider.centerX;
    valueField.bottom = slider.top - 10; // value centered above the track
    valueLabel.centerX = valueField.centerX;
    valueLabel.centerY = valueField.centerY;
    title.centerX = valueField.centerX;
    title.bottom = valueField.top - 6; // title centered above the value
    plusButton.left = valueField.right + 10; // plus button to the right of the value
    plusButton.centerY = valueField.centerY;
    minusButton.right = valueField.left - 10; // minus button to the left of the value
    minusButton.centerY = valueField.centerY;
    slider.centerX = slider.centerX + 5; // empirically determined for positioning

    Panel.call( this, content, options );

    massProperty.link( function updateMass( value ) {
      valueLabel.text = StringUtils.format( pattern0Value1UnitsString, Math.floor( value ), unitsKgString );
      valueLabel.centerX = valueField.centerX; // keep the value centered in the field
      plusButton.enabled = ( Math.floor( value ) < massRange.max );
      minusButton.enabled = ( Math.floor( value ) > massRange.min );
    } );
  }

  gravityForceLab.register( 'MassControl', MassControl );

  return inherit( Panel, MassControl );
} );
