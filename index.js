// Create a new scene
let gameScene = new Phaser.Scene("Game");

gameScene.preload = function () {
  // Load images
  this.load.image("myTileset-image", "wall.jpg");
  this.load.image("player", "front-2.png");
  this.load.spritesheet("gamePiece", "all.png", {
    frameWidth: 60,
    frameHeight: 65,
  });
//     this.load.spritesheet("player-left", "assets/player/left-1.png", {
//       frameWidth: 64,
//       frameHeight: 48,
//     });

//   this.load.spritesheet("player-right", "assets/player/right-1/png", {
//     frameWidth: 32,
//     frameHeight: 48,
//   });

  // Load tilemap in JSON format
  this.load.tilemapTiledJSON("wallmap", "wallMap.json");
};
// https://medium.com/@michaelwesthadley/molar-game-worlds-in-phaser-3-tilemaps-1-958fc7e6bbd6
// https://stackabuse.com/phaser-3-and-tiled-building-a-platformer/
// https://www.makeuseof.com/animate-sprite-with-phaser/
gameScene.create = function () {
  const map = this.make.tilemap({ key: "wallmap" });
  const tileset = map.addTilesetImage("map", "myTileset-image");
  const layer = map.createStaticLayer("wall", tileset,0,0);

  // Enable collision for specific tile indices
//   layer.setCollision(12, 44); // Adjust tile index range based on your tileset

  // Enable collision by property
//   layer.setCollisionByProperty({ collides: true });
  layer.setCollisionByExclusion(-1, true);
  // Debug rendering
//   const debugGraphics = this.add.graphics().setAlpha(0.7);
// layer.renderDebug(debugGraphics, {
//   tileColor: null, // Color of non-colliding tiles
//   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
//   faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges


// });
this.player = this.physics.add.sprite(0,20, 'player');
this.player.setBounce(0.1);
this.player.setCollideWorldBounds(true);
this.physics.add.collider(this.player, layer);


this.anims.create({
  key: "left",
  frames: this.anims.generateFrameNumbers("gamePiece", {
    start: 7,
    end:4,
  }),
  frameRate: 10,
  repeat: -1,
});
this.anims.create({
  key: "right",
  frames: this.anims.generateFrameNumbers("gamePiece", {
    start: 8,
    end: 11,
  }),
  frameRate: 10,
  repeat: -1,
});
this.anims.create({
  key: "stop",
  frames: this.anims.generateFrameNumbers("gamePiece", {
    start: 0,
    end: 0,
  }),
  frameRate: 10,
  repeat: -1,
});
//  this.player.anims.play("walk-right");
this.cursors = this.input.keyboard.createCursorKeys();
  // Enable physics for the layer
//   this.physics.world.enable(layer);

  // Collide with other objects
  // ... add your collision logic here ...
};
gameScene.update=function(){
  // Control the player with left or right keys
  if (this.cursors.left.isDown) {
    this.player.setVelocityX(-200);
    // if (this.player.body.onFloor()) {
    this.player.anims.play("left", true);
    // }
  } else if (this.cursors.right.isDown) {
    this.player.setVelocityX(200);
    if (this.player.body.onFloor()) {
      this.player.play("right", true);
    }
  } else if (this.cursors.up.isDown) {
    this.player.setVelocityY(-200);
    // if (this.player.body.onFloor()) {
    //   this.player.play("walk", true);
    // }
  } else if (this.cursors.down.isDown) {
    this.player.setVelocityY(200);
    // if (this.player.body.onFloor()) {
    //   this.player.play("walk", true);
    // }
  } else {
    // If no keys are pressed, the player keeps still
    this.player.setVelocityX(0);
    this.player.anims.play("stop");
    // Only show the idle animation if the player is footed
    // If this is not included, the player would look idle while jumping
    // if (this.player.body.onFloor()) {
    //   this.player.play("idle", true);
    // }
    this.player.anims.stop(); // Stop the animation when no movement keys are pressed
    // this.player.setTexture("player", "robo_player_0");
  }

  // Player can jump while walking any direction by pressing the space bar
  // or the 'UP' arrow
//   if (
//     (this.cursors.space.isDown || this.cursors.up.isDown) &&
//     this.player.body.onFloor()
//   ) {
//     this.player.setVelocityY(-350);
//     this.player.play("jump", true);
//   }
}
let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 500,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200},
      debug: false, // Enable physics debugging
    },
  },
  scene: gameScene,
};

// Create a new game
let game = new Phaser.Game(config);
