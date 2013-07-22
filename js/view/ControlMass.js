// Copyright 2002-2013, University of Colorado Boulder

/**
 * Slider and button for changing a mass.
 *
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  var ArrowButton = require( 'view/ArrowButton' );
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
  var gravityForceLabImages = require( 'gravity-force-lab-images' );
  var Strings = require( 'Strings' );
  var Panel = require( 'SUN/Panel' );

  function Track( options ) {
    Rectangle.call( this, 0, 0, 170, 3, { cursor: 'pointer', fill: "black" } );
    var thisNode = this,
      positionToConcentration = new LinearFunction( 0, 170, 1, 100, true ),
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
  }

  inherit( Rectangle, Track );

  function TickLine() {
    Path.call( this, { shape: Shape.lineSegment( 0, 0, 0, 18 ), stroke: 'black', lineWidth: 1 } );
  }

  inherit( Path, TickLine );

  function TickLabel( value ) {
    Text.call( this, value, { fontSize: 14, fill: 'black' } );
  }

  inherit( Text, TickLabel );

  function Thumb( options ) {
    Node.call( this, { cursor: 'pointer' } );
    var thisNode = this,
      body = new Image( gravityForceLabImages.getImage( "slider.png" ) ),
      concentrationToPosition = new LinearFunction( 1, 100, 0, 170, true ),
      positionToConcentration = new LinearFunction( 0, 170, 1, 100, true ),
      clickXOffset;

    body.left = body.left - body.width / 2;
    body.top = body.top - body.height / 2;

    this.addChild( body );
    this.addInputListener( new SimpleDragHandler(
      {
        start: function( event ) {
          clickXOffset = thisNode.globalToParentPoint( event.pointer.point ).x - event.currentTarget.x;
        },
        drag: function( event ) {
          var x = thisNode.globalToParentPoint( event.pointer.point ).x - clickXOffset;
          x = Math.max( Math.min( x, 170 ), 1 );
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
        fill: '#eec227',
        fontSize: 16,
        xMargin: 10,
        yMargin: 10
      }, options );

    Node.call( this );

    var box = new Node(),
      track = new Track( options ),
      thumb = new Thumb( options ),
      plusButton = new ArrowButton( 'right', function() { options.property.set( Math.min( options.property.get() + 1, 100 ) ); } ),
      minusButton = new ArrowButton( 'left', function() { options.property.set( Math.max( options.property.get() - 1, 1 ) ); } ),
      valueLabel = new Text( "", { fontSize: 18, centerX: 85, y: -30 } );

    options.property.link( function( value ) {
      valueLabel.text = options.property.get() + " " + Strings["GFL.unitKg"];
      valueLabel.centerX = 85;
    } );

    box.addChild( new Rectangle( ( -thumb.width / 2 - 5 ), 0, ( track.width + thumb.width + 10 ), 1, {} ) );
    box.addChild( new Rectangle( 0, 0, 100, 30, 3, 3, { fill: "#FFF", stroke: 'black', lineWidth: 1, centerX: 85, centerY: -37 } ) );
    box.addChild( valueLabel );
    box.addChild( new Text( options.title, { fontSize: 24, centerX: 85, bottom: -55 } ) );
    box.addChild( new Path( { shape: Shape.lineSegment( 0, 0, 0, 18 ), stroke: 'black', lineWidth: 1 } ) );
    box.addChild( new Path( { shape: Shape.lineSegment( 170, 0, 170, 18 ), stroke: 'black', lineWidth: 1 } ) );
    box.addChild( new Text( "1", { fontSize: 14, top: 20, centerX: 0} ) );
    box.addChild( new Text( "100", { fontSize: 14, top: 20, centerX: 170 } ) );
    box.addChild( track );
    box.addChild( thumb );
    box.addChild( plusButton );
    box.addChild( minusButton );

    this.addChild( new Panel( box, { fill: options.fill, xMargin: options.xMargin, yMargin: options.yMargin, scale: options.scale } ) );

    minusButton.centerY = plusButton.centerY = -37;
    minusButton.left = 0;
    plusButton.right = 170;


  }

  inherit( Node, ControlMass );

  return ControlMass;
} )
;