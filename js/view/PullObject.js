// Copyright 2002-2013, University of Colorado Boulder


/**
 * pull view for massObject
 *
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var Image = require( 'SCENERY/nodes/Image' );
  var pullImage0 = require( 'image!GRAVITY_FORCE_LAB/pull_figure_0.png' );
  var pullImage1 = require( 'image!GRAVITY_FORCE_LAB/pull_figure_1.png' );
  var pullImage2 = require( 'image!GRAVITY_FORCE_LAB/pull_figure_2.png' );
  var pullImage3 = require( 'image!GRAVITY_FORCE_LAB/pull_figure_3.png' );
  var pullImage4 = require( 'image!GRAVITY_FORCE_LAB/pull_figure_4.png' );
  var pullImage5 = require( 'image!GRAVITY_FORCE_LAB/pull_figure_5.png' );
  var pullImage6 = require( 'image!GRAVITY_FORCE_LAB/pull_figure_6.png' );
  var pullImage7 = require( 'image!GRAVITY_FORCE_LAB/pull_figure_7.png' );
  var pullImage8 = require( 'image!GRAVITY_FORCE_LAB/pull_figure_8.png' );
  var pullImage9 = require( 'image!GRAVITY_FORCE_LAB/pull_figure_9.png' );
  var pullImage10 = require( 'image!GRAVITY_FORCE_LAB/pull_figure_10.png' );
  var pullImage11 = require( 'image!GRAVITY_FORCE_LAB/pull_figure_11.png' );
  var pullImage12 = require( 'image!GRAVITY_FORCE_LAB/pull_figure_12.png' );
  var pullImage13 = require( 'image!GRAVITY_FORCE_LAB/pull_figure_13.png' );
  var pullImage14 = require( 'image!GRAVITY_FORCE_LAB/pull_figure_14.png' );

  var pullImages = [pullImage0, pullImage1, pullImage2, pullImage3, pullImage4, pullImage5, pullImage6, pullImage7, pullImage8, pullImage9, pullImage10,
    pullImage11, pullImage12, pullImage13, pullImage14];

  function PullObject( options ) {
    options = _.extend( {rope_lenght: 50}, options );
    Node.call( this );

    var pullGroup = new Node( {x: -options.rope_lenght} ),
      pull = [],
      i;
    for ( i = 0; i < pullImages.length; i++ ) {
      var image = new Image( pullImages[i] );
      pull.push( new Node( {children: [new Path( Shape.circle( 0, 0, 10 ), { fill: '#777', pickable: false, scale: {x: image.width / 20, y: 1}, x: image.width / 2, y: image.height - 5 } ), image]} ) );
    }
    pullGroup.addChild( new Path( Shape.lineSegment( -options.rope_lenght, 0, 0, 0 ), { stroke: '#666', lineWidth: 2, pickable: false } ) );
    for ( i = 0; i < pullImages.length; i++ ) {
      pullGroup.addChild( pull[i] );
      pull[i].scale( -0.3, 0.3 );
      pull[i].bottom = 33;
      pull[i].right = i - options.rope_lenght;
      pull[i].setVisible( false );
    }

    this.addChild( pullGroup );
    //function select image
    this.setPull = function( value, offsetX ) {
      for ( var i = 0; i < pullImages.length; i++ ) {
        pull[i].setVisible( i === value );
      }
      pullGroup.x = -offsetX;
    };
  }

  inherit( Node, PullObject );

  return PullObject;
} );
