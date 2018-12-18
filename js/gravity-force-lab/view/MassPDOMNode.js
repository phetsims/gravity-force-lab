// Copyright 2018, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  // const GravityForceLabA11yStrings = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabA11yStrings' );
  const GravityForceLabForceDescriber = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/describers/GravityForceLabForceDescriber' );
  const ISLCObjectPDOMNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectPDOMNode' );
  const Node = require( 'SCENERY/nodes/Node' );

  // strings
  // const mass1BlueSphereString = GravityForceLabA11yStrings.mass1BlueSphere.value;
  // const mass2RedSphereString = GravityForceLabA11yStrings.mass2RedSphere.value;

  class MassPDOMNode extends ISLCObjectPDOMNode {

    constructor( model, objectEnum, stringManager, options ) {

      const labelContent = stringManager.getMassSphereString( objectEnum );
      options.a11yOptions = { labelContent };

      super( model, objectEnum, stringManager, options );

      const describer = GravityForceLabForceDescriber.getDescriber();
      this.massAndPositionNode = new Node( { tagName: 'li' } );
      this.addChild( this.massAndPositionNode );

      this.linkToForceProperty( force => {
        const forceBetweenContent = describer.getForceBetweenAndVectorText( this.thisObjectLabel, this.otherObjectLabel );
        const forceMagnitudeContent = describer.getForceVectorMagnitudeText();
        const newContent = stringManager.getSizeAndPositionItemText( this.thisObjectLabel );

        this.forceBetweenAndVectorNode.innerContent = forceBetweenContent;
        this.forceVectorMagnitudeItemNode.innerContent = forceMagnitudeContent;
        this.massAndPositionNode.innerContent = newContent;
      } );

      model.scientificNotationProperty && model.scientificNotationProperty.link( displayInScientificNotation => {
        this.forceVectorMagnitudeItemNode.innerContent = this.stringManager.getForceVectorMagnitudeText();
      } );
    }
  }

  return gravityForceLab.register( 'MassPDOMNode', MassPDOMNode );
} );