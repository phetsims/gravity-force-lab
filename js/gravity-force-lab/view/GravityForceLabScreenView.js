// Copyright 2013-2017, University of Colorado Boulder

/**
 * The ScreenView that displays the gravity force lab screen.
 *
 * @author Anton Ulyanov (Mlearner)
 * @author Aadish Gupta (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  // var ParameterControlPanel = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/ParameterControlPanel' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var Color = require( 'SCENERY/util/Color' );
  var gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  var GravityForceLabConstants = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabConstants' );
  var HSlider = require( 'SUN/HSlider' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ISLCGridNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCGridNode' );
  var ISLCheckboxPanel = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCheckboxPanel' );
  var ISLCRulerNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCRulerNode' );
  var ISLQueryParameters = require( 'INVERSE_SQUARE_LAW_COMMON/ISLQueryParameters' );
  var MassControl = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/MassControl' );
  var MassNode = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/MassNode' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Property = require( 'AXON/Property' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Vector2 = require( 'DOT/Vector2' );

  // strings
  var constantRadiusString = require( 'string!GRAVITY_FORCE_LAB/constantRadius' );
  var mass1AbbreviatedString = require( 'string!GRAVITY_FORCE_LAB/mass1Abbreviated' );
  var mass1String = require( 'string!GRAVITY_FORCE_LAB/mass1' );
  var mass2AbbreviatedString = require( 'string!GRAVITY_FORCE_LAB/mass2Abbreviated' );
  var mass2String = require( 'string!GRAVITY_FORCE_LAB/mass2' );
  var scientificNotationString = require( 'string!INVERSE_SQUARE_LAW_COMMON/scientificNotation' );
  var showValuesString = require( 'string!GRAVITY_FORCE_LAB/showValues' );
  var unitsMetersString = require( 'string!GRAVITY_FORCE_LAB/units.meters' );

  var mockupImage = require( 'image!GRAVITY_FORCE_LAB/mockupImage.png' );

  // constants
  var CONSTANT_MASS_COLOR = new Color( 'indigo' );
  var MASS_NODE_Y_POSITION = 185;
  var CONTROL_SCALE = 0.72;
  var SHOW_GRID = ISLQueryParameters.showGrid;
  var SHOW_MOCKUP = ISLQueryParameters.showMockup;
  var ARROW_LABEL_COLOR_STRING = '#000';

  /**
   * @param {GravityForceLabModel} model
   * @param {Tandem} tandem
   * @constructor
   */
  function GravityForceLabScreenView( model, tandem ) {
    ScreenView.call( this, {
      layoutBounds: new Bounds2( 0, 0, 768, 464 ),
      tandem: tandem
    } );

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
      modelViewTransform,
      tandem.createTandem( 'mass1Node' ),
      {
        title: mass1String,
        label: mass1AbbreviatedString,
        otherObjectLabel: mass2AbbreviatedString,
        defaultDirection: 'left',
        arrowColor: '#66f',
        arrowFill: ARROW_LABEL_COLOR_STRING,
        arrowLabelFill: ARROW_LABEL_COLOR_STRING,
        y: MASS_NODE_Y_POSITION,
        forceArrowHeight: 85
      }
    );

    var massNode2 = new MassNode(
      model,
      model.object2,
      this.layoutBounds,
      modelViewTransform,
      tandem.createTandem( 'mass2Node' ),
      {
        title: mass2String,
        label: mass2AbbreviatedString,
        otherObjectLabel: mass1AbbreviatedString,
        defaultDirection: 'right',
        arrowColor: '#f66',
        arrowFill: ARROW_LABEL_COLOR_STRING,
        arrowLabelFill: ARROW_LABEL_COLOR_STRING,
        y: MASS_NODE_Y_POSITION,
        forceArrowHeight: 135
      }
    );

    this.addChild( massNode1 );
    this.addChild( massNode2 );

    // the arrows and their labels should be above both masses (and their markers) but below
    // the ruler and control panels
    this.addChild( massNode1.arrowNode );
    this.addChild( massNode2.arrowNode );

    var gravityForceLabRuler = new ISLCRulerNode(
      model,
      this.layoutBounds.height,
      modelViewTransform,
      tandem.createTandem( 'gravityForceLabRuler' ),
      {
        unitString: unitsMetersString,
        backgroundFill: 'rgb(236, 225, 113)',
        snapToNearest: 0.1
      }
    );
    this.addChild( gravityForceLabRuler );

    var resetAllButton = new ResetAllButton( {
      listener: function() { model.reset(); },
      scale: 0.81,
      tandem: tandem.createTandem( 'resetAllButton' )
    } );
    this.addChild( resetAllButton );

    // set up parameters for each checkbox that will be added to the ISLCheckboxPanel
    var checkboxParameters = [];

    checkboxParameters.push( {
      content: constantRadiusString,
      property: model.constantRadiusProperty,
      textTandemLabel: 'constantRadiusText',
      checkboxTandemLabel: 'constantRadiusCheckbox'
    } );

    checkboxParameters.push( {
      content: showValuesString,
      property: model.showValuesProperty,
      textTandemLabel: 'showValuesText',      // tandem for the label
      checkboxTandemLabel: 'showValuesCheckbox'    // tande name for checkbox node (see VerticalCheckboxGroup)
    } );

    checkboxParameters.push( {
      content: scientificNotationString,
      property: model.scientificNotationProperty,
      textTandemLabel: 'scientificNotationText',
      checkboxTandemLabel: 'scientificNotationCheckBox'
    } );

    var parameterControlPanel = new ISLCheckboxPanel( checkboxParameters, tandem.createTandem( 'parameterControlPanel' ), {
      fill: '#FDF498',
      xMargin: 10,
      yMargin: 10,
      minWidth: 170,
      align: 'left',
      textSize: 15
    } );
    this.addChild( parameterControlPanel );

    var massControl1 = new MassControl(
      mass1String,
      model.object1.valueProperty,
      GravityForceLabConstants.MASS_RANGE,
      model.object1.baseColorProperty.get(),
      tandem.createTandem( 'massControl1' )
    );
    massControl1.scale( CONTROL_SCALE );
    this.addChild( massControl1 );

    var massControl2 = new MassControl(
      mass2String,
      model.object2.valueProperty,
      GravityForceLabConstants.MASS_RANGE,
      model.object2.baseColorProperty.get(),
      tandem.createTandem( 'massControl2' )
    );
    massControl2.scale( CONTROL_SCALE );
    this.addChild( massControl2 );

    var massControl1ConstantRadius = new MassControl(
      mass1String,
      model.object1.valueProperty,
      GravityForceLabConstants.MASS_RANGE,
      CONSTANT_MASS_COLOR,
      tandem.createTandem( 'massControl1ConstantRadius' )
    );
    massControl1ConstantRadius.scale( CONTROL_SCALE );
    this.addChild( massControl1ConstantRadius );

    var massControl2ConstantRadius = new MassControl(
      mass2String,
      model.object2.valueProperty,
      GravityForceLabConstants.MASS_RANGE,
      CONSTANT_MASS_COLOR,
      tandem.createTandem( 'massControl2ConstantRadius' )
    );
    massControl2ConstantRadius.scale( CONTROL_SCALE );
    this.addChild( massControl2ConstantRadius );

    // positioning the nodes
    parameterControlPanel.right = this.layoutBounds.width - 15;
    parameterControlPanel.top = gravityForceLabRuler.bottom + 15;
    massControl2.right = parameterControlPanel.left - 45;
    massControl2.top = parameterControlPanel.top;
    massControl1.right = massControl2.left - 45;
    massControl1.top = parameterControlPanel.top;
    massControl1ConstantRadius.center = massControl1.center;
    massControl2ConstantRadius.center = massControl2.center;
    resetAllButton.right = parameterControlPanel.right;
    resetAllButton.top = parameterControlPanel.bottom + 13.5;

    model.constantRadiusProperty.link( function( constantRadius ) {
      massControl1ConstantRadius.visible = constantRadius;
      massControl2ConstantRadius.visible = constantRadius;
      massControl1.visible = !constantRadius;
      massControl2.visible = !constantRadius;
    } );

    if ( SHOW_GRID ) {
      var gridNode = new ISLCGridNode( 7.8, -7.8, 0.1, this.layoutBounds, modelViewTransform, {
        stroke: 'rgba( 35, 35, 35, 0.6 )'
      } );
      this.addChild( gridNode );
    }

    //Show the mock-up and a slider to change its transparency
    if ( SHOW_MOCKUP ) {
      var mockupOpacityProperty = new Property( 0.02 );
      var image = new Image( mockupImage, {
        pickable: false
      } );
      image.scale( this.layoutBounds.width / image.width, this.layoutBounds.height / image.height );
      mockupOpacityProperty.linkAttribute( image, 'opacity' );
      this.addChild( image );
      this.addChild( new HSlider( mockupOpacityProperty, {
        min: 0,
        max: 1
      }, {
        top: 10,
        left: 10
      } ) );
    }
  }

  gravityForceLab.register( 'GravityForceLabScreenView', GravityForceLabScreenView );

  return inherit( ScreenView, GravityForceLabScreenView );
} );
