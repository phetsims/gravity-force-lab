// Copyright 2002-2013, University of Colorado Boulder

/**
 * Control that allows the user to show or hide the force values.
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

  // constants
  var MAX_CAPTION_WIDTH = 120; // empirically determined through testing with long strings

  /**
   * @param model
   * @param {Object} [options]
   * @constructor
   */
  function ControlShowValues( model, options ) {

    options = _.extend( {
      fill: '#FDF498',
      xMargin: 10,
      yMargin: 10
    }, options );

    var text = new Text( showValuesString, { font: new PhetFont( 16 ), maxWidth: MAX_CAPTION_WIDTH } );
    var checkBox = new CheckBox( text, model.showValuesProperty, { cursor: 'pointer' } );
    Panel.call( this, checkBox, options );
  }

  inherit( Panel, ControlShowValues );

  return ControlShowValues;
} );