// Copyright 2018-2019, University of Colorado Boulder

/**
 * A node to control the PDOM content for the Screen Summary of the sim.
 *
 * @author Michael Barlow (PhET Interactive Simulations)
 */

define( require => {
  'use strict';

  // modules
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const GravityForceLabA11yStrings = require( 'GRAVITY_FORCE_LAB/GravityForceLabA11yStrings' );
  const ISLCA11yStrings = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCA11yStrings' );
  const merge = require( 'PHET_CORE/merge' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Property = require( 'AXON/Property' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  // a11y strings
  const screenSummaryPlayAreaOverviewString = GravityForceLabA11yStrings.screenSummaryPlayAreaOverview.value;
  const screenSummaryPlayAreaControlsString = GravityForceLabA11yStrings.screenSummaryPlayAreaControls.value;
  const screenSummarySecondaryDescriptionString = GravityForceLabA11yStrings.screenSummarySecondaryDescription.value;
  const simStateListLabelString = GravityForceLabA11yStrings.simStateListLabel.value;
  const massString = GravityForceLabA11yStrings.mass.value;

  // import from ISLC so that coulombs-law can use it too
  const summaryInteractionHintPatternString = ISLCA11yStrings.summaryInteractionHintPattern.value;

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

      const liOptions = { tagName: 'li' };

      // @private - Nodes for PDOM content
      this.forceVectorsSummaryItem = new Node( liOptions );
      this.objectDistanceSummaryItem = new Node( liOptions );
      this.massValuesSummaryItem = new Node( liOptions );
      this.robotsSummaryItem = new Node( liOptions );

      // initialize the list contents
      this.updateSimStateList();

      const simStateNode = new Node( {
        tagName: 'ul',
        labelContent: options.simStateLabel
      } );

      const screenSummaryPlayAreaOverviewNode = new Node( { tagName: 'p', innerContent: options.screenSummaryPlayAreaOverview } );
      const screenSummaryPlayAreaControlsNode = new Node( { tagName: 'p', innerContent: options.screenSummaryPlayAreaControls } );
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

  return gravityForceLab.register( 'GravityForceLabScreenSummaryNode', GravityForceLabScreenSummaryNode );
} );