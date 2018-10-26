// Copyright 2013-2018, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const GravityForceLabA11yStrings = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabA11yStrings' );
  const ISLCObjectEnum = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectEnum' );
  const ISLCObjectPDOMNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectPDOMNode' );
  const Node = require( 'SCENERY/nodes/Node' );

  // strings
  const mass1BlueSphereString = GravityForceLabA11yStrings.mass1BlueSphere.value;
  const mass2RedSphereString = GravityForceLabA11yStrings.mass2RedSphere.value;

  class MassPDOMNode extends ISLCObjectPDOMNode {

    constructor( model, objectEnum, stringManager, options ) {

      const labelContent = objectEnum === ISLCObjectEnum.OBJECT_ONE ? mass1BlueSphereString : mass2RedSphereString;
      options.a11yOptions = { labelContent };

      super( model, objectEnum, stringManager, options );

      this.massAndPositionNode = new Node( { tagName: 'li' } );
      this.addChild( this.massAndPositionNode );

      this.linkToForceProperty( force => {
        const newContent = stringManager.getSizeAndPositionItemText( this.thisObjectLabel );
        this.massAndPositionNode.innerContent = newContent;
      } );
    }
  }

  return gravityForceLab.register( 'MassPDOMNode', MassPDOMNode );
} );