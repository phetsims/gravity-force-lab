// Copyright 2002-2013, University of Colorado Boulder

/**
 * buttons and model control elements view
 *
 * Author: Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // Imports
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );
  var ControlShowValues = require( 'view/ControlShowValues' );
  var ControlMass = require( 'view/ControlMass' );

  // Resources
  var mass1String = require( 'string!GRAVITY_FORCE_LAB/mass1' );
  var mass2String = require( 'string!GRAVITY_FORCE_LAB/mass2' );

  /**
   * @param model
   * @constructor
   */
  function ControlPanel( model ) {

    Node.call( this, { scale: 0.9 } );

    var resetAllButton = new ResetAllButton( {
      listener: function() { model.reset(); },
      scale: 1.1
    } );
    var controlShowValues = new ControlShowValues( model );
    var controlMass1 = new ControlMass( mass1String, model.mass1Property, model.massRange );
    var controlMass2 = new ControlMass( mass2String, model.mass2Property, model.massRange );

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