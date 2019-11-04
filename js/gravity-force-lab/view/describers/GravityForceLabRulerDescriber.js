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
  const hintPatternString = GravityForceLabA11yStrings.hintPattern.value;
  const centersApartPatternString = GravityForceLabA11yStrings.centersApartPattern.value;
  const jumpKeyboardHintString = GravityForceLabA11yStrings.jumpKeyboardHint.value;
  const moveKeyboardHintString = GravityForceLabA11yStrings.moveKeyboardHint.value;
  const gestureHintString = GravityForceLabA11yStrings.gestureHint.value;
  const keyboardReleaseHintString = GravityForceLabA11yStrings.keyboardReleaseHint.value;

  const coveringM2String = GravityForceLabA11yStrings.coveringM2.value;
  const coveringM1String = GravityForceLabA11yStrings.coveringM1.value;
  const justAboveCentersString = GravityForceLabA11yStrings.justAboveCenters.value;
  const coveringCentersString = GravityForceLabA11yStrings.coveringCenters.value;
  const justBelowCentersString = GravityForceLabA11yStrings.justBelowCenters.value;
  const inHomePositionString = GravityForceLabA11yStrings.inHomePosition.value;
  const behindMassControlsString = GravityForceLabA11yStrings.behindMassControls.value;

  const RULER_VERTICAL_REGIONS = [
    coveringM2String,
    coveringM1String,
    justAboveCentersString,
    coveringCentersString,
    justBelowCentersString,
    inHomePositionString,
    behindMassControlsString
  ];


  /**
   */
  class GravityForceLabRulerDescriber {
    constructor( rulerPositionProperty, modelViewTransform, viewYPositions, positionDescriber ) {

      assert && assert( RULER_VERTICAL_REGIONS.length === viewYPositions.length, 'Unexpected number of y positions' );

      // @private
      this.rulerPositionProperty = rulerPositionProperty;
      this.modelViewTransform = modelViewTransform;
      this.positionDescriber = positionDescriber;
      this.viewYPositions = viewYPositions;
      this.grabbedCount = 0;
    }

    /**
     * @private
     * @returns {*|string}
     */
    getCentersApartDistance() {
      return StringUtils.fillIn( centersApartPatternString, {
        distanceAndUnits: this.positionDescriber.getDistanceAndUnits()
      } );
    }

    /**
     * @private
     * @returns {string}
     */
    getHint() {

      // No hints on or after the third grab
      if ( this.grabbedCount >= 3 ) {
        return '';
      }
      if ( phet.joist.sim.supportsGestureA11y ) {
        return gestureHintString;
      }

      return StringUtils.fillIn( hintPatternString, {
        playHint: this.grabbedCount === 1 ? jumpKeyboardHintString : moveKeyboardHintString,
        releaseHint: keyboardReleaseHintString
      } );
    }

    /**
     * @public
     * @returns {string} - the alert for successfully grabbing the ruler.
     */
    getRulerGrabbedAlertable() {
      this.grabbedCount++; // first increment the counter for how many times this has been grabbed.

      return StringUtils.fillIn( grabbedAlertPatternString, {
        verticalRegion: this.getCurrentVerticalRegion(),
        centersApart: this.getCentersApartDistance(),
        supplementalHint: this.getHint()
      } );
    }

    /**
     * @private
     * @returns {*}
     */
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

    /**
     * @public
     */
    reset() {
      this.grabbedCount = 0;
    }
  }

  return gravityForceLab.register( 'GravityForceLabRulerDescriber', GravityForceLabRulerDescriber );
} );
