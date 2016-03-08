// Copyright 2013-2015, University of Colorado Boulder

/**
 * ruler node
 *
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MovableDragHandler = require( 'SCENERY_PHET/input/MovableDragHandler' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var RulerNode = require( 'SCENERY_PHET/RulerNode' );

  // constants
  var RULER_WIDTH = 500;
  var RULER_HEIGHT = 50;

  // strings
  var unitsMetersString = require( 'string!GRAVITY_FORCE_LAB/units.meters' );

  /**
   * @param model
   * @constructor
   */
  function GravityForceLabRuler( model, screenWidth, screenHeight ) {
    var self = this;
    Node.call( this, { cursor: 'pointer', cssTransform: true } );
    var ruler = new RulerNode( RULER_WIDTH, RULER_HEIGHT, 50, [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10' ], unitsMetersString, {
      minorTicksPerMajorTick: 4,
      majorTickFont: new PhetFont( 16 ),
      unitsFont: new PhetFont( 10 ),
      unitsSpacing: 5
    } );
    this.addChild( ruler );

    model.rulerProperty.link( function ( value ) {
      ruler.x = value.x;
      ruler.y = value.y;
    } );

    this.addInputListener( new MovableDragHandler( model.rulerProperty, {
      dragBounds: new Bounds2( -self.width / 2, 0, screenWidth - self.width / 2, screenHeight - self.height )
    } ) );
  }

  inherit( Node, GravityForceLabRuler );
  return GravityForceLabRuler;
} );
