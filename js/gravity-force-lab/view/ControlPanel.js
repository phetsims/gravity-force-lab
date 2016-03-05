// Copyright 2013-2015, University of Colorado Boulder

/**
 * buttons and model control elements view
 *
 * Author: Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var Color = require( 'SCENERY/util/Color' );
  var ControlMass = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/ControlMass' );
  var ControlShowValues = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/ControlShowValues' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );

  // strings
  var mass1String = require( 'string!GRAVITY_FORCE_LAB/mass1' );
  var mass2String = require( 'string!GRAVITY_FORCE_LAB/mass2' );

  // constants
  var CONSTANT_MASS_COLOR = new Color( 'indigo' );

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
    var controlMass1 = new ControlMass( mass1String, model.mass1.massProperty, model.massRange, model.mass1.baseColor );
    var controlMass2 = new ControlMass( mass2String, model.mass2.massProperty, model.massRange, model.mass2.baseColor );
    var controlMass1ConstantRadius = new ControlMass( mass1String, model.mass1.massProperty, model.massRange, CONSTANT_MASS_COLOR );
    var controlMass2ConstantRadius = new ControlMass( mass2String, model.mass2.massProperty, model.massRange, CONSTANT_MASS_COLOR );
    controlMass1.scale( 0.8 );
    controlMass2.scale( 0.8 );
    controlMass1ConstantRadius.scale( 0.8 );
    controlMass2ConstantRadius.scale( 0.8 );
    this.addChild( controlShowValues );
    this.addChild( controlMass1 );
    this.addChild( controlMass2 );
    this.addChild( controlMass1ConstantRadius );
    this.addChild( controlMass2ConstantRadius );
    this.addChild( resetAllButton );
    // init position element
    controlMass2.left = controlMass1.right + 50;
    controlShowValues.left = controlMass2.right + 50;
    controlMass1ConstantRadius.center = controlMass1.center;
    controlMass2ConstantRadius.center = controlMass2.center;
    resetAllButton.right = controlShowValues.right;
    resetAllButton.top = controlShowValues.bottom + 15;

    model.constantRadiusProperty.link( function( value ){
      if ( value ){
        controlMass1ConstantRadius.visible = true;
        controlMass2ConstantRadius.visible = true;
        controlMass1.visible = false;
        controlMass2.visible = false;
      }
      else{
        controlMass1ConstantRadius.visible = false;
        controlMass2ConstantRadius.visible = false;
        controlMass1.visible = true;
        controlMass2.visible = true;
      }
    } );
  }

  inherit( Node, ControlPanel );

  return ControlPanel;
} );