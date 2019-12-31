// Copyright 2019, University of Colorado Boulder

/**
 * This describer is responsible for the descriptions associated with the moveable ruler. Unlike other describers, this
 * type also alerts based on the movement of the ruler. This is a bit non-traditional, but made sense based on the
 * modularity of ruler specific content.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const GravityForceLabA11yStrings = require( 'GRAVITY_FORCE_LAB/GravityForceLabA11yStrings' );
  const ISLCDescriber = require( 'INVERSE_SQUARE_LAW_COMMON/view/describers/ISLCDescriber' );
  const ISLCObjectEnum = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectEnum' );
  const ISLCQueryParameters = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCQueryParameters' );
  const Range = require( 'DOT/Range' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Utterance = require( 'UTTERANCE_QUEUE/Utterance' );

  // a11y strings
  const grabbedAlertPatternString = GravityForceLabA11yStrings.grabbedAlertPattern.value;
  const regionAndDistancePatternString = GravityForceLabA11yStrings.regionAndDistancePattern.value;
  const hintPatternString = GravityForceLabA11yStrings.hintPattern.value;
  const centersApartPatternString = GravityForceLabA11yStrings.centersApartPattern.value;
  const jumpKeyboardHintString = GravityForceLabA11yStrings.jumpKeyboardHint.value;
  const moveKeyboardHintString = GravityForceLabA11yStrings.moveKeyboardHint.value;
  const gestureHintString = GravityForceLabA11yStrings.gestureHint.value;
  const keyboardReleaseHintString = GravityForceLabA11yStrings.keyboardReleaseHint.value;
  const jumpCenterMassAlertString = GravityForceLabA11yStrings.jumpCenterMassAlert.value;

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

  // These regions are treated differently, as they are in the range that suggests pedagogically relevant interaction.
  const TARGET_REGIONS_RANGE = new Range( RULER_VERTICAL_REGIONS.indexOf( justAboveCentersString ),
    RULER_VERTICAL_REGIONS.indexOf( justBelowCentersString ) );
  const SHOW_RULER_REGIONS = ISLCQueryParameters.showRulerRegions;

  class GravityForceLabRulerDescriber extends ISLCDescriber {

    /**
     * @param {GravityForceLabModel} model
     * @param {string} object1Label
     * @param {string} object2Label
     * @param {ModelViewTransform2} modelViewTransform
     * @param {Array.<number>} viewYPositions - a list of Y positions, least (top) to greatest (bottom)
     * @param {PositionDescriber} positionDescriber
     */
    constructor( model, object1Label, object2Label, modelViewTransform, viewYPositions, positionDescriber ) {

      assert && assert( RULER_VERTICAL_REGIONS.length === viewYPositions.length, 'Unexpected number of y positions' );

      super( model, object1Label, object2Label );

      // @private
      this.rulerPositionProperty = model.rulerPositionProperty;
      this.modelViewTransform = modelViewTransform;
      this.positionDescriber = positionDescriber;
      this.viewYPositions = viewYPositions;
      this.grabbedCount = 0; // for grabbed alert
      this.horizontalDistanceThisGrab = 0; // for horizontal movement alerts
      this.previousVerticalRegionIndex = this.getVerticalRegionIndex(); // for vertical movement alerts
      this.movementUtterance = new Utterance(); // utterance to alert vertical and horizontal movement alerts

      // When the ruler changes position, potentially alert that change.
      this.rulerPositionProperty.lazyLink( ( newValue, oldValue ) => {

        // handle horizontal case
        this.horizontalDistanceThisGrab += Math.abs( oldValue.minus( newValue ).x );
        if ( this.horizontalDistanceThisGrab >= 1 ) {
          this.alertRulerMovement();
          this.horizontalDistanceThisGrab = 0;
        }

        // handle vertical case
        const currentVerticalRegionIndex = this.getVerticalRegionIndex();
        if ( this.previousVerticalRegionIndex !== currentVerticalRegionIndex ) {
          this.alertRulerMovement();
          this.previousVerticalRegionIndex = currentVerticalRegionIndex;
        }
      } );

      // Don't need to unlink
      SHOW_RULER_REGIONS && this.rulerPositionProperty.link( () => console.log( this.getCurrentVerticalRegion() ) );
    }

    /**
     * This alert is for whenever the ruler is moved around normally (not when moved with jumping shortcuts)
     * @private
     */
    alertRulerMovement() {
      this.movementUtterance.alert = this.getRegionAndDistance();
      phet.joist.sim.utteranceQueue.addToBack( this.movementUtterance );
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
    getGrabbedHint() {

      // No hints on or after the third grab
      if ( this.grabbedCount >= 3 ) {
        return '';
      }
      if ( phet.joist.sim.supportsGestureA11y ) {
        return gestureHintString;
      }
      let playHint = jumpKeyboardHintString;
      const regionIndex = this.getVerticalRegionIndex();

      // if on the second grab, the user still isn't in a measurable location, then repeat the first hint to jump to the
      // center.
      if ( this.grabbedCount === 2 && TARGET_REGIONS_RANGE.contains( regionIndex ) ) {
        playHint = moveKeyboardHintString;
      }

      return StringUtils.fillIn( hintPatternString, {
        playHint: playHint,
        releaseHint: keyboardReleaseHintString
      } );
    }

    /**
     * Get the region and distance string.
     * @public
     * @returns {string}.
     */
    getRegionAndDistance() {
      return StringUtils.fillIn( regionAndDistancePatternString, {
        verticalRegion: this.getCurrentVerticalRegion(),
        centersApart: this.getCentersApartDistance()
      } );
    }

    /**
     * This should only be called after `onGrab` to make sure that ruler describer state is in sync
     * @public
     * @returns {string} - the alert for successfully grabbing the ruler.
     */
    getRulerGrabbedAlertable() {
      return StringUtils.fillIn( grabbedAlertPatternString, {
        regionAndDistance: this.getRegionAndDistance(),
        supplementalHint: this.getGrabbedHint()
      } );
    }

    /**
     * Callback for when the ruler is grabbed, to update the state internal to this describer. This should be called
     * whenever the ruler is grabbed.
     * @public
     */
    onGrab() {
      this.grabbedCount++;
      this.horizontalDistanceThisGrab = 0; // reset
    }


    /**
     * @private
     * @returns {number} - integer index of the region
     */
    getVerticalRegionIndex() {
      const viewY = this.modelViewTransform.modelToViewY( this.rulerPositionProperty.value.y );
      for ( let i = 0; i < this.viewYPositions.length; i++ ) {
        if ( viewY <= this.viewYPositions[ i ] ) {
          return i;
        }
      }
    }

    /**
     * @private
     * @returns {*}
     */
    getCurrentVerticalRegion() {
      return RULER_VERTICAL_REGIONS[ this.getVerticalRegionIndex() ];
    }

    /**
     * Get current vertical position when in home position. Should only be called when the ruler is currently in home
     * position.
     */
    getHomePositionString() {
      const currentRegion = this.getCurrentVerticalRegion();
      assert && assert( currentRegion === inHomePositionString, 'getHomePositionString called when ruler not in home position' );
      return currentRegion;
    }

    /**
     * @public
     * @returns {string}
     */
    getJumpCenterMassAlert() {
      return StringUtils.fillIn( jumpCenterMassAlertString, {
        centersApart: this.getCentersApartDistance(),
        object1: this.getObjectLabelFromEnum( ISLCObjectEnum.OBJECT_ONE )
      } );
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
