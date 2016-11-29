// Copyright 2013-2015, University of Colorado Boulder

/**
 * The draggable horizontal ruler.
 *
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MovableDragHandler = require( 'SCENERY_PHET/input/MovableDragHandler' );
  var TandemNode = require( 'TANDEM/scenery/nodes/TandemNode' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var RulerNode = require( 'SCENERY_PHET/RulerNode' );

  // constants
  var RULER_WIDTH = 500;
  var RULER_HEIGHT = 50;

  // strings
  var unitsMetersString = require( 'string!GRAVITY_FORCE_LAB/units.meters' );

  /**
   * @param {GravityForceLabModel} model
   * @param {number} screenWidth
   * @param {number} screenHeight
   * @param {Tandem} tandem
   * @constructor
   */
  function GravityForceLabRuler( model, screenWidth, screenHeight, tandem ) {
    var self = this;
    TandemNode.call( this, { cursor: 'pointer', cssTransform: true, tandem: tandem } );
    var ruler = new RulerNode( RULER_WIDTH, RULER_HEIGHT, 50, [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10' ], unitsMetersString, {
      minorTicksPerMajorTick: 4,
      majorTickFont: new PhetFont( 16 ),
      unitsFont: new PhetFont( 10 ),
      unitsSpacing: 5
    } );
    this.addChild( ruler );

    model.rulerPositionProperty.link( function( value ) {
      ruler.translation = value;
    } );

    this.addInputListener( new MovableDragHandler( model.rulerPositionProperty, {
      dragBounds: new Bounds2( -self.width / 2, 0, screenWidth - self.width / 2, screenHeight - self.height ),
      tandem: tandem.createTandem( 'dragHandler' )
    } ) );
  }

  gravityForceLab.register( 'GravityForceLabRuler', GravityForceLabRuler );

  return inherit( TandemNode, GravityForceLabRuler );
} );
