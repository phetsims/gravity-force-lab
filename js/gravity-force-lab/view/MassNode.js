// Copyright 2013-2019, University of Colorado Boulder

/**
 * mass object view
 *
 * @author Anton Ulyanov (Mlearner)
 * @author Aadish Gupta (PhET Interactive Simulations)
 */

define( require => {
  'use strict';

  // modules
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const GravityForceLabConstants = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabConstants' );
  const ISLCObjectNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectNode' );
  const merge = require( 'PHET_CORE/merge' );
  const RadialGradient = require( 'SCENERY/util/RadialGradient' );
  const Shape = require( 'KITE/Shape' );
  const Tandem = require( 'TANDEM/Tandem' );

  // constants
  const ARROW_LABEL_COLOR_STRING = '#000';
  const MASS_NODE_Y_POSITION = 185;
  const MIN_ARROW_WIDTH = .1; // this way the force arrow never disappears when set to the minimum force (which isn't 0)
  const MAX_ARROW_WIDTH = 700;
  const FORCE_THRESHOLD_PERCENT = 1.6 * Math.pow( 10, -4 ); // the percent of force when we convert between the two arrow mappings

  class MassNode extends ISLCObjectNode {

    /**
     * @param {ISLCModel} model
     * @param {Mass} mass
     * @param {Bounds2} layoutBounds
     * @param {ModelViewTransform2} modelViewTransform
     * @param {ISLCAlertManager} alertManager
     * @param {ForceDescriber} forceDescriber
     * @param {GravityForceLabPositionDescriber} positionDescriber
     * @param {Object} [options]
     */
    constructor( model, mass, layoutBounds, modelViewTransform, alertManager, forceDescriber, positionDescriber, options ) {

      options = merge( {
        arrowNodeOptions: {
          arrowFill: ARROW_LABEL_COLOR_STRING,
          arrowLabelFill: ARROW_LABEL_COLOR_STRING,
          maxArrowWidth: MAX_ARROW_WIDTH,
          minArrowWidth: MIN_ARROW_WIDTH,
          backgroundFill: GravityForceLabConstants.BACKGROUND_COLOR_PROPERTY,
          forceThresholdPercent: FORCE_THRESHOLD_PERCENT,
          mapArrowWidthWithTwoFunctions: true
        },
        y: MASS_NODE_Y_POSITION,
        snapToNearest: GravityForceLabConstants.LOCATION_SNAP_VALUE,
        stepSize: GravityForceLabConstants.LOCATION_STEP_SIZE,

        // {function} - to support REGULAR and BASICS without duplicating too much code.
        finishWiringListeners: () => this.linkToScientificNotationProperty( model ),

        // phet-io
        tandem: Tandem.required
      }, options );

      super( model, mass, layoutBounds, modelViewTransform, alertManager, forceDescriber, positionDescriber, options );

      this.objectModel.radiusProperty.link( () => {

        // a11y - update the focusHighlight with the radius (Accessibility.js setter)
        this.focusHighlight = Shape.bounds( this.dragNode.bounds.dilated( 5 ) );

        // set the pointer and touch areas
        const pullerBounds = this.pullerNode.localToParentBounds( this.pullerNode.touchAreaBounds );
        this.mouseArea = Shape.xor( [ Shape.bounds( pullerBounds ), this.objectCircle.createCircleShape() ] );
        this.touchArea = this.mouseArea;
      } );

      this.addInputListener( {
        focus: () => {
          positionDescriber.lastMoveCloser = null;
        }
      } );

      options.finishWiringListeners();
    }

    /**
     * @override
     * @param {Color} baseColor
     */
    updateGradient( baseColor ) {
      const radius = this.modelViewTransform.modelToViewDeltaX( this.objectModel.radiusProperty.get() );
      this.objectCircle.fill = new RadialGradient(
        -radius * 0.6, -radius * 0.6, 1, -radius * 0.6, -radius * 0.6, radius )
        .addColorStop( 0, baseColor.colorUtilsBrighter( 0.5 ).toCSS() )
        .addColorStop( 1, baseColor.toCSS() );
      if ( this.model.constantRadiusProperty.get() ) {
        this.objectCircle.stroke = baseColor.colorUtilsDarker( 0.15 );
      }
      else {
        this.objectCircle.stroke = null;
      }
    }

    /**
     * Listener to set the readouts in appropriate scientific notation.
     * This listener is factored out in case subtypes want to call it when passing in options.
     * @param {GravityForceLabModel} model
     * @private
     */
    linkToScientificNotationProperty( model ) {
      model.scientificNotationProperty.link( scientificNotation => {
        this.setReadoutsInScientificNotation( scientificNotation );
      } );
    }
  }

  return gravityForceLab.register( 'MassNode', MassNode );
} );
