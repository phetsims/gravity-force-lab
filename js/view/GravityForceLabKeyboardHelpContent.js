// Copyright 2018-2022, University of Colorado Boulder

/**
 * Content for the "Keyboard Shortcuts" dialog that can be brought up from the sim navigation bar.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Michael Barlow
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import merge from '../../../phet-core/js/merge.js';
import BasicActionsKeyboardHelpSection from '../../../scenery-phet/js/keyboard/help/BasicActionsKeyboardHelpSection.js';
import KeyboardHelpIconFactory from '../../../scenery-phet/js/keyboard/help/KeyboardHelpIconFactory.js';
import KeyboardHelpSection from '../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import TwoColumnKeyboardHelpContent from '../../../scenery-phet/js/keyboard/help/TwoColumnKeyboardHelpContent.js';
import TextKeyNode from '../../../scenery-phet/js/keyboard/TextKeyNode.js';
import SceneryPhetStrings from '../../../scenery-phet/js/SceneryPhetStrings.js';
import { Node } from '../../../scenery/js/imports.js';
import gravityForceLab from '../gravityForceLab.js';
import gravityForceLabStrings from '../gravityForceLabStrings.js';

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
const rulerCapitalizedString = SceneryPhetStrings.rulerCapitalized;
const rulerString = SceneryPhetStrings.ruler;

const moveSphereDescriptionString = gravityForceLabStrings.a11y.keyboardHelp.moveSphereDescription;
const moveInSmallerStepsDescriptionString = gravityForceLabStrings.a11y.keyboardHelp.moveInSmallerStepsDescription;
const moveInLargerStepsDescriptionString = gravityForceLabStrings.a11y.keyboardHelp.moveInLargerStepsDescription;
const jumpToLeftDescriptionString = gravityForceLabStrings.a11y.keyboardHelp.jumpToLeftDescription;
const jumpToRightDescriptionString = gravityForceLabStrings.a11y.keyboardHelp.jumpToRightDescription;
const changeMassPDOMString = gravityForceLabStrings.a11y.keyboardHelp.changeMassPDOM;
const changeMassBasicsPDOMString = gravityForceLabStrings.a11y.keyboardHelp.changeMassBasicsPDOM;
const changeMassInLargerStepsDescriptionString = gravityForceLabStrings.a11y.keyboardHelp.changeMassInLargerStepsDescription;
const changeMassInSmallerStepsDescriptionString = gravityForceLabStrings.a11y.keyboardHelp.changeMassInSmallerStepsDescription;
const jumpToMaximumMassDescriptionString = gravityForceLabStrings.a11y.keyboardHelp.jumpToMaximumMassDescription;
const jumpToMinimumMassDescriptionString = gravityForceLabStrings.a11y.keyboardHelp.jumpToMinimumMassDescription;
const moveGrabbedRulerPDOMString = gravityForceLabStrings.a11y.keyboardHelp.moveGrabbedRulerPDOM;
const moveInSmallerStepsPDOMString = gravityForceLabStrings.a11y.keyboardHelp.moveInSmallerStepsPDOM;
const jumpStartOfSpherePDOMString = gravityForceLabStrings.a11y.keyboardHelp.jumpStartOfSpherePDOM;
const jumpHomePDOMString = gravityForceLabStrings.a11y.keyboardHelp.jumpHomePDOM;

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
    const moveMassRow = KeyboardHelpSectionRow.labelWithIcon(
      moveSphereLabelString, KeyboardHelpIconFactory.leftRightArrowKeysRowIcon(), {
        labelInnerContent: moveSphereDescriptionString
      } );

    const moveSmallStepsRow = KeyboardHelpSectionRow.labelWithIcon(
      moveInSmallerStepsString,
      KeyboardHelpIconFactory.shiftPlusIcon( KeyboardHelpIconFactory.leftRightArrowKeysRowIcon() ),
      {
        labelInnerContent: moveInSmallerStepsDescriptionString
      } );

    // 'move in larger steps' section
    const moveLargeStepsRow = KeyboardHelpSectionRow.labelWithIcon(
      moveInLargerStepsString, KeyboardHelpIconFactory.pageUpPageDownRowIcon(), {
        labelInnerContent: moveInLargerStepsDescriptionString
      } );

    // 'jump to left' section
    const jumpLeftRow = KeyboardHelpSectionRow.labelWithIcon( jumpToLeftString, TextKeyNode.home(), {
      labelInnerContent: jumpToLeftDescriptionString
    } );

    // 'jump to right' section
    const jumpRightRow = KeyboardHelpSectionRow.labelWithIcon( jumpToRightString, TextKeyNode.end(), {
      labelInnerContent: jumpToRightDescriptionString
    } );

    const moveMassRows = [ moveMassRow, moveSmallStepsRow, moveLargeStepsRow, jumpLeftRow, jumpRightRow ];
    const moveMassHelpSection = new KeyboardHelpSection( moveSpheresHeadingString, moveMassRows );

    // Mass adjustment help section
    const changeMassIcon = options.isBasics ? KeyboardHelpIconFactory.upDownArrowKeysRowIcon() : KeyboardHelpIconFactory.leftRightArrowKeysRowIcon();

    // Surrounded in Node for DAG layout constraints. Otherwise changeMassIcon will be positioned overwritten.
    const shiftPlusChangeMassIcon = KeyboardHelpIconFactory.shiftPlusIcon( new Node( { children: [ changeMassIcon ] } ) );
    const changeMassRow = KeyboardHelpSectionRow.labelWithIcon( changeMassLabelString, changeMassIcon, {
      labelInnerContent: options.isBasics ? changeMassBasicsPDOMString : changeMassPDOMString
    } ); // up/down vs left/right
    const changeMassSmallStepsRow = KeyboardHelpSectionRow.labelWithIcon(
      changeMassInSmallerStepsString, shiftPlusChangeMassIcon, {
        labelInnerContent: changeMassInSmallerStepsDescriptionString
      } );
    const changeMassLargeStepsRow = KeyboardHelpSectionRow.labelWithIcon(
      changeMassInLargerStepsString, KeyboardHelpIconFactory.pageUpPageDownRowIcon(), {
        labelInnerContent: changeMassInLargerStepsDescriptionString
      } );
    const jumpToMinMassRow = KeyboardHelpSectionRow.labelWithIcon(
      jumpToMinimumMassString, TextKeyNode.home(), {
        labelInnerContent: jumpToMinimumMassDescriptionString
      } );
    const jumpToMaxMassRow = KeyboardHelpSectionRow.labelWithIcon(
      jumpToMaximumMassString, TextKeyNode.end(), {
        labelInnerContent: jumpToMaximumMassDescriptionString
      } );

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

    const basicActionsHelpSection = new BasicActionsKeyboardHelpSection( {
      withCheckboxContent: true
    } );

    const grabDragHelpContent = KeyboardHelpSection.getGrabReleaseHelpSection( rulerCapitalizedString, rulerString, {} );

    const leftContent = [ moveMassHelpSection, adjustMassHelpSection ];
    const rightContent = [ basicActionsHelpSection ];

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

    const moveRulerIcon = KeyboardHelpIconFactory.arrowOrWasdKeysRowIcon();
    const moveRulerRow = KeyboardHelpSectionRow.labelWithIcon( moveGrabbedRulerString, moveRulerIcon, {
      labelInnerContent: moveGrabbedRulerPDOMString
    } );

    const shiftPlusArrowKeys = KeyboardHelpIconFactory.shiftPlusIcon( KeyboardHelpIconFactory.arrowKeysRowIcon() );
    const shiftPlusWASDKeys = KeyboardHelpIconFactory.shiftPlusIcon( KeyboardHelpIconFactory.wasdRowIcon() );
    const moveInSmallerStepsRow = KeyboardHelpSectionRow.labelWithIconList( moveInSmallerStepsString,
      [ shiftPlusArrowKeys, shiftPlusWASDKeys ], {
        labelInnerContent: moveInSmallerStepsPDOMString
      } );


    const jumpStartRow = KeyboardHelpSectionRow.createJumpKeyRow( 'C',
      jumpStartOfSphereString, {
        labelInnerContent: jumpStartOfSpherePDOMString
      } );

    const jumpHomeRow = KeyboardHelpSectionRow.createJumpKeyRow( 'H', jumpHomeString, {
      labelInnerContent: jumpHomePDOMString
    } );

    super( moveOrJumpGrabbedRulerString, [ jumpStartRow, jumpHomeRow, moveRulerRow, moveInSmallerStepsRow ], options );
  }
}

gravityForceLab.register( 'GravityForceLabKeyboardHelpContent', GravityForceLabKeyboardHelpContent );
export default GravityForceLabKeyboardHelpContent;