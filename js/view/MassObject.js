// Copyright 2002-2013, University of Colorado Boulder


/**
 * mass object view
 *
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var Matrix3 = require( 'DOT/Matrix3' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var RadialGradient = require( 'SCENERY/util/RadialGradient' );
  var LinearFunction = require( 'DOT/LinearFunction' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var Shape = require( 'KITE/Shape' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Strings = require( 'Strings' );
  var PullObject = require( 'view/PullObject' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  //constant
  var FORCE_MIN = ( 2.8287421332465277e-13 );
  var FORCE_MAX = ( 4.387797501643656e-8 );

  function MassObject( options ) {
    var thisNode = this;
    //Conversion functions
    var forceToArrow = new LinearFunction( FORCE_MIN, FORCE_MAX, 0, 120, true );
    var forceToImage = new LinearFunction( FORCE_MIN, FORCE_MAX, 0, 14, true );
    var massToScale = new LinearFunction( options.model.massRange.min, options.model.massRange.max, 0.05, 0.95, true );

    Node.call( this );
    var dragNode = new Node( { cursor: "pointer" } );
    var massCircle = new Node();
    var pull = new PullObject();
    if ( options.direction === "right" ) {
      pull.scale( -1, 1 );
    }
    massCircle.addChild( new Circle( options.radius, {
      fill: new RadialGradient( options.radius * 0.6, -options.radius * 0.6, 1, options.radius * 0.6, -options.radius * 0.6, options.radius )
        .addColorStop( 0, options.colorGradient[0] )
        .addColorStop( 1, options.colorGradient[1] )
    } ) );

    dragNode.addChild( pull );
    dragNode.addChild( massCircle );
    dragNode.addChild( new Circle( 2, { fill: "#000", pickable: false } ) );
    dragNode.addChild( new Text( options.label, { fontSize: 12, fill: "#000", x: -6.5, y: 16, pickable: false } ) );
    dragNode.addChild( new Text( options.label, { fontSize: 12, fill: "#fff", x: -7, y: 15, pickable: false } ) );

    this.addChild( dragNode );
    this.y = options.y;

    var arrow = new ArrowNode( 0, -options.height, 200, -options.height, 10, 10, 3, { stroke: null } );
    var arrowText = new Text( options.title, { fontSize: 16, fill: "#000", y: -options.height - 20 } );
    var arrowShape = new Shape();
    arrowShape.moveTo( 0, -4 );
    arrowShape.lineTo( 0, -options.height );
    this.addChild( new Path( {
      shape: arrowShape,
      stroke: "#FFF",
      lineDash: [4, 4],
      lineWidth: 2,
      x:0.5,
      y:0.5
    } ) );
    this.addChild( new Path( {
      shape: arrowShape,
      stroke: options.colorGradient[2],
      lineDash: [4, 4],
      lineWidth: 2
    } ) );

    this.addChild( arrowText );
    this.addChild( arrow );
    
    var forceDirtyFlag = true;
    var markForceDirty = function() {
      forceDirtyFlag = true;
    };

    // redraw view without shift
    var redrawForce = function() {
      if ( !forceDirtyFlag ) {
        return;
      }
      forceDirtyFlag = false;
      
      thisNode.x = options.x.get();
      //reset scale
      massCircle.matrix = new Matrix3();
      //set scale
      massCircle.scale( massToScale( options.mass.get() ) );

      if ( options.model.showValues ) {
        var forceStr = options.model.force.toFixed( 12 );
        forceStr = ( forceStr.substr( 0, 5 ) + " " + forceStr.substr( 5, 3 ) + " " + forceStr.substr( 8, 3 ) + " " + forceStr.substr( 11, 3 ) );
        arrowText.text = StringUtils.format( Strings['pattern_0title_1value_2units'], options.title, forceStr, Strings["GFL.unitN"] );
      }
      else {
        arrowText.text = options.title;
      }
      arrowText.centerX = 0;

      var arr = forceToArrow( options.model.force );
      if ( options.direction === "right" ) {
        arr *= -1;
      }

      arrow.path.shape = ArrowNode.createArrowShape( 0, -options.height, arr, -options.height, 3, 10, 10 );
      pull.setPull( Math.round( forceToImage( options.model.force ) ), (massCircle.width / 2) );
    };
        
    // redraw view with shift
    var redraw = function() {
      markForceDirty();
      var xMax = options.model.width;
      var xMin = 0;
      var sumRadius = options.radius * massToScale( options.model.mass1 ) + options.radius * massToScale( options.model.mass2 );
      if ( options.x.get() === options.model.locationX1 ) {
        xMax = options.model.locationX2 - sumRadius - 5;
      }
      if ( options.x.get() === options.model.locationX2 ) {
        xMin = options.model.locationX1 + sumRadius + 5;
      }
      var x = Math.max( Math.min( options.x.get(), xMax ), xMin );
      options.x.set( x );
    };
    options.mass.link( redraw );
    options.x.link( redraw );
    options.model.showValuesProperty.link( markForceDirty );
    options.model.forceProperty.link( markForceDirty );
    options.model.on( options.massStepEvent, redrawForce );
    redrawForce();

    var massClickXOffset;
    dragNode.addInputListener( new SimpleDragHandler(
      {
        start: function( event ) {
          massClickXOffset = dragNode.globalToParentPoint( event.pointer.point ).x - event.currentTarget.x;
        },
        drag: function( event ) {
          var x = thisNode.globalToParentPoint( event.pointer.point ).x - massClickXOffset;
          var xMax = options.model.width;
          var xMin = 0;
          x = Math.max( Math.min( x, xMax ), xMin );
          options.x.set( x );
        },
        translate: function() {
          // do nothing, override default behavior
        }
      } ) );
  }

  inherit( Node, MassObject );

  return MassObject;
} );
