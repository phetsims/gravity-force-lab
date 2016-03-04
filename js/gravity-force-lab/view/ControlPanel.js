// Copyright 2013-2015, University of Colorado Boulder

/**
 * buttons and model control elements view
 *
 * Author: Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ControlShowValues = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/ControlShowValues' );
  var ControlMass = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/ControlMass' );

  // strings
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
      scale: 0.9
    } );
    var controlShowValues = new ControlShowValues( model );
    var controlMass1 = new ControlMass( mass1String, model.mass1.massProperty, model.massRange );
    var controlMass2 = new ControlMass( mass2String, model.mass2.massProperty, model.massRange );
    controlMass1.scale(0.8);
    controlMass2.scale(0.8);
    this.addChild( controlShowValues );
    this.addChild( controlMass1 );
    this.addChild( controlMass2 );
    this.addChild( resetAllButton );
    // init position element
    controlMass2.left = controlMass1.right + 50;
    controlShowValues.left = controlMass2.right + 50;
    resetAllButton.right = controlShowValues.right;
    resetAllButton.top = controlShowValues.bottom + 15;
  }

  inherit( Node, ControlPanel );

  return ControlPanel;
} );