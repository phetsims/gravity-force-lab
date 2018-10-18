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

  // a11y strings
  const screenSummaryDescriptionString = GravityForceLabA11yStrings.screenSummaryDescription.value;
  const simStateListLabelString = GravityForceLabA11yStrings.simStateListLabel.value;
  const summaryInteractionHintString = GravityForceLabA11yStrings.summaryInteractionHint.value;

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
        innerContent: summaryInteractionHintString
      } );

      this.children = [ this.simStateNode, interactionHintNode ];
    }

    updateSimStateList() {
      this.forceVectorsSummaryItem.innerContent = this.stringManager.getForceVectorSummary();
      this.objectDistanceSummaryItem.innerContent = this.stringManager.getObjectDistanceSummary();
    }
  }

  return gravityForceLab.register( 'GravityForceLabScreenSummaryNode', GravityForceLabScreenSummaryNode );
} );