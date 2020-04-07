// Copyright 2020, University of Colorado Boulder

/**
 * This file is to prototype mechamarkers as an input controller to a phetsim, see https://github.com/phetsims/a11y-research/issues/153
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

// modules
import gravityForceLab from '../../gravityForceLab.js';
import SliderGroupMarker from '../../../../tangible/js/SliderGroupMarker.js';
import MarkerInput from '../../../../tangible/js/MarkerInput.js';

// constants
const CONSTANT_SIZE_MARKER = 18; // change this marker number to toggle constant radius

class GravityForceLabMarkerInput extends MarkerInput {

  /**
   * @param {GravityForceLabModel} model
   */
  static init( model ) {

    let previousButtonPresent = false;

    const mass1PositionSlider = new SliderGroupMarker( 'mass1Position', 'slider',
      model.object1.positionProperty, {
        range: model.object1.enabledRangeProperty
      } );
    // const mass2PositionSlider = new SliderGroupMarker( 'mass1Position', 'slider',
    //   model.object2.positionProperty, {
    //     range: model.object2.enabledRangeProperty
    //   } );
    const mass1MassSlider = new SliderGroupMarker( 'mass1Position', 'slider',
      model.object1.valueProperty );
    const mass2MassSlider = new SliderGroupMarker( 'mass1Position', 'slider',
      model.object2.valueProperty );

    // initialize Mechamarkers with GFL specific update function.
    super.init( Mechamarkers => {

      mass1PositionSlider.update();

      // This breaks right now because both positions will be set to the same value
      // mass2PositionSlider.update();
      mass1MassSlider.update();
      mass2MassSlider.update();

      if ( Mechamarkers.getMarker( CONSTANT_SIZE_MARKER ).present !== previousButtonPresent ) {
        Mechamarkers.getMarker( CONSTANT_SIZE_MARKER ).present && model.constantRadiusProperty.toggle();
        previousButtonPresent = Mechamarkers.getMarker( CONSTANT_SIZE_MARKER ).present;
      }
    } );
  }
}

gravityForceLab.register( 'GravityForceLabMarkerInput', GravityForceLabMarkerInput );
export default GravityForceLabMarkerInput;
