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
  var Circle = require( 'SCENERY/nodes/Circle' );
  var GravityForceLabModel = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/model/GravityForceLabModel' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearFunction = require( 'DOT/LinearFunction' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var PullObject = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/PullObject' );
  var RadialGradient = require( 'SCENERY/util/RadialGradient' );
  var Range = require( 'DOT/Range' );
  var Shape = require( 'KITE/Shape' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var forceDescriptionPatternTargetSourceString = require( 'string!GRAVITY_FORCE_LAB/force-description-pattern-target_source' );
  var forceDescriptionPatternTargetSourceValueString = require( 'string!GRAVITY_FORCE_LAB/force-description-pattern-target_source_value' );

  // constants
  var LABEL_MAX_WIDTH = 20; // empirically determined through testing with long strings
  var ARROW_LENGTH = 8; // empirically determined
  var PULL_IMAGES_COUNT = 15; // maximum number of images
  var pullForceRange = new Range( ( 0.5e-10 ), ( 1.1e-6 ) ); // empirically determined for linear mapping of pull objects
  var arrowForceRange = new Range( ( 6.0e-9 ), ( 4.1e-6 ) ); // empirically determined for linear mapping of pull objects
  var OFFSET = 10; // empirically determined to make sure minimum force doesn't go to zero when rounded to 12 significant digits

  /**
   * @param model
   * @param massModel
   * @param screenWidth
   * @param screenHeight
   * @param modelViewTransform
   * @param {Object} [options]
   * @constructor
   */
  function MassObject( model, massModel, screenWidth, screenHeight, modelViewTransform, options ) {
    var self = this;
    options = _.extend( {
      label: 'This Mass',
      otherMassName: 'Other Mass',
      direction: 'left', //direction mass
      arrowColor: '#66f', //color vertical line
      y: 250,
      forceArrowHeight: 150 // arrow height
    }, options );

    var thisNode = this;

    // conversion functions
    var forceToArrow = new LinearFunction( arrowForceRange.min, arrowForceRange.max, 1, 60, false );
    var forceToArrowMin = new LinearFunction( 0, arrowForceRange.min, 0, 1, false );
    var forceToImage = new LinearFunction( pullForceRange.min, pullForceRange.max, 0, PULL_IMAGES_COUNT - 1, true );

    Node.call( this );
    var dragNode = new Node( { cursor: 'pointer' } );
    this.pullerNode = new PullObject( { image_count: PULL_IMAGES_COUNT } );
    if ( options.direction === 'right' ) {
      self.pullerNode.scale( -1, 1 );
    }
    var radius = modelViewTransform.modelToViewDeltaX( massModel.radius );
    this.massCircle = new Circle( radius );

    dragNode.addChild( this.pullerNode );
    dragNode.addChild( this.massCircle );
    dragNode.addChild( new Circle( 2, { fill: '#000' } ) );
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
      stroke: options.arrowColor,
      lineDash: [ 4, 4 ],
      lineWidth: 2
    } ) );

    this.addChild( arrowText );
    this.addChild( arrowNode );

    // redraw view without shift
    var redrawForce = function() {
      self.massCircle.setRadius( modelViewTransform.modelToViewDeltaX( massModel.radius ) );
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

      var arrowLengthMultiplier;
      if ( model.force < arrowForceRange.min ){
        arrowLengthMultiplier = forceToArrowMin( model.force );
      }
      else{
        arrowLengthMultiplier = forceToArrow( model.force );
      }
      if ( options.direction === 'right' ) {
        arrowLengthMultiplier *= -1;
      }

      thisNode.removeChild( arrowNode );
      arrowNode = new ArrowNode( 0, -options.forceArrowHeight, arrowLengthMultiplier * ARROW_LENGTH, -options.forceArrowHeight, {
        headHeight: 8,
        headWidth: 8,
        tailWidth: 3,
        stroke: null
      } );
      thisNode.addChild( arrowNode );
      self.pullerNode.setPull( Math.round( forceToImage( model.force ) ), (self.massCircle.width / 2) );
    };

    massModel.positionProperty.link( function( prop ) {
      thisNode.x = modelViewTransform.modelToViewX( prop );
    } );
    model.showValuesProperty.lazyLink( function() {
      redrawForce();
    } );
    massModel.radiusProperty.lazyLink( function() {
      redrawForce();
    } );
    model.forceProperty.lazyLink( function() {
      redrawForce();
    } );
    massModel.baseColorProperty.link( function( baseColor ) {
      var radius = modelViewTransform.modelToViewDeltaX( massModel.radius );
      self.massCircle.fill = new RadialGradient( radius * 0.6, -radius * 0.6, 1, radius * 0.6, -radius * 0.6, radius )
        .addColorStop( 0, baseColor.colorUtilsBrighter( 0.5 ).toCSS() )
        .addColorStop( 1, baseColor.toCSS() );
      if ( model.constantRadius ) {
        self.massCircle.stroke = baseColor.colorUtilsDarker( 0.15 );
      }
      else{
        self.massCircle.stroke = null;
      }

    } );
    redrawForce();


    var massClickXOffset;
    dragNode.addInputListener( new SimpleDragHandler(
      {
        allowTouchSnag: true,
        start: function( event ) {
          massClickXOffset = dragNode.globalToParentPoint( event.pointer.point ).x - event.currentTarget.x;
        },
        drag: function( event ) {
          var x = thisNode.globalToParentPoint( event.pointer.point ).x - massClickXOffset;
          var xMax = screenWidth - self.massCircle.width / 2 - self.pullerNode.width - OFFSET;
          var xMin = OFFSET + self.massCircle.width / 2 + self.pullerNode.width;
          // for mass1 xMax is left boundary of
          var sumRadius = modelViewTransform.modelToViewDeltaX( model.mass1.radius ) + modelViewTransform.modelToViewDeltaX( model.mass2.radius );
          if ( massModel.position === model.mass1.position ) {
            xMax = modelViewTransform.modelToViewX( model.mass2.position ) - sumRadius - modelViewTransform.modelToViewDeltaX( GravityForceLabModel.MinSeparationBetweenMasses );
          }
          if ( massModel.position === model.mass2.position ) {
            xMin = modelViewTransform.modelToViewX( model.mass1.position ) + sumRadius + modelViewTransform.modelToViewDeltaX( GravityForceLabModel.MinSeparationBetweenMasses );
          }
          x = Math.max( Math.min( x, xMax ), xMin );
          massModel.positionProperty.set( modelViewTransform.viewToModelX( x ) );
        }
      } ) );
  }

  inherit( Node, MassObject );

  return MassObject;
} );
