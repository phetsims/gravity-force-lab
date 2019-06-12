// Copyright 2018-2019, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const GravityForceLabA11yStrings = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabA11yStrings' );
  const GravityForceLabPositionDescriber = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/describers/GravityForceLabPositionDescriber' );
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

  class MassPDOMNode extends ISLCObjectPDOMNode {

    /**
     * @param {ISLCModel} model
     * @param {ISLCObject} thisObject
     * @param {MassDescriber} massDescriber
     * @param {ForceDescriber} forceDescriber
     * @param {GravityForceLabPositionDescriber} positionDescriber
     * @param {Object} [options]
     */
    constructor( model, thisObject, massDescriber, forceDescriber, positionDescriber, options ) {

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

      super( model, thisObject.enum, options );

      // @private
      this.object = thisObject; // {ISLCObject}

      // @protected
      this.objectEnum = thisObject.enum; // {ISLCObjectEnum}
      this.mass = massDescriber.getObjectFromEnum( this.objectEnum ); // {ISLCObject}
      this.massLabel = massDescriber.getObjectLabelFromEnum( this.objectEnum ); // {string}
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
      assert && assert( Object.getPrototypeOf( this.positionDescriber ) === GravityForceLabPositionDescriber.prototype,
        'unexpected positionDescriber instance, should be {GravityForceLabPositionDescriber} calling this function' );

      return StringUtils.fillIn( sizeAndPositionPatternString, {
        thisObjectLabel: this.massLabel,
        size: this.massDescriber.getMassSize( this.mass.valueProperty.get() ),
        massValue: this.getMassValue(),
        position: this.positionDescriber.getConvertedPosition( this.object ),
        unit: this.positionDescriber.unit
      } );
    }

    /**
     * @returns {string}
     * @private
     */
    getMassSphereString() {
      const pattern = ISLCObjectEnum.isObject1( this.objectEnum ) ? blueSpherePatternString : redSpherePatternString;
      return StringUtils.fillIn( pattern, { objectLabel: this.massLabel } );
    }
  }

  return gravityForceLab.register( 'MassPDOMNode', MassPDOMNode );
} );