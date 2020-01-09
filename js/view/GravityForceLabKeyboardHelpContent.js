// Copyright 2018-2020, University of Colorado Boulder

/**
 * Content for the "Hot Keys and Help" dialog that can be brought up from the sim navigation bar.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Michael Barlow
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const EndKeyNode = require( 'SCENERY_PHET/keyboard/EndKeyNode' );
  const GeneralKeyboardHelpSection = require( 'SCENERY_PHET/keyboard/help/GeneralKeyboardHelpSection' );
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const GravityForceLabA11yStrings = require( 'GRAVITY_FORCE_LAB/GravityForceLabA11yStrings' );
  const HomeKeyNode = require( 'SCENERY_PHET/keyboard/HomeKeyNode' );
  const KeyboardHelpSection = require( 'SCENERY_PHET/keyboard/help/KeyboardHelpSection' );
  const merge = require( 'PHET_CORE/merge' );
  const Node = require( 'SCENERY/nodes/Node' );
  const TwoColumnKeyboardHelpContent = require( 'SCENERY_PHET/keyboard/help/TwoColumnKeyboardHelpContent' );

  // strings
  const changeMassHeadingString = require( 'string!GRAVITY_FORCE_LAB/changeMassHeading' );
  const changeMassInLargerStepsString = require( 'string!GRAVITY_FORCE_LAB/changeMassInLargerSteps' );
  const changeMassInSmallerStepsString = require( 'string!GRAVITY_FORCE_LAB/changeMassInSmallerSteps' );
  const changeMassLabelString = require( 'string!GRAVITY_FORCE_LAB/changeMassLabel' );
  const jumpToLeftString = require( 'string!GRAVITY_FORCE_LAB/jumpToLeft' );
  const jumpToMaximumMassString = require( 'string!GRAVITY_FORCE_LAB/jumpToMaximumMass' );
  const jumpToMinimumMassString = require( 'string!GRAVITY_FORCE_LAB/jumpToMinimumMass' );
  const jumpToRightString = require( 'string!GRAVITY_FORCE_LAB/jumpToRight' );
  const moveInLargerStepsString = require( 'string!GRAVITY_FORCE_LAB/moveInLargerSteps' );
  const moveInSmallerStepsString = require( 'string!GRAVITY_FORCE_LAB/moveInSmallerSteps' );
  const moveSphereLabelString = require( 'string!GRAVITY_FORCE_LAB/moveSphereLabel' );
  const moveSpheresHeadingString = require( 'string!GRAVITY_FORCE_LAB/moveSpheresHeading' );

  const jumpHomeString = require( 'string!GRAVITY_FORCE_LAB/jumpHome' );
  const jumpStartOfSphereString = require( 'string!GRAVITY_FORCE_LAB/jumpStartOfSphere' );
  const moveGrabbedRulerString = require( 'string!GRAVITY_FORCE_LAB/moveGrabbedRuler' );
  const moveOrJumpGrabbedRulerString = require( 'string!GRAVITY_FORCE_LAB/moveOrJumpGrabbedRuler' );
  const rulerCapitalizedString = require( 'string!SCENERY_PHET/rulerCapitalized' );
  const rulerString = require( 'string!SCENERY_PHET/ruler' );

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
        moveSphereLabelString, KeyboardHelpSection.leftRightArrowKeysRowIcon(), moveSphereDescriptionString );

      const moveSmallStepsRow = KeyboardHelpSection.labelWithIcon(
        moveInSmallerStepsString,
        KeyboardHelpSection.shiftPlusIcon( KeyboardHelpSection.leftRightArrowKeysRowIcon() ),
        moveInSmallerStepsDescriptionString );

      // 'move in larger steps' section
      const moveLargeStepsRow = KeyboardHelpSection.labelWithIcon(
        moveInLargerStepsString, KeyboardHelpSection.pageUpPageDownRowIcon(), moveInLargerStepsDescriptionString );

      // 'jump to left' section
      const jumpLeftRow = KeyboardHelpSection.labelWithIcon( jumpToLeftString, new HomeKeyNode(), jumpToLeftDescriptionString );

      // 'jump to right' section
      const jumpRightRow = KeyboardHelpSection.labelWithIcon( jumpToRightString, new EndKeyNode(), jumpToRightDescriptionString );

      const moveMassRows = [ moveMassRow, moveSmallStepsRow, moveLargeStepsRow, jumpLeftRow, jumpRightRow ];
      const moveMassHelpSection = new KeyboardHelpSection( moveSpheresHeadingString, moveMassRows );

      // Mass adjustment help section
      const changeMassIcon = options.isBasics ? KeyboardHelpSection.upDownArrowKeysRowIcon() : KeyboardHelpSection.leftRightArrowKeysRowIcon();

      // Surrounded in Node for DAG layout constraints. Otherwise changeMassIcon will be positioned overwritten.
      const shiftPlusChangeMassIcon = KeyboardHelpSection.shiftPlusIcon( new Node( { children: [ changeMassIcon ] } ) );
      const changeMassRow = KeyboardHelpSection.labelWithIcon( changeMassLabelString, changeMassIcon,
        options.isBasics ? changeMassBasicsPDOMString : changeMassPDOMString ); // up/down vs left/right
      const changeMassSmallStepsRow = KeyboardHelpSection.labelWithIcon(
        changeMassInSmallerStepsString, shiftPlusChangeMassIcon, changeMassInSmallerStepsDescriptionString );
      const changeMassLargeStepsRow = KeyboardHelpSection.labelWithIcon(
        changeMassInLargerStepsString, KeyboardHelpSection.pageUpPageDownRowIcon(), changeMassInLargerStepsDescriptionString );
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
        withCheckboxContent: !options.isBasics,
        withGroupContent: true
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

      const moveRulerIcon = KeyboardHelpSection.arrowOrWasdKeysRowIcon();
      const moveRulerRow = KeyboardHelpSection.labelWithIcon( moveGrabbedRulerString, moveRulerIcon,
        moveGrabbedRulerPDOMString );

      const shiftPlusArrowKeys = KeyboardHelpSection.shiftPlusIcon( KeyboardHelpSection.arrowKeysRowIcon() );
      const shiftPlusWASDKeys = KeyboardHelpSection.shiftPlusIcon( KeyboardHelpSection.wasdRowIcon() );
      const moveInSmallerStepsRow = KeyboardHelpSection.labelWithIconList( moveInSmallerStepsString,
        [ shiftPlusArrowKeys, shiftPlusWASDKeys ], moveInSmallerStepsPDOMString );


      const jumpStartRow = KeyboardHelpSection.createJumpKeyRow( 'C',
        jumpStartOfSphereString, jumpStartOfSpherePDOMString );

      const jumpHomeRow = KeyboardHelpSection.createJumpKeyRow( 'H', jumpHomeString, jumpHomePDOMString );

      super( moveOrJumpGrabbedRulerString, [ jumpStartRow, jumpHomeRow, moveRulerRow, moveInSmallerStepsRow ], options );
    }
  }

  return gravityForceLab.register( 'GravityForceLabKeyboardHelpContent', GravityForceLabKeyboardHelpContent );
} );
