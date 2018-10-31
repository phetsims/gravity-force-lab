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
  // var GravityForceLabA11yStrings = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabA11yStrings' );
  // var Node = require( 'SCENERY/nodes/Node' );
  // var ParameterControlPanel = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/ParameterControlPanel' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var ControlAreaNode = require( 'SCENERY_PHET/accessibility/nodes/ControlAreaNode' );
  var gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  var GravityForceLabA11yStrings = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabA11yStrings' );
  var GravityForceLabConstants = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabConstants' );
  var GravityForceLabScreenSummaryNode = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/GravityForceLabScreenSummaryNode' );
  var GravityForceLabStringManager = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/GravityForceLabStringManager' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ISLCA11yStrings = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCA11yStrings' );
  var ISLCCheckboxItem = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCCheckboxItem' );
  var ISLCCheckboxPanel = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCCheckboxPanel' );
  var ISLCGridNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCGridNode' );
  var ISLCObjectEnum = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectEnum' );
  var ISLCRulerNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCRulerNode' );
  var ISLCQueryParameters = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCQueryParameters' );
  var MassControl = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/MassControl' );
  var MassNode = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/MassNode' );
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
    var stringManager = new GravityForceLabStringManager( model, mass1AbbreviatedString, mass2AbbreviatedString );
    var summaryNode = new GravityForceLabScreenSummaryNode( model, stringManager );
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
    var massNode1 = new MassNode(
      model,
      model.object1,
      this.layoutBounds,
      modelViewTransform, {
        label: mass1AbbreviatedString,
        otherObjectLabel: mass2AbbreviatedString,
        defaultDirection: 'left',
        arrowColor: '#66f',
        forceArrowHeight: 85,
        tandem: tandem.createTandem( 'mass1Node' )
      }
    );

    var massNode2 = new MassNode(
      model,
      model.object2,
      this.layoutBounds,
      modelViewTransform, {
        label: mass2AbbreviatedString,
        otherObjectLabel: mass1AbbreviatedString,
        defaultDirection: 'right',
        arrowColor: '#f66',
        forceArrowHeight: 135,
        tandem: tandem.createTandem( 'mass2Node' )
      }
    );

    playAreaNode.addChild( new MassPDOMNode( model, OBJECT_ONE, stringManager, {
      thisObjectLabel: mass1AbbreviatedString,
      otherObjectLabel: mass2AbbreviatedString
    } ) );
    playAreaNode.addChild( new MassPDOMNode( model, OBJECT_TWO, stringManager, {
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
    massPositionsNode.addChild( massNode1 );
    massPositionsNode.addChild( massNode2 );

    // the arrows and their labels should be above both masses (and their markers) but below
    // the ruler and control panels
    playAreaNode.addChild( massNode1.arrowNode );
    playAreaNode.addChild( massNode2.arrowNode );

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
      tagName: 'ul'
    } );
    playAreaNode.addChild( massControlsNode );

    var massControl1 = new MassControl(
      mass1String,
      model.object1.valueProperty,
      GravityForceLabConstants.MASS_RANGE,
      GravityForceLabConstants.MASS_BLUE_COLOR,
      tandem.createTandem( 'massControl1' )
    );
    massControl1.scale( CONTROL_SCALE );
    massControlsNode.addChild( massControl1 );

    var massControl2 = new MassControl(
      mass2String,
      model.object2.valueProperty,
      GravityForceLabConstants.MASS_RANGE,
      GravityForceLabConstants.MASS_RED_COLOR,
      tandem.createTandem( 'massControl2' )
    );
    massControl2.scale( CONTROL_SCALE );
    massControlsNode.addChild( massControl2 );

    var TEXT_SIZE = 15;

    var checkboxItems = [
      new ISLCCheckboxItem( constantSizeString, model.constantRadiusProperty, {
        accessibleName: constantSizeString,
        textSize: TEXT_SIZE,
        tandem: tandem.createTandem( 'constantRadiusCheckbox' )
      } ),
      new ISLCCheckboxItem( forceValuesString, model.forceValuesProperty, {
        accessibleName: forceValuesString,
        textSize: TEXT_SIZE,
        tandem: tandem.createTandem( 'forceValuesCheckbox' )
      } ),
      new ISLCCheckboxItem( scientificNotationString, model.scientificNotationProperty, {
        accessibleName: scientificNotationString,
        textSize: TEXT_SIZE,
        tandem: tandem.createTandem( 'scientificNotationCheckbox' )
      } )
    ];

    model.forceValuesProperty.link( function ( showValues ) {
      checkboxItems[ 2 ].enabled = showValues;
    } );

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
  }

  gravityForceLab.register( 'GravityForceLabScreenView', GravityForceLabScreenView );

  return inherit( ScreenView, GravityForceLabScreenView );
} );
