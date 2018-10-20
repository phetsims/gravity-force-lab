// Copyright 2013-2018, University of Colorado Boulder

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
  var inherit = require( 'PHET_CORE/inherit' );
  var ISLCObjectNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectNode' );
  var RadialGradient = require( 'SCENERY/util/RadialGradient' );
  var Range = require( 'DOT/Range' );
  var Tandem = require( 'TANDEM/Tandem' );

  // constants
  var pullForceRange = new Range( ( 0.5e-10 ), ( 1.1e-6 ) ); // empirically determined for linear mapping of pull objects
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

    options = _.extend( {
      label: 'This Mass',
      otherObjectLabel: 'Other Mass',
      arrowFill: ARROW_LABEL_COLOR_STRING,
      arrowLabelFill: ARROW_LABEL_COLOR_STRING,
      y: MASS_NODE_Y_POSITION,
      snapToNearest: GravityForceLabConstants.LOCATION_SNAP_VALUE,

      // TODO: scale factor for the arrow so that it has requested size, calculate this if design team likes the feel,
      // see https://github.com/phetsims/inverse-square-law-common/issues/21
      maxArrowWidth: 300,

      tandem: Tandem.required
    }, options );

    // @private
    this.modelViewTransform = modelViewTransform;
    this.model = model;
    this.objectModel = massModel;

    ISLCObjectNode.call( this, model, massModel, layoutBounds, modelViewTransform, pullForceRange, options );

    var self = this;
    model.scientificNotationProperty.link( function( scientificNotation ) {
      self.setReadoutsInScientificNotation( scientificNotation );
    } );
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
    }
  } );
} );
