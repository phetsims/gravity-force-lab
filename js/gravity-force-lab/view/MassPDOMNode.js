// Copyright 2018-2019, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const ForceDescriber = require( 'INVERSE_SQUARE_LAW_COMMON/view/describers/ForceDescriber' );
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const ISLCObjectPDOMNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectPDOMNode' );
  const MassNodeDescriber = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/describers/MassNodeDescriber' );
  const Node = require( 'SCENERY/nodes/Node' );

  // strings
  const mass1AbbreviatedString = require( 'string!GRAVITY_FORCE_LAB/mass1Abbreviated' );
  const mass2AbbreviatedString = require( 'string!GRAVITY_FORCE_LAB/mass2Abbreviated' );

  class MassPDOMNode extends ISLCObjectPDOMNode {

    /**
     * @param {ISLCModel} model
     * @param {ISLCObjectEnum} objectEnum
     * @param {MassDescriber} massDescriber
     * @param {ForceDescriber} forceDescriber
     * @param {Object} [options]
     */
    constructor( model, objectEnum, massDescriber, forceDescriber, options ) {

      options = _.extend( {
        object1Label: mass1AbbreviatedString,
        object2Label: mass2AbbreviatedString,

        // function to be called in this constructor that will wire up the necessary listeners to update the
        // mass/position dynamic description for this Mass. This function will be called bound to "this" before calling.
        wireUpMassAndPositionUpdates: () => {
          model.forceProperty.link( () => {
            this.massAndPositionNode.innerContent = this.nodeDescriber.getSizeAndPositionItemText();
          } );
        }
      }, options );

      const nodeDescriber = new MassNodeDescriber( model, objectEnum, massDescriber, options );
      options.labelContent = nodeDescriber.getMassSphereString();

      super( model, objectEnum, options );


      // @protected
      this.nodeDescriber = nodeDescriber;
      this.massAndPositionNode = new Node( { tagName: 'li' } );

      this.addChild( this.massAndPositionNode );

      // call the function responsible for updating the mass/position bullet in the PDOM.
      options.wireUpMassAndPositionUpdates.call( this );

      model.forceProperty.link( () => {
        const forceBetweenContent = forceDescriber.getForceBetweenAndVectorText( this.thisObjectLabel, this.otherObjectLabel );
        const forceMagnitudeContent = forceDescriber.getForceVectorMagnitudeText( this.thisObjectLabel, this.otherObjectLabel );

        this.forceBetweenAndVectorNode.innerContent = forceBetweenContent;
        this.forceVectorMagnitudeItemNode.innerContent = forceMagnitudeContent;
      } );

      if ( model.scientificNotationProperty ) {
        model.scientificNotationProperty.link( () => {
          this.forceVectorMagnitudeItemNode.innerContent = forceDescriber.getForceVectorMagnitudeText( this.thisObjectLabel, this.otherObjectLabel );
        } );
      }
    }
  }

  return gravityForceLab.register( 'MassPDOMNode', MassPDOMNode );
} );