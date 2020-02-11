// Copyright 2020, University of Colorado Boulder
// @author Michael Kauzmann

'use strict';

module.exports = {

  "extends": "../../../../chipper/eslint/sim_es6_eslintrc.js",

  "ignorePatterns": [ "mechamarkers-*.js" ], // don't lint 3rd party library file

  "globals": {
    "Mechamarkers": false
  }
};