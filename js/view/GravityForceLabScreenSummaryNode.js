// Copyright 2018-2021, University of Colorado Boulder

/**
 * A node to control the PDOM content for the Screen Summary of the sim.
 *
 * @author Michael Barlow (PhET Interactive Simulations)
 */

import Property from '../../../axon/js/Property.js';
import inverseSquareLawCommonStrings from '../../../inverse-square-law-common/js/inverseSquareLawCommonStrings.js';
import PDOMListItemNode from '../../../inverse-square-law-common/js/view/PDOMListItemNode.js';
import merge from '../../../phet-core/js/merge.js';
import StringUtils from '../../../phetcommon/js/util/StringUtils.js';
import PDOMSiblingStyle from '../../../scenery/js/accessibility/pdom/PDOMSiblingStyle.js';
import Node from '../../../scenery/js/nodes/Node.js';
import gravityForceLab from '../gravityForceLab.js';
import gravityForceLabStrings from '../gravityForceLabStrings.js';

const screenSummaryPlayAreaOverviewString = gravityForceLabStrings.a11y.screenSummary.playAreaOverview;
const screenSummaryPlayAreaControlsString = gravityForceLabStrings.a11y.screenSummary.playAreaControls;
const screenSummarySecondaryDescriptionString = gravityForceLabStrings.a11y.screenSummary.secondaryDescription;
const simStateListLabelString = gravityForceLabStrings.a11y.screenSummary.simStateListLabel;
const massString = gravityForceLabStrings.a11y.mass;

// import from ISLC so that coulombs-law can use it too
const summaryInteractionHintPatternString = inverseSquareLawCommonStrings.a11y.screenSummary.summaryInteractionHintPattern;

class GravityForceLabScreenSummaryNode extends Node {

  /**
   * @param {ISLCModel} model
   * @param {MassDescriber} massDescriber
   * @param {GravityForceLabForceDescriber} forceDescriber
   * @param {GravityForceLabPositionDescriber} positionDescriber
   * @param {Object} [options]
   */
  constructor( model, massDescriber, forceDescriber, positionDescriber, options ) {

    options = merge( {

      // {Property[]} - a way to provide extra Properties to that will update the mass and distance summary sections
      // on change
      additionalMassDistanceProperties: [],

      // {string}
      screenSummaryPlayAreaOverview: screenSummaryPlayAreaOverviewString,
      screenSummaryPlayAreaControls: screenSummaryPlayAreaControlsString,

      // {string}
      secondaryDescriptionContent: screenSummarySecondaryDescriptionString,

      // {string}
      simStateLabel: simStateListLabelString
    }, options );

    super();

    // @private - describers
    this.forceDescriber = forceDescriber;
    this.positionDescriber = positionDescriber;
    this.massDescriber = massDescriber;

    // @private - Nodes for PDOM content
    this.forceVectorsSummaryItem = new PDOMListItemNode();
    this.objectDistanceSummaryItem = new PDOMListItemNode();
    this.massValuesSummaryItem = new PDOMListItemNode();
    this.robotsSummaryItem = new PDOMListItemNode();

    // initialize the list contents
    this.updateSimStateList();

    const simStateNode = new Node( {
      tagName: 'ul',
      ariaRole: 'list',
      labelContent: options.simStateLabel
    } );

    simStateNode.setPDOMClass( PDOMSiblingStyle.LIST_ITEM_CLASS_NAME );

    const screenSummaryPlayAreaOverviewNode = new Node( {
      tagName: 'p',
      innerContent: options.screenSummaryPlayAreaOverview
    } );
    const screenSummaryPlayAreaControlsNode = new Node( {
      tagName: 'p',
      innerContent: options.screenSummaryPlayAreaControls
    } );
    const secondSummaryDescriptionNode = new Node( {
      tagName: 'p',
      innerContent: options.secondaryDescriptionContent
    } );

    simStateNode.children = [
      this.forceVectorsSummaryItem,
      this.objectDistanceSummaryItem,
      this.massValuesSummaryItem,
      this.robotsSummaryItem
    ];

    const interactionHintNode = new Node( {
      tagName: 'p',
      innerContent: StringUtils.fillIn(
        summaryInteractionHintPatternString,
        { massOrCharge: massString }
      )
    } );

    this.children = [
      screenSummaryPlayAreaOverviewNode,
      screenSummaryPlayAreaControlsNode,
      secondSummaryDescriptionNode,
      simStateNode,
      interactionHintNode
    ];

    Property.multilink( [ model.forceProperty, model.showForceValuesProperty ], () => {
      this.updateForceVectorSummary();
      this.updateRobotEffort();
    } );

    Property.multilink(
      [ model.object1.positionProperty,
        model.object1.valueProperty,
        model.object2.positionProperty,
        model.object2.valueProperty,
        model.constantRadiusProperty // not really needed, but for completeness it is good to have.
      ].concat( options.additionalMassDistanceProperties ),
      () => {
        this.updateObjectDistanceSummary();
        this.updateMassValuesSummary();
      }
    );

    model.forceValuesDisplayProperty && model.forceValuesDisplayProperty.link( () => {
      this.updateForceVectorSummary();
    } );
  }

  // @private
  updateSimStateList() {
    this.updateForceVectorSummary();
    this.updateObjectDistanceSummary();
    this.updateMassValuesSummary();
    this.updateRobotEffort();
  }

  // @private
  updateForceVectorSummary() {
    this.forceVectorsSummaryItem.innerContent = this.forceDescriber.getForceVectorsSummaryText();
  }

  // @private
  updateObjectDistanceSummary() {
    this.objectDistanceSummaryItem.innerContent = this.positionDescriber.getObjectDistanceSummary();
  }

  // @private
  updateMassValuesSummary() {
    this.massValuesSummaryItem.innerContent = this.massDescriber.getMassValuesSummaryText();
  }

  // @private
  updateRobotEffort() {
    this.robotsSummaryItem.innerContent = this.forceDescriber.getRobotEffortSummaryText();
  }
}

gravityForceLab.register( 'GravityForceLabScreenSummaryNode', GravityForceLabScreenSummaryNode );
export default GravityForceLabScreenSummaryNode;