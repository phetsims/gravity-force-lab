// Copyright 2013-2015, University of Colorado Boulder

/**
 * The ScreenView that displays the gravity force lab screen.
 *
 * @author Anton Ulyanov (Mlearner)
 * @author Aadish Gupta (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var Color = require( 'SCENERY/util/Color' );
  var gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  var GravityForceLabConstants = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabConstants' );
  var GravityForceLabRuler = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/GravityForceLabRuler' );
  var inherit = require( 'PHET_CORE/inherit' );
  var InverseSquareLawGridNode = require( 'INVERSE_SQUARE_LAW_COMMON/view/InverseSquareLawGridNode' );
  var MassControl = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/MassControl' );
  var MassNode = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/MassNode' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var ParameterControlPanel = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/ParameterControlPanel' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var ISLQueryParameters = require( 'INVERSE_SQUARE_LAW_COMMON/ISLQueryParameters' );
  var Vector2 = require( 'DOT/Vector2' );

  // strings
  var mass1String = require( 'string!GRAVITY_FORCE_LAB/mass1' );
  var mass2String = require( 'string!GRAVITY_FORCE_LAB/mass2' );
  var mass1AbbreviatedString = require( 'string!GRAVITY_FORCE_LAB/mass1Abbreviated' );
  var mass2AbbreviatedString = require( 'string!GRAVITY_FORCE_LAB/mass2Abbreviated' );

  // constants
  var CONSTANT_MASS_COLOR = new Color( 'indigo' );
  var MASS_NODE_Y_POSITION = 225;
  var CONTROL_SCALE = 0.72;
  var SHOW_GRID = ISLQueryParameters.showGrid;
  var ARROW_LABEL_COLOR_STRING = '#000';

  /**
   * @param {GravityForceLabModel} model
   * @param {Tandem} tandem
   * @constructor
   */
  function GravityForceLabScreenView( model, tandem ) {
    ScreenView.call( this, { layoutBounds: new Bounds2( 0, 0, 768, 464 ) } );

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
        forceArrowHeight: 125
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
        forceArrowHeight: 175
      }
    );

    this.addChild( massNode1 );
    this.addChild( massNode2 );

    // the arrows and their labels should be above both masses (and their markers) but below
    // the ruler and control panels
    this.addChild( massNode1.arrowNode );
    this.addChild( massNode2.arrowNode );

    var gravityForceLabRuler = new GravityForceLabRuler(
      model,
      this.layoutBounds.width,
      this.layoutBounds.height,
      tandem.createTandem( 'gravityForceLabRuler' )
    );
    this.addChild( gravityForceLabRuler );

    var resetAllButton = new ResetAllButton( {
      listener: function() { model.reset(); },
      scale: 0.81,
      tandem: tandem.createTandem( 'resetAllButton' )
    } );
    this.addChild( resetAllButton );

    var parameterControlPanel = new ParameterControlPanel( model, tandem.createTandem( 'parameterControlPanel' ) );
    parameterControlPanel.scale( 0.9 );
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
      var gridNode = new InverseSquareLawGridNode( 7.8, -7.8, 0.1, this.layoutBounds, modelViewTransform, {
        stroke: 'rgba( 35, 35, 35, 0.6 )'
      } );
      this.addChild( gridNode );
    }
  }

  gravityForceLab.register( 'GravityForceLabScreenView', GravityForceLabScreenView );

  return inherit( ScreenView, GravityForceLabScreenView );
} );
