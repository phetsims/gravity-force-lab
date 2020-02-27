// Copyright 2018-2020, University of Colorado Boulder

/**
 * Content for the "Hot Keys and Help" dialog that can be brought up from the sim navigation bar.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Michael Barlow
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import merge from '../../../phet-core/js/merge.js';
import EndKeyNode from '../../../scenery-phet/js/keyboard/EndKeyNode.js';
import GeneralKeyboardHelpSection from '../../../scenery-phet/js/keyboard/help/GeneralKeyboardHelpSection.js';
import KeyboardHelpIconFactory from '../../../scenery-phet/js/keyboard/help/KeyboardHelpIconFactory.js';
import KeyboardHelpSection from '../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import TwoColumnKeyboardHelpContent from '../../../scenery-phet/js/keyboard/help/TwoColumnKeyboardHelpContent.js';
import HomeKeyNode from '../../../scenery-phet/js/keyboard/HomeKeyNode.js';
import sceneryPhetStrings from '../../../scenery-phet/js/scenery-phet-strings.js';
import Node from '../../../scenery/js/nodes/Node.js';
import gravityForceLabStrings from '../gravity-force-lab-strings.js';
import gravityForceLab from '../gravityForceLab.js';
import GravityForceLabA11yStrings from '../GravityForceLabA11yStrings.js';

const changeMassHeadingString = gravityForceLabStrings.changeMassHeading;
const changeMassInLargerStepsString = gravityForceLabStrings.changeMassInLargerSteps;
const changeMassInSmallerStepsString = gravityForceLabStrings.changeMassInSmallerSteps;
const changeMassLabelString = gravityForceLabStrings.changeMassLabel;
const jumpToLeftString = gravityForceLabStrings.jumpToLeft;
const jumpToMaximumMassString = gravityForceLabStrings.jumpToMaximumMass;
const jumpToMinimumMassString = gravityForceLabStrings.jumpToMinimumMass;
const jumpToRightString = gravityForceLabStrings.jumpToRight;
const moveInLargerStepsString = gravityForceLabStrings.moveInLargerSteps;
const moveInSmallerStepsString = gravityForceLabStrings.moveInSmallerSteps;
const moveSphereLabelString = gravityForceLabStrings.moveSphereLabel;
const moveSpheresHeadingString = gravityForceLabStrings.moveSpheresHeading;

const jumpHomeString = gravityForceLabStrings.jumpHome;
const jumpStartOfSphereString = gravityForceLabStrings.jumpStartOfSphere;
const moveGrabbedRulerString = gravityForceLabStrings.moveGrabbedRuler;
const moveOrJumpGrabbedRulerString = gravityForceLabStrings.moveOrJumpGrabbedRuler;
const rulerCapitalizedString = sceneryPhetStrings.rulerCapitalized;
const rulerString = sceneryPhetStrings.ruler;

// a11y strings
const moveSphereDescriptionString = GravityForceLabA11yStrings.moveSphereDescription.value;
const moveInSmallerStepsDescriptionString = GravityForceLabA11yStrings.moveInSmallerStepsDescription.value;
const moveInLargerStepsDescriptionString = GravityForceLabA11yStrings.moveInLargerStepsDescription.value;
const jumpToLeftDescriptionString = GravityForceLabA11yStrings.jumpToLeftDescription.value;
const jumpToRightDescriptionString = GravityForceLabA11yStrings.jumpToRightDescription.value;
const changeMassPDOMString = GravityForceLabA11yStrings.changeMassPDOM.value;
const changeMassBasicsPDOMString = GravityForceLabA11yStrings.changeMassBasicsPDOM.value;
const changeMassInLargerStepsDescriptionString = GravityForceLabA11yStrings.changeMassInLargerStepsDescription.value;
const changeMassInSmallerStepsDescriptionString = GravityForceLabA11yStrings.changeMassInSmallerStepsDescription.value;
const jumpToMaximumMassDescriptionString = GravityForceLabA11yStrings.jumpToMaximumMassDescription.value;
const jumpToMinimumMassDescriptionString = GravityForceLabA11yStrings.jumpToMinimumMassDescription.value;
const moveGrabbedRulerPDOMString = GravityForceLabA11yStrings.moveGrabbedRulerPDOM.value;
const moveInSmallerStepsPDOMString = GravityForceLabA11yStrings.moveInSmallerStepsPDOM.value;
const jumpStartOfSpherePDOMString = GravityForceLabA11yStrings.jumpStartOfSpherePDOM.value;
const jumpHomePDOMString = GravityForceLabA11yStrings.jumpHomePDOM.value;

class GravityForceLabKeyboardHelpContent extends TwoColumnKeyboardHelpContent {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {
    options = merge( {

      // omit the "change mass in smaller steps" row when true
      isBasics: false
    }, options );

    // Mass movement help dialog section
    // move mass section
    const moveMassRow = KeyboardHelpSection.labelWithIcon(
      moveSphereLabelString, KeyboardHelpIconFactory.leftRightArrowKeysRowIcon(), moveSphereDescriptionString );

    const moveSmallStepsRow = KeyboardHelpSection.labelWithIcon(
      moveInSmallerStepsString,
      KeyboardHelpIconFactory.shiftPlusIcon( KeyboardHelpIconFactory.leftRightArrowKeysRowIcon() ),
      moveInSmallerStepsDescriptionString );

    // 'move in larger steps' section
    const moveLargeStepsRow = KeyboardHelpSection.labelWithIcon(
      moveInLargerStepsString, KeyboardHelpIconFactory.pageUpPageDownRowIcon(), moveInLargerStepsDescriptionString );

    // 'jump to left' section
    const jumpLeftRow = KeyboardHelpSection.labelWithIcon( jumpToLeftString, new HomeKeyNode(), jumpToLeftDescriptionString );

    // 'jump to right' section
    const jumpRightRow = KeyboardHelpSection.labelWithIcon( jumpToRightString, new EndKeyNode(), jumpToRightDescriptionString );

    const moveMassRows = [ moveMassRow, moveSmallStepsRow, moveLargeStepsRow, jumpLeftRow, jumpRightRow ];
    const moveMassHelpSection = new KeyboardHelpSection( moveSpheresHeadingString, moveMassRows );

    // Mass adjustment help section
    const changeMassIcon = options.isBasics ? KeyboardHelpIconFactory.upDownArrowKeysRowIcon() : KeyboardHelpIconFactory.leftRightArrowKeysRowIcon();

    // Surrounded in Node for DAG layout constraints. Otherwise changeMassIcon will be positioned overwritten.
    const shiftPlusChangeMassIcon = KeyboardHelpIconFactory.shiftPlusIcon( new Node( { children: [ changeMassIcon ] } ) );
    const changeMassRow = KeyboardHelpSection.labelWithIcon( changeMassLabelString, changeMassIcon,
      options.isBasics ? changeMassBasicsPDOMString : changeMassPDOMString ); // up/down vs left/right
    const changeMassSmallStepsRow = KeyboardHelpSection.labelWithIcon(
      changeMassInSmallerStepsString, shiftPlusChangeMassIcon, changeMassInSmallerStepsDescriptionString );
    const changeMassLargeStepsRow = KeyboardHelpSection.labelWithIcon(
      changeMassInLargerStepsString, KeyboardHelpIconFactory.pageUpPageDownRowIcon(), changeMassInLargerStepsDescriptionString );
    const jumpToMinMassRow = KeyboardHelpSection.labelWithIcon(
      jumpToMinimumMassString, new HomeKeyNode(), jumpToMinimumMassDescriptionString );
    const jumpToMaxMassRow = KeyboardHelpSection.labelWithIcon(
      jumpToMaximumMassString, new EndKeyNode(), jumpToMaximumMassDescriptionString );

    const adjustMassRows = [
      changeMassRow,
      changeMassSmallStepsRow,
      changeMassLargeStepsRow,
      jumpToMinMassRow,
      jumpToMaxMassRow
    ];

    // leave out row if option is supplied
    if ( options.isBasics ) {
      adjustMassRows.splice( adjustMassRows.indexOf( changeMassSmallStepsRow ), 1 );
    }

    const adjustMassHelpSection = new KeyboardHelpSection( changeMassHeadingString, adjustMassRows );

    // align icons for the mass movement and adjustment sections
    KeyboardHelpSection.alignHelpSectionIcons( [ moveMassHelpSection, adjustMassHelpSection ] );

    const generalNavigationHelpSection = new GeneralKeyboardHelpSection( {
      withCheckboxContent: true,
      withGroupContent: !options.isBasics
    } );

    const grabDragHelpContent = KeyboardHelpSection.getGrabReleaseHelpSection( rulerCapitalizedString, rulerString, {} );

    const leftContent = [ moveMassHelpSection, adjustMassHelpSection ];
    const rightContent = [ generalNavigationHelpSection ];

    if ( !options.isBasics ) {
      rightContent.unshift( grabDragHelpContent, new MoveOrJumpGrabbedRulerHelpSection() );
    }

    super( leftContent, rightContent );
  }
}

/**
 * @param {Object} [options]
 * @constructor
 */
class MoveOrJumpGrabbedRulerHelpSection extends KeyboardHelpSection {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {
    options = merge( {

      // icon options
      arrowKeysScale: 0.55
    }, options );

    const moveRulerIcon = KeyboardHelpIconFactory.arrowOrWasdKeysRowIcon();
    const moveRulerRow = KeyboardHelpSection.labelWithIcon( moveGrabbedRulerString, moveRulerIcon,
      moveGrabbedRulerPDOMString );

    const shiftPlusArrowKeys = KeyboardHelpIconFactory.shiftPlusIcon( KeyboardHelpIconFactory.arrowKeysRowIcon() );
    const shiftPlusWASDKeys = KeyboardHelpIconFactory.shiftPlusIcon( KeyboardHelpIconFactory.wasdRowIcon() );
    const moveInSmallerStepsRow = KeyboardHelpSection.labelWithIconList( moveInSmallerStepsString,
      [ shiftPlusArrowKeys, shiftPlusWASDKeys ], moveInSmallerStepsPDOMString );


    const jumpStartRow = KeyboardHelpSection.createJumpKeyRow( 'C',
      jumpStartOfSphereString, jumpStartOfSpherePDOMString );

    const jumpHomeRow = KeyboardHelpSection.createJumpKeyRow( 'H', jumpHomeString, jumpHomePDOMString );

    super( moveOrJumpGrabbedRulerString, [ jumpStartRow, jumpHomeRow, moveRulerRow, moveInSmallerStepsRow ], options );
  }
}

gravityForceLab.register( 'GravityForceLabKeyboardHelpContent', GravityForceLabKeyboardHelpContent );
export default GravityForceLabKeyboardHelpContent;