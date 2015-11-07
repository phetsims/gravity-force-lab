// Copyright 2013-2015, University of Colorado Boulder

/**
 * main ScreenView container.
 *
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var ControlPanel = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/ControlPanel' );
  var MassObjects = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/MassObjects' );
  var GravityForceLabRuler = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/GravityForceLabRuler' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var inherit = require( 'PHET_CORE/inherit' );

  function GravityForceLabView( model ) {
    ScreenView.call( this, { layoutBounds: new Bounds2( 0, 0, 768, 504 ) } );
    this.addChild( new ControlPanel( model ) );
    this.addChild( new MassObjects( model ) );
    this.addChild( new GravityForceLabRuler( model ) );
  }

  inherit( ScreenView, GravityForceLabView );
  return GravityForceLabView;
} );
