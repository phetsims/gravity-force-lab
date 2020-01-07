// Copyright 2013-2020, University of Colorado Boulder

/**
 * The ScreenView that displays the gravity force lab screen.
 *
 * @author Anton Ulyanov (Mlearner)
 * @author Aadish Gupta (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const Bounds2 = require( 'DOT/Bounds2' );
  const ContinuousPropertySoundGenerator = require( 'TAMBO/sound-generators/ContinuousPropertySoundGenerator' );
  const DefaultDirection = require( 'INVERSE_SQUARE_LAW_COMMON/view/DefaultDirection' );
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const GravityForceLabA11yStrings = require( 'GRAVITY_FORCE_LAB/GravityForceLabA11yStrings' );
  const GravityForceLabAlertManager = require( 'GRAVITY_FORCE_LAB/view/GravityForceLabAlertManager' );
  const GravityForceLabConstants = require( 'GRAVITY_FORCE_LAB/GravityForceLabConstants' );
  const GravityForceLabControlPanel = require( 'GRAVITY_FORCE_LAB/view/GravityForceLabControlPanel' );
  const GravityForceLabForceDescriber = require( 'GRAVITY_FORCE_LAB/view/describers/GravityForceLabForceDescriber' );
  const GravityForceLabPositionDescriber = require( 'GRAVITY_FORCE_LAB/view/describers/GravityForceLabPositionDescriber' );
  const GravityForceLabRulerDescriber = require( 'GRAVITY_FORCE_LAB/view/describers/GravityForceLabRulerDescriber' );
  const GravityForceLabScreenSummaryNode = require( 'GRAVITY_FORCE_LAB/view/GravityForceLabScreenSummaryNode' );
  const inherit = require( 'PHET_CORE/inherit' );
  const ISLCGridNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCGridNode' );
  const ISLCObjectEnum = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectEnum' );
  const ISLCQueryParameters = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCQueryParameters' );
  const ISLCRulerNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCRulerNode' );
  const ISLCRulerRegionsNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCRulerRegionsNode' );
  const MassBoundarySoundGenerator = require( 'GRAVITY_FORCE_LAB/view/MassBoundarySoundGenerator' );
  const MassControl = require( 'GRAVITY_FORCE_LAB/view/MassControl' );
  const MassDescriber = require( 'GRAVITY_FORCE_LAB/view/describers/MassDescriber' );
  const MassNode = require( 'GRAVITY_FORCE_LAB/view/MassNode' );
  const MassDescriptionNode = require( 'GRAVITY_FORCE_LAB/view/MassDescriptionNode' );
  const MassSoundGenerator = require( 'GRAVITY_FORCE_LAB/view/MassSoundGenerator' );
  const ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Range = require( 'DOT/Range' );
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const ScreenView = require( 'JOIST/ScreenView' );
  const soundManager = require( 'TAMBO/soundManager' );
  const SpherePositionsDescriptionNode = require( 'GRAVITY_FORCE_LAB/view/SpherePositionsDescriptionNode' );
  const Vector2 = require( 'DOT/Vector2' );

  // strings
  const mass1AbbreviatedString = require( 'string!GRAVITY_FORCE_LAB/mass1Abbreviated' );
  const mass1String = require( 'string!GRAVITY_FORCE_LAB/mass1' );
  const mass2AbbreviatedString = require( 'string!GRAVITY_FORCE_LAB/mass2Abbreviated' );
  const mass2String = require( 'string!GRAVITY_FORCE_LAB/mass2' );
  const unitsMetersString = require( 'string!INVERSE_SQUARE_LAW_COMMON/units.meters' );

  // a11y Strings
  const massControlsLabelString = GravityForceLabA11yStrings.massControlsLabel.value;
  const massControlsHelpTextString = GravityForceLabA11yStrings.massControlsHelpText.value;
  const massControlsHelpTextDensityString = GravityForceLabA11yStrings.massControlsHelpTextDensity.value;

  // sounds
  const forceSound = require( 'sound!GRAVITY_FORCE_LAB/saturated-sine-loop-trimmed.wav' );

  // constants
  const SHOW_GRID = ISLCQueryParameters.showGrid;
  const SHOW_RULER_REGIONS = ISLCQueryParameters.showRulerRegions;
  const OBJECT_ONE = ISLCObjectEnum.OBJECT_ONE;
  const OBJECT_TWO = ISLCObjectEnum.OBJECT_TWO;
  // TODO - @Ashton-Morris - please adjust level if needed, see https://github.com/phetsims/gravity-force-lab/issues/181
  const BOUNDARY_SOUNDS_LEVEL = 1;
  // TODO - @Ashton-Morris - please adjust level if needed, see https://github.com/phetsims/gravity-force-lab/issues/181
  const MASS_SOUND_LEVEL = 0.7;
  const MASS_SOUND_THRESHOLDS = [ 10, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000 ];

  function GravityForceLabScreenView( model, tandem ) {

    // force text isn't retrieved directly in the screenview, we simply initialize and access it in various Nodes
    const positionDescriber = new GravityForceLabPositionDescriber( model, mass1AbbreviatedString, mass2AbbreviatedString );
    const forceDescriber = new GravityForceLabForceDescriber( model, mass1AbbreviatedString, mass2AbbreviatedString, positionDescriber );
    const massDescriber = new MassDescriber( model, forceDescriber );

    ScreenView.call( this, {
      layoutBounds: new Bounds2( 0, 0, 768, 464 ),
      screenSummaryContent: new GravityForceLabScreenSummaryNode( model, massDescriber, forceDescriber, positionDescriber ),
      tandem: tandem
    } );

    const alertManager = new GravityForceLabAlertManager( model, massDescriber, forceDescriber );

    // Create the model-view transform.  The primary units used in the model are meters, so significant zoom is used.
    // The multipliers for the 2nd parameter can be used to adjust where the point (0, 0) in the model, which is
    // between the two masses.
    const modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( this.layoutBounds.width / 2, this.layoutBounds.height / 2 ),
      50
    );

    // add the mass nodes to the screen
    const mass1Node = new MassNode(
      model,
      model.object1,
      this.layoutBounds,
      modelViewTransform,
      alertManager,
      forceDescriber,
      positionDescriber,
      {
        label: mass1AbbreviatedString,
        otherObjectLabel: mass2AbbreviatedString,
        defaultDirection: DefaultDirection.LEFT,
        arrowColor: '#66f',
        forceArrowHeight: 85,
        tandem: tandem.createTandem( 'mass1Node' )
      }
    );

    const mass2Node = new MassNode(
      model,
      model.object2,
      this.layoutBounds,
      modelViewTransform,
      alertManager,
      forceDescriber,
      positionDescriber,
      {
        label: mass2AbbreviatedString,
        otherObjectLabel: mass1AbbreviatedString,
        defaultDirection: DefaultDirection.RIGHT,
        arrowColor: '#f66',
        forceArrowHeight: 135,
        tandem: tandem.createTandem( 'mass2Node' )
      }
    );

    const massPositionsNode = new SpherePositionsDescriptionNode( model, positionDescriber );
    massPositionsNode.addChild( mass1Node );
    massPositionsNode.addChild( mass2Node );

    const massControlsNode = new Node( {
      labelTagName: 'h3',
      labelContent: massControlsLabelString,
      tagName: 'div',
      descriptionContent: massControlsHelpTextString
    } );

    // a list of Properties to that, when changed, should trigger an update in descriptions in the MassControl
    const propertiesToMonitorForDescriptionChanges = [ model.forceProperty, model.constantRadiusProperty ];

    // mass controls
    const massControl1 = new MassControl(
      mass1String,
      model.object1.valueProperty,
      GravityForceLabConstants.MASS_RANGE,
      GravityForceLabConstants.MASS_BLUE_COLOR,
      OBJECT_ONE,
      propertiesToMonitorForDescriptionChanges,
      alertManager,
      massDescriber,
      tandem.createTandem( 'massControl1' )
    );
    massControlsNode.addChild( massControl1 );

    const massControl2 = new MassControl(
      mass2String,
      model.object2.valueProperty,
      GravityForceLabConstants.MASS_RANGE,
      GravityForceLabConstants.MASS_RED_COLOR,
      OBJECT_TWO,
      propertiesToMonitorForDescriptionChanges,
      alertManager,
      massDescriber,
      tandem.createTandem( 'massControl2' )
    );
    massControlsNode.addChild( massControl2 );

    model.constantRadiusProperty.link( function( constantRadius ) {
      massControlsNode.descriptionContent = constantRadius ? massControlsHelpTextDensityString : massControlsHelpTextString;
    } );

    const parameterControlPanel = new GravityForceLabControlPanel( model, {
      tandem: tandem.createTandem( 'parameterControlPanel' ),
      fill: '#FDF498',
      xMargin: 10,
      yMargin: 10,
      minWidth: 150,
      align: 'left'
    } );

    const resetAllButton = new ResetAllButton( {
      listener: () => {
        model.reset();
        gravityForceLabRuler.reset();
        this.forceSoundGenerator.reset();
        rulerDescriber.reset();
      },
      scale: 0.81,
      tandem: tandem.createTandem( 'resetAllButton' )
    } );

    // positioning the nodes
    // Do this before the ruler, so the ruler can have the correct region positions
    resetAllButton.bottom = this.layoutBounds.bottom - 7.4;
    resetAllButton.right = this.layoutBounds.width - 15;
    parameterControlPanel.right = resetAllButton.left - 15;
    parameterControlPanel.bottom = resetAllButton.bottom;
    massControl2.top = massControl1.top = parameterControlPanel.top;
    massControl2.right = parameterControlPanel.left - 35;
    massControl1.right = massControl2.left - 35;

    // create down here because it needs locations of other items in the screen view
    const rulerRegionPositions = [
      mass2Node.top,
      mass1Node.top,
      mass1Node.localToGlobalPoint( mass1Node.centerPoint.center ).y - 20,
      mass1Node.localToGlobalPoint( mass1Node.centerPoint.center ).y + 20,
      mass1Node.localToGlobalPoint( new Vector2( 0, mass1Node.dragNode.bottom ) ).y,
      massControl1.top,
      this.layoutBounds.bottom
    ];

    const rulerDescriber = new GravityForceLabRulerDescriber( model, mass1AbbreviatedString, mass2AbbreviatedString,
      modelViewTransform, rulerRegionPositions, positionDescriber );

    // ruler drag bounds (in model coordinate frame) - assumes a single point scale inverted Y mapping
    const minX = model.leftObjectBoundary;
    const minY = modelViewTransform.viewToModelY( massControl2.top + 10 ); // bottom bound because Y is inverted
    const maxX = model.rightObjectBoundary;
    const maxY = -modelViewTransform.viewToModelDeltaY( this.layoutBounds.height / 2 ); // top bound because Y is inverted

    // @private - added to object for animation stepping
    const gravityForceLabRuler = new ISLCRulerNode(
      model.rulerPositionProperty,
      new Bounds2( minX, minY, maxX, maxY ),
      modelViewTransform,
      () => model.object1.positionProperty.value, // wrap this in a closure instead of exposing this all to the ruler.
      rulerDescriber,
      tandem.createTandem( 'ruler' ),
      {
        unitString: unitsMetersString,
        backgroundFill: 'rgb(236, 225, 113)',
        snapToNearest: GravityForceLabConstants.LOCATION_SNAP_VALUE
      }
    );

    // child order
    this.children = [
      massPositionsNode,

      // the arrows and their labels should be above both masses (and their markers) but below
      // the ruler and control panels
      mass1Node.arrowNode,
      mass2Node.arrowNode,
      gravityForceLabRuler,
      massControlsNode,
      parameterControlPanel,
      resetAllButton
    ];

    // PDOM Order
    // All Nodes must be added as children (accessibleOrder alone won't word), but these don't need to be in the
    // main scene graph
    this.pdomPlayAreaNode.children = [
      new MassDescriptionNode( model, model.object1, massDescriber, forceDescriber, positionDescriber ),
      new MassDescriptionNode( model, model.object2, massDescriber, forceDescriber, positionDescriber )
    ];

    this.pdomPlayAreaNode.accessibleOrder = [
      null, // space for the MassDescriptionNodes above to live
      massPositionsNode,
      mass1Node.arrowNode,
      mass2Node.arrowNode,
      massControlsNode,
      gravityForceLabRuler
    ];
    this.pdomControlAreaNode.accessibleOrder = [
      parameterControlPanel,
      resetAllButton
    ];

    if ( SHOW_GRID ) {
      const gridNode = new ISLCGridNode(
        GravityForceLabConstants.LOCATION_SNAP_VALUE,
        this.layoutBounds,
        modelViewTransform,
        { stroke: 'rgba( 250, 100, 100, 0.6 )' } );
      this.addChild( gridNode );
    }
    if ( SHOW_RULER_REGIONS ) {
      const gridNode = new ISLCRulerRegionsNode( rulerRegionPositions, this.layoutBounds );
      this.addChild( gridNode );
    }

    mass1Node.addInputListener( {
      focus: function() {
        positionDescriber.lastMoveCloser = null;
      }
    } );
    mass2Node.addInputListener( {
      focus: function() {
        positionDescriber.lastMoveCloser = null;
      }
    } );

    // TODO - @Ashton-Morris - please adjust level if needed, see https://github.com/phetsims/gravity-force-lab/issues/181
    // @private - sound generation for the force sound
    this.forceSoundGenerator = new ContinuousPropertySoundGenerator(
      model.forceProperty,
      forceSound,
      new Range( model.getMinForce(), model.getMaxForce() ),
      resetAllButton.buttonModel.isFiringProperty,
      { initialOutputLevel: 0.2 }
    );
    soundManager.addSoundGenerator( this.forceSoundGenerator );

    // sound generation for the mass values
    const massSliderDraggingViaPointer = new DerivedProperty(
      [ massControl1.sliderDragStateProperty, massControl2.sliderDragStateProperty ],
      ( massControl1SliderDragState, massControl2SliderDragState ) => {
        return ( massControl1SliderDragState === MassControl.SliderDragState.DRAGGING_VIA_POINTER ||
                 massControl2SliderDragState === MassControl.SliderDragState.DRAGGING_VIA_POINTER );
      }
    );
    soundManager.addSoundGenerator( new MassSoundGenerator(
      model.object1.valueProperty,
      GravityForceLabConstants.MASS_RANGE,
      resetAllButton.buttonModel.isFiringProperty,
      {
        initialOutputLevel: MASS_SOUND_LEVEL,
        playBasedOnThresholdsProperty: massSliderDraggingViaPointer,
        thresholdValues: MASS_SOUND_THRESHOLDS
      }
    ) );
    soundManager.addSoundGenerator( new MassSoundGenerator(
      model.object2.valueProperty,
      GravityForceLabConstants.MASS_RANGE,
      resetAllButton.buttonModel.isFiringProperty,
      {
        initialOutputLevel: MASS_SOUND_LEVEL,
        playBasedOnThresholdsProperty: massSliderDraggingViaPointer,
        thresholdValues: MASS_SOUND_THRESHOLDS
      }
    ) );

    // sound generation for masses reaching the inner or outer motion boundaries
    soundManager.addSoundGenerator( new MassBoundarySoundGenerator( model.object1, model, 'left', {
      initialOutputLevel: BOUNDARY_SOUNDS_LEVEL
    } ) );
    soundManager.addSoundGenerator( new MassBoundarySoundGenerator( model.object2, model, 'right', {
      initialOutputLevel: BOUNDARY_SOUNDS_LEVEL
    } ) );
  }

  gravityForceLab.register( 'GravityForceLabScreenView', GravityForceLabScreenView );

  return inherit( ScreenView, GravityForceLabScreenView, {

    /**
     * step the view
     * @param {number} dt
     * @public
     */
    step( dt ) {
      this.forceSoundGenerator.step( dt );
    }
  } );
} );
