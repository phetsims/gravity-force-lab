// Copyright 2019, University of Colorado Boulder

/**
 * A Panel that has control UI for adjusting the sim. This includes radio buttons for the force values display, and a
 * checkbox for toggling constant radius.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

define( require => {
  'use strict';

  // modules
  const Checkbox = require( 'SUN/Checkbox' );
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const GravityForceLabA11yStrings = require( 'GRAVITY_FORCE_LAB/GravityForceLabA11yStrings' );
  const HSeparator = require( 'SUN/HSeparator' );
  const ISLCConstants = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCConstants' );
  const ISLCForceValuesDisplayControl = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCForceValuesDisplayControl' );
  const ISLCPanel = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCPanel' );
  const merge = require( 'PHET_CORE/merge' );
  const Tandem = require( 'TANDEM/Tandem' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  const constantSizeString = require( 'string!GRAVITY_FORCE_LAB/constantSize' );

  // a11y strings
  const constantSizeCheckboxHelpTextString = GravityForceLabA11yStrings.constantSizeCheckboxHelpText.value;

  // constants
  const CHECKBOX_TEXT_SIZE = 15;

  class GravityForceLabControlPanel extends ISLCPanel {

    /**
     * @param {ISLCModel} model
     * @param {Options} options
     */
    constructor( model, options ) {

      options = merge( {
        tandem: Tandem.required
      }, options );

      const forceValuesDisplayControl = new ISLCForceValuesDisplayControl( model.forceValuesDisplayProperty, {
        tandem: options.tandem.createTandem( 'forceValuesDisplayControl' )
      } );

      const constantSizeCheckboxTandem = options.tandem.createTandem( 'constantSizeCheckbox' );
      const constantSizeText = new Text( constantSizeString, merge( {}, ISLCConstants.UI_TEXT_OPTIONS, {
        tandem: constantSizeCheckboxTandem.createTandem( 'labelText' )
      } ) );
      const constantSizeCheckbox = new Checkbox( constantSizeText, model.constantRadiusProperty,
        merge( {}, ISLCConstants.CHECKBOX_OPTIONS, {
          tandem: constantSizeCheckboxTandem,
          accessibleName: constantSizeString,
          descriptionContent: constantSizeCheckboxHelpTextString,
          textSize: CHECKBOX_TEXT_SIZE,
          spacing: 4
        } )
      );

      super( new VBox( {
        children: [
          forceValuesDisplayControl,
          new HSeparator( forceValuesDisplayControl.width ),
          constantSizeCheckbox
        ],
        spacing: 10,
        align: 'left'
      } ), options );
    }
  }

  return gravityForceLab.register( 'GravityForceLabControlPanel', GravityForceLabControlPanel );
} );