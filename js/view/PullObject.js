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

  function PullObject( options ) {
    options = _.extend( {image_count: 15, rope_lenght: 50}, options );
    Node.call( this );

    var pullGroup = new Node( {x: -options.rope_lenght} ),
      pull = [],
      i;
    for ( i = 0; i < options.image_count; i++ ) {
      var image = new Image( gravityForceLabImages.getImage( "pull_figure_" + i + ".png" ) );
      pull.push( new Node( {children: [new Path( { shape: Shape.circle( 0, 0, 10 ), fill: '#777', pickable: false, scale: {x: image.width / 20, y: 1}, x: image.width / 2, y: image.height - 5 } ), image]} ) );
    }
    pullGroup.addChild( new Path( { shape: Shape.lineSegment( -options.rope_lenght, 0, 0, 0 ), stroke: '#666', lineWidth: 2, pickable: false } ) );
    for ( i = 0; i < options.image_count; i++ ) {
      pullGroup.addChild( pull[i] );
      pull[i].scale( -0.3, 0.3 );
      pull[i].bottom = 33;
      pull[i].right = i - options.rope_lenght;
      pull[i].setVisible( false );
    }

    this.addChild( pullGroup );
    //function select image
    this.setPull = function( value, offsetX ) {
      for ( var i = 0; i < options.image_count; i++ ) {
        pull[i].setVisible( i === value );
      }
      pullGroup.x = -offsetX;
    };
  }

  inherit( Node, PullObject );

  return PullObject;
} );
