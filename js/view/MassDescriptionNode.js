// Copyright 2018-2023, University of Colorado Boulder


import Multilink from '../../../axon/js/Multilink.js';
import ISLCObjectDescriptionNode from '../../../inverse-square-law-common/js/view/ISLCObjectDescriptionNode.js';
import ISLCObjectEnum from '../../../inverse-square-law-common/js/model/ISLCObjectEnum.js';
import merge from '../../../phet-core/js/merge.js';
import StringUtils from '../../../phetcommon/js/util/StringUtils.js';
import { Node } from '../../../scenery/js/imports.js';
import gravityForceLab from '../gravityForceLab.js';
import GravityForceLabStrings from '../GravityForceLabStrings.js';

const mass1AbbreviatedString = GravityForceLabStrings.mass1Abbreviated;
const mass2AbbreviatedString = GravityForceLabStrings.mass2Abbreviated;
const sizePatternString = GravityForceLabStrings.a11y.sizePattern;
const sizeAndDistancePatternString = GravityForceLabStrings.a11y.sizeAndDistancePattern;
const redSpherePatternString = GravityForceLabStrings.a11y.redSpherePattern;
const blueSpherePatternString = GravityForceLabStrings.a11y.blueSpherePattern;

class MassDescriptionNode extends ISLCObjectDescriptionNode {

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
    Multilink.multilink( [
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

    if ( model.forceValuesDisplayProperty ) {
      model.forceValuesDisplayProperty.link( () => {
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

gravityForceLab.register( 'MassDescriptionNode', MassDescriptionNode );
export default MassDescriptionNode;