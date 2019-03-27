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
  const GravityForceLabA11yStrings = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabA11yStrings' );
  const ForceDescriber = require( 'INVERSE_SQUARE_LAW_COMMON/view/describers/ForceDescriber' );
  const ISLCDescriber = require( 'INVERSE_SQUARE_LAW_COMMON/view/describers/ISLCDescriber' );
  const MassDescriber = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/describers/MassDescriber' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PositionDescriber = require( 'INVERSE_SQUARE_LAW_COMMON/view/describers/PositionDescriber' );
  const Property = require( 'AXON/Property' );

  // strings
  const massString = require( 'string!INVERSE_SQUARE_LAW_COMMON/mass' );

  // a11y strings
  const screenSummaryMainDescriptionString = GravityForceLabA11yStrings.screenSummaryMainDescription.value;
  const screenSummarySecondaryDescriptionString = GravityForceLabA11yStrings.screenSummarySecondaryDescription.value;
  const simStateListLabelString = GravityForceLabA11yStrings.simStateListLabel.value;


  class GravityForceLabScreenSummaryNode extends Node {

    /**
     * @param {ISLCModel} model
     * @param {Object} [options]
     */
    constructor( model, options ) {

      options = _.extend( {

        // {{Property[]}} - a way to provide extra Properties to that will update the mass and distance summary sections
        // on change
        additionalMassDistanceProperties: [],

        // {string}
        mainDescriptionContent: screenSummaryMainDescriptionString,

        // {sring}
        secondaryDescriptionContent: screenSummarySecondaryDescriptionString,

        // {string}
        simStateLabel: simStateListLabelString
      }, options );

      super();

      // subtypes of ForceDescriber initialize the singleton to the appropriate subtype
      this.forceDescriber = ForceDescriber.getDescriber();
      this.positionDescriber = PositionDescriber.getDescriber();
      this.massDescriber = MassDescriber.getDescriber();

      var mainSummaryDescriptionNode = new Node( { tagName: 'p', innerContent: options.mainDescriptionContent } );
      var secondSummaryDescriptionNode = new Node( {
        tagName: 'p',
        innerContent: options.secondaryDescriptionContent
      } );

      this.simStateNode = new Node( {
        tagName: 'ul',
        labelTagName: 'p',
        labelContent: options.simStateLabel
      } );

      this.forceVectorsSummaryItem = new Node( { tagName: 'li' } );

      // @public - TODO: Why?
      this.objectDistanceSummaryItem = new Node( { tagName: 'li' } );
      this.massValuesSummaryItem = new Node( { tagName: 'li' } );
      this.robotsSummaryItem = new Node( { tagName: 'li' } );

      // initialize the list contents
      this.updateSimStateList();

      this.simStateNode.children = [
        this.forceVectorsSummaryItem,
        this.objectDistanceSummaryItem,
        this.massValuesSummaryItem,
        this.robotsSummaryItem
      ];

      const interactionHintNode = new Node( {
        tagName: 'p',
        innerContent: ISLCDescriber.getSummaryInteractionHint( massString )
      } );

      this.children = [
        mainSummaryDescriptionNode,
        secondSummaryDescriptionNode,
        this.simStateNode,
        interactionHintNode ];

      Property.multilink( [ model.forceProperty, model.forceValuesProperty ], ( force, showValues ) => {
        this.updateForceVectorSummary();
        this.updateRobotEffort();
      } );

      Property.multilink(
        [ model.object1.positionProperty,
          model.object1.radiusProperty,
          model.object2.positionProperty,
          model.object2.radiusProperty,
          model.constantRadiusProperty // not really needed, but for completeness it is good to have.
        ].concat( options.additionalMassDistanceProperties ),
        () => {
          this.updateObjectDistanceSummary();
          this.updateMassValuesSummary();
        }
      );

      model.scientificNotationProperty && model.scientificNotationProperty.link( () => {
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