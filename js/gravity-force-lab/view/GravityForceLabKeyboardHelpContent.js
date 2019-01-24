// Copyright 2018, University of Colorado Boulder

/**
 * Content for the "Hot Keys and Help" dialog that can be brought up from the sim navigation bar.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 * @author Michael Barlow
 */
define( function( require ) {
  'use strict';

  // modules
  var ArrowKeyNode = require( 'SCENERY_PHET/keyboard/ArrowKeyNode' );
  var EndKeyNode = require( 'SCENERY_PHET/keyboard/EndKeyNode' );
  var GeneralNavigationHelpContent = require( 'SCENERY_PHET/keyboard/help/GeneralNavigationHelpContent' );
  var gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  var GravityForceLabA11yStrings = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabA11yStrings' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HelpContent = require( 'SCENERY_PHET/keyboard/help/HelpContent' );
  var HomeKeyNode = require( 'SCENERY_PHET/keyboard/HomeKeyNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var changeMassHeadingString = require( 'string!GRAVITY_FORCE_LAB/changeMassHeading' );
  var changeMassInLargerStepsString = require( 'string!GRAVITY_FORCE_LAB/changeMassInLargerSteps' );
  var changeMassInSmallerStepsString = require( 'string!GRAVITY_FORCE_LAB/changeMassInSmallerSteps' );
  var decreaseMassString = require( 'string!GRAVITY_FORCE_LAB/decreaseMass' );
  var increaseMassString = require( 'string!GRAVITY_FORCE_LAB/increaseMass' );
  var jumpToLeftString = require( 'string!GRAVITY_FORCE_LAB/jumpToLeft' );
  var jumpToMaximumMassString = require( 'string!GRAVITY_FORCE_LAB/jumpToMaximumMass' );
  var jumpToMinimumMassString = require( 'string!GRAVITY_FORCE_LAB/jumpToMinimumMass' );
  var jumpToRightString = require( 'string!GRAVITY_FORCE_LAB/jumpToRight' );
  var moveInLargerStepsString = require( 'string!GRAVITY_FORCE_LAB/moveInLargerSteps' );
  var moveInSmallerStepsString = require( 'string!GRAVITY_FORCE_LAB/moveInSmallerSteps' );
  var moveSphereLabelString = require( 'string!GRAVITY_FORCE_LAB/moveSphereLabel' );
  var moveSpheresHeadingString = require( 'string!GRAVITY_FORCE_LAB/moveSpheresHeading' );

  // a11y strings
  var moveSphereDescriptionString = GravityForceLabA11yStrings.moveSphereDescription.value;
  var moveInSmallerStepsDescriptionString = GravityForceLabA11yStrings.moveInSmallerStepsDescription.value;
  var moveInLargerStepsDescriptionString = GravityForceLabA11yStrings.moveInLargerStepsDescription.value;
  var jumpToLeftDescriptionString = GravityForceLabA11yStrings.jumpToLeftDescription.value;
  var jumpToRightDescriptionString = GravityForceLabA11yStrings.jumpToRightDescription.value;
  var increaseMassDescriptionString = GravityForceLabA11yStrings.increaseMassDescription.value;
  var decreaseMassDescriptionString = GravityForceLabA11yStrings.decreaseMassDescription.value;
  var changeMassInLargerStepsDescriptionString = GravityForceLabA11yStrings.changeMassInLargerStepsDescription.value;
  var changeMassInSmallerStepsDescriptionString = GravityForceLabA11yStrings.changeMassInSmallerStepsDescription.value;
  var jumpToMaximumMassDescriptionString = GravityForceLabA11yStrings.jumpToMaximumMassDescription.value;
  var jumpToMinimumMassDescriptionString = GravityForceLabA11yStrings.jumpToMinimumMassDescription.value;

  // helper functions that return icons for the dialog
  var ICON_CREATOR = {
    home: function() {
      return new HomeKeyNode();
    },
    end: function() {
      return new EndKeyNode();
    },
    leftRight: function() {
      return HelpContent.leftRightArrowKeysRowIcon();
    },
    downOrLeft: function() {
      return HelpContent.iconOrIcon( new ArrowKeyNode( 'down' ), new ArrowKeyNode( 'left' ) );
    },
    upOrRight: function() {
      return HelpContent.iconOrIcon( new ArrowKeyNode( 'up' ), new ArrowKeyNode( 'right' ) );
    },
    pageUpPageDown: function() {
      return HelpContent.pageUpPageDownRowIcon();
    },
    shiftPlusArrows: function() {
      return HelpContent.shiftPlusIcon( HelpContent.leftRightArrowKeysRowIcon() );
    },
    shiftPlusAllArrows: function() {
      return HelpContent.shiftPlusIcon( HelpContent.arrowKeysRowIcon() );
    }
  };

  /**
   * Constructor.
   *
   * @param {Tandem} tandem
   * @constructor
   */
  function GravityForceLabKeyboardHelpContent( tandem ) {

    // Mass movement help dialog section
    // move mass content
    var moveMassRow = this.constructRow( moveSphereLabelString, moveSphereDescriptionString, 'leftRight' );

    var moveSmallStepsRow = this.constructRow( moveInSmallerStepsString, moveInSmallerStepsDescriptionString, 'shiftPlusArrows' );
    // 'move in larger steps' content
    var moveLargeStepsRow = this.constructRow( moveInLargerStepsString, moveInLargerStepsDescriptionString, 'pageUpPageDown' );

    // 'jump to left' content
    var jumpLeftRow = this.constructRow( jumpToLeftString, jumpToLeftDescriptionString, 'home' );

    // 'jump to right' content
    var jumpRightRow = this.constructRow( jumpToRightString, jumpToRightDescriptionString, 'end' );

    var moveMassRows = [ moveMassRow, moveSmallStepsRow, moveLargeStepsRow, jumpLeftRow, jumpRightRow ];
    var moveMassHelpContent = new HelpContent( moveSpheresHeadingString, moveMassRows );

    // Mass adjustment help section
    var increaseMassRow = this.constructRow( increaseMassString, increaseMassDescriptionString, 'upOrRight' );
    var decreaseMassRow = this.constructRow( decreaseMassString, decreaseMassDescriptionString, 'downOrLeft' );
    var changeMassSmallStepsRow = this.constructRow( changeMassInSmallerStepsString, changeMassInSmallerStepsDescriptionString, 'shiftPlusAllArrows' );
    var changeMassLargeStepsRow = this.constructRow( changeMassInLargerStepsString, changeMassInLargerStepsDescriptionString, 'pageUpPageDown' );
    var jumpToMinMassRow = this.constructRow( jumpToMinimumMassString, jumpToMinimumMassDescriptionString, 'home' );
    var jumpToMaxMassRow = this.constructRow( jumpToMaximumMassString, jumpToMaximumMassDescriptionString, 'end' );

    var adjustMassRows = [ increaseMassRow, decreaseMassRow, changeMassSmallStepsRow, changeMassLargeStepsRow, jumpToMinMassRow, jumpToMaxMassRow ];
    var adjustMassHelpContent = new HelpContent( changeMassHeadingString, adjustMassRows );

    // align icons for the mass movement and adjustment sections
    HelpContent.alignHelpContentIcons( [ moveMassHelpContent, adjustMassHelpContent ] );

    var generalNavigationHelpContent = new GeneralNavigationHelpContent();

    var leftContent = new VBox( {
      children: [ moveMassHelpContent, adjustMassHelpContent ],
      align: 'top',
      spacing: 30
    } );

    var rightContent = new VBox( {
      children: [ generalNavigationHelpContent ],
      align: 'top',
      spacing: 30
    } );

    HBox.call( this, {
      children: [ leftContent, rightContent ],
      align: 'top',
      spacing: 30,
      tandem: tandem
    } );
  }

  gravityForceLab.register( 'GravityForceLabKeyboardHelpContent', GravityForceLabKeyboardHelpContent );

  return inherit( HBox, GravityForceLabKeyboardHelpContent, {

    /**
     * Construct a row for the help dialog, assembling a label with an icon using Helpcontent. Usages will look like:
     * this.constructRow( 'jump to the end', 'end' );
     *
     * @param  {string} labelString - the text label for the row (visual)
     * @param  {string} descriptionString - must be one of the keys in ICON_CREATOR
     * @param  {string} iconID - must be one of ICON_CREATOR keys, see that above
     */
    constructRow: function( labelString, descriptionString, iconID ) {
      var iconNode = ICON_CREATOR[ iconID ]();
      return HelpContent.labelWithIcon( labelString, iconNode, descriptionString );
    }
  } );
} );
