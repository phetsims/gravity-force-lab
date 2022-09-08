// Copyright 2018-2022, University of Colorado Boulder

/**
 * This describer is responsible for all gravity-force-lab specific string forming related to force.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import Utils from '../../../../dot/js/Utils.js';
import InverseSquareLawCommonStrings from '../../../../inverse-square-law-common/js/InverseSquareLawCommonStrings.js';
import ISLCConstants from '../../../../inverse-square-law-common/js/ISLCConstants.js';
import ForceValuesDisplayEnum from '../../../../inverse-square-law-common/js/model/ForceValuesDisplayEnum.js';
import ForceDescriber from '../../../../inverse-square-law-common/js/view/describers/ForceDescriber.js';
import gravityForceLab from '../../gravityForceLab.js';
import GravityForceLabStrings from '../../GravityForceLabStrings.js';

const unitsNewtonsString = InverseSquareLawCommonStrings.units.newtons;

const micronewtonsString = GravityForceLabStrings.a11y.micronewtons;

// constants
const MICRO_CONVERSION_FACTOR = 1e6;
const convertForceToMicronewtons = force => {
  return Utils.toFixedNumber( force * MICRO_CONVERSION_FACTOR, 6 );
};

class GravityForceLabForceDescriber extends ForceDescriber {

  /**
   * @param {GravityForceLabModel} model
   * @param {string} object1Label
   * @param {string} object2Label
   * @param {PositionDescriber} positionDescriber
   */
  constructor( model, object1Label, object2Label, positionDescriber ) {
    const options = {
      units: micronewtonsString,

      convertForce: force => {
        if ( this.forceValuesDisplayProperty.value !== ForceValuesDisplayEnum.SCIENTIFIC ) {
          return convertForceToMicronewtons( force );
        }
        return force;
      },

      forceValueToString: convertedForce => {
        if ( this.forceValuesDisplayProperty.value === ForceValuesDisplayEnum.SCIENTIFIC ) {
          return ForceDescriber.getForceInScientificNotation( convertedForce, ISLCConstants.SCIENTIFIC_NOTATION_PRECISION );
        }
        return `${convertedForce}`;
      }
    };

    super( model, object1Label, object2Label, positionDescriber, options );

    model.forceValuesDisplayProperty.link( forceValuesDisplay => {
      this.units = forceValuesDisplay === ForceValuesDisplayEnum.SCIENTIFIC ? unitsNewtonsString : micronewtonsString;
    } );
  }

  /**
   * Returns the mapped index based on the given force value. Force values in ISLC sims range from piconewtons to
   * newtons, so it's necessary for sim-specific subtypes to specify this logic.
   * These empirically determined values were designed, see https://docs.google.com/document/d/1-37qAgde2XrlXBQae2SgjartM35_EnzDD9pdtd3nXAM/edit#heading=h.nhqxjbby3dgu
   * @protected
   *
   * @override
   * @param  {number} force
   * @param {number} numberOfRegions - for crosscheck
   * @returns {number} - integer within the range of force strings, see ForceDescriber.js
   */
  getForceVectorIndex( force, numberOfRegions ) {
    const convertedForce = convertForceToMicronewtons( force );
    assert && assert( numberOfRegions === 7, 'If numberOfRegions changes, this function should too.' );

    if ( convertedForce < 0.166852 ) {
      return 0;
    }
    if ( convertedForce < 2.206307 ) {
      return 1;
    }
    if ( convertedForce < 4.412615 ) {
      return 2;
    }
    if ( convertedForce < 8.687337 ) {
      return 3;
    }
    if ( convertedForce < 19.856768 ) {
      return 4;
    }
    if ( convertedForce < 35.300920 ) {
      return 5;
    }
    return 6;
  }
}

gravityForceLab.register( 'GravityForceLabForceDescriber', GravityForceLabForceDescriber );
export default GravityForceLabForceDescriber;