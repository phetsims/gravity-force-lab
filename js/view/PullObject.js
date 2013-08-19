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
  var gravityForceLabImages = require( 'gravity-force-lab-images' );

  var IMAGES_COUNT = 15;
  var ROPE_LENGTH = 50;

  function PullObject() {

    Node.call( this );

    var pullGroup = new Node( {x: -ROPE_LENGTH} ),
      pull = [],
      i;
    for ( i = 0; i < IMAGES_COUNT; i++ ) {
      var image = new Image( gravityForceLabImages.getImage( "pull_figure_" + i + ".png" ) );
      pull.push(new Node({children:[new Path( { shape: Shape.circle( 0, 0, 10 ), fill: '#777', pickable: false, scale:{x:image.width/20,y:1},x:image.width/2,y:image.height-5 } ),image]})  );
    }
    pullGroup.addChild( new Path( { shape: Shape.lineSegment( -ROPE_LENGTH, 0, 0, 0 ), stroke: '#666', lineWidth: 2, pickable: false } ) );
    for ( i = 0; i < IMAGES_COUNT; i++ ) {
      pullGroup.addChild( pull[i] );
      pull[i].scale( -0.3, 0.3 );
      pull[i].bottom = 33;
      pull[i].right = i - ROPE_LENGTH;
      pull[i].setVisible( false );
    }

    this.addChild( pullGroup );
    //function select image
    this.setPull = function( value, offsetX ) {
      for ( var i = 0; i < IMAGES_COUNT; i++ ) {
        pull[i].setVisible( i === value );
      }
      pullGroup.x = -offsetX;
    };
  }

  inherit( Node, PullObject );

  return PullObject;
} );
