// Copyright 2018, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const ForceDescriber = require( 'INVERSE_SQUARE_LAW_COMMON/view/describers/ForceDescriber' );
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  // const GravityForceLabA11yStrings = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabA11yStrings' );
  // const GravityForceLabForceDescriber = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/describers/GravityForceLabForceDescriber' );
  const ISLCObjectPDOMNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectPDOMNode' );
  const MassNodeDescriber = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/describers/MassNodeDescriber' );
  const Node = require( 'SCENERY/nodes/Node' );

  // strings
  const mass1AbbreviatedString = require( 'string!GRAVITY_FORCE_LAB/mass1Abbreviated' );
  const mass2AbbreviatedString = require( 'string!GRAVITY_FORCE_LAB/mass2Abbreviated' );

  class MassPDOMNode extends ISLCObjectPDOMNode {

    constructor( model, objectEnum, options ) {

      options = _.extend( {
        object1Label: mass1AbbreviatedString,
        object2Label: mass2AbbreviatedString
      }, options );

      const nodeDescriber = new MassNodeDescriber( model, objectEnum, options );
      const labelContent = nodeDescriber.getMassSphereString( objectEnum );
      options.a11yOptions = { labelContent };

      super( model, objectEnum, options );

      const forceDescriber = ForceDescriber.getDescriber();

      this.massAndPositionNode = new Node( { tagName: 'li' } );
      this.addChild( this.massAndPositionNode );

      this.linkToForceProperty( force => {
        const forceBetweenContent = forceDescriber.getForceBetweenAndVectorText( this.thisObjectLabel, this.otherObjectLabel );
        const forceMagnitudeContent = forceDescriber.getForceVectorMagnitudeText();
        const newContent = nodeDescriber.getSizeAndPositionItemText();

        this.forceBetweenAndVectorNode.innerContent = forceBetweenContent;
        this.forceVectorMagnitudeItemNode.innerContent = forceMagnitudeContent;
        this.massAndPositionNode.innerContent = newContent;
      } );

      if ( model.scientificNotationProperty ) {
        model.scientificNotationProperty.link( displayInScientificNotation => {
          this.forceVectorMagnitudeItemNode.innerContent = forceDescriber.getForceVectorMagnitudeText();
        } );
      }
    }
  }

  return gravityForceLab.register( 'MassPDOMNode', MassPDOMNode );
} );