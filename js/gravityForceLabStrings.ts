// Copyright 2021-2022, University of Colorado Boulder

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */
/* eslint-disable */
import getStringModule from '../../chipper/js/getStringModule.js';
import TReadOnlyProperty from '../../axon/js/TReadOnlyProperty.js';
import gravityForceLab from './gravityForceLab.js';

type StringsType = {
  'gravity-force-lab': {
    'title': string;
    'titleProperty': TReadOnlyProperty<string>;
  };
  'mass1': string;
  'mass1Property': TReadOnlyProperty<string>;
  'mass2': string;
  'mass2Property': TReadOnlyProperty<string>;
  'units': {
    'kg': string;
    'kgProperty': TReadOnlyProperty<string>;
  };
  'mass1Abbreviated': string;
  'mass1AbbreviatedProperty': TReadOnlyProperty<string>;
  'mass2Abbreviated': string;
  'mass2AbbreviatedProperty': TReadOnlyProperty<string>;
  'constantSize': string;
  'constantSizeProperty': TReadOnlyProperty<string>;
  'moveSpheresHeading': string;
  'moveSpheresHeadingProperty': TReadOnlyProperty<string>;
  'moveSphereLabel': string;
  'moveSphereLabelProperty': TReadOnlyProperty<string>;
  'moveInSmallerSteps': string;
  'moveInSmallerStepsProperty': TReadOnlyProperty<string>;
  'moveInLargerSteps': string;
  'moveInLargerStepsProperty': TReadOnlyProperty<string>;
  'jumpToLeft': string;
  'jumpToLeftProperty': TReadOnlyProperty<string>;
  'jumpToRight': string;
  'jumpToRightProperty': TReadOnlyProperty<string>;
  'changeMassHeading': string;
  'changeMassHeadingProperty': TReadOnlyProperty<string>;
  'changeMassLabel': string;
  'changeMassLabelProperty': TReadOnlyProperty<string>;
  'changeMassInLargerSteps': string;
  'changeMassInLargerStepsProperty': TReadOnlyProperty<string>;
  'changeMassInSmallerSteps': string;
  'changeMassInSmallerStepsProperty': TReadOnlyProperty<string>;
  'jumpToMaximumMass': string;
  'jumpToMaximumMassProperty': TReadOnlyProperty<string>;
  'jumpToMinimumMass': string;
  'jumpToMinimumMassProperty': TReadOnlyProperty<string>;
  'moveGrabbedRuler': string;
  'moveGrabbedRulerProperty': TReadOnlyProperty<string>;
  'moveOrJumpGrabbedRuler': string;
  'moveOrJumpGrabbedRulerProperty': TReadOnlyProperty<string>;
  'jumpStartOfSphere': string;
  'jumpStartOfSphereProperty': TReadOnlyProperty<string>;
  'jumpHome': string;
  'jumpHomeProperty': TReadOnlyProperty<string>;
  'a11y': {
    'screenSummary': {
      'playAreaOverview': string;
      'playAreaOverviewProperty': TReadOnlyProperty<string>;
      'playAreaControls': string;
      'playAreaControlsProperty': TReadOnlyProperty<string>;
      'secondaryDescription': string;
      'secondaryDescriptionProperty': TReadOnlyProperty<string>;
      'simStateListLabel': string;
      'simStateListLabelProperty': TReadOnlyProperty<string>;
      'massValuesAndComparisonSummaryPattern': string;
      'massValuesAndComparisonSummaryPatternProperty': TReadOnlyProperty<string>;
    };
    'blueSpherePattern': string;
    'blueSpherePatternProperty': TReadOnlyProperty<string>;
    'redSpherePattern': string;
    'redSpherePatternProperty': TReadOnlyProperty<string>;
    'sizeAndDistancePattern': string;
    'sizeAndDistancePatternProperty': TReadOnlyProperty<string>;
    'sizePattern': string;
    'sizePatternProperty': TReadOnlyProperty<string>;
    'micronewtons': string;
    'micronewtonsProperty': TReadOnlyProperty<string>;
    'mass': string;
    'massProperty': TReadOnlyProperty<string>;
    'qualitative': {
      'objectsRelativeSizePattern': string;
      'objectsRelativeSizePatternProperty': TReadOnlyProperty<string>;
      'massAndUnitPattern': string;
      'massAndUnitPatternProperty': TReadOnlyProperty<string>;
      'massAndForceClausesPattern': string;
      'massAndForceClausesPatternProperty': TReadOnlyProperty<string>;
      'massChangeClausePattern': string;
      'massChangeClausePatternProperty': TReadOnlyProperty<string>;
      'massChangesAndMovesClausePattern': string;
      'massChangesAndMovesClausePatternProperty': TReadOnlyProperty<string>;
      'massChangesMovesOtherClausePattern': string;
      'massChangesMovesOtherClausePatternProperty': TReadOnlyProperty<string>;
    };
    'sentencePattern': string;
    'sentencePatternProperty': TReadOnlyProperty<string>;
    'relativeMassSize': {
      'muchMuchSmallerThan': string;
      'muchMuchSmallerThanProperty': TReadOnlyProperty<string>;
      'halfTheSizeOf': string;
      'halfTheSizeOfProperty': TReadOnlyProperty<string>;
      'muchSmallerThan': string;
      'muchSmallerThanProperty': TReadOnlyProperty<string>;
      'smallerButComparableTo': string;
      'smallerButComparableToProperty': TReadOnlyProperty<string>;
      'sameSizeAs': string;
      'sameSizeAsProperty': TReadOnlyProperty<string>;
      'largerButComparableTo': string;
      'largerButComparableToProperty': TReadOnlyProperty<string>;
      'muchLargerThan': string;
      'muchLargerThanProperty': TReadOnlyProperty<string>;
      'twiceTheSizeOf': string;
      'twiceTheSizeOfProperty': TReadOnlyProperty<string>;
      'muchMuchLargerThan': string;
      'muchMuchLargerThanProperty': TReadOnlyProperty<string>;
    };
    'relativeMassSizeCapitalized': {
      'muchMuchSmallerThan': string;
      'muchMuchSmallerThanProperty': TReadOnlyProperty<string>;
      'halfTheSizeOf': string;
      'halfTheSizeOfProperty': TReadOnlyProperty<string>;
      'muchSmallerThan': string;
      'muchSmallerThanProperty': TReadOnlyProperty<string>;
      'smallerButComparableTo': string;
      'smallerButComparableToProperty': TReadOnlyProperty<string>;
      'sameSizeAs': string;
      'sameSizeAsProperty': TReadOnlyProperty<string>;
      'largerButComparableTo': string;
      'largerButComparableToProperty': TReadOnlyProperty<string>;
      'muchLargerThan': string;
      'muchLargerThanProperty': TReadOnlyProperty<string>;
      'twiceTheSizeOf': string;
      'twiceTheSizeOfProperty': TReadOnlyProperty<string>;
      'muchMuchLargerThan': string;
      'muchMuchLargerThanProperty': TReadOnlyProperty<string>;
    };
    'relativeMassDensity': {
      'notDenseComparedTo': string;
      'notDenseComparedToProperty': TReadOnlyProperty<string>;
      'halfAsDenseAs': string;
      'halfAsDenseAsProperty': TReadOnlyProperty<string>;
      'muchLessDenseThan': string;
      'muchLessDenseThanProperty': TReadOnlyProperty<string>;
      'lessDenseButComparableTo': string;
      'lessDenseButComparableToProperty': TReadOnlyProperty<string>;
      'asDenseAs': string;
      'asDenseAsProperty': TReadOnlyProperty<string>;
      'denseButComparableTo': string;
      'denseButComparableToProperty': TReadOnlyProperty<string>;
      'muchDenseThan': string;
      'muchDenseThanProperty': TReadOnlyProperty<string>;
      'twiceAsDenseAs': string;
      'twiceAsDenseAsProperty': TReadOnlyProperty<string>;
      'extremelyDenseComparedTo': string;
      'extremelyDenseComparedToProperty': TReadOnlyProperty<string>;
    };
    'relativeMassDensityCapitalized': {
      'notDenseComparedTo': string;
      'notDenseComparedToProperty': TReadOnlyProperty<string>;
      'halfAsDenseAs': string;
      'halfAsDenseAsProperty': TReadOnlyProperty<string>;
      'muchLessDenseThan': string;
      'muchLessDenseThanProperty': TReadOnlyProperty<string>;
      'lessDenseButComparableTo': string;
      'lessDenseButComparableToProperty': TReadOnlyProperty<string>;
      'asDenseAs': string;
      'asDenseAsProperty': TReadOnlyProperty<string>;
      'denseButComparableTo': string;
      'denseButComparableToProperty': TReadOnlyProperty<string>;
      'muchDenseThan': string;
      'muchDenseThanProperty': TReadOnlyProperty<string>;
      'twiceAsDenseAs': string;
      'twiceAsDenseAsProperty': TReadOnlyProperty<string>;
      'extremelyDenseComparedTo': string;
      'extremelyDenseComparedToProperty': TReadOnlyProperty<string>;
    };
    'propertyChange': {
      'massGetsSmaller': string;
      'massGetsSmallerProperty': TReadOnlyProperty<string>;
      'massGetsBigger': string;
      'massGetsBiggerProperty': TReadOnlyProperty<string>;
      'densityIncreases': string;
      'densityIncreasesProperty': TReadOnlyProperty<string>;
      'densityDecreases': string;
      'densityDecreasesProperty': TReadOnlyProperty<string>;
    };
    'controls': {
      'massControlsLabel': string;
      'massControlsLabelProperty': TReadOnlyProperty<string>;
      'massControlsHelpText': string;
      'massControlsHelpTextProperty': TReadOnlyProperty<string>;
      'massControlsHelpTextDensity': string;
      'massControlsHelpTextDensityProperty': TReadOnlyProperty<string>;
      'constantSizeCheckboxHelpText': string;
      'constantSizeCheckboxHelpTextProperty': TReadOnlyProperty<string>;
      'constantRadiusThinkDensityPattern': string;
      'constantRadiusThinkDensityPatternProperty': TReadOnlyProperty<string>;
      'massMaxMinBorderTextWithForce': string;
      'massMaxMinBorderTextWithForceProperty': TReadOnlyProperty<string>;
      'massMaxMinBorderTextWithoutForce': string;
      'massMaxMinBorderTextWithoutForceProperty': TReadOnlyProperty<string>;
    };
    'keyboardHelp': {
      'moveSphereDescription': string;
      'moveSphereDescriptionProperty': TReadOnlyProperty<string>;
      'moveInSmallerStepsDescription': string;
      'moveInSmallerStepsDescriptionProperty': TReadOnlyProperty<string>;
      'moveInLargerStepsDescription': string;
      'moveInLargerStepsDescriptionProperty': TReadOnlyProperty<string>;
      'jumpToLeftDescription': string;
      'jumpToLeftDescriptionProperty': TReadOnlyProperty<string>;
      'jumpToRightDescription': string;
      'jumpToRightDescriptionProperty': TReadOnlyProperty<string>;
      'changeMassPDOM': string;
      'changeMassPDOMProperty': TReadOnlyProperty<string>;
      'changeMassBasicsPDOM': string;
      'changeMassBasicsPDOMProperty': TReadOnlyProperty<string>;
      'changeMassInLargerStepsDescription': string;
      'changeMassInLargerStepsDescriptionProperty': TReadOnlyProperty<string>;
      'changeMassInSmallerStepsDescription': string;
      'changeMassInSmallerStepsDescriptionProperty': TReadOnlyProperty<string>;
      'jumpToMaximumMassDescription': string;
      'jumpToMaximumMassDescriptionProperty': TReadOnlyProperty<string>;
      'jumpToMinimumMassDescription': string;
      'jumpToMinimumMassDescriptionProperty': TReadOnlyProperty<string>;
      'moveGrabbedRulerPDOM': string;
      'moveGrabbedRulerPDOMProperty': TReadOnlyProperty<string>;
      'moveInSmallerStepsPDOM': string;
      'moveInSmallerStepsPDOMProperty': TReadOnlyProperty<string>;
      'jumpStartOfSpherePDOM': string;
      'jumpStartOfSpherePDOMProperty': TReadOnlyProperty<string>;
      'jumpHomePDOM': string;
      'jumpHomePDOMProperty': TReadOnlyProperty<string>;
    };
    'ruler': {
      'regionAndDistancePattern': string;
      'regionAndDistancePatternProperty': TReadOnlyProperty<string>;
      'releaseAndExploreHint': string;
      'releaseAndExploreHintProperty': TReadOnlyProperty<string>;
      'grabbedAlertPattern': string;
      'grabbedAlertPatternProperty': TReadOnlyProperty<string>;
      'hintPattern': string;
      'hintPatternProperty': TReadOnlyProperty<string>;
      'grabbedJumpKeyboardHint': string;
      'grabbedJumpKeyboardHintProperty': TReadOnlyProperty<string>;
      'jumpCenterKeyboardHint': string;
      'jumpCenterKeyboardHintProperty': TReadOnlyProperty<string>;
      'gestureHint': string;
      'gestureHintProperty': TReadOnlyProperty<string>;
      'keyboardReleaseHint': string;
      'keyboardReleaseHintProperty': TReadOnlyProperty<string>;
      'jumpCenterMassAlert': string;
      'jumpCenterMassAlertProperty': TReadOnlyProperty<string>;
      'positions': {
        'coveringM2': string;
        'coveringM2Property': TReadOnlyProperty<string>;
        'coveringM1': string;
        'coveringM1Property': TReadOnlyProperty<string>;
        'justAboveCenters': string;
        'justAboveCentersProperty': TReadOnlyProperty<string>;
        'coveringCenters': string;
        'coveringCentersProperty': TReadOnlyProperty<string>;
        'justBelowCenters': string;
        'justBelowCentersProperty': TReadOnlyProperty<string>;
        'inHomePosition': string;
        'inHomePositionProperty': TReadOnlyProperty<string>;
        'behindMassControls': string;
        'behindMassControlsProperty': TReadOnlyProperty<string>;
      }
    };
    'voicing': {
      'briefPositionChangeInteractionPattern': string;
      'briefPositionChangeInteractionPatternProperty': TReadOnlyProperty<string>;
      'briefMassChangeForceAlertWithValuePattern': string;
      'briefMassChangeForceAlertWithValuePatternProperty': TReadOnlyProperty<string>;
      'briefMassChangeForceAlertPattern': string;
      'briefMassChangeForceAlertPatternProperty': TReadOnlyProperty<string>;
      'briefDensityChangeForceAlertPattern': string;
      'briefDensityChangeForceAlertPatternProperty': TReadOnlyProperty<string>;
      'briefNewForcePattern': string;
      'briefNewForcePatternProperty': TReadOnlyProperty<string>;
      'briefMassPushAlertPattern': string;
      'briefMassPushAlertPatternProperty': TReadOnlyProperty<string>;
      'briefMassChangeWithPushAlertPattern': string;
      'briefMassChangeWithPushAlertPatternProperty': TReadOnlyProperty<string>;
      'briefMassChangeAlertPattern': string;
      'briefMassChangeAlertPatternProperty': TReadOnlyProperty<string>;
      'biggerCapitalized': string;
      'biggerCapitalizedProperty': TReadOnlyProperty<string>;
      'smallerCapitalized': string;
      'smallerCapitalizedProperty': TReadOnlyProperty<string>;
      'more': string;
      'moreProperty': TReadOnlyProperty<string>;
      'less': string;
      'lessProperty': TReadOnlyProperty<string>;
      'levels': {
        'distanceArrowPattern': string;
        'distanceArrowPatternProperty': TReadOnlyProperty<string>;
      }
    }
  }
};

const gravityForceLabStrings = getStringModule( 'GRAVITY_FORCE_LAB' ) as StringsType;

gravityForceLab.register( 'gravityForceLabStrings', gravityForceLabStrings );

export default gravityForceLabStrings;
