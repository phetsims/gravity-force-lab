// Copyright 2018-2019, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const GravityForceLabA11yStrings = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabA11yStrings' );
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

      model.object1.valueProperty.lazyLink( () => {
        utteranceQueue.clear();
        this.alertMassValueChanged( OBJECT_ONE );
      } );

      model.object2.valueProperty.lazyLink( () => {
        utteranceQueue.clear();
        this.alertMassValueChanged( OBJECT_TWO );
      } );
    }

    alertScientificNotation() {
      const alert = this.forceDescriber.getScientificNotationAlertText();
      const utterance = new Utterance( { alert: alert, uniqueGroupId: 'scientificNotation' } );
      utteranceQueue.addToBack( utterance );
    }

    alertConstantRadius( constantRadius ) {
      const alert = constantRadius ? CONSTANT_RADIUS_ALERT : this.massDescriber.getM1RelativeSize();
      const utterance = new Utterance( { alert: alert, uniqueGroupId: 'constantRadius' } );
      utteranceQueue.addToBack( utterance );
    }

    alertMassValueChanged( objectEnum ) {
      const alert = this.getMassValueChangedAlertText( objectEnum );
      const utterance = new Utterance( { alert: alert, uniqueGroupId: 'massChanged' } );
      utteranceQueue.addToBack( utterance );
    }

    alertPositionSliderFocused() {
      const alert = this.forceDescriber.getForceVectorSizeText();
      const utterance = new Utterance( { alert: alert, uniqueGroupId: 'position' } );
      utteranceQueue.addToBack( utterance );
    }

    /**
     * When mass control is focused, produce the same alert as when the position slider is focused
     */
    alertMassControlFocused() {
      this.alertPositionSliderFocused();
    }

    /**
     * Get the value text for when the mass changes for a given object
     * @param {ISLCObjectEnum} objectEnum
     * @returns {string}
     */
    getMassValueChangedAlertText( objectEnum ) {

      let massClause = this.massDescriber.getMassChangeClause( objectEnum );

      // if changing the mass of an object caused one of the masses to move position
      if ( this.model.massWasPushed() ) {
        massClause = this.massDescriber.getMassChangesAndMovesClause( objectEnum );
        if ( this.model.pushedObjectEnumProperty.value !== objectEnum ) {
          massClause = this.massDescriber.getMassChangesAndMovesOtherClause( objectEnum );
        }
      }

      let forceClause = this.forceDescriber.getVectorChangeClause();

      if ( this.model.forceValuesProperty.get() ) {
        forceClause = this.forceDescriber.getVectorChangeForcesNowClause();
      }

      return StringUtils.fillIn( massAndForceClausesPatternString, {
        massClause: massClause,
        forceClause: forceClause
      } );
    }

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