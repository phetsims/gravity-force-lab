// Copyright 2018-2026, University of Colorado Boulder

/**
 * Content for the "Keyboard Shortcuts" dialog that can be brought up from the sim navigation bar.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Michael Barlow
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import ISLCRulerNode from '../../../inverse-square-law-common/js/view/ISLCRulerNode.js';
import merge from '../../../phet-core/js/merge.js';
import BasicActionsKeyboardHelpSection from '../../../scenery-phet/js/keyboard/help/BasicActionsKeyboardHelpSection.js';
import GrabReleaseKeyboardHelpSection from '../../../scenery-phet/js/keyboard/help/GrabReleaseKeyboardHelpSection.js';
import KeyboardHelpIconFactory from '../../../scenery-phet/js/keyboard/help/KeyboardHelpIconFactory.js';
import KeyboardHelpSection from '../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import KeyboardHelpSectionRow from '../../../scenery-phet/js/keyboard/help/KeyboardHelpSectionRow.js';
import TwoColumnKeyboardHelpContent from '../../../scenery-phet/js/keyboard/help/TwoColumnKeyboardHelpContent.js';
import TextKeyNode from '../../../scenery-phet/js/keyboard/TextKeyNode.js';
import SceneryPhetFluent from '../../../scenery-phet/js/SceneryPhetFluent.js';
import Node from '../../../scenery/js/nodes/Node.js';
import gravityForceLab from '../gravityForceLab.js';
import GravityForceLabStrings from '../GravityForceLabStrings.js';

const changeMassHeadingString = GravityForceLabStrings.changeMassHeading;
const changeMassInLargerStepsString = GravityForceLabStrings.changeMassInLargerSteps;
const changeMassInSmallerStepsString = GravityForceLabStrings.changeMassInSmallerSteps;
const changeMassLabelString = GravityForceLabStrings.changeMassLabel;
const jumpToLeftString = GravityForceLabStrings.jumpToLeft;
const jumpToMaximumMassString = GravityForceLabStrings.jumpToMaximumMass;
const jumpToMinimumMassString = GravityForceLabStrings.jumpToMinimumMass;
const jumpToRightString = GravityForceLabStrings.jumpToRight;
const moveInLargerStepsString = GravityForceLabStrings.moveInLargerSteps;
const moveInSmallerStepsString = GravityForceLabStrings.moveInSmallerSteps;
const moveSphereLabelString = GravityForceLabStrings.moveSphereLabel;
const moveSpheresHeadingString = GravityForceLabStrings.moveSpheresHeading;

const jumpHomeStringProperty = GravityForceLabStrings.jumpHomeStringProperty;
const jumpStartOfSphereStringProperty = GravityForceLabStrings.jumpStartOfSphereStringProperty;
const moveGrabbedRulerString = GravityForceLabStrings.moveGrabbedRuler;
const moveOrJumpGrabbedRulerString = GravityForceLabStrings.moveOrJumpGrabbedRuler;

const moveSphereDescriptionString = GravityForceLabStrings.a11y.keyboardHelp.moveSphereDescription;
const moveInSmallerStepsDescriptionString = GravityForceLabStrings.a11y.keyboardHelp.moveInSmallerStepsDescription;
const moveInLargerStepsDescriptionString = GravityForceLabStrings.a11y.keyboardHelp.moveInLargerStepsDescription;
const jumpToLeftDescriptionString = GravityForceLabStrings.a11y.keyboardHelp.jumpToLeftDescription;
const jumpToRightDescriptionString = GravityForceLabStrings.a11y.keyboardHelp.jumpToRightDescription;
const changeMassPDOMString = GravityForceLabStrings.a11y.keyboardHelp.changeMassPDOM;
const changeMassBasicsPDOMString = GravityForceLabStrings.a11y.keyboardHelp.changeMassBasicsPDOM;
const changeMassInLargerStepsDescriptionString = GravityForceLabStrings.a11y.keyboardHelp.changeMassInLargerStepsDescription;
const changeMassInSmallerStepsDescriptionString = GravityForceLabStrings.a11y.keyboardHelp.changeMassInSmallerStepsDescription;
const jumpToMaximumMassDescriptionString = GravityForceLabStrings.a11y.keyboardHelp.jumpToMaximumMassDescription;
const jumpToMinimumMassDescriptionString = GravityForceLabStrings.a11y.keyboardHelp.jumpToMinimumMassDescription;
const moveGrabbedRulerPDOMString = GravityForceLabStrings.a11y.keyboardHelp.moveGrabbedRulerPDOM;
const moveInSmallerStepsPDOMString = GravityForceLabStrings.a11y.keyboardHelp.moveInSmallerStepsPDOM;
const jumpStartOfSpherePDOMStringProperty = GravityForceLabStrings.a11y.keyboardHelp.jumpStartOfSpherePDOMStringProperty;
const jumpHomePDOMStringProperty = GravityForceLabStrings.a11y.keyboardHelp.jumpHomePDOMStringProperty;

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
        accessibleRowDescriptionProperty: moveSphereDescriptionString
      } );

    const moveSmallStepsRow = KeyboardHelpSectionRow.labelWithIcon(
      moveInSmallerStepsString,
      KeyboardHelpIconFactory.shiftPlusIcon( KeyboardHelpIconFactory.leftRightArrowKeysRowIcon() ),
      {
        accessibleRowDescriptionProperty: moveInSmallerStepsDescriptionString
      } );

    // 'move in larger steps' section
    const moveLargeStepsRow = KeyboardHelpSectionRow.labelWithIcon(
      moveInLargerStepsString, KeyboardHelpIconFactory.pageUpPageDownRowIcon(), {
        accessibleRowDescriptionProperty: moveInLargerStepsDescriptionString
      } );

    // 'jump to left' section
    const jumpLeftRow = KeyboardHelpSectionRow.labelWithIcon( jumpToLeftString, TextKeyNode.home(), {
      accessibleRowDescriptionProperty: jumpToLeftDescriptionString
    } );

    // 'jump to right' section
    const jumpRightRow = KeyboardHelpSectionRow.labelWithIcon( jumpToRightString, TextKeyNode.end(), {
      accessibleRowDescriptionProperty: jumpToRightDescriptionString
    } );

    const moveMassRows = [ moveMassRow, moveSmallStepsRow, moveLargeStepsRow, jumpLeftRow, jumpRightRow ];
    const moveMassHelpSection = new KeyboardHelpSection( moveSpheresHeadingString, moveMassRows );

    // Mass adjustment help section
    const changeMassIcon = options.isBasics ? KeyboardHelpIconFactory.upDownArrowKeysRowIcon() : KeyboardHelpIconFactory.leftRightArrowKeysRowIcon();

    // Surrounded in Node for DAG layout constraints. Otherwise changeMassIcon will be positioned overwritten.
    const shiftPlusChangeMassIcon = KeyboardHelpIconFactory.shiftPlusIcon( new Node( { children: [ changeMassIcon ] } ) );
    const changeMassRow = KeyboardHelpSectionRow.labelWithIcon( changeMassLabelString, changeMassIcon, {
      accessibleRowDescriptionProperty: options.isBasics ? changeMassBasicsPDOMString : changeMassPDOMString
    } ); // up/down vs left/right
    const changeMassSmallStepsRow = KeyboardHelpSectionRow.labelWithIcon(
      changeMassInSmallerStepsString, shiftPlusChangeMassIcon, {
        accessibleRowDescriptionProperty: changeMassInSmallerStepsDescriptionString
      } );
    const changeMassLargeStepsRow = KeyboardHelpSectionRow.labelWithIcon(
      changeMassInLargerStepsString, KeyboardHelpIconFactory.pageUpPageDownRowIcon(), {
        accessibleRowDescriptionProperty: changeMassInLargerStepsDescriptionString
      } );
    const jumpToMinMassRow = KeyboardHelpSectionRow.labelWithIcon(
      jumpToMinimumMassString, TextKeyNode.home(), {
        accessibleRowDescriptionProperty: jumpToMinimumMassDescriptionString
      } );
    const jumpToMaxMassRow = KeyboardHelpSectionRow.labelWithIcon(
      jumpToMaximumMassString, TextKeyNode.end(), {
        accessibleRowDescriptionProperty: jumpToMaximumMassDescriptionString
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

    const grabDragHelpContent = new GrabReleaseKeyboardHelpSection(
      SceneryPhetFluent.rulerCapitalizedStringProperty,
      SceneryPhetFluent.rulerStringProperty );

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
      accessibleRowDescriptionProperty: moveGrabbedRulerPDOMString
    } );

    const shiftPlusArrowKeys = KeyboardHelpIconFactory.shiftPlusIcon( KeyboardHelpIconFactory.arrowKeysRowIcon() );
    const shiftPlusWASDKeys = KeyboardHelpIconFactory.shiftPlusIcon( KeyboardHelpIconFactory.wasdRowIcon() );
    const moveInSmallerStepsRow = KeyboardHelpSectionRow.labelWithIconList( moveInSmallerStepsString,
      [ shiftPlusArrowKeys, shiftPlusWASDKeys ], {
        accessibleRowDescriptionProperty: moveInSmallerStepsPDOMString
      } );

    const jumpStartRow = KeyboardHelpSectionRow.fromHotkeyData( ISLCRulerNode.JUMP_CENTER_HOTKEY_DATA, {
      labelStringProperty: jumpStartOfSphereStringProperty,
      accessibleRowDescriptionProperty: jumpStartOfSpherePDOMStringProperty
    } );

    const jumpHomeRow = KeyboardHelpSectionRow.fromHotkeyData( ISLCRulerNode.JUMP_HOME_HOTKEY_DATA, {
      labelStringProperty: jumpHomeStringProperty,
      accessibleRowDescriptionProperty: jumpHomePDOMStringProperty
    } );

    const rows = [ jumpStartRow, jumpHomeRow, moveRulerRow, moveInSmallerStepsRow ];
    super( moveOrJumpGrabbedRulerString, rows, options );
  }
}

gravityForceLab.register( 'GravityForceLabKeyboardHelpContent', GravityForceLabKeyboardHelpContent );
export default GravityForceLabKeyboardHelpContent;