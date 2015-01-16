// Copyright 2002-2013, University of Colorado Boulder

/**
 * main ScreenView container.
 *
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  "use strict";

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var ControlPanel = require( 'view/ControlPanel' );
  var MassObjects = require( 'view/MassObjects' );
  var GravityForceLabRuler = require( 'view/GravityForceLabRuler' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var inherit = require( 'PHET_CORE/inherit' );

  function GravityForceLabView( model ) {
    ScreenView.call( this, { renderer: 'svg', layoutBounds: new Bounds2( 0, 0, 768, 504 ) } );
    this.addChild( new ControlPanel( model ) );
    this.addChild( new MassObjects( model ) );
    this.addChild( new GravityForceLabRuler( model ) );
  }

  inherit( ScreenView, GravityForceLabView );
  return GravityForceLabView;
} );
