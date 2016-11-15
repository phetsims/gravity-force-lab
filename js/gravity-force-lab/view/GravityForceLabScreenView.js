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
  var MassControl = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/MassControl' );
  var MassNode = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/MassNode' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var ParameterControlPanel = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/ParameterControlPanel' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
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
    this.addChild( new MassNode(
      model,
      model.mass1,
      this.layoutBounds,
      modelViewTransform,
      tandem.createTandem( 'mass1Node' ),
      {
        label: mass1AbbreviatedString,
        otherMassLabel: mass2AbbreviatedString,
        direction: 'left',
        arrowColor: '#66f',
        y: MASS_NODE_Y_POSITION,
        forceArrowHeight: 125
      }
    ) );

    this.addChild( new MassNode(
      model,
      model.mass2,
      this.layoutBounds,
      modelViewTransform,
      tandem.createTandem( 'mass2Node' ),
      {
        label: mass2AbbreviatedString,
        otherMassLabel: mass1AbbreviatedString,
        direction: 'right',
        arrowColor: '#f66',
        y: MASS_NODE_Y_POSITION,
        forceArrowHeight: 175
      }
    ) );

    var gravityForceLabRuler = new GravityForceLabRuler(
      model,
      this.layoutBounds.width,
      this.layoutBounds.height,
      tandem.createTandem( 'gravityForceLabRuler' )
    );
    this.addChild( gravityForceLabRuler );

    var resetAllButton = new ResetAllButton( {
      listener: function() { model.reset(); },
      scale: 0.81
    } );
    this.addChild( resetAllButton );

    var parameterControlPanel = new ParameterControlPanel( model, tandem.createTandem( 'parameterControlPanel' ) );
    parameterControlPanel.scale( 0.9 );
    this.addChild( parameterControlPanel );

    var massControl1 = new MassControl(
      mass1String,
      model.mass1.massProperty,
      GravityForceLabConstants.MASS_RANGE,
      model.mass1.baseColorProperty.get(),
      tandem.createTandem( 'massControl1' )
    );

    massControl1.scale( CONTROL_SCALE );
    this.addChild( massControl1 );

    var massControl2 = new MassControl(
      mass2String,
      model.mass2.massProperty,
      GravityForceLabConstants.MASS_RANGE,
      model.mass2.baseColorProperty.get(),
      tandem.createTandem( 'massControl2' )
    );
    massControl2.scale( CONTROL_SCALE );
    this.addChild( massControl2 );

    var massControl1ConstantRadius = new MassControl(
      mass1String,
      model.mass1.massProperty,
      GravityForceLabConstants.MASS_RANGE,
      CONSTANT_MASS_COLOR,
      tandem.createTandem( 'massControl1ConstantRadius' )
    );
    massControl1ConstantRadius.scale( CONTROL_SCALE );
    this.addChild( massControl1ConstantRadius );

    var massControl2ConstantRadius = new MassControl(
      mass2String,
      model.mass2.massProperty,
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
  }

  gravityForceLab.register( 'GravityForceLabScreenView', GravityForceLabScreenView );

  return inherit( ScreenView, GravityForceLabScreenView );
} );
