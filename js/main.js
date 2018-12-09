
let hero;
let cursors;
let map;
let worldLayer;
let last_direction='right';
let canDoubleJump = false;
let canJump = true;
let lastDownJump = 0;
let lives = 3;

class Welcome_screen extends Phaser.Scene{
    constructor(){
        super("Welcome_screen");
    }
    preload(){
        this.load.image('full_base_hack_35', 'assets/full_base_hack_35.png');
        this.load.spritesheet('hero', 'assets/full_platypus_sheet.png', { frameWidth: 50, frameHeight: 50 });
        this.load.tilemapTiledJSON('welcome_map', 'assets/welcome_screen.json');
        this.load.tilemapTiledJSON('game_over_map', 'assets/game_over.json');
        this.load.tilemapTiledJSON('map', 'assets/tuto_1.json');

    };

    create(){
        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        map = this.make.tilemap({ key: 'welcome_map' });

        const tileset_base = map.addTilesetImage("full_base_hack_35", "full_base_hack_35");

        // Parameters: layer name (or index) from Tiled, tileset, x, y
        worldLayer = map.createDynamicLayer("tiles", tileset_base, 0, 0);
        worldLayer.setCollisionByProperty({collides: true});
        cursors = this.input.keyboard.createCursorKeys();

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn_right',
            frames: [ { key: 'hero', frame: 2 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'turn_left',
            frames: [ { key: 'hero', frame: 6 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('hero', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        const spawnPoint = map.findObject("objects", obj => obj.name === "spawn");
        hero = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'hero');
        hero.setBounce(0);
        hero.setCollideWorldBounds(true);
        hero.body.onWorldBounds = true;


        this.physics.add.collider(worldLayer, hero);
        hero.anims.play('turn_right', true);
        this.cameras.main.startFollow(hero, true, 0.08, 0.08);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setBackgroundColor('#ccccff'); 
        this.physics.world.bounds.width = worldLayer.width;
        this.physics.world.bounds.height = worldLayer.height;
        this.keyGo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        console.log(this);
    }

    update(time, delta){
        if(this.keyGo.isDown){
            this.scene.bringToTop('Tutorial_1');
            this.scene.start('Tutorial_1');
        }
    }
}

class Game_over extends Phaser.Scene{
    constructor(){
        super("Game_over");
    }
    preload(){

    };

    create(){
        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        map = this.make.tilemap({ key: 'game_over_map' });

        const tileset_base = map.addTilesetImage("full_base_hack_35", "full_base_hack_35");

        // Parameters: layer name (or index) from Tiled, tileset, x, y
        worldLayer = map.createDynamicLayer("tiles", tileset_base, 0, 0);
        worldLayer.setCollisionByProperty({collides: true});
        cursors = this.input.keyboard.createCursorKeys();

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn_right',
            frames: [ { key: 'hero', frame: 2 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'turn_left',
            frames: [ { key: 'hero', frame: 6 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('hero', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        const spawnPoint = map.findObject("objects", obj => obj.name === "spawn");
        hero = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'hero');
        hero.setBounce(0);
        hero.setCollideWorldBounds(true);
        hero.body.onWorldBounds = true;


        this.physics.add.collider(worldLayer, hero);
        hero.anims.play('turn_right', true);
        this.cameras.main.startFollow(hero, true, 0.08, 0.08);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setBackgroundColor('#ccccff'); 
        this.physics.world.bounds.width = worldLayer.width;
        this.physics.world.bounds.height = worldLayer.height;
        this.keyGo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        console.log(this);
    }

    update(time, delta){
        if(this.keyGo.isDown){
            lives=3;
            this.scene.bringToTop('Tutorial_1');
            this.scene.start('Tutorial_1');
        }
    }
}

class Tutorial_1 extends Phaser.Scene{
    constructor(){
        super("Tutorial_1");
    }
    preload(){
        //this.load.image('full_base_hack_35', 'assets/full_base_hack_35.png');
        //this.load.spritesheet('hero', 'assets/full_platypus_sheet.png', { frameWidth: 50, frameHeight: 50 });
    };

    create(){
        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        map = this.make.tilemap({ key: 'map' });

        const tileset_base = map.addTilesetImage("full_base_hack_35", "full_base_hack_35");

        // Parameters: layer name (or index) from Tiled, tileset, x, y
        worldLayer = map.createDynamicLayer("tiles", tileset_base, 0, 0);
        worldLayer.setCollisionByProperty({collides: true});
        cursors = this.input.keyboard.createCursorKeys();

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn_right',
            frames: [ { key: 'hero', frame: 2 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'turn_left',
            frames: [ { key: 'hero', frame: 6 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('hero', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        const spawnPoint = map.findObject("objects", obj => obj.name === "spawn");
        hero = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'hero');
        hero.setBounce(0);
        hero.setCollideWorldBounds(true);
        hero.body.onWorldBounds = true;


        this.physics.add.collider(worldLayer, hero);
        hero.anims.play('turn_right', true);
        this.cameras.main.startFollow(hero, true, 0.08, 0.08);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setBackgroundColor('#ccccff'); 
        this.physics.world.bounds.width = worldLayer.width;
        this.physics.world.bounds.height = worldLayer.height;

        this.physics.world.on('worldbounds', function(body,up,down,right,left){
            if(down){
                lives--;
                if(lives>0){
                    hero.body.x = spawnPoint.x;
                    hero.body.y = spawnPoint.y;
                }else{
                    this.scene.start('Game_over');
                }
            }
        },this);
    }

    update(time, delta){
        // Runs once per frame for the duration of the scene
        if ((cursors.space.isDown || cursors.up.isDown))
        {
            if(canJump && hero.body.onFloor()){
                hero.body.setVelocityY(-300); // jump up
                canDoubleJump = true;
                canJump = false;
                lastDownJump = Math.max(cursors.space.timeDown,cursors.up.timeDown);
            }else{
                if((Math.max(cursors.space.timeDown,cursors.up.timeDown)-lastDownJump > 250) && canDoubleJump){
                    canDoubleJump = false;
                    hero.body.setVelocityY(-250); // double jump
                }
            }
        }
        if (cursors.left.isDown)
        {
            hero.setVelocityX(-160);
            hero.anims.play('left', true);
            last_direction = 'left';
        }
        else if (cursors.right.isDown)
        {
            hero.setVelocityX(160);
            hero.anims.play('right', true);
            last_direction = 'right';
        }
        else
        {
            hero.setVelocityX(0);
            hero.anims.play('turn_'+last_direction, true);
        }
        if(hero.body.onFloor()){
            canJump = true;
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 450 },
            debug: false
        }
    },
    parent: "game-container", // ID of the DOM element to add the canvas to
    scene: [Welcome_screen, Tutorial_1, Game_over]
};

const game = new Phaser.Game(config);