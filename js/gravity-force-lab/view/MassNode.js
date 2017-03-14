// Copyright 2013-2015, University of Colorado Boulder

/**
 * mass object view
 *
 * @author Anton Ulyanov (Mlearner)
 * @author Aadish Gupta (PhET Interactive Simulations)
 */

define( function( require ) {
  'use strict';

  // modules
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  var InverseSquareLawCommonConstants = require( 'INVERSE_SQUARE_LAW_COMMON/InverseSquareLawCommonConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearFunction = require( 'DOT/LinearFunction' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var PullerNode = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/PullerNode' );
  var RadialGradient = require( 'SCENERY/util/RadialGradient' );
  var RangeWithValue = require( 'DOT/RangeWithValue' );
  var Shape = require( 'KITE/Shape' );
  var TandemSimpleDragHandler = require( 'TANDEM/scenery/input/TandemSimpleDragHandler' );
  var Path = require( 'SCENERY/nodes/Path' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );

  // strings
  var forceDescriptionPatternTargetSourceString = require( 'string!GRAVITY_FORCE_LAB/force-description-pattern-target_source' );
  var forceDescriptionPatternTargetSourceValueString = require( 'string!GRAVITY_FORCE_LAB/force-description-pattern-target_source_value' );

  // constants
  var LABEL_MAX_WIDTH = 20; // empirically determined through testing with long strings
  var ARROW_LENGTH = 8; // empirically determined
  var PULL_IMAGES_COUNT = 15; // maximum number of images
  var pullForceRange = new RangeWithValue( ( 0.5e-10 ), ( 1.1e-6 ) ); // empirically determined for linear mapping of pull objects
  var arrowForceRange = new RangeWithValue( ( 6.0e-9 ), ( 4.1e-6 ) ); // empirically determined for linear mapping of pull objects
  var OFFSET = 10; // empirically determined to make sure minimum force doesn't go to zero when rounded to 12 significant digits
  var TEXT_OFFSET = 5; // empirically determined to make sure text does not go out of bounds

  /**
   * @param {GravityForceLabModel} model
   * @param {MassModel} massModel
   * @param {Bounds2} layoutBounds
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function MassNode( model, massModel, layoutBounds, modelViewTransform, tandem, options ) {
    var self = this;
    options = _.extend( {
      label: 'This Mass',
      otherMassName: 'Other Mass',
      direction: 'left', //direction mass
      arrowColor: '#66f', //color vertical line
      y: 250,
      forceArrowHeight: 150, // arrow height
      forceReadoutDecimalPlaces: 12, // number of decimal places in force readout
      snapToNearest: null // {number} if present, mass node will snap to the nearest snapToNearest on drag
    }, options );

    // conversion functions
    var forceToArrow = new LinearFunction( arrowForceRange.min, arrowForceRange.max, 1, 60, false );
    var forceToArrowMin = new LinearFunction( 0, arrowForceRange.min, 0, 1, false );
    var forceToImage = new LinearFunction( pullForceRange.min, pullForceRange.max, 0, PULL_IMAGES_COUNT - 1, true );

    Node.call( this, { tandem: tandem } );
    var dragNode = new Node( { cursor: 'pointer', tandem: tandem.createTandem( 'dragNode' ) } );
    this.pullerNode = new PullerNode( tandem.createTandem( 'pullerNode' ), { image_count: PULL_IMAGES_COUNT } );
    if ( options.direction === 'right' ) {
      self.pullerNode.scale( -1, 1 );
    }
    var radius = modelViewTransform.modelToViewDeltaX( massModel.radiusProperty.get() );
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
      top: 4,
      tandem: tandem.createTandem( 'labelShadowNode' )

    } ) );
    dragNode.addChild( new Text( options.label, {
      font: labelFont,
      fill: '#fff',
      pickable: false,
      maxWidth: LABEL_MAX_WIDTH,
      centerX: -0.5,
      top: 3.5,
      tandem: tandem.createTandem( 'labelNode' )
    } ) );

    this.addChild( dragNode );
    this.y = options.y;

    var arrowNode = new ArrowNode( 0, -options.forceArrowHeight, 200, -options.forceArrowHeight, {
      headHeight: 8,
      headWidth: 8,
      tailWidth: 3,
      stroke: null,
      tandem: tandem.createTandem( 'arrowNode' )
    } );
    var arrowText = new Text( options.title ? options.title : '', {
      font: new PhetFont( 16 ),
      fill: '#000',
      y: -options.forceArrowHeight - 20,
      maxWidth: 300, // empirically determined through testing with long strings
      tandem: tandem.createTandem( 'arrowText' )
    } );
    var markerLineShape = new Shape();
    markerLineShape.moveTo( 0, -4 );
    markerLineShape.lineTo( 0, -options.forceArrowHeight );
    this.addChild( new Path( markerLineShape, {
      stroke: '#FFF',
      lineDash: [ 4, 4 ],
      lineWidth: 2,
      x: 0.5,
      y: 0.5,
      tandem: tandem.createTandem( 'markerLineShadow' )
    } ) );
    this.addChild( new Path( markerLineShape, {
      stroke: options.arrowColor,
      lineDash: [ 4, 4 ],
      lineWidth: 2,
      tandem: tandem.createTandem( 'markerLine' )
    } ) );

    this.addChild( arrowText );
    this.addChild( arrowNode );

    var updateGradient = function( baseColor ) {
      var radius = modelViewTransform.modelToViewDeltaX( massModel.radiusProperty.get() );
      self.massCircle.fill = new RadialGradient( -radius * 0.6, -radius * 0.6, 1, -radius * 0.6, -radius * 0.6, radius )
        .addColorStop( 0, baseColor.colorUtilsBrighter( 0.5 ).toCSS() )
        .addColorStop( 1, baseColor.toCSS() );
      if ( model.constantRadiusProperty.get() ) {
        self.massCircle.stroke = baseColor.colorUtilsDarker( 0.15 );
      }
      else {
        self.massCircle.stroke = null;
      }
    };

    var setArrowTextPosition = function(){
      // making sure arrow text does not goes out of dev bounds
      arrowText.centerX = 0;
      if ( Math.floor( self.localToParentPoint( arrowText.center ).x - arrowText.width / 2 ) <= layoutBounds.left + TEXT_OFFSET ) {
        arrowText.left = self.parentToLocalBounds( layoutBounds ).left + TEXT_OFFSET;
      }

      if ( Math.ceil( self.localToParentPoint( arrowText.center ).x + arrowText.width / 2 ) >= layoutBounds.right - TEXT_OFFSET ) {
        arrowText.right = self.parentToLocalBounds( layoutBounds ).right - TEXT_OFFSET;
      }
    };
    // redraw view without shift
    var redrawForce = function() {
      self.massCircle.setRadius( modelViewTransform.modelToViewDeltaX( massModel.radiusProperty.get() ) );
      updateGradient( massModel.baseColorProperty.get() );

      // udpdate force readout
      if ( model.showValuesProperty.get() ) {

        var forceStr = Util.toFixed( model.forceProperty.get(), options.forceReadoutDecimalPlaces );

        // group values together so that they are easy to read
        var pointLocation = forceStr.indexOf( '.' );
        if ( pointLocation !== -1 ) {

          // the first group includes the values to the left of teh decimal, and first threee decimals
          var formattedString = forceStr.substr( 0, pointLocation + 4 );

          // remaining groups of three, separated by spaces
          for( var i = pointLocation + 4; i < forceStr.length; i+=3 ) {
            formattedString += ' ';
            formattedString += forceStr.substr( i, 3 );
          }

          arrowText.text = StringUtils.format( forceDescriptionPatternTargetSourceValueString, options.label, options.otherMassLabel, formattedString );
        }
        else {
          throw new Error( 'formatForceReadout requires a decimal value' );
        }
      }
      else {
        arrowText.text = StringUtils.format( forceDescriptionPatternTargetSourceString, options.label, options.otherMassLabel );
      }

      setArrowTextPosition();

      var arrowLengthMultiplier;
      if ( model.forceProperty.get() < arrowForceRange.min ) {
        arrowLengthMultiplier = forceToArrowMin( model.forceProperty.get() );
      }
      else {
        arrowLengthMultiplier = forceToArrow( model.forceProperty.get() );
      }
      if ( options.direction === 'right' ) {
        arrowLengthMultiplier *= -1;
      }

      arrowNode.setTailAndTip(
        0,
        -options.forceArrowHeight,
        arrowLengthMultiplier * ARROW_LENGTH,
        -options.forceArrowHeight
      );

      self.pullerNode.setPull( Util.roundSymmetric( forceToImage( model.forceProperty.get() ) ), (self.massCircle.width / 2) );
    };

    massModel.positionProperty.link( function( prop ) {
      self.x = modelViewTransform.modelToViewX( prop );
    } );

    model.showValuesProperty.lazyLink( redrawForce );
    massModel.radiusProperty.lazyLink( redrawForce );
    model.forceProperty.lazyLink( redrawForce );

    massModel.baseColorProperty.link( function( baseColor ) {
      updateGradient( baseColor );
    } );

    redrawForce();

    var massClickXOffset;
    dragNode.addInputListener( new TandemSimpleDragHandler( {
      allowTouchSnag: true,
      start: function( event ) {
        massClickXOffset = dragNode.globalToParentPoint( event.pointer.point ).x - event.currentTarget.x;
      },
      drag: function( event ) {

        // drag position relative to the pointer pointer start position
        var x = self.globalToParentPoint( event.pointer.point ).x - massClickXOffset;

        // absolute drag bounds (before considering the other mass)
        var xMax = layoutBounds.maxX - self.massCircle.width / 2 - self.pullerNode.width - OFFSET;
        var xMin = layoutBounds.minX + OFFSET + self.massCircle.width / 2 + self.pullerNode.width;

        // total radius in view coords
        var sumRadius = modelViewTransform.modelToViewDeltaX( model.object1.radiusProperty.get() ) +
                        modelViewTransform.modelToViewDeltaX( model.object2.radiusProperty.get() );

        // limit the drag bounds by the position of the other masss - mass 1 must be to the left of mass 2
        if ( massModel.positionProperty.get() === model.object1.positionProperty.get() ) {
          xMax = modelViewTransform.modelToViewX( model.object2.positionProperty.get() ) - sumRadius -
                 modelViewTransform.modelToViewDeltaX( InverseSquareLawCommonConstants.MIN_SEPARATION_BETWEEN_OBJECTS );
        }
        if ( massModel.positionProperty.get() === model.object2.positionProperty.get() ) {
          xMin = modelViewTransform.modelToViewX( model.object1.positionProperty.get() ) + sumRadius +
                 modelViewTransform.modelToViewDeltaX( InverseSquareLawCommonConstants.MIN_SEPARATION_BETWEEN_OBJECTS );
        }

        // apply limitations and update position
        x = Math.max( Math.min( x, xMax ), xMin ); // limited value of x (by boundary) in view coords

        // snap to nearest snapToNearest if specified
        if ( options.snapToNearest ) {

          // x in model coordinates
          var xModel = modelViewTransform.viewToModelX( x );
          var snappedX = Util.roundSymmetric( xModel / options.snapToNearest ) * options.snapToNearest;

          // back to view coordinates
          x = modelViewTransform.modelToViewX( snappedX );
        }

        massModel.positionProperty.set( Util.toFixedNumber( modelViewTransform.viewToModelX( x ), 3 ) );
      },
      tandem: tandem.createTandem( 'massDragHandler' )
    } ) );
  }

  gravityForceLab.register( 'MassNode', MassNode );

  return inherit( Node, MassNode );
} );
