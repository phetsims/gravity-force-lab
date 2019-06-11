// Copyright 2018-2019, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const GravityForceLabA11yStrings = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabA11yStrings' );
  const ISLCObjectEnum = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectEnum' );
  const ISLCObjectPDOMNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectPDOMNode' );
  const Node = require( 'SCENERY/nodes/Node' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  // strings
  const mass1AbbreviatedString = require( 'string!GRAVITY_FORCE_LAB/mass1Abbreviated' );
  const mass2AbbreviatedString = require( 'string!GRAVITY_FORCE_LAB/mass2Abbreviated' );

  // a11y strings
  const sizeAndPositionPatternString = GravityForceLabA11yStrings.sizeAndPositionPattern.value;
  const redSpherePatternString = GravityForceLabA11yStrings.redSpherePattern.value;
  const blueSpherePatternString = GravityForceLabA11yStrings.blueSpherePattern.value;

  // constants
  const { OBJECT_ONE } = ISLCObjectEnum;

  class MassPDOMNode extends ISLCObjectPDOMNode {

    /**
     * @param {ISLCModel} model
     * @param {ISLCObjectEnum} objectEnum
     * @param {MassDescriber} massDescriber
     * @param {ForceDescriber} forceDescriber
     * @param {PositionDescriber} positionDescriber
     * @param {Object} [options]
     */
    constructor( model, objectEnum, massDescriber, forceDescriber, positionDescriber, options ) {

      options = _.extend( {
        object1Label: mass1AbbreviatedString,
        object2Label: mass2AbbreviatedString,

        // function to be called in this constructor that will wire up the necessary listeners to update the
        // mass/position dynamic description for this Mass. This function will be called bound to "this" before calling.
        wireUpMassAndPositionUpdates: () => {
          model.forceProperty.link( () => {
            this.massAndPositionNode.innerContent = this.getSizeAndPositionItemText();
          } );
        }
      }, options );

      super( model, objectEnum, options );

      // @protected
      this.objectEnum = objectEnum; // {ISLCObjectEnum}
      this.mass = massDescriber.getObjectFromEnum( objectEnum ); // {ISLCObject}
      this.massLabel = massDescriber.getObjectLabelFromEnum( objectEnum ); // {string}
      this.positionDescriber = positionDescriber; // {PositionDescriber}
      this.massDescriber = massDescriber; // {MassDescriber}

      // set the accessibleName after member fields have been initialized
      this.labelContent = this.getMassSphereString();

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

    /**
     * @returns {string}
     * @protected
     */
    getMassValue() {
      return this.massDescriber.getFormattedMass( this.mass.valueProperty.get() );
    }

    /**
     * @returns {string}
     * @private
     */
    getSizeAndPositionItemText() {
      return StringUtils.fillIn( sizeAndPositionPatternString, {
        thisObjectLabel: this.massLabel,
        size: this.massDescriber.getMassSize( this.mass.valueProperty.get() ),
        massValue: this.getMassValue(),
        position: this.positionDescriber.getConvertedPositionFromEnum( this.objectEnum ),
        unit: this.positionDescriber.unit
      } );
    }

    /**
     * @returns {string}
     * @private
     */
    getMassSphereString() {
      const pattern = this.objectEnum === OBJECT_ONE ? blueSpherePatternString : redSpherePatternString;
      return StringUtils.fillIn( pattern, { objectLabel: this.massLabel } );
    }
  }

  return gravityForceLab.register( 'MassPDOMNode', MassPDOMNode );
} );