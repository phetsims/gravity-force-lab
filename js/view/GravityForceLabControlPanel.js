// Copyright 2019-2022, University of Colorado Boulder

/**
 * A Panel that has control UI for adjusting the sim. This includes radio buttons for the force values display, and a
 * checkbox for toggling constant radius.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import ISLCConstants from '../../../inverse-square-law-common/js/ISLCConstants.js';
import ISLCForceValuesDisplayControl from '../../../inverse-square-law-common/js/view/ISLCForceValuesDisplayControl.js';
import ISLCPanel from '../../../inverse-square-law-common/js/view/ISLCPanel.js';
import merge from '../../../phet-core/js/merge.js';
import { Text, VBox } from '../../../scenery/js/imports.js';
import Checkbox from '../../../sun/js/Checkbox.js';
import HSeparator from '../../../sun/js/HSeparator.js';
import Tandem from '../../../tandem/js/Tandem.js';
import gravityForceLab from '../gravityForceLab.js';
import gravityForceLabStrings from '../gravityForceLabStrings.js';

const constantSizeString = gravityForceLabStrings.constantSize;

const constantSizeCheckboxHelpTextString = gravityForceLabStrings.a11y.controls.constantSizeCheckboxHelpText;

// constants
const CHECKBOX_TEXT_SIZE = 15;

class GravityForceLabControlPanel extends ISLCPanel {

  /**
   * @param {ISLCModel} model
   * @param {Options} options
   */
  constructor( model, options ) {

    options = merge( {
      tandem: Tandem.REQUIRED
    }, options );

    const forceValuesDisplayControl = new ISLCForceValuesDisplayControl( model.forceValuesDisplayProperty, {
      tandem: options.tandem.createTandem( 'forceValuesDisplayControl' )
    } );

    const constantSizeCheckboxTandem = options.tandem.createTandem( 'constantSizeCheckbox' );
    const constantSizeText = new Text( constantSizeString, merge( {}, ISLCConstants.UI_TEXT_OPTIONS, {
      tandem: constantSizeCheckboxTandem.createTandem( 'labelText' )
    } ) );
    const constantSizeCheckbox = new Checkbox( model.constantRadiusProperty, constantSizeText, merge( {}, ISLCConstants.CHECKBOX_OPTIONS, {
      tandem: constantSizeCheckboxTandem,
      accessibleName: constantSizeString,
      descriptionContent: constantSizeCheckboxHelpTextString,
      textSize: CHECKBOX_TEXT_SIZE,
      spacing: 4
    } ) );

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

gravityForceLab.register( 'GravityForceLabControlPanel', GravityForceLabControlPanel );
export default GravityForceLabControlPanel;