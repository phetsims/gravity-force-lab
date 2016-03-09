// Copyright 2013-2015, University of Colorado Boulder

/**
 * main ScreenView container
 *
 * @author Anton Ulyanov (Mlearner)
 * @author Aadish Gupta
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var Color = require( 'SCENERY/util/Color' );
  var ControlMass = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/ControlMass' );
  var ControlShowValues = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/ControlShowValues' );
  var GravityForceLabRuler = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/GravityForceLabRuler' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MassObjects = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/MassObjects' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Vector2 = require( 'DOT/Vector2' );

  // strings
  var mass1String = require( 'string!GRAVITY_FORCE_LAB/mass1' );
  var mass2String = require( 'string!GRAVITY_FORCE_LAB/mass2' );

  // constants
  var CONSTANT_MASS_COLOR = new Color( 'indigo' );

  function GravityForceLabScreenView( model ) {
    ScreenView.call( this, { layoutBounds: new Bounds2( 0, 0, 768, 464 ) } );

    // Create the model-view transform.  The primary units used in the model are meters, so significant zoom is used.
    // The multipliers for the 2nd parameter can be used to adjust where the point (0, 0) in the model, which is
    // between the two masses.
    var modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( this.layoutBounds.width / 2, this.layoutBounds.height / 2  ),
      50 );

    this.modelViewTransform = modelViewTransform; // Make MVT available to descendant types.

    this.addChild( new MassObjects( model, this.layoutBounds.width, this.layoutBounds.height, modelViewTransform ) );

    var gravityForceLabRuler = new GravityForceLabRuler( model, this.layoutBounds.width, this.layoutBounds.height );
    this.addChild( gravityForceLabRuler );

    var resetAllButton = new ResetAllButton( {
      listener: function() { model.reset(); },
      scale: 0.81
    } );
    this.addChild( resetAllButton );

    var controlShowValues = new ControlShowValues( model );
    controlShowValues.scale(0.9);
    this.addChild( controlShowValues );

    var controlMass1 = new ControlMass( mass1String, model.mass1.massProperty, model.massRange, model.mass1.baseColor );
    controlMass1.scale( 0.72 );
    this.addChild( controlMass1 );

    var controlMass2 = new ControlMass( mass2String, model.mass2.massProperty, model.massRange, model.mass2.baseColor );
    controlMass2.scale( 0.72 );
    this.addChild( controlMass2 );

    var controlMass1ConstantRadius = new ControlMass( mass1String, model.mass1.massProperty, model.massRange, CONSTANT_MASS_COLOR );
    controlMass1ConstantRadius.scale( 0.72 );
    this.addChild( controlMass1ConstantRadius );

    var controlMass2ConstantRadius = new ControlMass( mass2String, model.mass2.massProperty, model.massRange, CONSTANT_MASS_COLOR );
    controlMass2ConstantRadius.scale( 0.72 );
    this.addChild( controlMass2ConstantRadius );

    // positioning the nodes
    controlShowValues.right = this.layoutBounds.width - 15;
    controlShowValues.top = gravityForceLabRuler.bottom + 15;
    controlMass2.right = controlShowValues.left - 45;
    controlMass2.top = controlShowValues.top;
    controlMass1.right = controlMass2.left - 45;
    controlMass1.top = controlShowValues.top;
    controlMass1ConstantRadius.center = controlMass1.center;
    controlMass2ConstantRadius.center = controlMass2.center;
    resetAllButton.right = controlShowValues.right;
    resetAllButton.bottom = controlMass1.bottom;

    model.constantRadiusProperty.link( function( value ){
      if ( value ){
        controlMass1ConstantRadius.visible = true;
        controlMass2ConstantRadius.visible = true;
        controlMass1.visible = false;
        controlMass2.visible = false;
      }
      else{
        controlMass1ConstantRadius.visible = false;
        controlMass2ConstantRadius.visible = false;
        controlMass1.visible = true;
        controlMass2.visible = true;
      }
    } );
  }

  inherit( ScreenView, GravityForceLabScreenView );
  return GravityForceLabScreenView;
} );
