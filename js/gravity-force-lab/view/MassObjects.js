// Copyright 2013-2015, University of Colorado Boulder

/**
 * view both mass object
 *
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var MassObject = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/MassObject' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );

  // strings
  var mass1String = require( 'string!GRAVITY_FORCE_LAB/mass-1' );
  var mass2String = require( 'string!GRAVITY_FORCE_LAB/mass-2' );

  // constants
  var yValue = 225;

  /**
   * @param model
   * @constructor
   */
  function MassObjects( model ) {

    Node.call( this );
    this.addChild( new MassObject( {
      model: model,
      label: mass1String,
      otherMassLabel: mass2String,
      direction: 'left',
      colorGradient: [ '#aaf', '#00f', '#66f' ],
      y: yValue,
      x: model.locationX1Property,
      mass: model.mass1Property,
      massStepEvent: 'mass1Step',
      forceArrowHeight: 125
    } ) );
    this.addChild( new MassObject( {
      model: model,
      label: mass2String,
      otherMassLabel: mass1String,
      direction: 'right',
      colorGradient: [ '#faa', '#f00', '#f66' ],
      y: yValue,
      x: model.locationX2Property,
      mass: model.mass2Property,
      massStepEvent: 'mass2Step',
      forceArrowHeight: 175
    } ) );
  }

  inherit( Node, MassObjects );

  return MassObjects;
} );
