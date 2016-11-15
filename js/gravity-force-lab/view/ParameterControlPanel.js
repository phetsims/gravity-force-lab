// Copyright 2013-2015, University of Colorado Boulder

/**
 * control that allows the user to show or hide the force values
 *
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var CheckBox = require( 'SUN/CheckBox' );
  var gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  var inherit = require( 'PHET_CORE/inherit' );
  var TandemNode = require( 'TANDEM/scenery/nodes/TandemNode' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Panel = require( 'SUN/Panel' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var constantRadiusString = require( 'string!GRAVITY_FORCE_LAB/constantRadius' );
  var showValuesString = require( 'string!GRAVITY_FORCE_LAB/showValues' );

  // constants
  var MAX_CAPTION_WIDTH = 120; // empirically determined through testing with long strings

  /**
   * @param {gravityForceLabModel} model
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function ParameterControlPanel( model, tandem, options ) {

    options = _.extend( {
      fill: '#FDF498',
      xMargin: 10,
      yMargin: 10,
      minWidth: 170,
      align: 'left',
      tandem: tandem
    }, options );

    var content = new TandemNode( { tandem: tandem.createTandem( 'content' ) } );
    var showValueText = new Text( showValuesString, { font: new PhetFont( 16 ), maxWidth: MAX_CAPTION_WIDTH } );
    var showValueCheckBox = new CheckBox(
      showValueText,
      model.showValuesProperty,
      { cursor: 'pointer', tandem: tandem.createTandem( 'showValueCheckBox' ) } );
    content.addChild( showValueCheckBox );

    var constantRadiusText = new Text( constantRadiusString, {
      font: new PhetFont( 16 ),
      maxWidth: MAX_CAPTION_WIDTH
    } );

    var constantRadiusCheckBox = new CheckBox(
      constantRadiusText,
      model.constantRadiusProperty,
      { cursor: 'pointer', tandem: tandem.createTandem( 'constantRadiusCheckBox' ) }
    );
    constantRadiusCheckBox.top = showValueCheckBox.bottom + 10;
    content.addChild( constantRadiusCheckBox );
    Panel.call( this, content, options );
  }

  gravityForceLab.register( 'ParameterControlPanel', ParameterControlPanel );

  return inherit( Panel, ParameterControlPanel );
} );