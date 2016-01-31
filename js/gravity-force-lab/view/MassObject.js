// Copyright 2013-2015, University of Colorado Boulder

/**
 * mass object view
 *
 * @author Anton Ulyanov (Mlearner)
 * @author Aadish Gupta
 */

define( function( require ) {
  'use strict';

  // modules
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var GravityForceLabModel = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/model/GravityForceLabModel' );
  var RadialGradient = require( 'SCENERY/util/RadialGradient' );
  var LinearFunction = require( 'DOT/LinearFunction' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var Shape = require( 'KITE/Shape' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Text = require( 'SCENERY/nodes/Text' );
  var PullObject = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/PullObject' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );

  // strings
  var forceDescriptionPatternTargetSourceString = require( 'string!GRAVITY_FORCE_LAB/force-description-pattern-target_source' );
  var forceDescriptionPatternTargetSourceValueString = require( 'string!GRAVITY_FORCE_LAB/force-description-pattern-target_source_value' );

  // constants
  var LABEL_MAX_WIDTH = 20; // empirically determined through testing with long strings

  /**
   * @param {Object} [options]
   * @constructor
   */
  function MassObject( model, massModel, screenWidth, screenHeight, mvt, options ) {
    var self = this;
    options = _.extend( {
      label: 'This Mass',
      otherMassName: 'Other Mass',
      direction: 'left', //direction mass
      colorGradient: [ '#aaf', '#00f', '#66f' ], //[<gradient mass light>, <gradient mass dark>, <color vertical line>]
      y: 250,
      forceArrowHeight: 150, // arrow height
      pullImagesCount: 15,
      arrowLength: 120
      //massRadius: 100 // radius of the mass when scale is 1.0
    }, options );

    var thisNode = this;
    //Conversion functions
    var forceToArrow = new LinearFunction( model.forceRange.min, model.forceRange.max, 0, options.arrowLength, true );
    var forceToImage = new LinearFunction( model.forceRange.min, model.forceRange.max, 0, options.pullImagesCount - 1, true );

    Node.call( this );
    var dragNode = new Node( { cursor: 'pointer' } );
    this.pull = new PullObject( { image_count: options.pullImagesCount } );
    if ( options.direction === 'right' ) {
      self.pull.scale( -1, 1 );
    }
    var radius = mvt.modelToViewDeltaX( massModel.radius );
    this.massCircle = new Circle( radius, {
      fill: new RadialGradient( radius * 0.6, -radius * 0.6, 1, radius * 0.6, -radius * 0.6, radius )
        .addColorStop( 0, options.colorGradient[ 0 ] )
        .addColorStop( 1, options.colorGradient[ 1 ] )
    } ) ;

    dragNode.addChild( this.pull );
    dragNode.addChild( this.massCircle );
    dragNode.addChild( new Circle( 20 ) ); // transparent pickable circle, to make small masses draggable
    dragNode.addChild( new Circle( 2, { fill: '#000', pickable: false } ) );
    var labelFont = new PhetFont( 12 );
    dragNode.addChild( new Text( options.label, {
      font: labelFont,
      fill: '#000',
      pickable: false,
      maxWidth: LABEL_MAX_WIDTH,
      centerX: 0,
      top: 4
    } ) );
    dragNode.addChild( new Text( options.label, {
      font: labelFont,
      fill: '#fff',
      pickable: false,
      maxWidth: LABEL_MAX_WIDTH,
      centerX: -0.5,
      top: 3.5
    } ) );

    this.addChild( dragNode );
    this.y = options.y;

    var arrowNode = new ArrowNode( 0, -options.forceArrowHeight, 200, -options.forceArrowHeight, {
      headHeight: 10,
      headWidth: 10,
      tailWidth: 3,
      stroke: null
    } );
    var arrowText = new Text( options.title, {
      font: new PhetFont( 16 ),
      fill: '#000',
      y: -options.forceArrowHeight - 20,
      maxWidth: 300 // empirically determined through testing with long strings
    } );
    var arrowShape = new Shape();
    arrowShape.moveTo( 0, -4 );
    arrowShape.lineTo( 0, -options.forceArrowHeight );
    this.addChild( new Path( arrowShape, {
      stroke: '#FFF',
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

    // redraw view without shift
    var redrawForce = function() {
      self.massCircle.setRadius( mvt.modelToViewDeltaX(massModel.radius));
      //self.massCircle.scale( massModel.radius );

      if ( model.showValues ) {
        var forceStr = model.force.toFixed( 12 );
        forceStr = ( forceStr.substr( 0, 5 ) + ' ' + forceStr.substr( 5, 3 ) + ' ' + forceStr.substr( 8, 3 ) + ' ' + forceStr.substr( 11, 3 ) );
        arrowText.text = StringUtils.format( forceDescriptionPatternTargetSourceValueString, options.label, options.otherMassLabel, forceStr );
      }
      else {
        arrowText.text = StringUtils.format( forceDescriptionPatternTargetSourceString, options.label, options.otherMassLabel );
      }
      arrowText.centerX = 0;

      var arr = forceToArrow( model.force );
      if ( options.direction === 'right' ) {
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
      self.pull.setPull( Math.round( forceToImage( model.force ) ), (self.massCircle.width / 2) );
    };

    massModel.positionProperty.link( function(prop) {
      thisNode.x = mvt.modelToViewX( prop );
    } );
    model.showValuesProperty.lazyLink( function(){
      redrawForce();
    });
    massModel.radiusProperty.lazyLink( function( ) {
      redrawForce();
    });
    model.forceProperty.lazyLink( function() {
      redrawForce();
    });
    redrawForce();


    var massClickXOffset;
    dragNode.addInputListener( new SimpleDragHandler(
      {
        start: function( event ) {
          massClickXOffset = dragNode.globalToParentPoint( event.pointer.point ).x - event.currentTarget.x;
        },
        drag: function( event ) {
          var x = thisNode.globalToParentPoint( event.pointer.point ).x - massClickXOffset;
          var xMax = screenWidth - self.massCircle.width/2 - self.pull.width;
          var xMin = self.massCircle.width/2 + self.pull.width;
          // for mass1 xMax is left boundary of
          var sumRadius = mvt.modelToViewDeltaX( model.mass1.radius ) + mvt.modelToViewDeltaX( model.mass2.radius );
          if ( massModel.position === model.mass1.position ) {
            xMax = mvt.modelToViewX(model.mass2.position) - sumRadius - mvt.modelToViewDeltaX( GravityForceLabModel.MinSeparationBetweenMasses );
          }
          if ( massModel.position === model.mass2.position ) {
            xMin = mvt.modelToViewX(model.mass1.position) + sumRadius + mvt.modelToViewDeltaX( GravityForceLabModel.MinSeparationBetweenMasses );
          }
          x = Math.max( Math.min( x, xMax ), xMin );
          massModel.positionProperty.set( mvt.viewToModelX(x) );
        }
      } ) );
  }

  inherit( Node, MassObject );

  return MassObject;
} );
