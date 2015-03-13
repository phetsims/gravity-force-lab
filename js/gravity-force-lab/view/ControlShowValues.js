// Copyright 2002-2013, University of Colorado Boulder

/**
 * Control ShowValue on/off view
 *
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var CheckBox = require( 'SUN/CheckBox' );
  var Text = require( 'SCENERY/nodes/Text' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );

  // strings
  var showValuesString = require( 'string!GRAVITY_FORCE_LAB/showValues' );

  /**
   * @param model
   * @param options
   * @constructor
   */
  function ControlShowValues( model, options ) {

    options = _.extend( {
      fill: '#FDF498',
      xMargin: 10,
      yMargin: 10,
      scale: 0.8
    }, options );

    var text = new Text( showValuesString, { font: new PhetFont( 18 ) } );
    var checkBox = new CheckBox( text, model.showValuesProperty, { cursor: 'pointer' } );

    Panel.call( this, checkBox, options );
  }

  inherit( Panel, ControlShowValues );

  return ControlShowValues;
} );