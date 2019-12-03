// Copyright 2018-2019, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const GravityForceLabA11yStrings = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabA11yStrings' );
  const ISLCObjectEnum = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectEnum' );
  const ISLCObjectPDOMNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectPDOMNode' );
  const merge = require( 'PHET_CORE/merge' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Property = require( 'AXON/Property' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  // strings
  const mass1AbbreviatedString = require( 'string!GRAVITY_FORCE_LAB/mass1Abbreviated' );
  const mass2AbbreviatedString = require( 'string!GRAVITY_FORCE_LAB/mass2Abbreviated' );

  // a11y strings
  const sizePatternString = GravityForceLabA11yStrings.sizePattern.value;
  const sizeAndDistancePatternString = GravityForceLabA11yStrings.sizeAndDistancePattern.value;
  const redSpherePatternString = GravityForceLabA11yStrings.redSpherePattern.value;
  const blueSpherePatternString = GravityForceLabA11yStrings.blueSpherePattern.value;

  class MassDescriptionNode extends ISLCObjectPDOMNode {

    /**
     * @param {ISLCModel} model
     * @param {ISLCObject} thisObject
     * @param {MassDescriber} massDescriber
     * @param {ForceDescriber} forceDescriber
     * @param {GravityForceLabPositionDescriber} positionDescriber
     * @param {Object} [options]
     */
    constructor( model, thisObject, massDescriber, forceDescriber, positionDescriber, options ) {

      options = merge( {
        object1Label: mass1AbbreviatedString,
        object2Label: mass2AbbreviatedString
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

      // update the mass and position Node content whenever these dependencies change.
      Property.multilink( [
        model.forceProperty,
        model.constantRadiusProperty,

        // We need to link to these in addition to the forceProperty because of a listener order of ops issue found
        // in https://github.com/phetsims/gravity-force-lab-basics/issues/103
        model.object1.positionProperty,
        model.object2.positionProperty
      ], () => this.updateMassAndPositionElement() );

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
     * Update the mass and positions sentence in the PDOM Node, can be called on demand by subtypes.
     * @protected
     */
    updateMassAndPositionElement() {
      const sizeText = StringUtils.fillIn( sizePatternString, {
        thisObjectLabel: this.massLabel,
        massValue: this.getMassValue()
      } );

      this.massAndPositionNode.innerContent = StringUtils.fillIn( sizeAndDistancePatternString, {
        size: sizeText,
        distance: this.positionDescriber.getDistanceClause( this.objectEnum ),
        relativeSize: this.massDescriber.getRelativeSizeOrDensity( this.objectEnum ),
        otherObjectLabel: this.massDescriber.getOtherObjectLabelFromEnum( this.objectEnum )
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

  return gravityForceLab.register( 'MassDescriptionNode', MassDescriptionNode );
} );