// Copyright 2019, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const MassPDOMNode = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/MassPDOMNode' );
  const Node = require( 'SCENERY/nodes/Node' );

  class GravityForceLabMassPDOMNode extends MassPDOMNode {

    /**
     * @param {GravityForceLabModel} model
     * @param {ISLCObjectEnum} objectEnum
     * @param {Object} options
     */
    constructor( model, objectEnum, options ) {
      super( model, objectEnum, options );

      // @private
      this.massAndPositionNode = new Node( { tagName: 'li' } );
      this.addChild( this.massAndPositionNode );

      this.linkToForceProperty( () => {
        this.massAndPositionNode.innerContent = this.nodeDescriber.getSizeAndPositionItemText();
      } );
    }
  }

  return gravityForceLab.register( 'GravityForceLabMassPDOMNode', GravityForceLabMassPDOMNode );
} );