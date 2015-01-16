// Copyright 2002-2013, University of Colorado Boulder


/**
 * mass object view
 *
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // Imports
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var Matrix3 = require( 'DOT/Matrix3' );
  var inherit = require( 'PHET_CORE/inherit' );
  var RadialGradient = require( 'SCENERY/util/RadialGradient' );
  var LinearFunction = require( 'DOT/LinearFunction' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var Shape = require( 'KITE/Shape' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Text = require( 'SCENERY/nodes/Text' );
  var PullObject = require( 'view/PullObject' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );

  // Resources
  var forceDescriptionPattern_target_source = require( 'string!GRAVITY_FORCE_LAB/force-description-pattern-target_source' );
  var forceDescriptionPattern_target_source_value = require( 'string!GRAVITY_FORCE_LAB/force-description-pattern-target_source_value' );

  /**
   * @param options
   * @constructor
   */
  function MassObject( options ) {
    options = _.extend( {
      label: "This Mass",
      otherMassName: "Other Mass",
      direction: "left", //direction mass
      colorGradient: [ "#aaf", "#00f", "#66f" ], //[<gradient mass light>, <gradient mass dark>, <color vertical line>]
      y: 250,
      forceArrowHeight: 150, // arrow height
      pullImagesCount: 15,
      arrowLength: 120,
      massRadius: 100 // radius of the mass when scale is 1.0
    }, options );

    var thisNode = this;
    //Conversion functions
    var forceToArrow = new LinearFunction( options.model.forceRange.min, options.model.forceRange.max, 0, options.arrowLength, true );
    var forceToImage = new LinearFunction( options.model.forceRange.min, options.model.forceRange.max, 0, options.pullImagesCount - 1, true );
    var massToScale = new LinearFunction( options.model.massRange.min, options.model.massRange.max, 0.05, 0.95, true );

    Node.call( this );
    var dragNode = new Node( { cursor: "pointer" } );
    var massCircle = new Node();
    var pull = new PullObject( { image_count: options.pullImagesCount } );
    if ( options.direction === "right" ) {
      pull.scale( -1, 1 );
    }

    massCircle.addChild( new Circle( options.massRadius, {
      fill: new RadialGradient( options.massRadius * 0.6, -options.massRadius * 0.6, 1, options.massRadius * 0.6, -options.massRadius * 0.6, options.massRadius )
        .addColorStop( 0, options.colorGradient[ 0 ] )
        .addColorStop( 1, options.colorGradient[ 1 ] )
    } ) );

    dragNode.addChild( pull );
    dragNode.addChild( massCircle );
    dragNode.addChild( new Circle( 20 ) ); // transparent pickable circle, to make small masses draggable
    dragNode.addChild( new Circle( 2, { fill: "#000", pickable: false } ) );
    var labelFont = new PhetFont( 12 );
    dragNode.addChild( new Text( options.label, { font: labelFont, fill: "#000", x: -6.5, y: 16, pickable: false } ) );
    dragNode.addChild( new Text( options.label, { font: labelFont, fill: "#fff", x: -7, y: 15, pickable: false } ) );

    this.addChild( dragNode );
    this.y = options.y;

    var arrowNode = new ArrowNode( 0, -options.forceArrowHeight, 200, -options.forceArrowHeight, {
      headHeight: 10,
      headWidth: 10,
      tailWidth: 3,
      stroke: null
    } );
    var arrowText = new Text( options.title, { font: new PhetFont( 16 ), fill: "#000", y: -options.forceArrowHeight - 20 } );
    var arrowShape = new Shape();
    arrowShape.moveTo( 0, -4 );
    arrowShape.lineTo( 0, -options.forceArrowHeight );
    this.addChild( new Path( arrowShape, {
      stroke: "#FFF",
      lineDash: [ 4, 4 ],
      lineWidth: 2,
      x: 0.5,
      y: 0.5
    } ) );
    this.addChild( new Path( arrowShape, {
      stroke: options.colorGradient[ 2 ],
      lineDash: [ 4, 4 ],
      lineWidth: 2
    } ) );

    this.addChild( arrowText );
    this.addChild( arrowNode );

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
      massCircle.matrix = Matrix3.identity();
      //set scale
      massCircle.scale( massToScale( options.mass.get() ) );

      if ( options.model.showValues ) {
        var forceStr = options.model.force.toFixed( 12 );
        forceStr = ( forceStr.substr( 0, 5 ) + " " + forceStr.substr( 5, 3 ) + " " + forceStr.substr( 8, 3 ) + " " + forceStr.substr( 11, 3 ) );
        arrowText.text = StringUtils.format( forceDescriptionPattern_target_source_value, options.label, options.otherMassLabel, forceStr );
      }
      else {
        arrowText.text = StringUtils.format( forceDescriptionPattern_target_source, options.label, options.otherMassLabel );
      }
      arrowText.centerX = 0;

      var arr = forceToArrow( options.model.force );
      if ( options.direction === "right" ) {
        arr *= -1;
      }

      thisNode.removeChild( arrowNode );
      arrowNode = new ArrowNode( 0, -options.forceArrowHeight, arr, -options.forceArrowHeight, {
        headHeight: 10,
        headWidth: 10,
        tailWidth: 3,
        stroke: null
      } );
      thisNode.addChild( arrowNode );
      pull.setPull( Math.round( forceToImage( options.model.force ) ), (massCircle.width / 2) );
    };

    // redraw view with shift
    var redraw = function() {
      markForceDirty();
      var xMax = options.model.width;
      var xMin = 0;
      var sumRadius = options.massRadius * massToScale( options.model.mass1 ) + options.massRadius * massToScale( options.model.mass2 );
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
        }
      } ) );
  }

  inherit( Node, MassObject );

  return MassObject;
} );
