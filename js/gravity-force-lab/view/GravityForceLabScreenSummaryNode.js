// Copyright 2018, University of Colorado Boulder

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
  const GravityForceLabStringManager = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/GravityForceLabStringManager' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Property = require( 'AXON/Property' );

  // a11y strings
  const screenSummaryDescriptionString = GravityForceLabA11yStrings.screenSummaryDescription.value;
  const simStateListLabelString = GravityForceLabA11yStrings.simStateListLabel.value;

  class GravityForceLabScreenSummaryNode extends Node {

    constructor( model ) {
      super( {
        tagName: 'div',
        descriptionTagName: 'p',
        descriptionContent: screenSummaryDescriptionString
      } );

      this.stringManager = new GravityForceLabStringManager( model );

      this.simStateNode = new Node( {
        tagName: 'ul',
        labelTagName: 'p',
        labelContent: simStateListLabelString
      } );

      this.forceVectorsSummaryItem = new Node( { tagName: 'li' } );
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
        innerContent: this.stringManager.getSummaryInteractionHint()
      } );

      this.children = [ this.simStateNode, interactionHintNode ];

      Property.multilink( [ model.forceProperty, model.forceValuesProperty ], ( force, showValues ) => {
        this.updateForceVectorSummary();
        this.updateRobotEffort();
      } );

      Property.multilink(
        [ model.object1.positionProperty,
          model.object1.radiusProperty,
          model.object2.positionProperty,
          model.object2.radiusProperty
        ],
        ( x1, r1, x2, r2 ) => {
          this.updateObjectDistanceSummary();
          this.updateMassValuesSummary();
        }
      );
    }

    updateSimStateList() {
      this.updateForceVectorSummary();
      this.updateObjectDistanceSummary();
      this.updateMassValuesSummary();
      this.updateRobotEffort();
    }

    updateForceVectorSummary() {
      this.forceVectorsSummaryItem.innerContent = this.stringManager.getForceVectorsSummaryText();
    }

    updateObjectDistanceSummary() {
      this.objectDistanceSummaryItem.innerContent = this.stringManager.getObjectDistanceSummary();
    }

    updateMassValuesSummary() {
      this.massValuesSummaryItem.innerContent = this.stringManager.getMassValuesSummaryText();
    }

    updateRobotEffort() {
      this.robotsSummaryItem.innerContent = this.stringManager.getRobotEffortSummaryText();
    }
  }

  return gravityForceLab.register( 'GravityForceLabScreenSummaryNode', GravityForceLabScreenSummaryNode );
} );