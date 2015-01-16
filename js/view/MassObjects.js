// Copyright 2002-2013, University of Colorado Boulder

/**
 * view both mass object
 *
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var MassObject = require( 'view/MassObject' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );

  // strings
  var m1String = require( 'string!GRAVITY_FORCE_LAB/mass-1' );
  var m2String = require( 'string!GRAVITY_FORCE_LAB/mass-2' );

  /**
   * @param model
   * @constructor
   */
  function MassObjects( model ) {

    Node.call( this );
    this.addChild( new MassObject( {
      model: model,
      label: m1String,
      otherMassLabel: m2String,
      direction: "left",
      colorGradient: [ "#aaf", "#00f", "#66f" ],
      y: 250,
      x: model.locationX1Property,
      mass: model.mass1Property,
      massStepEvent: 'mass1Step',
      forceArrowHeight: 150
    } ) );
    this.addChild( new MassObject( {
      model: model,
      label: m2String,
      otherMassLabel: m1String,
      direction: "right",
      colorGradient: [ "#faa", "#f00", "#f66" ],
      y: 250,
      x: model.locationX2Property,
      mass: model.mass2Property,
      massStepEvent: 'mass2Step',
      forceArrowHeight: 200
    } ) );
  }

  inherit( Node, MassObjects );

  return MassObjects;
} );
