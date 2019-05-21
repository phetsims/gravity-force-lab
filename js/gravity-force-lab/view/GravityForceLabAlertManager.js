// Copyright 2018-2019, University of Colorado Boulder

define( require => {
  'use strict';

  // modules
  const ActivationUtterance = require( 'SCENERY_PHET/accessibility/ActivationUtterance' );
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const GravityForceLabA11yStrings = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabA11yStrings' );
  const GravityForceLabModel = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/model/GravityForceLabModel' );
  const ISLCAlertManager = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCAlertManager' );
  const ISLCObjectEnum = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCObjectEnum' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const utteranceQueue = require( 'SCENERY_PHET/accessibility/utteranceQueue' );
  const ValueChangeUtterance = require( 'SCENERY_PHET/accessibility/ValueChangeUtterance' );

  // a11y strings
  const constantRadiusThinkDensityPatternString = GravityForceLabA11yStrings.constantRadiusThinkDensityPattern.value;
  const massAndForceClausesPatternString = GravityForceLabA11yStrings.massAndForceClausesPattern.value;

  // constants
  const { OBJECT_ONE, OBJECT_TWO } = ISLCObjectEnum;

  class GravityForceLabAlertManager extends ISLCAlertManager {

    /**
     * @param {GravityForceLabModel|GFLBModel} model
     * @param {MassDescriber} massDescriber
     * @param {GravityForceLabForceDescriber} forceDescriber
     * @param {GravityForceLabPositionDescriber} positionDescriber
     * @param options
     */
    constructor( model, massDescriber, forceDescriber, positionDescriber, options ) {

      // Basically these options try to support BASICS and REGULAR logic duplication.
      options = _.extend( {

        // only used for gravity-force-lab
        linkToScientificNotationProperty: true,

        // default listener for when forceValues change
        showForceValuesListener: showValues => {

          const scientificNotation = model.scientificNotationProperty.get();

          if ( !showValues || !scientificNotation ) {
            this.alertShowForceValues( showValues );
          }
          else {
            this.alertScientificNotation( scientificNotation );
          }
        }
      }, options );

      super( model, forceDescriber, positionDescriber );

      // @protected - initialized outside the class declaration as they should be treated like helper functions
      this.massDescriber = massDescriber;

      // @private {Utterance} - utterances for various categories of information, to use Utterance alertStable feature
      this.scientificNotationUtterance = new ActivationUtterance();
      this.constantRadiusUtterance = new ActivationUtterance();
      this.massChangedUtterance = new ValueChangeUtterance();
      this.constantRadiusAlert = StringUtils.fillIn( constantRadiusThinkDensityPatternString, {

        // use forceDescriber just for the sim specific object labels, could be any ISLCDescriber
        mass1: forceDescriber.object1Label,
        mass2: forceDescriber.object2Label
      } );

      assert && options.linkToScientificNotationProperty && assert( model instanceof GravityForceLabModel, 'unsupported model for scientific notation' );

      options.linkToScientificNotationProperty && model.scientificNotationProperty.lazyLink( displayInScientificNotation => {
        this.alertScientificNotation( displayInScientificNotation );
      } );

      model.forceValuesProperty.lazyLink( options.showForceValuesListener );

      model.constantRadiusProperty.lazyLink( constantRadius => {
        this.alertConstantRadius( constantRadius );
      } );

      // create a listener to alert when an object's valueProperty changes.
      const getObjectValueListenerForEnum = objectEnum => {
        return () => {
          const pushedEnumListener = objectPushed => {
            if ( objectPushed !== null ) {
              this.alertMassValueChanged( objectEnum );
            }
            model.pushedObjectEnumProperty.unlink( pushedEnumListener );
          };

          // There are two ways in which the valueProperty of an object and the position of either object relate.
          // 1. In which the valueProperty changes and neither position property changes.
          // 2. In which a valueProperty changes and one of the object position changes. When this happens. The value
          // will update in this frame, and the position will update in the next frame, see ISLCModel.step().
          // Here he positionProperty (which the pushedObjectEnumProperty depends on) has not yet been updated. So add
          // a listener here to handle the second case above. If the next time the pushedObjectEnum is no null, it will
          // signify that there was most recently a mass change that pushed an object's position. see https://github.com/phetsims/gravity-force-lab-basics/issues/132
          model.pushedObjectEnumProperty.lazyLink( pushedEnumListener );
          this.alertMassValueChanged( objectEnum );
        };
      };
      model.object1.valueProperty.lazyLink( getObjectValueListenerForEnum( OBJECT_ONE ) );
      model.object2.valueProperty.lazyLink( getObjectValueListenerForEnum( OBJECT_TWO ) );
    }

    /**
     * @private
     */
    alertScientificNotation() {
      this.scientificNotationUtterance.alert = this.forceDescriber.getScientificNotationAlertText();
      utteranceQueue.addToBack( this.scientificNotationUtterance );
    }

    /**
     * @param {boolean} constantRadius
     * @private
     */
    alertConstantRadius( constantRadius ) {
      this.constantRadiusUtterance.alert = constantRadius ? this.constantRadiusAlert :
                                           this.massDescriber.getM1RelativeSize();
      utteranceQueue.addToBack( this.constantRadiusUtterance );
    }

    /**
     * @param {ISLCObjectEnum} objectEnum
     */
    alertMassValueChanged( objectEnum ) {
      this.massChangedUtterance.alert = this.getMassValueChangedAlertText( objectEnum );
      utteranceQueue.addToBack( this.massChangedUtterance );
    }

    /**
     * Get the value text for when the mass changes for a given object
     * @param {ISLCObjectEnum} objectEnum
     * @returns {string}
     */
    getMassValueChangedAlertText( objectEnum ) {

      let massClause = this.massDescriber.getMassOrDensityChangeClause( objectEnum );

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
  }

  return gravityForceLab.register( 'GravityForceLabAlertManager', GravityForceLabAlertManager );
} );