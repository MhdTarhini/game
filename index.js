// Create a new scene
let gameScene = new Phaser.Scene("Game");

var girldata = {
  right: {
    image: "girl.png",
    frameWidth: 47,
    frameHeight: 65,
    rightAnims: { start: 4, end: 5 },
  },
  left: {
    image: "girl.png",
    frameWidth: 47,
    frameHeight: 65,
    leftAnims: { start: 8, end: 9 },
  },
  up: {
    image: "girl.png",
    frameWidth: 47,
    frameHeight: 65,
    upAnims: { start: 12, end: 13 },
  },
  image: "girl.png",
  frameWidth: 47,
  frameHeight: 65,
  downAnims: { start: 0, end: 3 },
  stopAnims: { start: 1, end: 1 },
};

var ConvertData = JSON.stringify(girldata);

localStorage.setItem("playerData", ConvertData);

const data = JSON.parse(localStorage.getItem("playerData"));

gameScene.preload = function () {
  // Load images
  this.load.image("myTileset-image", "level1.png");
  this.load.image("player", "front-2.png");

  this.load.spritesheet("gamePiece", `${data.image}`, {
    frameWidth: data.frameWidth,
    frameHeight: data.frameHeight,
  });
  this.load.spritesheet("gamePiece-up", `${data.up.image}`, {
    frameWidth: data.up.frameWidth,
    frameHeight: data.up.frameHeight,
  });
  this.load.spritesheet("gamePiece-left", `${data.left.image}`, {
    frameWidth: data.left.frameWidth,
    frameHeight: data.left.frameHeight,
  });
  this.load.spritesheet("gamePiece-right", `${data.right.image}`, {
    frameWidth: data.right.frameWidth,
    frameHeight: data.right.frameHeight,
  });

  // Load tilemap in JSON format
  this.load.tilemapTiledJSON("wallmap", "level-5.json");
};
// https://medium.com/@michaelwesthadley/molar-game-worlds-in-phaser-3-tilemaps-1-958fc7e6bbd6
// https://stackabuse.com/phaser-3-and-tiled-building-a-platformer/
// https://www.makeuseof.com/animate-sprite-with-phaser/

gameScene.create = function () {
  const map = this.make.tilemap({ key: "wallmap" });
  const tileset = map.addTilesetImage("map", "myTileset-image");
  const backgroud = map.createLayer("backgroud", tileset, 0, 0);
  const floor = map.createStaticLayer("floor", tileset, 0, 0);

  floor.setCollisionByExclusion(-1, true);
  this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);

  this.player = this.physics.add.sprite(0, 20, "player");
  this.physics.add.existing(this.player);
  // this.player.setBounce(0.1);
  this.player.setCollideWorldBounds(true);
  this.physics.add.collider(this.player, floor);
  this.physics.world.setBounds(0, 0, mapWidth, mapHeight);

  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("gamePiece-left", {
      start: data.left.leftAnims.start,
      end: data.left.leftAnims.end,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("gamePiece-right", {
      start: data.right.rightAnims.start,
      end: data.right.rightAnims.end,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "down",
    frames: this.anims.generateFrameNumbers("gamePiece", {
      start: data.downAnims.start,
      end: data.downAnims.end,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "up",
    frames: this.anims.generateFrameNumbers("gamePiece-up", {
      start: data.up.upAnims.start,
      end: data.up.upAnims.end,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "stop",
    frames: this.anims.generateFrameNumbers("gamePiece", {
      start: data.stopAnims.start,
      end: data.stopAnims.end,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.cursors = this.input.keyboard.createCursorKeys();
  if (!this.player.body.onFloor()) {
    this.player.setBounce(0.1);
    this.player.body.gravity.y = 2500;
  }
};
gameScene.update = function () {
  // var player = /* get a reference to your player object here */;
  this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

  // Control the player with left or right keys

  if (this.cursors.left.isDown) {
    this.player.setVelocityX(-200);
    this.player.anims.play("left", true);
  } else if (this.cursors.right.isDown) {
    this.player.setVelocityX(200);
    this.player.anims.play("right", true);
  } else if (this.cursors.up.isDown) {
    this.player.setVelocityY(-200);
    this.player.anims.play("up", true);
  } else if (this.cursors.down.isDown) {
    this.player.setVelocityY(200);
    this.player.anims.play("down", true);
  } else {
    // If no keys are pressed, the player keeps still
    this.player.setVelocityX(0);
    this.player.setVelocityY(0);
    this.player.anims.play("stop");
    this.player.anims.stop();
  }
  if (!this.player.body.onFloor()) {
    this.player.setBounce(0.1);
    this.player.body.gravity.y = 2500;
  }
};
let config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 800,
  physics: {
    default: "arcade",
    arcade: {
      // gravity: { y: 200 },
      debug: false, // Enable physics debugging
    },
  },
  scene: gameScene,
};

// Create a new game
let game = new Phaser.Game(config);

var mapWidth = 5000; // Set the width of your game map
var mapHeight = 5000;



