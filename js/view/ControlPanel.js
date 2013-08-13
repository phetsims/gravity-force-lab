// Copyright 2002-2013, University of Colorado Boulder

/**
 * buttons and model control elements view
 *
 * Author: Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ResetAllButton = require( 'view/ResetAllButton' );
  var Strings = require( 'Strings' );
  var ControlShowValues = require( 'view/ControlShowValues' );
  var ControlMass = require( 'view/ControlMass' );

  function ControlPanel( model ) {

    Node.call( this, { scale: 0.9 } );

    var resetAllButton = new Node( { scale: 0.8, children: [new ResetAllButton( function() { model.reset(); } )] } ),
      controlShowValues = new ControlShowValues( model ),
      controlMass1 = new ControlMass( Strings["GFL.mass1"], model.mass1Property, model.massRange ),
      controlMass2 = new ControlMass( Strings["GFL.mass2"], model.mass2Property, model.massRange );

    this.addChild( controlShowValues );
    this.addChild( controlMass1 );
    this.addChild( controlMass2 );
    this.addChild( resetAllButton );

    // init position element
    controlMass2.left = controlMass1.right + 50;
    controlShowValues.left = controlMass2.right + 50;
    resetAllButton.centerX = controlShowValues.centerX;
    resetAllButton.bottom = controlMass1.bottom;

    this.right = model.width - 15;
    this.bottom = model.height - 15;

  }

  inherit( Node, ControlPanel );

  return ControlPanel;
} );