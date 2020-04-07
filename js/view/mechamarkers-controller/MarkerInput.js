// Copyright 2020, University of Colorado Boulder

/**
 * This file is to prototype mechamarkers as an input controller to a phetsim, see https://github.com/phetsims/a11y-research/issues/153
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

// modules
import gravityForceLab from '../../gravityForceLab.js';
import merge from '../../../../phet-core/js/merge.js';
import timer from '../../../../axon/js/timer.js';

// constants
const CONSTANT_SIZE_MARKER = 18; // change this marker number to toggle constant radius

class MarkerInput {

  /**
   * @param {GravityForceLabModel} model
   */
  static init( model ) {

    let previousButtonPresent = false;

    const mass1PositionSlider = new SliderMarker( 'mass1Position', 'slider',
      model.object1.positionProperty, {
        range: model.object1.enabledRangeProperty
      } );
    // const mass2PositionSlider = new SliderMarker( 'mass1Position', 'slider',
    //   model.object2.positionProperty, {
    //     range: model.object2.enabledRangeProperty
    //   } );
    const mass1MassSlider = new SliderMarker( 'mass1Position', 'slider',
      model.object1.valueProperty );
    const mass2MassSlider = new SliderMarker( 'mass1Position', 'slider',
      model.object2.valueProperty );

    function update() {

      // Mechamarkers stuff
      Mechamarkers.update( Date.now() );

      mass1PositionSlider.update();

      // This breaks right now because both positions will be set to the same value
      // mass2PositionSlider.update();
      mass1MassSlider.update();
      mass2MassSlider.update();

      if ( Mechamarkers.getMarker( CONSTANT_SIZE_MARKER ).present !== previousButtonPresent ) {

        Mechamarkers.getMarker( CONSTANT_SIZE_MARKER ).present && model.constantRadiusProperty.toggle();
        previousButtonPresent = Mechamarkers.getMarker( CONSTANT_SIZE_MARKER ).present;
      }
    }

    timer.addListener( update );

    const canvas = document.createElement( 'canvas' );
    const ctx = canvas.getContext( '2d' );
    document.body.appendChild( canvas );
    Mechamarkers.init( canvas, ctx );
  }
}

// Private class that supports listening for a single slider in an input group
class SliderMarker {

  /**
   *
   * @param {string} inputGroup
   * @param {string} inputName
   * @param {Property.<number>} property
   * @param {Object} [options]
   */
  constructor( inputGroup, inputName, property, options ) {
    options = merge( {

      // {Range} By default use the range from the Property
      range: property.range
    }, options );

    assert && assert( options.range, 'options.range needs to be provided, or Property.range supplied.' );

    // private
    this.inputGroup = inputGroup;
    this.inputName = inputName;
    this.property = property;
    this.range = options.range;
  }

  /**
   * Set the value based on the range of the property
   * @param {number} inputValue - output from mechamarkers, between 0 and 1
   */
  setProperty( inputValue ) {
    this.property.value = inputValue * this.property.range.getLength() + this.property.range.min;
  }

  /**
   * Update the state of the slider, setting the Property value if applicable
   */
  update() {
    const group = Mechamarkers.getGroup( this.inputGroup );
    if ( group && group.anchor.present ) {
      const value = group.getInput( this.inputName ).val;
      this.setProperty( value );
    }
  }
}

gravityForceLab.register( 'MarkerInput', MarkerInput );
export default MarkerInput;
