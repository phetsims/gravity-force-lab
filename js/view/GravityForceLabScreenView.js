// Copyright 2013-2023, University of Colorado Boulder

/**
 * The ScreenView that displays the gravity force lab screen.
 *
 * @author Anton Ulyanov (Mlearner)
 * @author Aadish Gupta (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../axon/js/DerivedProperty.js';
import Bounds2 from '../../../dot/js/Bounds2.js';
import Range from '../../../dot/js/Range.js';
import Vector2 from '../../../dot/js/Vector2.js';
import InverseSquareLawCommonStrings from '../../../inverse-square-law-common/js/InverseSquareLawCommonStrings.js';
import ISLCQueryParameters from '../../../inverse-square-law-common/js/ISLCQueryParameters.js';
import DefaultDirection from '../../../inverse-square-law-common/js/view/DefaultDirection.js';
import ISLCGridNode from '../../../inverse-square-law-common/js/view/ISLCGridNode.js';
import ISLCObjectEnum from '../../../inverse-square-law-common/js/model/ISLCObjectEnum.js';
import ISLCRulerNode from '../../../inverse-square-law-common/js/view/ISLCRulerNode.js';
import ISLCRulerRegionsNode from '../../../inverse-square-law-common/js/view/ISLCRulerRegionsNode.js';
import ScreenView from '../../../joist/js/ScreenView.js';
import ModelViewTransform2 from '../../../phetcommon/js/view/ModelViewTransform2.js';
import ResetAllButton from '../../../scenery-phet/js/buttons/ResetAllButton.js';
import { Node, Voicing } from '../../../scenery/js/imports.js';
import ContinuousPropertySoundGenerator from '../../../tambo/js/sound-generators/ContinuousPropertySoundGenerator.js';
import SoundLevelEnum from '../../../tambo/js/SoundLevelEnum.js';
import soundManager from '../../../tambo/js/soundManager.js';
import saturatedSineLoopTrimmed_wav from '../../sounds/saturatedSineLoopTrimmed_wav.js';
import gravityForceLab from '../gravityForceLab.js';
import GravityForceLabConstants from '../GravityForceLabConstants.js';
import GravityForceLabStrings from '../GravityForceLabStrings.js';
import GravityForceLabForceDescriber from './describers/GravityForceLabForceDescriber.js';
import GravityForceLabPositionDescriber from './describers/GravityForceLabPositionDescriber.js';
import GravityForceLabRulerAlerter from './describers/GravityForceLabRulerAlerter.js';
import MassDescriber from './describers/MassDescriber.js';
import GravityForceLabAlertManager from './GravityForceLabAlertManager.js';
import GravityForceLabControlPanel from './GravityForceLabControlPanel.js';
import GravityForceLabScreenSummaryNode from './GravityForceLabScreenSummaryNode.js';
import MassBoundarySoundGenerator from './MassBoundarySoundGenerator.js';
import MassControl from './MassControl.js';
import MassDescriptionNode from './MassDescriptionNode.js';
import MassNode from './MassNode.js';
import MassSoundGenerator from './MassSoundGenerator.js';
import SpherePositionsDescriptionNode from './SpherePositionsDescriptionNode.js';

const mass1AbbreviatedString = GravityForceLabStrings.mass1Abbreviated;
const mass1String = GravityForceLabStrings.mass1;
const mass2AbbreviatedString = GravityForceLabStrings.mass2Abbreviated;
const mass2String = GravityForceLabStrings.mass2;
const unitsMetersString = InverseSquareLawCommonStrings.units.meters;
const massControlsLabelString = GravityForceLabStrings.a11y.controls.massControlsLabel;
const massControlsHelpTextString = GravityForceLabStrings.a11y.controls.massControlsHelpText;
const massControlsHelpTextDensityString = GravityForceLabStrings.a11y.controls.massControlsHelpTextDensity;

// constants
const SHOW_GRID = ISLCQueryParameters.showGrid;
const SHOW_RULER_REGIONS = ISLCQueryParameters.showRulerRegions;
const OBJECT_ONE = ISLCObjectEnum.OBJECT_ONE;
const OBJECT_TWO = ISLCObjectEnum.OBJECT_TWO;
const BOUNDARY_SOUNDS_LEVEL = 1;
const MASS_SOUND_LEVEL = 0.7;
const MASS_SOUND_THRESHOLDS = [ 10, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000 ];

class GravityForceLabScreenView extends ScreenView {
  constructor( model, tandem ) {

    // force text isn't retrieved directly in the screenview, we simply initialize and access it in various Nodes
    const positionDescriber = new GravityForceLabPositionDescriber( model, mass1AbbreviatedString, mass2AbbreviatedString );
    const forceDescriber = new GravityForceLabForceDescriber( model, mass1AbbreviatedString, mass2AbbreviatedString, positionDescriber );
    const massDescriber = new MassDescriber( model, forceDescriber );

    super( {
      layoutBounds: new Bounds2( 0, 0, 768, 464 ),
      screenSummaryContent: new GravityForceLabScreenSummaryNode( model, massDescriber, forceDescriber, positionDescriber ),
      tandem: tandem
    } );

    const alertManager = new GravityForceLabAlertManager( model, massDescriber, forceDescriber, {
      descriptionAlertNode: this
    } );

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

    model.constantRadiusProperty.link( constantRadius => {
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

    // create down here because it needs positions of other items in the screen view
    const rulerRegionPositions = [
      mass2Node.top,
      mass1Node.top,
      mass1Node.localToGlobalPoint( mass1Node.centerPoint.center ).y - 20,
      mass1Node.localToGlobalPoint( mass1Node.centerPoint.center ).y + 20,
      mass1Node.localToGlobalPoint( new Vector2( 0, mass1Node.dragNode.bottom ) ).y,
      massControl1.top,
      this.layoutBounds.bottom
    ];

    const rulerDescriber = new GravityForceLabRulerAlerter( model, mass1AbbreviatedString, mass2AbbreviatedString,
      modelViewTransform, rulerRegionPositions, positionDescriber, {
        descriptionAlertNode: this // Use the ScreenView to alert description
      } );

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
      rulerDescriber, {
        tandem: tandem.createTandem( 'rulerNode' ),
        phetioInputEnabledPropertyInstrumented: true,
        unitString: unitsMetersString,
        backgroundFill: 'rgb(236, 225, 113)',
        snapToNearest: GravityForceLabConstants.POSITION_SNAP_VALUE
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

    // pdom
    const mass1DescriptionNode = new MassDescriptionNode( model, model.object1, massDescriber, forceDescriber, positionDescriber );
    const mass2DescriptionNode = new MassDescriptionNode( model, model.object2, massDescriber, forceDescriber, positionDescriber );
    this.addChild( mass1DescriptionNode );
    this.addChild( mass2DescriptionNode );

    this.pdomPlayAreaNode.pdomOrder = [
      mass1DescriptionNode,
      mass2DescriptionNode,
      massPositionsNode,
      mass1Node.arrowNode,
      mass2Node.arrowNode,
      massControlsNode,
      gravityForceLabRuler
    ];
    this.pdomControlAreaNode.pdomOrder = [
      parameterControlPanel,
      resetAllButton
    ];

    if ( SHOW_GRID ) {
      const gridNode = new ISLCGridNode(
        GravityForceLabConstants.POSITION_SNAP_VALUE,
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
      focus: () => {
        positionDescriber.lastMoveCloser = null;
      }
    } );
    mass2Node.addInputListener( {
      focus: () => {
        positionDescriber.lastMoveCloser = null;
      }
    } );

    // voicing - Make sure that the Utterances from Alerters only announce when the content under this ScreenView
    // is visible
    Voicing.registerUtteranceToNode( alertManager.constantSizeChangedContextResponseUtterance, this );

    // @private - sound generation for the force sound
    this.forceSoundGenerator = new ContinuousPropertySoundGenerator(
      model.forceProperty,
      saturatedSineLoopTrimmed_wav,
      new Range( model.getMinForce(), model.getMaxForce() ),
      {
        initialOutputLevel: 0.15,
        resetInProgressProperty: resetAllButton.buttonModel.isFiringProperty,
        trimSilence: false // a very precise sound file is used, so make sure it doesn't get changed
      }
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
    soundManager.addSoundGenerator(
      new MassSoundGenerator(
        model.object1.valueProperty,
        GravityForceLabConstants.MASS_RANGE,
        resetAllButton.buttonModel.isFiringProperty,
        {
          initialOutputLevel: MASS_SOUND_LEVEL,
          playBasedOnThresholdsProperty: massSliderDraggingViaPointer,
          thresholdValues: MASS_SOUND_THRESHOLDS
        }
      ),
      { sonificationLevel: SoundLevelEnum.EXTRA }
    );
    soundManager.addSoundGenerator(
      new MassSoundGenerator(
        model.object2.valueProperty,
        GravityForceLabConstants.MASS_RANGE,
        resetAllButton.buttonModel.isFiringProperty,
        {
          initialOutputLevel: MASS_SOUND_LEVEL,
          playBasedOnThresholdsProperty: massSliderDraggingViaPointer,
          thresholdValues: MASS_SOUND_THRESHOLDS
        }
      ),
      { sonificationLevel: SoundLevelEnum.EXTRA }
    );

    // sound generation for masses reaching the inner or outer motion boundaries
    soundManager.addSoundGenerator( new MassBoundarySoundGenerator( model.object1, model, 'left', {
      initialOutputLevel: BOUNDARY_SOUNDS_LEVEL
    } ) );
    soundManager.addSoundGenerator( new MassBoundarySoundGenerator( model.object2, model, 'right', {
      initialOutputLevel: BOUNDARY_SOUNDS_LEVEL
    } ) );
  }

  /**
   * step the view
   * @param {number} dt
   * @public
   */
  step( dt ) {
    this.forceSoundGenerator.step( dt );
  }
}

gravityForceLab.register( 'GravityForceLabScreenView', GravityForceLabScreenView );
export default GravityForceLabScreenView;