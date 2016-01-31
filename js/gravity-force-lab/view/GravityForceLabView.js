// Copyright 2013-2015, University of Colorado Boulder

/**
 * main ScreenView container.
 *
 * @author Anton Ulyanov (Mlearner)
 * @author Aadish Gupta
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var ControlPanel = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/ControlPanel' );
  var GravityForceLabRuler = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/GravityForceLabRuler' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MassObjects = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/MassObjects' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Vector2 = require( 'DOT/Vector2' );

  function GravityForceLabView( model ) {
    ScreenView.call( this, { layoutBounds: new Bounds2( 0, 0, 768, 464 ) } );

    // Create the model-view transform.  The primary units used in the model
    // are meters, so significant zoom is used.  The multipliers for the 2nd
    // parameter can be used to adjust where the point (0, 0) in the model,
    // which is between the two masses
    var mvt = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( this.layoutBounds.width / 2, this.layoutBounds.height / 2  ),
      50 );

    this.mvt = mvt; // Make mvt available to descendant types.

    var controlPanel = new ControlPanel( model );
    this.addChild( controlPanel );
    controlPanel.right = this.layoutBounds.width - 15;
    controlPanel.bottom = this.layoutBounds.height - 15;

    this.addChild( new MassObjects( model, mvt ) );

    this.addChild( new GravityForceLabRuler( model, this.layoutBounds.width, this.layoutBounds.height ) );
  }

  inherit( ScreenView, GravityForceLabView );
  return GravityForceLabView;
} );
