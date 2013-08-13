// Copyright 2002-2013, University of Colorado Boulder

/**
 * Slider and button for changing a mass.
 *
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  var ArrowButton = require( 'SCENERY_PHET/ArrowButton' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearFunction = require( 'DOT/LinearFunction' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Shape = require( 'KITE/Shape' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Strings = require( 'Strings' );
  var Panel = require( 'SUN/Panel' );
  var FillHighlightListener = require( 'SCENERY_PHET/input/FillHighlightListener' );

  // constants
  var TRACK_SIZE = new Dimension2( 170, 3 );
  var THUMB_SIZE = new Dimension2( 22, 42 );
  var THUMB_FILL_ENABLED = 'rgb(50,145,184)';
  var THUMB_FILL_HIGHLIGHTED = 'rgb(71,207,255)';
  var THUMB_RADIUS = 0.25 * THUMB_SIZE.width;

  function Track( options ) {
    Rectangle.call( this, 0, 0, TRACK_SIZE.width, TRACK_SIZE.height, { cursor: 'pointer', fill: "black" } );
    var thisNode = this,
      positionToConcentration = new LinearFunction( 0, TRACK_SIZE.width, 1, 100, true ),
      handleEvent = function( event ) {
        options.property.set( Math.round( positionToConcentration( thisNode.globalToLocalPoint( event.pointer.point ).x ) ) );
      };
    this.addInputListener( new SimpleDragHandler(
      {
        start: function( event ) {
          handleEvent( event );
        },
        drag: function( event ) {
          handleEvent( event );
        },
        translate: function() {
          // do nothing, override default behavior
        }
      } ) );
    // increase the vertical hit area, so the track is easier to hit
    var hitAreaMargin = 8;
    thisNode.mouseArea = thisNode.touchArea = Shape.rectangle( 0, -hitAreaMargin, TRACK_SIZE.width, TRACK_SIZE.height + hitAreaMargin + hitAreaMargin );
  }

  inherit( Rectangle, Track );

  function TickLine() {
    Path.call( this, { shape: Shape.lineSegment( 0, 0, 0, 30 ), stroke: 'black', lineWidth: 1 } );
  }

  inherit( Path, TickLine );

  function TickLabel( value ) {
    Text.call( this, value, { fontSize: 14, fill: 'black' } );
  }

  inherit( Text, TickLabel );

  function Thumb( options ) {
    Node.call( this, { cursor: 'pointer' } );

    var thisNode = this,
      concentrationToPosition = new LinearFunction( 1, 100, 0, 170, true ),
      positionToConcentration = new LinearFunction( 0, 170, 1, 100, true ),
      clickXOffset;

    // draw the thumb
    var body = new Rectangle( -THUMB_SIZE.width / 2, -THUMB_SIZE.height / 2, THUMB_SIZE.width, THUMB_SIZE.height, THUMB_RADIUS, THUMB_RADIUS,
      { cursor: 'pointer', fill: THUMB_FILL_ENABLED, stroke: 'black', lineWidth: 1 } );
    var CENTER_LINE_Y_MARGIN = 3;
    body.addChild( new Path( {
      shape: Shape.lineSegment( 0, -( THUMB_SIZE.height / 2 ) + CENTER_LINE_Y_MARGIN, 0, ( THUMB_SIZE.height / 2 ) - CENTER_LINE_Y_MARGIN ),
      stroke: 'white' } ) );
    body.left = -body.width / 2;
    this.addChild( body );

    // make the thumb highlight
    body.addInputListener( new FillHighlightListener( THUMB_FILL_ENABLED, THUMB_FILL_HIGHLIGHTED ) );

    // touch area
    var dx = 0.25 * this.width;
    var dy = 0.5 * this.height;
    this.touchArea = Shape.rectangle( ( -this.width / 2 ) - dx, ( -this.height / 2 ) - dy, this.width + dx + dx, this.height + dy + dy );
    this.addInputListener( new SimpleDragHandler(
      {
        allowTouchSnag: true,
        start: function( event ) {
          clickXOffset = thisNode.globalToParentPoint( event.pointer.point ).x - event.currentTarget.x;
        },
        drag: function( event ) {
          var x = thisNode.globalToParentPoint( event.pointer.point ).x - clickXOffset;
          x = Math.max( Math.min( x, 170 ), 0 );
          options.property.set( Math.round( positionToConcentration( x ) ) );
        },
        translate: function() {
          // do nothing, override default behavior
        }
      } ) );
    options.property.link( function( concentration ) {
      thisNode.x = concentrationToPosition( concentration );
    } );
  }

  inherit( Node, Thumb );

  function ControlMass( options ) {
    options = _.extend(
      {
        title: Strings["GFL.mass1"],
        scale: 0.8,
        fill: '#FDF498',
        fontSize: 16,
        xMargin: 15,
        yMargin: 10
      }, options );

    Node.call( this );

    var box = new Node(),
      track = new Track( options ),
      thumb = new Thumb( options ),
      plusButton = new ArrowButton( 'right', function propertyPlus() { options.property.set( Math.min( options.property.get() + 1, 100 ) ); } ),
      minusButton = new ArrowButton( 'left', function propertyMinus() { options.property.set( Math.max( options.property.get() - 1, 1 ) ); } ),
      valueLabel = new Text( "", { fontSize: 18, centerX: 85, y: -38, pickable: false } );

    options.property.link( function updateMass( value ) {
      valueLabel.text = options.property.get() + " " + Strings["GFL.unitKg"];
      valueLabel.centerX = 85;
      plusButton.setEnabled( options.property.get() < 100 );
      minusButton.setEnabled( options.property.get() > 1 );
    } );

    box.addChild( new Rectangle( 0, 0, 100, 30, 3, 3, { fill: "#FFF", stroke: 'black', lineWidth: 1, centerX: 85, centerY: -45, pickable: false } ) );
    box.addChild( valueLabel );
    box.addChild( new Text( options.title, { fontSize: 24, centerX: 85, bottom: -63, pickable: false } ) );
    box.addChild( new Path( { shape: Shape.lineSegment( 0, 0, 0, 18 ), stroke: 'black', lineWidth: 1, pickable: false } ) );
    box.addChild( new Path( { shape: Shape.lineSegment( 170, 0, 170, 18 ), stroke: 'black', lineWidth: 1, pickable: false } ) );
    box.addChild( new Text( "1", { fontSize: 14, top: 20, centerX: 0, pickable: false } ) );
    box.addChild( new Text( "100", { fontSize: 14, top: 20, centerX: 170, pickable: false } ) );
    box.addChild( track );
    box.addChild( thumb );
    box.addChild( plusButton );
    box.addChild( minusButton );

    this.addChild( new Panel( box, { fill: options.fill, xMargin: options.xMargin, yMargin: options.yMargin, scale: options.scale, resize: false } ) );

    minusButton.centerY = plusButton.centerY = -45;
    minusButton.left = -10;
    plusButton.right = 180;
  }

  inherit( Node, ControlMass );

  return ControlMass;
} )
;
