// Copyright 2013-2019, University of Colorado Boulder

/**
 * mass object view
 *
 * @author Anton Ulyanov (Mlearner)
 * @author Aadish Gupta (PhET Interactive Simulations)
 */

define( function( require ) {
  'use strict';

  // modules
  var gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  var GravityForceLabConstants = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabConstants' );
  var GravityForceLabPositionDescriber = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/describers/GravityForceLabPositionDescriber' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ISLCObjectNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectNode' );
  var RadialGradient = require( 'SCENERY/util/RadialGradient' );
  var Tandem = require( 'TANDEM/Tandem' );
  // var Util = require( 'DOT/Util' );

  // constants
  var ARROW_LABEL_COLOR_STRING = '#000';
  var MASS_NODE_Y_POSITION = 185;

  /**
   * @param {GravityForceLabModel} model
   * @param {MassModel} massModel
   * @param {Bounds2} layoutBounds
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Object} [options]
   * @constructor
   */
  function MassNode( model, massModel, layoutBounds, modelViewTransform, options ) {

    var self = this;

    options = _.extend( {
      label: 'This Mass',
      otherObjectLabel: 'Other Mass',
      arrowFill: ARROW_LABEL_COLOR_STRING,
      arrowLabelFill: ARROW_LABEL_COLOR_STRING,
      y: MASS_NODE_Y_POSITION,
      snapToNearest: GravityForceLabConstants.LOCATION_SNAP_VALUE,
      stepSize: GravityForceLabConstants.LOCATION_STEP_SIZE,
      maxArrowWidth: 300,
      tandem: Tandem.required
    }, options );

    ISLCObjectNode.call( this, model, massModel, layoutBounds, modelViewTransform, GravityForceLabConstants.PULL_FORCE_RANGE, options );
    model.scientificNotationProperty.link( function( scientificNotation ) {
      self.setReadoutsInScientificNotation( scientificNotation );
    } );

    this.resetAriaValueText();
  }

  gravityForceLab.register( 'MassNode', MassNode );

  return inherit( ISLCObjectNode, MassNode, {
    updateGradient: function( baseColor ) {
      var radius = this.modelViewTransform.modelToViewDeltaX( this.objectModel.radiusProperty.get() );
      this.objectCircle.fill = new RadialGradient( -radius * 0.6, -radius * 0.6, 1, -radius * 0.6, -radius * 0.6, radius )
        .addColorStop( 0, baseColor.colorUtilsBrighter( 0.5 ).toCSS() )
        .addColorStop( 1, baseColor.toCSS() );
      if ( this.model.constantRadiusProperty.get() ) {
        this.objectCircle.stroke = baseColor.colorUtilsDarker( 0.15 );
      }
      else {
        this.objectCircle.stroke = null;
      }
    },
    redrawForce: function() {
      ISLCObjectNode.prototype.redrawForce.call( this );
    },

    /**
     * @private
     */
    resetAriaValueText: function() {
      const positionDescriber = GravityForceLabPositionDescriber.getDescriber();
      if ( positionDescriber.objectAtEdge( this.enum ) ) {
        this.ariaValueText = positionDescriber.getEdgeValueText( this.enum );
      }
      else {
        this.ariaValueText = positionDescriber.getPositionAndDistanceFromOtherObjectText( this.enum );
      }
    }
  } );
} );
