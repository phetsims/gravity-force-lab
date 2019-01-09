// Copyright 2013-2018, University of Colorado Boulder

/**
 * The ScreenView that displays the gravity force lab screen.
 *
 * @author Anton Ulyanov (Mlearner)
 * @author Aadish Gupta (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var ControlAreaNode = require( 'SCENERY_PHET/accessibility/nodes/ControlAreaNode' );
  var gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  var GravityForceLabA11yStrings = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabA11yStrings' );
  var GravityForceLabAlertManager = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/GravityForceLabAlertManager' );
  var GravityForceLabConstants = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabConstants' );
  var GravityForceLabForceDescriber = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/describers/GravityForceLabForceDescriber' );
  var GravityForceLabPositionDescriber = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/describers/GravityForceLabPositionDescriber' );
  var GravityForceLabScreenSummaryNode = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/GravityForceLabScreenSummaryNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ISLCA11yStrings = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCA11yStrings' );
  var ISLCCheckboxItem = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCCheckboxItem' );
  var ISLCCheckboxPanel = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCCheckboxPanel' );
  var ISLCGridNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCGridNode' );
  var ISLCObjectEnum = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectEnum' );
  var ISLCQueryParameters = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCQueryParameters' );
  var ISLCRulerNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCRulerNode' );
  var MassControl = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/MassControl' );
  var MassDescriber = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/describers/MassDescriber' );
  var MassNode = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/MassNode' );
  var MassNodeDescriber = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/describers/MassNodeDescriber' );
  var MassPDOMNode = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/MassPDOMNode' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PlayAreaNode = require( 'SCENERY_PHET/accessibility/nodes/PlayAreaNode' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Vector2 = require( 'DOT/Vector2' );

  // strings
  var constantSizeString = require( 'string!INVERSE_SQUARE_LAW_COMMON/constantSize' );
  var forceValuesString = require( 'string!INVERSE_SQUARE_LAW_COMMON/forceValues' );
  var mass1AbbreviatedString = require( 'string!GRAVITY_FORCE_LAB/mass1Abbreviated' );
  var mass1String = require( 'string!GRAVITY_FORCE_LAB/mass1' );
  var mass2AbbreviatedString = require( 'string!GRAVITY_FORCE_LAB/mass2Abbreviated' );
  var mass2String = require( 'string!GRAVITY_FORCE_LAB/mass2' );
  var scientificNotationString = require( 'string!INVERSE_SQUARE_LAW_COMMON/scientificNotation' );
  var unitsMetersString = require( 'string!GRAVITY_FORCE_LAB/units.meters' );

  // a11y Strings
  var spherePositionsString = ISLCA11yStrings.spherePositions.value;
  var spherePositionHelpTextString = ISLCA11yStrings.spherePositionHelpText.value;
  var massControlsLabelString = GravityForceLabA11yStrings.massControlsLabel.value;
  var massControlsHelpTextString = GravityForceLabA11yStrings.massControlsHelpText.value;
  var massControlsHelpTextDensityString = GravityForceLabA11yStrings.massControlsHelpTextDensity.value;
  var constantSizeCheckboxHelpTextString = GravityForceLabA11yStrings.constantSizeCheckboxHelpText.value;
  var forceValuesCheckboxHelpTextString = GravityForceLabA11yStrings.forceValuesCheckboxHelpText.value;
  var scientificNotationCheckboxHelpTextString = ISLCA11yStrings.scientificNotationCheckboxHelpText.value;

  // constants
  var CONTROL_SCALE = 0.72;
  var SHOW_GRID = ISLCQueryParameters.showGrid;
  var OBJECT_ONE = ISLCObjectEnum.OBJECT_ONE;
  var OBJECT_TWO = ISLCObjectEnum.OBJECT_TWO;

  function GravityForceLabScreenView( model, tandem ) {
    ScreenView.call( this, {
      layoutBounds: new Bounds2( 0, 0, 768, 464 ),
      addScreenSummaryNode: true,
      tandem: tandem
    } );
    // force text isn't retrieved direclty in the screenview, we simply initialize and access it in various nodes
    GravityForceLabForceDescriber.initialize( model, mass1AbbreviatedString, mass2AbbreviatedString );
    MassDescriber.initialize( model );
    var positionDescriber = GravityForceLabPositionDescriber.initialize( model, mass1AbbreviatedString, mass2AbbreviatedString );
    var mass1NodeDescriber = new MassNodeDescriber( model, OBJECT_ONE );
    var mass2NodeDescriber = new MassNodeDescriber( model, OBJECT_TWO );

    var alertManager = GravityForceLabAlertManager.initialize( model );
    var summaryNode = new GravityForceLabScreenSummaryNode( model );
    var playAreaNode = new PlayAreaNode();
    var controlAreaNode = new ControlAreaNode();

    this.screenSummaryNode.addChild( summaryNode );
    this.addChild( playAreaNode );
    this.addChild( controlAreaNode );

    // Create the model-view transform.  The primary units used in the model are meters, so significant zoom is used.
    // The multipliers for the 2nd parameter can be used to adjust where the point (0, 0) in the model, which is
    // between the two masses.
    var modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( this.layoutBounds.width / 2, this.layoutBounds.height / 2 ),
      50
    );

    // add the mass nodes to the screen
    var mass1Node = new MassNode(
      model,
      model.object1,
      this.layoutBounds,
      modelViewTransform,
      {
        label: mass1AbbreviatedString,
        otherObjectLabel: mass2AbbreviatedString,
        defaultDirection: 'left',
        arrowColor: '#66f',
        forceArrowHeight: 85,
        tandem: tandem.createTandem( 'mass1Node' )
      }
    );

    var mass2Node = new MassNode(
      model,
      model.object2,
      this.layoutBounds,
      modelViewTransform,
      {
        label: mass2AbbreviatedString,
        otherObjectLabel: mass1AbbreviatedString,
        defaultDirection: 'right',
        arrowColor: '#f66',
        forceArrowHeight: 135,
        tandem: tandem.createTandem( 'mass2Node' )
      }
    );

    playAreaNode.addChild( new MassPDOMNode( model, OBJECT_ONE, mass1NodeDescriber, {
      thisObjectLabel: mass1AbbreviatedString,
      otherObjectLabel: mass2AbbreviatedString
    } ) );
    playAreaNode.addChild( new MassPDOMNode( model, OBJECT_TWO, mass2NodeDescriber, {
      thisObjectLabel: mass2AbbreviatedString,
      otherObjectLabel: mass1AbbreviatedString
    } ) );

    var massPositionsNode = new Node( {
      tagName: 'div',
      labelTagName: 'h3',
      labelContent: spherePositionsString,
      descriptionContent: spherePositionHelpTextString
    } );

    playAreaNode.addChild( massPositionsNode );
    massPositionsNode.addChild( mass1Node );
    massPositionsNode.addChild( mass2Node );

    // the arrows and their labels should be above both masses (and their markers) but below
    // the ruler and control panels
    playAreaNode.addChild( mass1Node.arrowNode );
    playAreaNode.addChild( mass2Node.arrowNode );

    // @private - added to object for animation stepping
    var gravityForceLabRuler = new ISLCRulerNode(
      model,
      this.layoutBounds.height,
      modelViewTransform,
      tandem.createTandem( 'gravityForceLabRuler' ),
      {
        unitString: unitsMetersString,
        backgroundFill: 'rgb(236, 225, 113)',
        snapToNearest: GravityForceLabConstants.LOCATION_SNAP_VALUE
      }
    );
    playAreaNode.addChild( gravityForceLabRuler );

    var massControlsNode = new Node( {
      labelTagName: 'h3',
      labelContent: massControlsLabelString,
      tagName: 'div',
      descriptionContent: massControlsHelpTextString
    } );
    playAreaNode.addChild( massControlsNode );

    var massControl1 = new MassControl(
      mass1String,
      model.object1.valueProperty,
      GravityForceLabConstants.MASS_RANGE,
      GravityForceLabConstants.MASS_BLUE_COLOR,
      OBJECT_ONE,
      tandem.createTandem( 'massControl1' )
    );

    massControl1.scale( CONTROL_SCALE );
    massControlsNode.addChild( massControl1 );

    var massControl2 = new MassControl(
      mass2String,
      model.object2.valueProperty,
      GravityForceLabConstants.MASS_RANGE,
      GravityForceLabConstants.MASS_RED_COLOR,
      OBJECT_TWO,
      tandem.createTandem( 'massControl2' )
    );
    massControl2.scale( CONTROL_SCALE );
    massControlsNode.addChild( massControl2 );

    model.constantRadiusProperty.link( function( constantRadius ) {
      massControlsNode.descriptionContent = constantRadius ? massControlsHelpTextDensityString : massControlsHelpTextString;
    } );

    var TEXT_SIZE = 15;

    var checkboxItems = [
      new ISLCCheckboxItem( constantSizeString, model.constantRadiusProperty, {
        accessibleName: constantSizeString,
        descriptionContent: constantSizeCheckboxHelpTextString,
        textSize: TEXT_SIZE,
        tandem: tandem.createTandem( 'constantRadiusCheckbox' )
      } ),
      new ISLCCheckboxItem( forceValuesString, model.forceValuesProperty, {
        accessibleName: forceValuesString,
        descriptionContent: forceValuesCheckboxHelpTextString,
        textSize: TEXT_SIZE,
        tandem: tandem.createTandem( 'forceValuesCheckbox' )
      } ),
      new ISLCCheckboxItem( scientificNotationString, model.scientificNotationProperty, {
        accessibleName: scientificNotationString,
        descriptionContent: scientificNotationCheckboxHelpTextString,
        textSize: TEXT_SIZE,
        tandem: tandem.createTandem( 'scientificNotationCheckbox' )
      } )
    ];

    var parameterControlPanel = new ISLCCheckboxPanel( checkboxItems, {
      tandem: tandem.createTandem( 'parameterControlPanel' ),
      fill: '#FDF498',
      xMargin: 10,
      yMargin: 10,
      minWidth: 170,
      align: 'left'
    } );
    controlAreaNode.addChild( parameterControlPanel );

    var resetAllButton = new ResetAllButton( {
      listener: function() { model.reset(); },
      scale: 0.81,
      tandem: tandem.createTandem( 'resetAllButton' )
    } );
    controlAreaNode.addChild( resetAllButton );

    // positioning the nodes
    parameterControlPanel.right = this.layoutBounds.width - 15;
    parameterControlPanel.top = gravityForceLabRuler.bottom + 15;
    massControl2.right = parameterControlPanel.left - 45;
    massControl2.top = parameterControlPanel.top;
    massControl1.right = massControl2.left - 45;
    massControl1.top = parameterControlPanel.top;
    resetAllButton.right = parameterControlPanel.right;
    resetAllButton.top = parameterControlPanel.bottom + 13.5;

    if ( SHOW_GRID ) {
      var gridNode = new ISLCGridNode(
        GravityForceLabConstants.LOCATION_SNAP_VALUE,
        this.layoutBounds,
        modelViewTransform,
        { stroke: 'rgba( 250, 100, 100, 0.6 )' } );
      this.addChild( gridNode );
    }

    model.forceValuesProperty.link( function ( showValues ) {
      checkboxItems[ 2 ].enabled = showValues;
    } );

    var massDescriber = MassDescriber.getDescriber();

    model.object1.valueProperty.link( function( mass ) {
      var text = massDescriber.getMassValueAndRelativeSize( OBJECT_TWO );
      massControl2.setAriaValueText( text );
    } );
    model.object2.valueProperty.link( function( mass ) {
      var text = massDescriber.getMassValueAndRelativeSize( OBJECT_ONE );
      massControl2.setAriaValueText( text );
    } );

    mass1Node.addInputListener( {
      focus: function( event ) {
        positionDescriber.lastMoveCloser = null;
        mass1Node.ariaValueText = positionDescriber.getFocusAriaValueText( OBJECT_ONE );
        alertManager.alertPositionSliderFocused();
      }
    } );
    mass2Node.addInputListener( {
      focus: function( event ) {
        positionDescriber.lastMoveCloser = null;
        mass2Node.ariaValueText = positionDescriber.getFocusAriaValueText( OBJECT_TWO );
        alertManager.alertPositionSliderFocused();
      }
    } );
  }

  gravityForceLab.register( 'GravityForceLabScreenView', GravityForceLabScreenView );

  return inherit( ScreenView, GravityForceLabScreenView );
} );
