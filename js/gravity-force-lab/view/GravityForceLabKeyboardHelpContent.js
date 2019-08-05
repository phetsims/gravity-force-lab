// Copyright 2018-2019, University of Colorado Boulder

/**
 * Content for the "Hot Keys and Help" dialog that can be brought up from the sim navigation bar.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Michael Barlow
 */
define( require => {
  'use strict';

  // modules
  const ArrowKeyNode = require( 'SCENERY_PHET/keyboard/ArrowKeyNode' );
  const EndKeyNode = require( 'SCENERY_PHET/keyboard/EndKeyNode' );
  const GeneralKeyboardHelpSection = require( 'SCENERY_PHET/keyboard/help/GeneralKeyboardHelpSection' );
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const GravityForceLabA11yStrings = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabA11yStrings' );
  const KeyboardHelpSection = require( 'SCENERY_PHET/keyboard/help/KeyboardHelpSection' );
  const HomeKeyNode = require( 'SCENERY_PHET/keyboard/HomeKeyNode' );
  const TwoColumnKeyboardHelpContent = require( 'SCENERY_PHET/keyboard/help/TwoColumnKeyboardHelpContent' );

  // strings
  const changeMassHeadingString = require( 'string!GRAVITY_FORCE_LAB/changeMassHeading' );
  const changeMassInLargerStepsString = require( 'string!GRAVITY_FORCE_LAB/changeMassInLargerSteps' );
  const changeMassInSmallerStepsString = require( 'string!GRAVITY_FORCE_LAB/changeMassInSmallerSteps' );
  const decreaseMassString = require( 'string!GRAVITY_FORCE_LAB/decreaseMass' );
  const increaseMassString = require( 'string!GRAVITY_FORCE_LAB/increaseMass' );
  const jumpToLeftString = require( 'string!GRAVITY_FORCE_LAB/jumpToLeft' );
  const jumpToMaximumMassString = require( 'string!GRAVITY_FORCE_LAB/jumpToMaximumMass' );
  const jumpToMinimumMassString = require( 'string!GRAVITY_FORCE_LAB/jumpToMinimumMass' );
  const jumpToRightString = require( 'string!GRAVITY_FORCE_LAB/jumpToRight' );
  const moveInLargerStepsString = require( 'string!GRAVITY_FORCE_LAB/moveInLargerSteps' );
  const moveInSmallerStepsString = require( 'string!GRAVITY_FORCE_LAB/moveInSmallerSteps' );
  const moveSphereLabelString = require( 'string!GRAVITY_FORCE_LAB/moveSphereLabel' );
  const moveSpheresHeadingString = require( 'string!GRAVITY_FORCE_LAB/moveSpheresHeading' );

  const moveGrabbedRulerString = require( 'string!GRAVITY_FORCE_LAB/moveGrabbedRuler' );
  const moveGrabbedRulerPDOMString = require( 'string!GRAVITY_FORCE_LAB/moveGrabbedRulerPDOM' );
  const moveInSmallerStepsPDOMString = require( 'string!GRAVITY_FORCE_LAB/moveInSmallerStepsPDOM' );
  const jumpStartOfSphereString = require( 'string!GRAVITY_FORCE_LAB/jumpStartOfSphere' );
  const jumpStartOfSpherePDOMString = require( 'string!GRAVITY_FORCE_LAB/jumpStartOfSpherePDOM' );
  const jumpHomeString = require( 'string!GRAVITY_FORCE_LAB/jumpHome' );
  const jumpHomePDOMString = require( 'string!GRAVITY_FORCE_LAB/jumpHomePDOM' );

  // a11y strings
  const moveSphereDescriptionString = GravityForceLabA11yStrings.moveSphereDescription.value;
  const moveInSmallerStepsDescriptionString = GravityForceLabA11yStrings.moveInSmallerStepsDescription.value;
  const moveInLargerStepsDescriptionString = GravityForceLabA11yStrings.moveInLargerStepsDescription.value;
  const jumpToLeftDescriptionString = GravityForceLabA11yStrings.jumpToLeftDescription.value;
  const jumpToRightDescriptionString = GravityForceLabA11yStrings.jumpToRightDescription.value;
  const increaseMassDescriptionString = GravityForceLabA11yStrings.increaseMassDescription.value;
  const decreaseMassDescriptionString = GravityForceLabA11yStrings.decreaseMassDescription.value;
  const changeMassInLargerStepsDescriptionString = GravityForceLabA11yStrings.changeMassInLargerStepsDescription.value;
  const changeMassInSmallerStepsDescriptionString = GravityForceLabA11yStrings.changeMassInSmallerStepsDescription.value;
  const jumpToMaximumMassDescriptionString = GravityForceLabA11yStrings.jumpToMaximumMassDescription.value;
  const jumpToMinimumMassDescriptionString = GravityForceLabA11yStrings.jumpToMinimumMassDescription.value;

  class GravityForceLabKeyboardHelpContent extends TwoColumnKeyboardHelpContent {

    /**
     * @param {Object} [options]
     */
    constructor( options ) {
      options = _.extend( {

        // omit the "change mass in smaller steps" row when true
        isBasics: false
      }, options );

      const homeIcon = new HomeKeyNode();
      const endIcon = new EndKeyNode();
      const leftRightIcon = KeyboardHelpSection.leftRightArrowKeysRowIcon();
      const downOrLeftIcon = KeyboardHelpSection.iconOrIcon( new ArrowKeyNode( 'down' ), new ArrowKeyNode( 'left' ) );
      const upOrRightIcon = KeyboardHelpSection.iconOrIcon( new ArrowKeyNode( 'up' ), new ArrowKeyNode( 'right' ) );
      const pageUpPageDownIcon = KeyboardHelpSection.pageUpPageDownRowIcon();
      const shiftPlusArrowsIcon = KeyboardHelpSection.shiftPlusIcon( KeyboardHelpSection.leftRightArrowKeysRowIcon() );
      const shiftPlusAllArrowsIcon = KeyboardHelpSection.shiftPlusIcon( KeyboardHelpSection.arrowKeysRowIcon() );

      // Mass movement help dialog section
      // move mass section
      const moveMassRow = KeyboardHelpSection.labelWithIcon(
        moveSphereLabelString, leftRightIcon, moveSphereDescriptionString );

      const moveSmallStepsRow = KeyboardHelpSection.labelWithIcon(
        moveInSmallerStepsString, shiftPlusArrowsIcon, moveInSmallerStepsDescriptionString );
      // 'move in larger steps' section
      const moveLargeStepsRow = KeyboardHelpSection.labelWithIcon(
        moveInLargerStepsString, pageUpPageDownIcon, moveInLargerStepsDescriptionString );

      // 'jump to left' section
      const jumpLeftRow = KeyboardHelpSection.labelWithIcon( jumpToLeftString, homeIcon, jumpToLeftDescriptionString );

      // 'jump to right' section
      const jumpRightRow = KeyboardHelpSection.labelWithIcon( jumpToRightString, endIcon, jumpToRightDescriptionString );

      const moveMassRows = [ moveMassRow, moveSmallStepsRow, moveLargeStepsRow, jumpLeftRow, jumpRightRow ];
      const moveMassHelpSection = new KeyboardHelpSection( moveSpheresHeadingString, moveMassRows );

      // Mass adjustment help section
      const increaseMassRow = KeyboardHelpSection.labelWithIcon(
        increaseMassString, upOrRightIcon, increaseMassDescriptionString );
      const decreaseMassRow = KeyboardHelpSection.labelWithIcon(
        decreaseMassString, downOrLeftIcon, decreaseMassDescriptionString );
      const changeMassSmallStepsRow = KeyboardHelpSection.labelWithIcon(
        changeMassInSmallerStepsString, shiftPlusAllArrowsIcon, changeMassInSmallerStepsDescriptionString );
      const changeMassLargeStepsRow = KeyboardHelpSection.labelWithIcon(
        changeMassInLargerStepsString, pageUpPageDownIcon, changeMassInLargerStepsDescriptionString );
      const jumpToMinMassRow = KeyboardHelpSection.labelWithIcon(
        jumpToMinimumMassString, homeIcon, jumpToMinimumMassDescriptionString );
      const jumpToMaxMassRow = KeyboardHelpSection.labelWithIcon(
        jumpToMaximumMassString, endIcon, jumpToMaximumMassDescriptionString );

      const adjustMassRows = [
        increaseMassRow,
        decreaseMassRow,
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
        withCheckboxContent: true
      } );

      const grabDragHelpContent = KeyboardHelpSection.getGrabReleaseHelpSection( 'Ruler', 'ruler', {} );

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
      options = _.extend( {

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


      const jumpStartRow = KeyboardHelpSection.createJumpKeyRow( 'S',
        jumpStartOfSphereString, jumpStartOfSpherePDOMString );

      const jumpHomeRow = KeyboardHelpSection.createJumpKeyRow( 'H', jumpHomeString, jumpHomePDOMString );


      super( 'Move or Jump Grabbed Ruler', [ moveRulerRow, moveInSmallerStepsRow, jumpStartRow, jumpHomeRow ], options );
    }
  }

  return gravityForceLab.register( 'GravityForceLabKeyboardHelpContent', GravityForceLabKeyboardHelpContent );
} );
