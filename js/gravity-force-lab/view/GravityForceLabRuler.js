// Copyright 2013-2015, University of Colorado Boulder

/**
 * Ruler Node.
 *
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var RulerNode = require( 'SCENERY_PHET/RulerNode' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );

  // constants
  var RULER_WIDTH = 500;
  var RULER_HEIGHT = 50;
  // strings
  var unitsMetersString = require( 'string!GRAVITY_FORCE_LAB/units.meters' );

  /**
   * @param model
   * @constructor
   */
  function GravityForceLabRuler( model ) {
    var self = this;
    this.model = model;
    Node.call( this, { cursor: 'pointer', cssTransform: true } );
    var ruler = new RulerNode( RULER_WIDTH, RULER_HEIGHT, 50, [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10' ], unitsMetersString, {
      minorTicksPerMajorTick: 4,
      majorTickFont: new PhetFont( 16 ),
      unitsFont: new PhetFont( 10 ),
      unitsSpacing: 5
    } );
    this.addChild( ruler );
    model.rulerProperty.link( function updateRulerLocation( value ) {
      ruler.x = model.ruler.x;
      ruler.y = model.ruler.y;
    } );

    var rulerClickOffset = { x: 0, y: 0 };
    ruler.addInputListener( new SimpleDragHandler(
      {
        start: function( event ) {
          rulerClickOffset.x = ruler.globalToParentPoint( event.pointer.point ).x - event.currentTarget.x;
          rulerClickOffset.y = ruler.globalToParentPoint( event.pointer.point ).y - event.currentTarget.y;
        },
        drag: function( event ) {
          var maxX = self.model.width - self.width;
          var minX = 0;
          var maxY = self.model.height - self.height;
          var minY = 0;
          var x = ruler.globalToParentPoint( event.pointer.point ).x - rulerClickOffset.x;
          var y = ruler.globalToParentPoint( event.pointer.point ).y - rulerClickOffset.y;
          x = Math.max( Math.min( maxX, x ), minX );
          y = Math.max( Math.min( maxY, y ), minY );
          model.ruler = { x: x, y: y };
        }
      } ) );
  }

  inherit( Node, GravityForceLabRuler );
  return GravityForceLabRuler;
} );
