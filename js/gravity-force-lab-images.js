// Copyright 2002-2013, University of Colorado Boulder

/**
 * Images loader for this simulation.
 *
 * This object will be extended lazily after the image loader completes.
 * Makes it possible to load through the module system rather having to
 * pass as a parameter everywhere or resort to using a global.
 *
 * @author Anton Ulyanov (Mlearner)
 */
define( function() {
  "use strict";
  return {
    imageNames: [
      "slider.png",
      "pull_figure_14.png",
      "pull_figure_13.png",
      "pull_figure_12.png",
      "pull_figure_11.png",
      "pull_figure_10.png",
      "pull_figure_9.png",
      "pull_figure_8.png",
      "pull_figure_7.png",
      "pull_figure_6.png",
      "pull_figure_5.png",
      "pull_figure_4.png",
      "pull_figure_3.png",
      "pull_figure_2.png",
      "pull_figure_1.png",
      "pull_figure_0.png",
      'reset_button_disabled.png',
      'reset_button_down.png',
      'reset_button_over.png',
      'reset_button_up.png'
    ]
  };
} );