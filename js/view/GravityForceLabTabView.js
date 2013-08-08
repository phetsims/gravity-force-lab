// Copyright 2002-2013, University of Colorado Boulder

/**
 * main TabView container.
 *
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  "use strict";
  var ControlPanel = require( 'view/ControlPanel' );
  var MassObjects = require( 'view/MassObjects' );
  var GravityForceLabRuler = require( 'view/GravityForceLabRuler' );
  var TabView = require( 'JOIST/TabView' );
  var inherit = require( 'PHET_CORE/inherit' );

  function GravityForceLabTabView( model ) {
    TabView.call( this, { renderer: 'svg' } );
    this.addChild( new ControlPanel( model ) );
    this.addChild( new MassObjects( model ) );
    this.addChild( new GravityForceLabRuler( model ) );
  }

  inherit( TabView, GravityForceLabTabView );
  return GravityForceLabTabView;
} );
