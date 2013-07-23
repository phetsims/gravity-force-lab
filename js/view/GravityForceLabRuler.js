// Copyright 2002-2013, University of Colorado Boulder

/**
 * Ruler Node.
 *
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  "use strict";
  var Strings = require( 'Strings' );
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var RulerNode = require( 'SCENERY_PHET/RulerNode' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );

  function GravityForceLabRuler( model ) {
    Node.call( this, { cursor: "pointer" } );
    var ruler = new RulerNode( 500, 50, 50, ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], Strings["GFL.unitMeters"], {minorTicksPerMajorTick: 4, unitsFont: '12px Arial' } );
    this.addChild( ruler );
    model.rulerProperty.link( function updateRulerLocation( value ) {
      ruler.x = model.ruler.x;
      ruler.y = model.ruler.y;
    } );

    var rulerClickOffset = {x: 0, y: 0};
    ruler.addInputListener( new SimpleDragHandler(
      {
        start: function( event ) {
          rulerClickOffset.x = ruler.globalToParentPoint( event.pointer.point ).x - event.currentTarget.x;
          rulerClickOffset.y = ruler.globalToParentPoint( event.pointer.point ).y - event.currentTarget.y;
        },
        drag: function( event ) {
          var x = ruler.globalToParentPoint( event.pointer.point ).x - rulerClickOffset.x,
            y = ruler.globalToParentPoint( event.pointer.point ).y - rulerClickOffset.y;
          model.ruler = { x: x, y: y };
        },
        translate: function() {
          // do nothing, override default behavior
        }
      } ) );
  }

  inherit( Node, GravityForceLabRuler );
  return GravityForceLabRuler;
} );