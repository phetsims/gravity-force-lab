// Copyright 2019, University of Colorado Boulder

/**
 *
 * @author Michael Barlow (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const GravityForceLabA11yStrings = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabA11yStrings' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  // a11y strings
  const grabbedAlertPatternString = GravityForceLabA11yStrings.grabbedAlertPattern.value;
  // const jumpKeyboardHintString = GravityForceLabA11yStrings.jumpKeyboardHint.value;
  // const moveKeyboardHintString = GravityForceLabA11yStrings.moveKeyboardHint.value;
  // const gestureHintString = GravityForceLabA11yStrings.gestureHint.value;
  // const keyboardReleaseHintString = GravityForceLabA11yStrings.keyboardReleaseHint.value;
  // const gestrureReleaseHintString = GravityForceLabA11yStrings.gestrureReleaseHint.value;
  const centersApartPatternString = GravityForceLabA11yStrings.centersApartPattern.value;

  const RULER_VERTICAL_REGIONS = [
    'Covering force vector of m2.',
    'Covering force vector of m1.',
    'Just above centers.',
    'Covering centers.',
    'Just below centers.',
    'In home position below spheres.',
    'Behind mass controls.'
  ];


  /**
   */
  class GravityForceLabRulerDescriber {
    constructor( rulerPositionProperty, modelViewTransform, viewYPositions, positionDescriber ) {

      assert && assert( RULER_VERTICAL_REGIONS.length === viewYPositions.length, 'Unexpected number of y positions' );
      // options = merge( {}, options );

      this.rulerPositionProperty = rulerPositionProperty;
      this.modelViewTransform = modelViewTransform;
      this.positionDescriber = positionDescriber;
      this.viewYPositions = viewYPositions;

      rulerPositionProperty.link( ( x ) => {
        console.log( modelViewTransform.modelToViewPosition( x ) );
        this.getCurrentVerticalRegion();
      } );
    }

    getCentersApartDistance() {
      return StringUtils.fillIn( centersApartPatternString, {
        distanceAndUnits: this.positionDescriber.getDistanceAndUnits()
      } );
    }

    getHint() {
      return '';
    }

    getRulerGrabbedAlertable() {
      return StringUtils.fillIn( grabbedAlertPatternString,{
        verticalRegion: this.getCurrentVerticalRegion(),
        centersApart: this.getCentersApartDistance(),
        supplementalHint: this.getHint()
      } );
    }

    getCurrentVerticalRegion() {
      const viewY = this.modelViewTransform.modelToViewY( this.rulerPositionProperty.value.y );
      console.log( viewY );
      for ( let i = 0; i < this.viewYPositions.length; i++ ) {
        if ( viewY <= this.viewYPositions[ i ] ) {
          console.log( RULER_VERTICAL_REGIONS[ i ] );
          return RULER_VERTICAL_REGIONS[ i ];
        }

      }
    }
  }

  return gravityForceLab.register( 'GravityForceLabRulerDescriber', GravityForceLabRulerDescriber );
} );
