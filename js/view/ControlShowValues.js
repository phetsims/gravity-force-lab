// Copyright 2002-2013, University of Colorado Boulder

/**
 * Control ShowValue on/off view
 *
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var CheckBox = require( 'SUN/CheckBox' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Strings = require( 'Strings' );

  function ControlShowValues( model, options ) {

    options = _.extend( {
      fill: '#FDF498',
      xMargin: 10,
      yMargin: 10,
      scale: 0.8
    }, options );

    var checkShowValuesCheckBox = new CheckBox( new Text( Strings["GFL.showValues"], { fontSize: 18 } ), model.showValuesProperty,
      { cursor: 'pointer' } );

    Panel.call( this, checkShowValuesCheckBox, options );
  }

  inherit( Panel, ControlShowValues );

  return ControlShowValues;
} );