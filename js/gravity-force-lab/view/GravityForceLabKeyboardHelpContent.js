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

  // helper functions that return icons for the dialog
  const ICON_CREATOR = {
    home: () => {
      return new HomeKeyNode();
    },
    end: () => {
      return new EndKeyNode();
    },
    leftRight: () => {
      return KeyboardHelpSection.leftRightArrowKeysRowIcon();
    },
    downOrLeft: () => {
      return KeyboardHelpSection.iconOrIcon( new ArrowKeyNode( 'down' ), new ArrowKeyNode( 'left' ) );
    },
    upOrRight: () => {
      return KeyboardHelpSection.iconOrIcon( new ArrowKeyNode( 'up' ), new ArrowKeyNode( 'right' ) );
    },
    pageUpPageDown: () => {
      return KeyboardHelpSection.pageUpPageDownRowIcon();
    },
    shiftPlusArrows: () => {
      return KeyboardHelpSection.shiftPlusIcon( KeyboardHelpSection.leftRightArrowKeysRowIcon() );
    },
    shiftPlusAllArrows: () => {
      return KeyboardHelpSection.shiftPlusIcon( KeyboardHelpSection.arrowKeysRowIcon() );
    }
  };

  class GravityForceLabKeyboardHelpContent extends TwoColumnKeyboardHelpContent {

    /**
     * @param {Object} options
     */
    constructor( options ) {

      options = _.extend( {

        // omit the "change mass in smaller steps" row when true
        omitChangeMassSmallSteps: false
      }, options );


      // Mass movement help dialog section
      // move mass section
      const moveMassRow = constructRow( moveSphereLabelString, moveSphereDescriptionString, 'leftRight' );

      const moveSmallStepsRow = constructRow( moveInSmallerStepsString, moveInSmallerStepsDescriptionString, 'shiftPlusArrows' );
      // 'move in larger steps' section
      const moveLargeStepsRow = constructRow( moveInLargerStepsString, moveInLargerStepsDescriptionString, 'pageUpPageDown' );

      // 'jump to left' section
      const jumpLeftRow = constructRow( jumpToLeftString, jumpToLeftDescriptionString, 'home' );

      // 'jump to right' section
      const jumpRightRow = constructRow( jumpToRightString, jumpToRightDescriptionString, 'end' );

      const moveMassRows = [ moveMassRow, moveSmallStepsRow, moveLargeStepsRow, jumpLeftRow, jumpRightRow ];
      const moveMassHelpSection = new KeyboardHelpSection( moveSpheresHeadingString, moveMassRows );

      // Mass adjustment help section
      const increaseMassRow = constructRow( increaseMassString, increaseMassDescriptionString, 'upOrRight' );
      const decreaseMassRow = constructRow( decreaseMassString, decreaseMassDescriptionString, 'downOrLeft' );
      const changeMassSmallStepsRow = constructRow( changeMassInSmallerStepsString, changeMassInSmallerStepsDescriptionString, 'shiftPlusAllArrows' );
      const changeMassLargeStepsRow = constructRow( changeMassInLargerStepsString, changeMassInLargerStepsDescriptionString, 'pageUpPageDown' );
      const jumpToMinMassRow = constructRow( jumpToMinimumMassString, jumpToMinimumMassDescriptionString, 'home' );
      const jumpToMaxMassRow = constructRow( jumpToMaximumMassString, jumpToMaximumMassDescriptionString, 'end' );

      const adjustMassRows = [ increaseMassRow, decreaseMassRow, changeMassSmallStepsRow, changeMassLargeStepsRow, jumpToMinMassRow, jumpToMaxMassRow ];

      // leave out row if option is supplied
      if ( options.omitChangeMassSmallSteps ) {
        adjustMassRows.splice( adjustMassRows.indexOf( changeMassSmallStepsRow ), 1 );
      }

      const adjustMassHelpSection = new KeyboardHelpSection( changeMassHeadingString, adjustMassRows );

      // align icons for the mass movement and adjustment sections
      KeyboardHelpSection.alignHelpSectionIcons( [ moveMassHelpSection, adjustMassHelpSection ] );

      const generalNavigationHelpSection = new GeneralKeyboardHelpSection( {
        withCheckboxContent: true
      } );

      const leftContent = [ moveMassHelpSection ];
      const rightContent = [ adjustMassHelpSection, generalNavigationHelpSection ];

      super( leftContent, rightContent );
    }
  }

  /**
   * Construct a row for the help dialog, assembling a label with an icon using HelpSection. Usages will look like:
   * constructRow( 'jump to the end', 'end' );
   *
   * @param {string} labelString - the text label for the row (visual)
   * @param {string} descriptionString - must be one of the keys in ICON_CREATOR
   * @param {string} iconID - must be one of ICON_CREATOR keys, see that above
   */
  const constructRow = ( labelString, descriptionString, iconID ) => {
    const iconNode = ICON_CREATOR[ iconID ]();
    return KeyboardHelpSection.labelWithIcon( labelString, iconNode, descriptionString );
  };

  return gravityForceLab.register( 'GravityForceLabKeyboardHelpContent', GravityForceLabKeyboardHelpContent );
} );
