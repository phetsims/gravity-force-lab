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


  function PullObject() {

    Node.call( this );

    var pullGroup = new Node( {x: -50} );
    var pull = [];
    var i;
    for ( i = 0; i < 15; i++ ) {
      pull.push( new Image( gravityForceLabImages.getImage( "pull_figure_" + i + ".png" ) ) );
    }

    for ( i = 0; i < 15; i++ ) {
      pullGroup.addChild( pull[i] );
      pull[i].scale( -0.3, 0.3 );
      pull[i].bottom = 31;
      pull[i].right = -5 + i;
      pull[i].setVisible( false );
    }
    pullGroup.addChild( new Path( { shape: Shape.lineSegment( -5, 0, 50, 0 ), stroke: '#666', lineWidth: 2 } ) );
    this.addChild( pullGroup );
    //function select image
    this.setPull = function( value, offsetX ) {
      for ( var i = 0; i < 15; i++ ) {
        pull[i].setVisible( false );
      }
      pull[value].setVisible( true );
      pullGroup.x = -50 - offsetX;
    };
  }

  inherit( Node, PullObject );

  return PullObject;
} );