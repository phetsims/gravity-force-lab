// Copyright 2018, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const GravityForceLabA11yStrings = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabA11yStrings' );
  const GravityForceLabPositionDescriber = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/describers/GravityForceLabPositionDescriber' );
  const ISLCObjectEnum = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectEnum' );
  const ISLCAlertManager = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCAlertManager' );
  const MassDescriber = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/view/describers/MassDescriber' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Utterance = require( 'SCENERY_PHET/accessibility/Utterance' );
  const utteranceQueue = require( 'SCENERY_PHET/accessibility/utteranceQueue' );

  // strings
  const mass1AbbreviatedString = require( 'string!GRAVITY_FORCE_LAB/mass1Abbreviated' );
  const mass2AbbreviatedString = require( 'string!GRAVITY_FORCE_LAB/mass2Abbreviated' );

  // a11y strings
  const constantRadiusThinkDensityPatternString = GravityForceLabA11yStrings.constantRadiusThinkDensityPattern.value;
  const massAndForceClausesPatternString = GravityForceLabA11yStrings.massAndForceClausesPattern.value;
  const massSizeRelativeSizePatternString = GravityForceLabA11yStrings.massSizeRelativeSizePattern.value;

  // constants
  const { OBJECT_ONE, OBJECT_TWO } = ISLCObjectEnum;
  const CONSTANT_RADIUS_ALERT = StringUtils.fillIn( constantRadiusThinkDensityPatternString, {
    mass1: mass1AbbreviatedString,
    mass2: mass2AbbreviatedString
  } );

  class GravityForceLabAlertManager extends ISLCAlertManager {
    constructor( model ) {

      super( model );

      // a11y describers - initialized outside the class declaration as they should be treated like helper functions
      this.massDescriber = MassDescriber.getDescriber();
      // this.forceDescriber = GravityForceLabForceDescriber.getDescriber();

      model.scientificNotationProperty.lazyLink( displayInScientificNotation => {
        this.alertScientificNotation( displayInScientificNotation );
      } );

      model.constantRadiusProperty.lazyLink( constantRadius => {
        this.alertConstantRadius( constantRadius );
      } );

      model.forceValuesProperty.lazyLink( showValues => {

        const scientificNotation = model.scientificNotationProperty.get();

        if ( !showValues || !scientificNotation ) {
          ISLCAlertManager.alertForceValues( showValues );
        }
        else {
          this.alertScientificNotation( scientificNotation );
        }
      } );

      model.object1.valueProperty.lazyLink( ( value, oldValue ) => {
        utteranceQueue.clear();
        this.alertMassValueChanged( OBJECT_ONE, value, oldValue );
      } );

      model.object2.valueProperty.lazyLink( ( value, oldValue ) => {
        utteranceQueue.clear();
        this.alertMassValueChanged( OBJECT_TWO, value, oldValue );
      } );
    }

    alertScientificNotation( displayInScientificNotation ) {
      const alert = this.forceDescriber.getScientificNotationAlertText();
      const utterance = new Utterance( { alert, uniqueGroupId: 'scientificNotation' } );
      utteranceQueue.addToBack( utterance );
    }

    alertConstantRadius( constantRadius ) {
      const alert = constantRadius ? CONSTANT_RADIUS_ALERT : this.massDescriber.getM1RelativeSize();
      const utterance = new Utterance( { alert, uniqueGroupId: 'constantRadius' } );
      utteranceQueue.addToBack( utterance );
    }

    alertMassControlFocus( objectEnum ) {
      const alert = this.massDescriber.getMassControlFocusAlertText( objectEnum );
      utteranceQueue.addToBack( alert );
    }

    alertMassValueChanged( objectEnum, value, oldValue ) {
      const alert = this.getMassValueChangedAlertText( objectEnum, value, oldValue );
      const utterance = new Utterance( { alert, uniqueGroupId: 'massChanged' } );
      utteranceQueue.addToBack( utterance );
    }

    alertPositionSliderFocused() {
      console.log( 'alerting position slider focused' );
      const alert = this.forceDescriber.getForceVectorSizeText();
      const utterance = new Utterance( { alert, uniqueGroupId: 'position' } );
      utteranceQueue.addToBack( utterance );
    }

    /**
     * When mass control is focused, produce the same alert as when the position slider is focused
     */
    alertMassControlFocused() {
      this.alertPositionSliderFocused();
    }

    // alertPositionChanged( endAtEdge ) {
    //   const alert = this.getPositionChangedAlertText( endAtEdge );
    //   const utterance = new Utterance( { alert, uniqueGroupId: 'position' } );
    //   utteranceQueue.addToBack( utterance );
    // }
    //
    // alertPositionUnchanged() {
    //   const alert = this.getPositionUnchangedAlertText();
    //   const utterance = new Utterance( { alert, uniqueGroupId: 'position' } );
    //   utteranceQueue.addToBack( utterance );
    // }

    /**
     * Returns the filled-in string, '{{massValue}} kilograms, {{size}}, {{relativeSize}} {{otherObjectLabel}}'
     *
     * @param  {ISLCObjectEnum} objectEnum
     * @returns {string}
     */
    getMassControlFocusAlertText( objectEnum ) {
      const thisObjectMass = this.massDescriber.getObjectFromEnum( objectEnum ).valueProperty.get();
      const massValue = this.massDescriber.getFormattedMass( thisObjectMass );
      const size = this.massDescriber.getMassSize( thisObjectMass );
      const relativeSize = this.massDescriber.getMassRelativeSize( objectEnum );
      const otherObjectLabel = this.massDescriber.getOtherObjectLabelFromEnum( objectEnum );
      return StringUtils.fillIn( massSizeRelativeSizePatternString, {
        massValue,
        size,
        relativeSize,
        otherObjectLabel
      } );
    }

    getMassValueChangedAlertText( objectEnum, newMass, oldMass ) {
      // TODO: this function is called before the position property is updated and sets pushedMassEnum, we'll need to compare
      // the two mass values against the current positions to see if one will be pushed.
      const positionDescriber = GravityForceLabPositionDescriber.getDescriber();

      let massClause = this.massDescriber.getMassChangeClause( objectEnum );

      if ( positionDescriber.massPushed ) {
        massClause = this.massDescriber.getMassChangesAndMovesClause( objectEnum );
        if ( positionDescriber.pushedMassEnum !== objectEnum ) {
          massClause = this.massDescriber.getMassChangesAndMovesOtherClause( objectEnum );
        }
      }

      let forceClause = this.forceDescriber.getVectorChangeClause();

      if ( this.model.forceValuesProperty.get() ) {
        forceClause = this.forceDescriber.getVectorChangeForcesNowClause();
      }

      return StringUtils.fillIn( massAndForceClausesPatternString, { massClause, forceClause } );
    }

    // getPositionChangedAlertText( endAtEdge ) {
    //   let alertText = this.forceDescriber.getVectorChangeText();
    //   let edgeAlertText = this.forceDescriber.getVectorSizeText();
    //
    //   if ( this.model.forceValuesProperty.get() ) {
    //     alertText = this.forceDescriber.getVectorChangeForcesNowText();
    //     edgeAlertText = this.forceDescriber.getVectorSizeForceValueText();
    //   }
    //
    //   return endAtEdge ? edgeAlertText : alertText;
    // }
    //
    // getPositionUnchangedAlertText() {
    //   const positionDescriber = GravityForceLabPositionDescriber.getDescriber();
    //   const forceClause = this.forceDescriber.getVectorsAndForcesClause();
    //   const region = positionDescriber.qualitativeDistance;
    //   return StringUtils.fillIn( regionForceClausePatternString, { region, forceClause } );
    // }

    static getManager() {
      return ISLCAlertManager.getManager();
    }

    static initialize( model ) {
      const manager = new GravityForceLabAlertManager( model );
      return ISLCAlertManager.initialize( manager );
    }
  }

  return gravityForceLab.register( 'GravityForceLabAlertManager', GravityForceLabAlertManager );
} );