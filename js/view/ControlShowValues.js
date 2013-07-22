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
  var Node = require( 'SCENERY/nodes/Node' );
  var Strings = require( 'Strings' );

  function ControlShowValues( model, options ) {
    options = _.extend(
      {
        x: 0,
        y: 0,
        scale: 0.8,
        fill: '#eec227',
        fontSize: 18,
        xMargin: 10,
        yMargin: 10
      }, options );
    Node.call( this );
    var checkShowValuesText = new Text( Strings["GFL.showValues"], { fontSize: options.fontSize } ),
      checkShowValuesCheckBox = new CheckBox( checkShowValuesText, model.showValuesProperty, {} ),
      checkShowValues = new Panel( checkShowValuesCheckBox, { fill: options.fill, xMargin: options.xMargin, yMargin: options.yMargin, cursor: 'pointer', scale: options.scale } );
    this.addChild( checkShowValues );
    this.x = options.x;
    this.y = options.y;
  }

  inherit( Node, ControlShowValues );

  return ControlShowValues;
} );