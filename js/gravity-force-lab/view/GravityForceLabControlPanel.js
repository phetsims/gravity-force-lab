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
  const ForceValuesDisplayEnum = require( 'INVERSE_SQUARE_LAW_COMMON/model/ForceValuesDisplayEnum' );
  const gravityForceLab = require( 'GRAVITY_FORCE_LAB/gravityForceLab' );
  const GravityForceLabA11yStrings = require( 'GRAVITY_FORCE_LAB/gravity-force-lab/GravityForceLabA11yStrings' );
  const HSeparator = require( 'SUN/HSeparator' );
  const ISLCA11yStrings = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCA11yStrings' );
  const ISLCConstants = require( 'INVERSE_SQUARE_LAW_COMMON/ISLCConstants' );
  const ISLCPanel = require( 'INVERSE_SQUARE_LAW_COMMON/view/ISLCPanel' );
  const merge = require( 'PHET_CORE/merge' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Tandem = require( 'TANDEM/Tandem' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const VerticalAquaRadioButtonGroup = require( 'SUN/VerticalAquaRadioButtonGroup' );

  // strings
  const constantSizeString = require( 'string!GRAVITY_FORCE_LAB/constantSize' );
  const decimalNotationString = require( 'string!INVERSE_SQUARE_LAW_COMMON/decimalNotation' );
  const forceValuesString = require( 'string!INVERSE_SQUARE_LAW_COMMON/forceValues' );
  const hiddenString = require( 'string!INVERSE_SQUARE_LAW_COMMON/hidden' );
  const scientificNotationString = require( 'string!INVERSE_SQUARE_LAW_COMMON/scientificNotation' );

  // a11y strings
  const constantSizeCheckboxHelpTextString = GravityForceLabA11yStrings.constantSizeCheckboxHelpText.value;
  const forceValuesHelpTextString = ISLCA11yStrings.forceValuesHelpText.value;

  // constants
  const CHECKBOX_TEXT_SIZE = 15;
  const TEXT_TANDEM_NAME = 'labelText';

  class GravityForceLabControlPanel extends ISLCPanel {

    /**
     * @param {ISLCModel} model
     * @param {Options} options
     */
    constructor( model, options ) {

      options = merge( {
        tandem: Tandem.required
      }, options );

      const forceValuesGroupTandem = options.tandem.createTandem( 'forceValuesRadioButtonGroup' );

      // create these "throw away" Tandems in order to have the proper
      const decimalNotationTandem = forceValuesGroupTandem.createTandem( 'decimalNotationRadioButton' );
      const scientificNotationTandem = forceValuesGroupTandem.createTandem( 'scientificNotationRadioButton' );
      const hiddenTandem = forceValuesGroupTandem.createTandem( 'hiddenRadioButton' );
      const radioButtonContent = [
        {
          value: ForceValuesDisplayEnum.DECIMAL,
          node: new Text( decimalNotationString, merge( {}, ISLCConstants.UI_TEXT_OPTIONS, {
            tandem: decimalNotationTandem.createTandem( TEXT_TANDEM_NAME )
          } ) ),
          tandemName: decimalNotationTandem.name,
          labelContent: decimalNotationString
        },
        {
          value: ForceValuesDisplayEnum.SCIENTIFIC,
          node: new Text( scientificNotationString, merge( {}, ISLCConstants.UI_TEXT_OPTIONS, {
            tandem: scientificNotationTandem.createTandem( TEXT_TANDEM_NAME )
          } ) ),
          tandemName: scientificNotationTandem.name,
          labelContent: scientificNotationString
        },
        {
          value: ForceValuesDisplayEnum.HIDDEN,
          node: new Text( hiddenString, merge( {}, ISLCConstants.UI_TEXT_OPTIONS, {
            tandem: hiddenTandem.createTandem( TEXT_TANDEM_NAME )
          } ) ),
          tandemName: hiddenTandem.name,
          labelContent: hiddenString
        }
      ];
      const radioButtonGroup = new VerticalAquaRadioButtonGroup( model.forceValuesDisplayProperty, radioButtonContent, {
        selectedLineWidth: 4,
        labelTagName: 'h3',
        labelContent: forceValuesString,
        descriptionContent: forceValuesHelpTextString,
        tandem: forceValuesGroupTandem
      } );

      const constantSizeCheckboxTandem = options.tandem.createTandem( 'constantRadiusCheckbox' );
      const constantSizeText = new Text( constantSizeString, merge( {}, ISLCConstants.UI_TEXT_OPTIONS, {
        tandem: constantSizeCheckboxTandem.createTandem( TEXT_TANDEM_NAME )
      } ) );
      const constantSizeCheckbox = new Checkbox( constantSizeText, model.constantRadiusProperty,
        merge( {}, ISLCConstants.CHECKBOX_OPTIONS, {
          tandem: constantSizeCheckboxTandem,
          accessibleName: constantSizeString,
          descriptionContent: constantSizeCheckboxHelpTextString,
          textSize: CHECKBOX_TEXT_SIZE
        } )
      );

      super( new VBox( {
        children: [
          new VBox( {
            children: [
              new Text( forceValuesString, { font: new PhetFont( { size: 14, weight: 'bold' } ) } ),
              radioButtonGroup ],
            align: 'left',
            spacing: 5
          } ),
          new HSeparator( radioButtonGroup.width ),
          constantSizeCheckbox
        ],
        spacing: 10,
        align: 'left'
      } ), options );
    }
  }

  return gravityForceLab.register( 'GravityForceLabControlPanel', GravityForceLabControlPanel );
} );