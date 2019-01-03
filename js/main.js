/*let hero;
let cursors;
let map;
let worldLayer;
let last_direction='right';
let canDoubleJump = false;
let canJump = true;
let lastDownJump = 0;
let lives = 3;
let score = 0;
let scoreText;
let mainCamera;
let restartScene = 'Welcome_screen';
let jump, hit, collect, level, enemy_hit, wilhelm;
const levelOrder = new Map();
levelOrder.set('Tutorial_1','Tutorial_2');
levelOrder.set('Tutorial_2','Tower');
levelOrder.set('Tower','Grass_1');
levelOrder.set('Grass_1','Grass_2');
levelOrder.set('Grass_2','Grass_3');
levelOrder.set('Grass_3','Game_over');


const emitter = new Phaser.Events.EventEmitter();*/
/*
class Spinner extends Phaser.Scene{
    constructor(){
        super('Spinner');
    }

    preload(){
        //this.load.spritesheet('loading_pl', 'assets/loading_screen_platypus_running.png', { frameWidth: 200, frameHeight: 200 });
    };

    create(){
        this.loader = this.add.sprite(400, 300, 'loading_pl');
        this.anims.create({
            key: 'normal_loading',
            frames: this.anims.generateFrameNumbers('loading_pl', { start: 0, end: 31 }),
            frameRate: 24,
            repeat: -1
        });
        this.loader.anims.play('normal_loading', true);
        this.scene.spawn('Preload');
    }

    update(time, delta){
    }
}*/
let cheatGo = 'Game_over';

class Preload extends Phaser.Scene{
    constructor(){
        super('Preload');
    }
    /*init(){
        const config = {
            key: 'loading',
            frames: 'loader_pl',
            frameRate: 15,
            repeat: -1
        };
        this.anims.create(config);
        this.add.sprite(400, 300, 'loader_pl').play('loading');
    }*/
    preload(){
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);
        const loadingText = this.make.text({
            x: 400,
            y: 250,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#4C986D'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        const percentText = this.make.text({
            x: 400,
            y: 295,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#4C986D'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        
        const funMessageText = this.make.text({
            x: 400,
            y: 350,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#4C986D'
            }
        });
        let funMessages = ['Generating Bitcoins... Please Wait',
        'Recording new theme songs',
        'Generating helpful messages',
        'Upgrading Windows, your PC will restart several times.',
        'Scanning your computer for viruses',
        'Ordering 0s and 1s... Oh looks like one more 0 behind the screen !',
        'Throwing pixels at the screen',
        '//TODO : faster loading screen',
        'Dressing bugs to look like features',
        'This game is running on a potato, it explains the loading time'];
        funMessageText.setOrigin(0.5, 0.5);
        let lastVal = 0;
        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0x4C986D, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
            if(lastVal<(value-0.2)){
                funMessageText.setText(funMessages[Math.floor(Math.random()*funMessages.length)]);
                lastVal=value;
            }
        });
                    
        this.load.on('fileprogress', function (file) {
        });
         
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
        });
        this.load.spritesheet('loading_pl', 'assets/loading_screen_platypus_running.png', { frameWidth: 200, frameHeight: 200 });


        this.load.image('full_base_hack_35', 'assets/full_base_hack_35.png');
        this.load.image('ice_sheet', 'assets/sheet_35.png');
        this.load.image('town_sheet', 'assets/town_sheet.png');
        this.load.image('egg', 'assets/egg_28.png');
        this.load.image('gift', 'assets/gift_box.png');
        this.load.image('snowball', 'assets/snowball.png');
        this.load.image('falling_tile', 'assets/falling_tile.png');

        this.load.spritesheet('sparks', 'assets/sparks_sprites.png', { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('snake', 'assets/snake.png', { frameWidth: 24, frameHeight: 24 });
        this.load.spritesheet('snake_die', 'assets/dying_snake_sprites_576x24.png', { frameWidth: 48, frameHeight: 24 });
        this.load.spritesheet('hero', 'assets/full_platypus_sheet.png', { frameWidth: 50, frameHeight: 50 });
        this.load.spritesheet('snake_boss', 'assets/snake_boss.png', { frameWidth: 70, frameHeight: 70 });
        this.load.spritesheet('snake_boss_die', 'assets/dying_snake_boss_sprites_120x70.png', { frameWidth: 120, frameHeight: 70 });
        this.load.spritesheet('snowman', 'assets/snowman_sprites.png', { frameWidth: 49, frameHeight: 70 });
        this.load.spritesheet('snowman_die', 'assets/dying_snowman_sprites_106x70.png', { frameWidth: 106, frameHeight: 70 });
        this.load.spritesheet('food', 'assets/food_sprites.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('zombie', 'assets/go_sprites_48x75.png', { frameWidth: 48, frameHeight: 75 });
        this.load.spritesheet('zombie_die', 'assets/die_sprites_114x75.png', { frameWidth: 114, frameHeight: 75 });


        this.load.audio('theme', [
            //'assets/forest.ogg',
            'assets/jurassic_park_theme.ogg'
        ]);
        this.load.audio('ice_theme', [
            'assets/do_you_wanna_build_a_snowman.ogg'
        ]);
        this.load.audio('zombie_theme', [
            'assets/thriller.ogg'
        ]);
        this.load.audio('jump', [
            'assets/jump.ogg',
            'assets/jump.mp3'
        ]);
        this.load.audio('hit', [
            'assets/hit.ogg'
        ]);
        this.load.audio('collect', [
            'assets/collect.mp3'
        ]);
        this.load.audio('level', [
            'assets/level.ogg'
        ]);
        this.load.audio('enemy_hit', [
            'assets/enemy_hit.ogg'
        ]);
        this.load.audio('wilhelm', [
            'assets/wilhelm.ogg'
        ]);

        this.load.tilemapTiledJSON('welcome_map', 'assets/welcome_screen.json');
        this.load.tilemapTiledJSON('game_over_map', 'assets/game_over.json');
        this.load.tilemapTiledJSON('map', 'assets/tuto_1.json');
        this.load.tilemapTiledJSON('tuto_2_map', 'assets/tuto_2.json');
        this.load.tilemapTiledJSON('tower_map', 'assets/tower.json');
        this.load.tilemapTiledJSON('grass_1_map', 'assets/grass_1.json');
        this.load.tilemapTiledJSON('grass_2_map', 'assets/grass_2.json');
        this.load.tilemapTiledJSON('grass_3_map', 'assets/grass_3.json');
        this.load.tilemapTiledJSON('ice_1_map', 'assets/ice_1.json');
        this.load.tilemapTiledJSON('ice_2_map', 'assets/ice_2.json');
        this.load.tilemapTiledJSON('ice_3_map', 'assets/ice_3.json');
        this.load.tilemapTiledJSON('town_1_map', 'assets/town_1.json');
        this.load.tilemapTiledJSON('town_2_map', 'assets/town_2.json');
        this.load.tilemapTiledJSON('town_3_map', 'assets/town_3.json');
    };

    create(){
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
        this.anims.create({
            key: 'left_snake',
            frames: this.anims.generateFrameNumbers('snake', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'right_snake',
            frames: this.anims.generateFrameNumbers('snake', { start: 2, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'right_snake_die',
            frames: this.anims.generateFrameNumbers('snake_die', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'left_snake_die',
            frames: this.anims.generateFrameNumbers('snake_die', { start: 6, end: 11 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'left_snake_boss',
            frames: this.anims.generateFrameNumbers('snake_boss', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'right_snake_boss',
            frames: this.anims.generateFrameNumbers('snake_boss', { start: 2, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'right_snake_boss_die',
            frames: this.anims.generateFrameNumbers('snake_boss_die', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'left_snake_boss_die',
            frames: this.anims.generateFrameNumbers('snake_boss_die', { start: 6, end: 11 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'right_snowman',
            frames: this.anims.generateFrameNumbers('snowman', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'left_snowman',
            frames: this.anims.generateFrameNumbers('snowman', { start: 7, end: 13 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'right_snowman_die',
            frames: this.anims.generateFrameNumbers('snowman_die', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'left_snowman_die',
            frames: this.anims.generateFrameNumbers('snowman_die', { start: 7, end: 13 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'left_zombie_walk',
            frames: this.anims.generateFrameNumbers('zombie', { start: 0, end: 9 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'right_zombie_walk',
            frames: this.anims.generateFrameNumbers('zombie', { start: 10, end: 19 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'left_zombie_die',
            frames: this.anims.generateFrameNumbers('zombie_die', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: 0,
            onRepeat: (sprite,anim)=>{console.log(sprite);sprite.destroy();}
        });
        this.anims.create({
            key: 'right_zombie_die',
            frames: this.anims.generateFrameNumbers('zombie_die', { start: 8, end: 15 }),
            frameRate: 10,
            repeat: 0,
            onRepeat: (sprite,anim)=>{console.log(sprite);sprite.destroy();}
        });
        this.anims.create({
            key: 'normal_loading',
            frames: this.anims.generateFrameNumbers('loading_pl', { start: 0, end: 31 }),
            frameRate: 24,
            repeat: -1
        });
        //this.music = this.sound.add('theme');
        jump = this.sound.add('jump', {volume: 0.3});
        hit = this.sound.add('hit', {volume: 0.4});
        collect = this.sound.add('collect');
        level = this.sound.add('level');
        enemy_hit = this.sound.add('enemy_hit', {volume: 0.5});
        wilhelm = this.sound.add('wilhelm', {volume: 0.3});
        let theme = this.sound.add('theme');
        theme.loop = true;
        soundBox.set('theme',theme);
        let ice_theme = this.sound.add('ice_theme',{volume: 0.4});
        ice_theme.loop = true;
        soundBox.set('ice_theme', ice_theme);
        let zombie_theme = this.sound.add('zombie_theme',{volume: 0.4});
        zombie_theme.loop = true;
        soundBox.set('zombie_theme', zombie_theme);
        soundBox.get('theme').play();
        this.scene.start('Welcome_screen');

    }

    update(time, delta){
    }
}

class Welcome_screen extends Phaser.Scene{
    constructor(){
        super('Welcome_screen');
    }
    preload(){


    };

    create(){
        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        map = this.make.tilemap({ key: 'welcome_map' });

        const tileset_base = map.addTilesetImage('full_base_hack_35', 'full_base_hack_35');

        // Parameters: layer name (or index) from Tiled, tileset, x, y
        worldLayer = map.createDynamicLayer('tiles', tileset_base, 0, 0);
        worldLayer.setCollisionByProperty({collides: true});
        hero = this.physics.add.sprite(400,300, 'loading_pl');
        hero.body.setAllowGravity(false);
        hero.setFrame(2);
        hero.anims.play('normal_loading', true);
        /*const spawnPoint = map.findObject('objects', obj => obj.name === 'spawn');
        hero = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'hero');
        hero.setBounce(0);
        hero.setCollideWorldBounds(true);
        hero.body.onWorldBounds = true;


        this.physics.add.collider(worldLayer, hero);
        hero.anims.play('turn_right', true);*/
        this.cameras.main.startFollow(hero, true, 0.08, 0.08);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setBackgroundColor('#ccccff'); 
        this.physics.world.bounds.width = worldLayer.width;
        this.physics.world.bounds.height = worldLayer.height;
        this.keyGo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyV = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);

        //console.log(this);

        this.nameMessage = this.add.text(400, 120, `No Name Bros.`,    { fontFamily: "Arial Black", fontSize: 96, fill: '#4C986D', align: 'center' });
        this.nameMessage.setOrigin(0.5);
        this.nameMessage.setStroke('#003D1B', 6);
        this.nameMessage.setShadow(2, 2, "#003D1A", 2, true, true);
        if(hiScore>0){
            this.hiScoreMessage = this.add.text(630, 490, `High score : ${hiScore}`,    { font: '72px Arial', fill: '#4C986D', align: 'center' });
            this.hiScoreMessage.setOrigin(0.5);
            this.hiScoreMessage.setStroke('#003D1B', 6);
            this.hiScoreMessage.setShadow(2, 2, "#003D1A", 2, true, true);
        }
        this.startMessage = this.add.text(210, 490, `Press 'S' to quick start`,  { font: '72px Arial', fill: '#4C986D', align: 'center' });
        this.startMessage.setOrigin(0.5);
        this.startMessage.setStroke('#003D1B', 6);
        this.startMessage.setShadow(2, 2, "#003D1A", 2, true, true);
    }

    update(time, delta){
        if(this.keyV.isDown)
            this.scene.start(cheatGo);
        if(this.keyGo.isDown){
            if(hasBeenThroughTutorial)
                this.scene.start('Grass_1');
            else
                this.scene.start('Tutorial_1');
        }
    }
}

class Game_over extends Phaser.Scene{
    constructor(){
        super('Game_over');
    }
    preload(){

    };

    create(){
        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        map = this.make.tilemap({ key: 'game_over_map' });

        const tileset_base = map.addTilesetImage('full_base_hack_35', 'full_base_hack_35');

        // Parameters: layer name (or index) from Tiled, tileset, x, y
        worldLayer = map.createDynamicLayer('tiles', tileset_base, 0, 0);
        worldLayer.setCollisionByProperty({collides: true});
        /*let iii = 1;
        setInterval(() => {
            worldLayer.replaceByIndex(iii, iii+1);
            iii++;
        }, 1000);
        let fallingTiles = worldLayer.filterTiles(obj=> obj.index==1);
        fallingTiles.map(f=>{
            //f.enableBody=true;
            this.physics.add.existing(f);
            f.body.setEnable(true);
            f.body.setAllowGravity(true);
            f.body.setGravityY(230);
            f.body.setVelocityY(124);
            f.body.setMass(1.8);
            f.body.setImmovable(false)
            f.body.setBounce(0.4);
            console.log(f);
        })*/
        cursors = this.input.keyboard.createCursorKeys();
        
        const spawnPoint = map.findObject('objects', obj => obj.name === 'spawn');
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
        this.keyContinue = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);


        if(lives>0){
            this.congratulationsMessage = this.add.text(400, 120, `Congratulations`,    { fontFamily: "Arial Black", fontSize: 84, fill: '#4C986D', align: 'center' });
            this.congratulationsMessage.setOrigin(0.5);
            this.congratulationsMessage.setStroke('#003D1B', 6);
            this.congratulationsMessage.setShadow(2, 2, "#003D1A", 2, true, true);
            this.congratulationsMessage.depth=1;
            this.particles = this.add.particles('sparks');

            this.particlesEmitter = this.particles.createEmitter({
                x: 200,
                y: -20,
                angle: { min: 180, max: 360 },
                speed: 400,
                gravityY: 350,
                lifespan: 4000,
                quantity: 6,
                scale: { start: 0.1, end: 1 },
                frame :  [0,1,2,3,4]
                //blendMode: 'ADD'
            });
            this.particlesEmitter = this.particles.createEmitter({
                x: 600,
                y: -20,
                angle: { min: 180, max: 360 },
                speed: 400,
                gravityY: 350,
                lifespan: 4000,
                quantity: 6,
                scale: { start: 0.1, end: 1 },
                frame :  [0,1,2,3,4]
                //blendMode: 'ADD'
            });
        }

        this.startMessage = this.add.text(400, 200, `Press 'S' to start again`,  { font: '72px Arial', fill: '#4C986D', align: 'center' });
        this.continueMessage = this.add.text(400, 300, `Press 'C' to continue`,  { font: '72px Arial', fill: '#4C986D', align: 'center' });
        this.nothingMessage = this.add.text(400, 400, `Press 'N' do nothing`,    { font: '72px Arial', fill: '#4C986D', align: 'center' });
        this.startMessage.setOrigin(0.5);
        this.continueMessage.setOrigin(0.5);
        this.nothingMessage.setOrigin(0.5);
        this.startMessage.setStroke('#003D1B', 6);
        this.startMessage.setShadow(2, 2, "#003D1A", 2, true, true);
        this.continueMessage.setStroke('#003D1B', 6);
        this.continueMessage.setShadow(2, 2, "#003D1A", 2, true, true);
        this.nothingMessage.setStroke('#003D1B', 6);
        this.nothingMessage.setShadow(2, 2, "#003D1A", 2, true, true);
        if(score > hiScore){
            hiScore = score;
            localStorage.setItem('plit_hi_score', score);
        }
        this.scoreMessage = this.add.text(175, 490, `Score : ${score}`,    { font: '72px Arial', fill: '#4C986D', align: 'center' });
        this.hiScoreMessage = this.add.text(630, 490, `Best : ${hiScore}`,    { font: '72px Arial', fill: '#4C986D', align: 'center' });
        this.scoreMessage.setOrigin(0.5);
        this.hiScoreMessage.setOrigin(0.5);
        this.scoreMessage.setStroke('#003D1B', 6);
        this.scoreMessage.setShadow(2, 2, "#003D1A", 2, true, true);
        this.hiScoreMessage.setStroke('#003D1B', 6);
        this.hiScoreMessage.setShadow(2, 2, "#003D1A", 2, true, true);

        this.startMessage.depth=1;
        this.continueMessage.depth=1;
        this.nothingMessage.depth=1;


        this.fallingTiles = this.physics.add.group({
            allowGravity: false
        });
        const fallingTilesCoords = [//game
            {x: 70,y: 105},{x: 105,y: 105},{x: 140,y: 105},{x: 175,y: 105},{x: 245,y: 105},{x: 280,y: 105},{x: 315,y: 105},{x: 350,y: 105},{x: 420,y: 105},{x: 455,y: 105},{x: 525,y: 105},{x: 560,y: 105},{x: 630,y: 105},{x: 665,y: 105},{x: 700,y: 105},
            {x: 70,y: 140},{x: 245,y: 140},{x: 350,y: 140},{x: 420,y: 140},{x: 490,y: 140},{x: 560,y: 140},{x: 630,y: 140},
            {x: 70,y: 175},{x: 140,y: 175},{x: 175,y: 175},{x: 245,y: 175},{x: 280,y: 175},{x: 315,y: 175},{x: 350,y: 175},{x: 420,y: 175},{x: 560,y: 175},{x: 630,y: 175},{x: 665,y: 175},
            {x: 70,y: 210},{x: 175,y: 210},{x: 245,y: 210},{x: 350,y: 210},{x: 420,y: 210},{x: 560,y: 210},{x: 630,y: 210},
            {x: 70,y: 245},{x: 105,y: 245},{x: 140,y: 245},{x: 175,y: 245},{x: 245,y: 245},{x: 350,y: 245},{x: 420,y: 245},{x: 560,y: 245},{x: 630,y: 245},{x: 665,y: 245},{x: 700,y: 245},
            //over
            {x: 70,y: 315},{x: 105,y: 315},{x: 140,y: 315},{x: 175,y: 315},{x: 245,y: 315},{x: 385,y: 315},{x: 455,y: 315},{x: 490,y: 315},{x: 525,y: 315},{x: 595,y: 315},{x: 630,y: 315},{x: 665,y: 315},{x: 700,y: 315},
            {x: 70,y: 350},{x: 175,y: 350},{x: 245,y: 350},{x: 385,y: 350},{x: 455,y: 350},{x: 595,y: 350},{x: 700,y: 350},
            {x: 70,y: 385},{x: 175,y: 385},{x: 280,y: 385},{x: 350,y: 385},{x: 455,y: 385},{x: 490,y: 385},{x: 595,y: 385},{x: 630,y: 385},{x: 665,y: 385},{x: 700,y: 385},
            {x: 70,y: 420},{x: 175,y: 420},{x: 280,y: 420},{x: 350,y: 420},{x: 455,y: 420},{x: 595,y: 420},{x: 665,y: 420},
            {x: 70,y: 455},{x: 105,y: 455},{x: 140,y: 455},{x: 175,y: 455},{x: 315,y: 455},{x: 455,y: 455},{x: 490,y: 455},{x: 525,y: 455},{x: 595,y: 455},{x: 700,y: 455},
        ];
        fallingTilesCoords.map(ff=>{
            let ftile = this.fallingTiles.create(ff.x, ff.y, 'falling_tile').setOrigin(0,1).setBounce(0.4);
            ftile.depth=0;
        });
        this.physics.add.collider(this.fallingTiles, worldLayer);

        setTimeout((()=>{
            //this.fallingTiles.setVelocityY(200);
            this.fallingTiles.children.each(e=>{
                e.body.setAllowGravity(true);
                e.body.setVelocityY(-200)
                this.physics.accelerateToObject(e,hero,130);
            })
        }).bind(this), 2000);
        //console.log(this);
    }

    update(time, delta){
        if(this.keyGo.isDown){
            lives = 3;
            score = 0;
            //this.scene.bringToTop('Tutorial_1');
            if(hasBeenThroughTutorial)
                this.scene.start('Grass_1');
            else
                this.scene.start('Tutorial_1');
        } 
        if(this.keyContinue.isDown){
            lives = 3;
            score = 0;
            //this.scene.bringToTop('Tutorial_1');
            this.scene.start(restartScene);
        }
    }
}

class Tutorial_1 extends Phaser.Scene{
    constructor(){
        super('Tutorial_1');
    }
    preload(){

    };

    create(){
        mainCamera = this.cameras.main;
        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        map = this.make.tilemap({ key: 'map' });

        const tileset_base = map.addTilesetImage('full_base_hack_35', 'full_base_hack_35');

        // Parameters: layer name (or index) from Tiled, tileset, x, y
        worldLayer = map.createDynamicLayer('tiles', tileset_base, 0, 0);
        worldLayer.setCollisionByProperty({collides: true});

        cursors = this.input.keyboard.createCursorKeys();

        const spawnPoint = map.findObject('objects', obj => obj.name === 'spawn');
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
                wilhelm.play();
                lives--;
                emitter.emit('HUD_update', score, lives);
                if(lives>0){
                   /* hero.body.x = spawnPoint.x;
                    hero.body.y = spawnPoint.y;*/
                    this.scene.restart();
                }else{
                    restartScene = this.scene.key;
                    this.scene.start('Game_over');
                }
            }
        },this);

        const eggs = this.physics.add.group({
            key: 'egg',
            repeat: 6,
            allowGravity: false,
            setXY: { x: 350, y: 600, stepX: 35, stepY: -35 }
        });
        /*let i=1;
        eggs.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            if(i%2==0)
                child.body.setAllowGravity(true);
            i++;
        });*/

        this.physics.add.collider(eggs, worldLayer);
        this.physics.add.overlap(hero, eggs, this.collectEgg, null, this);

        emitter.emit('HUD_update', score, lives);
        this.endPoint = map.findObject('objects', obj => obj.name === 'level_end');

        //music, theme & all
        if(!soundBox.get('theme').isPlaying)
            soundBox.get('theme').play();
        
        this.keyTuto = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.tutoMessages =[{xstart: 184, xend: 694,   y: 300, acknowledged: false, message:'Welcome to the tutorial!\nThe controls are easy : \n- move by using the left and right arrows\n- jump by using either the space key or the up arrow'},
                            {xstart: 695, xend: 1100,  y: 250, acknowledged: false, message:'You wont take fall damages\nbut you can jump to close the gaps faster'},
                            {xstart: 1243, xend: 1678, y: 250, acknowledged: false, message:'Beware of the fall\nthere is nothing but death underneath !'},
                            {xstart: 2181, xend: 2710, y: 380, acknowledged: false, message:'This gap is too wide for a single jump\ngood thing you can double jump by\npressing the jump key while already in the air'},
                            {xstart: 2720, xend: 3100, y: 430, acknowledged: false, message:'You can double jump again\nwhenever you touch the ground\n(or certain enemies)'},
                            {xstart: 3178, xend: 3500, y: 430, acknowledged: false, message:'Now, just reach the door at the end\nto finish the level'}]
        this.currentTutoMessage = this.add.text(20, 20, ``,  { font: '12px Arial', fill: '#4C986D', align: 'center' });
        this.currentTutoMessage.setStroke('#003D1B', 6);
        this.currentTutoMessage.setShadow(2, 2, "#003D1A", 2, true, true);
    }

    collectEgg(player, egg)
    {
        egg.disableBody(true, true);
        collect.play();
        score+=10;
        emitter.emit('HUD_update', score, lives);
    }
    update(time, delta){
        this.tutoMessages.map(e=>{//check if we need to display a message
            if(hero.body.y < 700){
                if(hero.body.x > e.xend && !e.acknowledged){
                    this.currentTutoMessage.setText('');
                    e.acknowledged = true;
                }
                if((hero.body.x >= e.xstart - 100) && hero.body.x < e.xend && !e.acknowledged){
                    this.currentTutoMessage.x = e.xstart - 50;
                    this.currentTutoMessage.y = e.y;
                    this.currentTutoMessage.setText(e.message);
                }
            }else{
                this.currentTutoMessage.setText('I said there was\nonly death here, dumbass !');
                this.currentTutoMessage.y = 750;
            }
        });
        if(Phaser.Math.Distance.Between(hero.body.x,hero.body.y,this.endPoint.x,this.endPoint.y) <= 50){
            level.play();
            if(levelOrder.has(this.scene.key)){
                this.scene.start(levelOrder.get(this.scene.key));
            }else{
                restartScene = this.scene.key;
                this.scene.start('Game_over');
            }
        }
        // Runs once per frame for the duration of the scene
        if ((cursors.space.isDown || cursors.up.isDown))
        {
            if(canJump && hero.body.onFloor()){
                jump.play();
                hero.body.setVelocityY(-300); // jump up
                canDoubleJump = true;
                canJump = false;
                lastDownJump = Math.max(cursors.space.timeDown,cursors.up.timeDown);
            }else{
                if((Math.max(cursors.space.timeDown,cursors.up.timeDown)-lastDownJump > 250) && canDoubleJump){
                    canDoubleJump = false;
                    jump.play();
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

class Tutorial_2 extends Phaser.Scene{
    constructor(){
        super('Tutorial_2');
    }
    preload(){
        
    };

    create(){
        mainCamera = this.cameras.main;
        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        map = this.make.tilemap({ key: 'tuto_2_map' });

        const tileset_base = map.addTilesetImage('full_base_hack_35', 'full_base_hack_35');

        // Parameters: layer name (or index) from Tiled, tileset, x, y
        worldLayer = map.createDynamicLayer("tiles", tileset_base, 0, 0);
        worldLayer.setCollisionByProperty({collides: true});

        cursors = this.input.keyboard.createCursorKeys();

        const spawnPoint = map.findObject('objects', obj => obj.name === 'spawn');
        hero = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'hero');
        hero.setBounce(0);
        hero.setCollideWorldBounds(true);
        hero.body.onWorldBounds = true;
        hero.body.setSize(15, 50, true);
        hero.body.setImmovable(true);
        hero.setData({isHero:true,isEnemy:false,type:'hero'})

        this.physics.add.collider(worldLayer, hero);
        hero.anims.play('turn_right', true);
        this.cameras.main.startFollow(hero, true, 0.08, 0.08);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setBackgroundColor('#ccccff'); 
        this.physics.world.bounds.width = worldLayer.width;
        this.physics.world.bounds.height = worldLayer.height;

        this.physics.world.on('worldbounds', function(body,up,down,right,left){
            if(down){
                wilhelm.play();
                lives--;
                emitter.emit('HUD_update', score, lives);
                if(lives>0){
                    hero.body.x = spawnPoint.x;
                    hero.body.y = spawnPoint.y;
                }else{
                    restartScene = this.scene.key;
                    this.scene.start('Game_over');
                }
            }
        },this);

        /*const eggs = this.physics.add.group({
            key: 'egg',
            repeat: 6,
            allowGravity: false,
            setXY: { x: 350, y: 600, stepX: 35, stepY: -35 }
        });

        this.physics.add.collider(eggs, worldLayer);
        this.physics.add.overlap(hero, eggs, this.collectEgg, null, this);*/

        const enemies_map = map.filterObjects('objects', obj => obj.type === 'enemy');
        const enemies = this.physics.add.group({
            allowGravity: true
        });
        this.snowballs = this.physics.add.group({
            allowGravity: true
        });
        this.timerByEnemy = new Map();
        let id = 0;
        enemies_map.map(e=>{
            let en = enemies.create(e.x, e.y, e.name).setCollideWorldBounds(true).setImmovable(true);
            en.anims.play('left_'+e.name+(e.name=='zombie'?'_walk':''), true);
            en.body.setAllowGravity(true);
            if(e.name=='snowman'){
                const timedEvent = this.time.addEvent({ startAt: 100, delay: Phaser.Math.FloatBetween(1800, 2400), callback: ()=>{
                    let en = this.snowballs.create(e.x, e.y, 'snowball').setCircle(3).setCollideWorldBounds(false).setImmovable(true);
                    if(hero.body.x < e.x){
                        en.setVelocityX(Phaser.Math.FloatBetween(-550, -350));
                        en.setVelocityY(Phaser.Math.FloatBetween(-140, -10));
                    }else{
                        en.setVelocityX(Phaser.Math.FloatBetween(350, 550));
                        en.setVelocityY(Phaser.Math.FloatBetween(-140, -10));
                    }
                    en.setData({isHero:false,isEnemy:true,type:'snowball'});
                }, callbackScope: this, loop: true });
                this.timerByEnemy.set(id,timedEvent);
                en.setData({isHero:false,isEnemy:true,type:'snowman',timer:id});
                id++;
            }else{
                en.setData({isHero:false,isEnemy:true,type:e.name});
            }
        });
        this.physics.add.collider(enemies, worldLayer);
        this.physics.add.collider(enemies, hero, this.enemyHit.bind(this));
        this.physics.add.collider(this.snowballs, worldLayer, (e)=>{e.destroy()});
        this.enemies = enemies;
        emitter.emit('HUD_update', score, lives);
        this.endPoint = map.findObject('objects', obj => obj.name === 'level_end');

        //music, theme & all
        if(!soundBox.get('theme').isPlaying)
            soundBox.get('theme').play();

        this.tutoMessages =[{xstart: 210, xend: 735,  level: 0,y: 70, acknowledged: false, message:'You will have to battle enemies, mostly by jumping on them'},
                            {xstart: 740, xend: 1155, level: 0,y: 70, acknowledged: false, message:'When you are too far away, the enemy will stop chasing you'},
                            {xstart: 210, xend: 735,  level: 1,y: 280, acknowledged: false, message:'Some enemies will use projectiles, avoid them !\nYou can kill those enemies by running into them'},
                            {xstart: 210, xend: 735,  level: 2,y: 510, acknowledged: false, message:'Some enemies let you jump again when you kill them, use it wisely'},
                            {xstart: 740, xend: 1225, level: 2,y: 510, acknowledged: false, message:'Now, just reach the door at the end\nto finish the level'}]
        this.currentTutoMessage = this.add.text(20, 20, ``,  { font: '12px Arial', fill: '#4C986D', align: 'center' });
        this.currentTutoMessage.setStroke('#003D1B', 6);
        this.currentTutoMessage.setShadow(2, 2, "#003D1A", 2, true, true);
    }
    enemyHit(theHero,theEnemy){
        if(theEnemy.getData('type')!='snowman'){
            if(theEnemy.body.touching.up){
                hit.play();
                if(theEnemy.getData('type')=='zombie')
                    canDoubleJump=true;
                //theEnemy.destroy();
                theEnemy.disableBody();
                if(hero.body.x < theEnemy.body.x)
                    theEnemy.anims.play('left_'+theEnemy.getData('type')+'_die');
                else
                    theEnemy.anims.play('right_'+theEnemy.getData('type')+'_die');
                theEnemy.setData('isDead', true);
                score+=50;
            }else{
                enemy_hit.play();
                lives--;
                if(lives>0)
                    this.scene.restart();
                else{
                    restartScene = this.scene.key;
                    this.scene.start('Game_over');
                }
            }
        }else{
            hit.play();
            let t = theEnemy.getData('timer');
            score+=150;
            let tm = this.timerByEnemy.get(t);
            tm.destroy();
            //theEnemy.destroy();
            theEnemy.disableBody();
            if(hero.body.x > theEnemy.body.x + 10)
                theEnemy.anims.play('right_snowman_die');
            else
                theEnemy.anims.play('left_snowman_die');
            theEnemy.setData('isDead', true);
        }
        emitter.emit('HUD_update', score, lives);
    }
    collectEgg(player, egg)
    {
        egg.disableBody(true, true);
        collect.play();
        score+=10;
        emitter.emit('HUD_update', score, lives);
    }
    update(time, delta){
        this.tutoMessages.map(e=>{//check if we need to display a message
            let level = 0;
            if(hero.body.y>=190)
                level = 1;
            if(hero.body.y>=455)
                level = 2;
            if(hero.body.x > e.xend && !e.acknowledged && level==e.level){
                this.currentTutoMessage.setText('');
                e.acknowledged = true;
            }
            if((hero.body.x >= e.xstart - 100) && hero.body.x < e.xend && level == e.level){
                this.currentTutoMessage.x = e.xstart - 50;
                this.currentTutoMessage.y = e.y;
                this.currentTutoMessage.setText(e.message);
            }
        });
        if(Phaser.Math.Distance.Between(hero.body.x,hero.body.y,this.endPoint.x,this.endPoint.y) <= 50){
            level.play();
            if(levelOrder.has(this.scene.key)){
                this.scene.start(levelOrder.get(this.scene.key));
            }else{
                restartScene = this.scene.key;
                this.scene.start('Game_over');
            }
        }
        // Runs once per frame for the duration of the scene
        if ((cursors.space.isDown || cursors.up.isDown))
        {
            if(canJump && hero.body.onFloor()){
                hero.body.setVelocityY(-300); // jump up
                canDoubleJump = true;
                canJump = false;
                jump.play();
                lastDownJump = Math.max(cursors.space.timeDown,cursors.up.timeDown);
            }else{
                if((Math.max(cursors.space.timeDown,cursors.up.timeDown)-lastDownJump > 250) && canDoubleJump){
                    canDoubleJump = false;
                    jump.play();
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
        this.enemies.children.each( e => {
            if(!e.getData('isDead')){
                let ttype = e.getData('type');
                if(ttype!='snowman'){
                    if(Phaser.Math.Distance.Between(hero.body.x,hero.body.y,e.body.x,e.body.y) <= 150){
                        if(hero.body.x < e.body.x)
                            e.setVelocityX(Phaser.Math.FloatBetween(-95, -75))
                        else
                            e.setVelocityX(Phaser.Math.FloatBetween(75, 95))
                    }else{
                        e.setVelocityX(0);
                    }
                }
                let endName = e.getData('type')+(e.getData('type')=='zombie'?'_walk':'');
                if(hero.body.x < e.body.x && e.anims.currentAnim.key != 'left_'+endName)
                    e.anims.play('left_'+endName);
                if(hero.body.x > e.body.x && e.anims.currentAnim.key != 'right_'+endName)
                    e.anims.play('right_'+endName);
            }
        })
        /*this.enemies.map(e=>{
           
        })*/
    }

}

class Tower extends Phaser.Scene{
    constructor(){
        super('Tower');
    }
    preload(){

    };

    create(){
        mainCamera = this.cameras.main;
        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        map = this.make.tilemap({ key: 'tower_map' });
        const tileset_base = map.addTilesetImage('full_base_hack_35', 'full_base_hack_35');

        // Parameters: layer name (or index) from Tiled, tileset, x, y
        worldLayer = map.createDynamicLayer('tiles', tileset_base, 0, 0);
        worldLayer.setCollisionByProperty({collides: true});

        cursors = this.input.keyboard.createCursorKeys();

        const spawnPoint = map.findObject('objects', obj => obj.name === 'spawn');
        hero = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'hero');
        hero.setBounce(0);
        hero.setCollideWorldBounds(true);
        hero.body.setSize(15, 50, true);
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
                wilhelm.play();
                lives--;
                emitter.emit('HUD_update', score, lives);
                if(lives>0){
                    this.scene.restart();
                }else{
                    restartScene = this.scene.key;
                    this.scene.start('Game_over');
                }
            }
        },this);

        const eggs_map = map.filterObjects('objects', obj => obj.type === 'egg');
        const eggs = this.physics.add.group({
            allowGravity: false
        });
        eggs_map.map(e=>{
            let eggtmp = eggs.create(e.x, e.y, 'egg').setImmovable(true);
            eggtmp.setData({isHero:false,isEnemy:false,type:'egg'});
        });

        this.physics.add.collider(eggs, worldLayer);
        this.physics.add.overlap(hero, eggs, this.collectEgg, null, this);
        this.eggs = eggs;
        emitter.emit('HUD_update', score, lives);
        this.endPoint = map.findObject('objects', obj => obj.name === 'level_end');

        //music, theme & all
        if(!soundBox.get('theme').isPlaying)
            soundBox.get('theme').play();

        this.tutoMessages =[{ystart: 1610, yend: 1400,x: 140, message:'Let\'s train you\nto double jump'},
                            {ystart: 1295, yend: 1015,x: 140, message:'You can catch bonuses\nto earn more points'},
                            {ystart: 945, yend: 710,  x: 140, message:'You\'re almost there'},
                            {ystart: 700, yend: 485,  x: 140, message:'Now, just reach the door at the end\nto finish the level'}]
        this.currentTutoMessage = this.add.text(20, 20, ``,  { font: '12px Arial', fill: '#4C986D', align: 'center' });
        this.currentTutoMessage.setStroke('#003D1B', 6);
        this.currentTutoMessage.setShadow(2, 2, "#003D1A", 2, true, true);
    }

    collectEgg(player, egg)
    {
        egg.disableBody(true, true);
        collect.play();
        score+=10;
        emitter.emit('HUD_update', score, lives);
    }
    update(time, delta){
        this.tutoMessages.map(e=>{//check if we need to display a message
            if(hero.body.y < e.yend){
                this.currentTutoMessage.setText('');
                e.acknowledged = true;
            }
            if((hero.body.y <= e.ystart - 35) && hero.body.y > e.yend){
                if(hero.body.x <= 400)
                    this.currentTutoMessage.x = e.x;
                else
                    this.currentTutoMessage.x = 700-e.x;
                this.currentTutoMessage.y = e.yend + 35;
                this.currentTutoMessage.setText(e.message);
            }
        });
        if(Phaser.Math.Distance.Between(hero.body.x,hero.body.y,this.endPoint.x,this.endPoint.y) <= 50){
            level.play();
            hasBeenThroughTutorial=true;
            if(levelOrder.has(this.scene.key)){
                this.scene.start(levelOrder.get(this.scene.key));
            }else{
                restartScene = this.scene.key;
                this.scene.start('Game_over');
            }
        }
        // Runs once per frame for the duration of the scene
        if ((cursors.space.isDown || cursors.up.isDown))
        {
            if(canJump && hero.body.onFloor()){
                hero.body.setVelocityY(-300); // jump up
                canDoubleJump = true;
                canJump = false;
                jump.play();
                lastDownJump = Math.max(cursors.space.timeDown,cursors.up.timeDown);
            }else{
                if((Math.max(cursors.space.timeDown,cursors.up.timeDown)-lastDownJump > 250) && canDoubleJump){
                    canDoubleJump = false;
                    jump.play();
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




class Grass_1 extends Phaser.Scene{
    constructor(){
        super('Grass_1');
    }
    preload(){

    };

    create(){
        mainCamera = this.cameras.main;
        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        map = this.make.tilemap({ key: 'grass_1_map' });
        const tileset_base = map.addTilesetImage('full_base_hack_35', 'full_base_hack_35');
        const spawnPoint = map.findObject('objects', obj => obj.name === 'spawn');
        const eggsLayer = map.filterObjects('eggs', obj => obj.type === 'egg');
        const groundEnemiesLayer = map.filterObjects('enemies', obj => obj.type === 'ground_enemy');
        this.endPoint = map.findObject('objects', obj => obj.name === 'level_end');

        // Parameters: layer name (or index) from Tiled, tileset, x, y
        worldLayer = map.createDynamicLayer('tiles', tileset_base, 0, 0);
        worldLayer.setCollisionByProperty({collides: true});
        this.physics.world.bounds.width = worldLayer.width;
        this.physics.world.bounds.height = worldLayer.height;

        cursors = this.input.keyboard.createCursorKeys();

        hero = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'hero');
        hero.setBounce(0);
        hero.setCollideWorldBounds(true);
        hero.body.onWorldBounds = true;
        hero.body.setSize(15, 50, true);
        hero.anims.play('turn_right', true);

        this.physics.add.collider(worldLayer, hero);
        this.cameras.main.startFollow(hero, true, 0.08, 0.08);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setBackgroundColor('#ccccff'); 

        //when the hero is out of bound => losing a life
        this.physics.world.on('worldbounds', function(body,up,down,right,left){
            if(down){
                wilhelm.play();
                lives--;
                emitter.emit('HUD_update', score, lives);
                if(lives>0){
                    this.scene.restart();
                }else{
                    restartScene = this.scene.key;
                    this.scene.start('Game_over');
                }
            }
        },this);

        //bonuses
        this.eggs = this.physics.add.group({
            allowGravity: false
        });
        eggsLayer.map(e=>{
            let eggtmp = this.eggs.create(e.x, e.y, 'egg').setImmovable(true);
            eggtmp.setData({isHero:false,isEnemy:false,type:'egg'});
        });

        this.physics.add.collider(this.eggs, worldLayer);
        this.physics.add.overlap(hero, this.eggs, this.collectEgg, null, this);

        //enemies
        this.enemies = this.physics.add.group({
            allowGravity: true
        });
        groundEnemiesLayer.map(e=>{
            let en = this.enemies.create(e.x, e.y, 'snake').setVelocity(Phaser.Math.FloatBetween(-95, -75), 0).setCollideWorldBounds(true).setImmovable(true);
            en.anims.play('left_snake', true);
            en.setData({isHero:false,isEnemy:true,type:'snake'});
        });
        this.physics.add.collider(this.enemies, worldLayer);
        this.physics.add.collider(this.enemies, hero, this.enemyHit.bind(this));

        //update the HUD and force it on top
        emitter.emit('HUD_update', score, lives);
        //music, theme & all
        if(!soundBox.get('theme').isPlaying)
            soundBox.get('theme').play();
    }
    enemyHit(theHero,theEnemy){
        if(theEnemy.body.touching.up){
            hit.play();
            //theEnemy.destroy();
            theEnemy.disableBody();
            if(hero.body.x < theEnemy.body.x)
                theEnemy.anims.play('left_snake_die');
            else
                theEnemy.anims.play('right_snake_die');
            theEnemy.setData('isDead', true);
            score+=50;
        }else{
            enemy_hit.play();
            lives--;
            if(lives>0)
                this.scene.restart();
            else{
                restartScene = this.scene.key;
                this.scene.start('Game_over');
            }
        }
        emitter.emit('HUD_update', score, lives);
    }
    collectEgg(player, egg)
    {
        egg.disableBody(true, true);
        collect.play();
        score+=10;
        emitter.emit('HUD_update', score, lives);
    }
    update(time, delta){
        // Runs once per frame for the duration of the scene
        if(Phaser.Math.Distance.Between(hero.body.x,hero.body.y,this.endPoint.x,this.endPoint.y) <= 50){
            level.play();
            if(levelOrder.has(this.scene.key)){
                this.scene.start(levelOrder.get(this.scene.key));
            }else{
                restartScene = this.scene.key;
                this.scene.start('Game_over');
            }
        }
        if ((cursors.space.isDown || cursors.up.isDown))
        {
            if(canJump && hero.body.onFloor()){
                hero.body.setVelocityY(-300); // jump up
                canDoubleJump = true;
                canJump = false;
                jump.play();
                lastDownJump = Math.max(cursors.space.timeDown,cursors.up.timeDown);
            }else{
                if((Math.max(cursors.space.timeDown,cursors.up.timeDown)-lastDownJump > 250) && canDoubleJump){
                    canDoubleJump = false;
                    jump.play();
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
        this.enemies.children.each( e => {
            if(!e.getData('isDead')){
                if(Phaser.Math.Distance.Between(hero.body.x,hero.body.y,e.body.x,e.body.y) <= 150){
                    if(hero.body.x < e.body.x)
                        e.setVelocityX(Phaser.Math.FloatBetween(-95, -75))
                    else
                        e.setVelocityX(Phaser.Math.FloatBetween(75, 95))
                }else{
                    e.setVelocityX(0);
                }
                if(hero.body.x < e.body.x && e.anims.currentAnim.key != 'left_snake')
                    e.anims.play('left_snake');
                if(hero.body.x > e.body.x && e.anims.currentAnim.key != 'right_snake')
                    e.anims.play('right_snake');
            }
        })
    }
}


class Grass_2 extends Phaser.Scene{
    constructor(){
        super('Grass_2');
    }
    preload(){

    };

    create(){
        mainCamera = this.cameras.main;
        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        map = this.make.tilemap({ key: 'grass_2_map' });
        const tileset_base = map.addTilesetImage('full_base_hack_35', 'full_base_hack_35');
        const spawnPoint = map.findObject('objects', obj => obj.name === 'spawn');
        const eggsLayer = map.filterObjects('eggs', obj => obj.type === 'egg');
        const groundEnemiesLayer = map.filterObjects('enemies', obj => obj.type === 'ground_enemy');
        this.endPoint = map.findObject('objects', obj => obj.name === 'level_end');

        // Parameters: layer name (or index) from Tiled, tileset, x, y
        worldLayer = map.createDynamicLayer('tiles', tileset_base, 0, 0);
        worldLayer.setCollisionByProperty({collides: true});
        this.physics.world.bounds.width = worldLayer.width;
        this.physics.world.bounds.height = worldLayer.height;

        cursors = this.input.keyboard.createCursorKeys();

        hero = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'hero');
        hero.setBounce(0);
        hero.setCollideWorldBounds(true);
        hero.body.onWorldBounds = true;
        hero.body.setSize(15, 50, true);
        hero.anims.play('turn_right', true);

        this.physics.add.collider(worldLayer, hero);
        this.cameras.main.startFollow(hero, true, 0.08, 0.08);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setBackgroundColor('#ccccff'); 

        //when the hero is out of bound => losing a life
        this.physics.world.on('worldbounds', function(body,up,down,right,left){
            if(down){
                wilhelm.play();
                lives--;
                emitter.emit('HUD_update', score, lives);
                if(lives>0){
                    this.scene.restart();
                }else{
                    restartScene = this.scene.key;
                    this.scene.start('Game_over');
                }
            }
        },this);

        //bonuses
        this.eggs = this.physics.add.group({
            allowGravity: false
        });
        eggsLayer.map(e=>{
            let eggtmp = this.eggs.create(e.x, e.y, 'egg').setImmovable(true);
            eggtmp.setData({isHero:false,isEnemy:false,type:'egg'});
        });

        this.physics.add.collider(this.eggs, worldLayer);
        this.physics.add.overlap(hero, this.eggs, this.collectEgg, null, this);

        //enemies
        this.enemies = this.physics.add.group({
            allowGravity: true
        });
        groundEnemiesLayer.map(e=>{
            let en = this.enemies.create(e.x, e.y, 'snake').setVelocity(Phaser.Math.FloatBetween(-95, -75), 0).setCollideWorldBounds(true).setImmovable(true);
            en.anims.play('left_snake', true);
            en.setCollideWorldBounds(false);
            en.setData({isHero:false,isEnemy:true,type:'snake'});
        });
        this.physics.add.collider(this.enemies, worldLayer);
        this.physics.add.collider(this.enemies, hero, this.enemyHit.bind(this));

        //update the HUD and force it on top
        emitter.emit('HUD_update', score, lives);

        //music, theme & all
        if(!soundBox.get('theme').isPlaying)
            soundBox.get('theme').play();
    }
    enemyHit(theHero,theEnemy){
        if(theEnemy.body.touching.up){
            hit.play();
            //theEnemy.destroy();
            theEnemy.disableBody();
            if(hero.body.x < theEnemy.body.x)
                theEnemy.anims.play('left_snake_die');
            else
                theEnemy.anims.play('right_snake_die');
            theEnemy.setData('isDead', true);
            score+=50;
        }else{
            enemy_hit.play();
            lives--;
            if(lives>0)
                this.scene.restart();
            else{
                restartScene = this.scene.key;
                this.scene.start('Game_over');
            }
        }
        emitter.emit('HUD_update', score, lives);
    }
    collectEgg(player, egg)
    {
        egg.disableBody(true, true);
        collect.play();
        score+=10;
        emitter.emit('HUD_update', score, lives);
    }
    update(time, delta){
        // Runs once per frame for the duration of the scene
        if(Phaser.Math.Distance.Between(hero.body.x,hero.body.y,this.endPoint.x,this.endPoint.y) <= 50){
            level.play();
            if(levelOrder.has(this.scene.key)){
                this.scene.start(levelOrder.get(this.scene.key));
            }else{
                restartScene = this.scene.key;
                this.scene.start('Game_over');
            }
        }
        if ((cursors.space.isDown || cursors.up.isDown))
        {
            if(canJump && hero.body.onFloor()){
                hero.body.setVelocityY(-300); // jump up
                canDoubleJump = true;
                canJump = false;
                jump.play();
                lastDownJump = Math.max(cursors.space.timeDown,cursors.up.timeDown);
            }else{
                if((Math.max(cursors.space.timeDown,cursors.up.timeDown)-lastDownJump > 250) && canDoubleJump){
                    canDoubleJump = false;
                    jump.play();
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
        this.enemies.children.each( e => {
            if(!e.getData('isDead')){
                if(Phaser.Math.Distance.Between(hero.body.x,hero.body.y,e.body.x,e.body.y) <= 150){
                    if(hero.body.x < e.body.x)
                        e.setVelocityX(Phaser.Math.FloatBetween(-95, -75))
                    else
                        e.setVelocityX(Phaser.Math.FloatBetween(75, 95))
                }else{
                    e.setVelocityX(0);
                }
                if(hero.body.x < e.body.x && e.anims.currentAnim.key != 'left_snake')
                    e.anims.play('left_snake');
                if(hero.body.x > e.body.x && e.anims.currentAnim.key != 'right_snake')
                    e.anims.play('right_snake');
            }
        })
    }
}


class Grass_3 extends Phaser.Scene{
    constructor(){
        super('Grass_3');
    }
    preload(){

    };

    create(){
        mainCamera = this.cameras.main;
        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        map = this.make.tilemap({ key: 'grass_3_map' });
        const tileset_base = map.addTilesetImage('full_base_hack_35', 'full_base_hack_35');
        const spawnPoint = map.findObject('objects', obj => obj.name === 'spawn');
        const eggsLayer = map.filterObjects('eggs', obj => obj.type === 'egg');
        const groundEnemiesLayer = map.filterObjects('enemies', obj => obj.type === 'ground_enemy');
        const bossesLayer = map.findObject('enemies', obj => obj.type === 'boss');
        this.endPoint = map.findObject('objects', obj => obj.name === 'level_end');

        // Parameters: layer name (or index) from Tiled, tileset, x, y
        worldLayer = map.createDynamicLayer('tiles', tileset_base, 0, 0);
        worldLayer.setCollisionByProperty({collides: true});
        this.physics.world.bounds.width = worldLayer.width;
        this.physics.world.bounds.height = worldLayer.height;

        cursors = this.input.keyboard.createCursorKeys();

        hero = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'hero');
        hero.setBounce(0);
        hero.setCollideWorldBounds(true);
        hero.body.onWorldBounds = true;
        hero.body.setSize(15, 50, true);
        hero.anims.play('turn_right', true);

        this.physics.add.collider(worldLayer, hero);
        this.cameras.main.startFollow(hero, true, 0.08, 0.08);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setBackgroundColor('#ccccff'); 

        //when the hero is out of bound => losing a life
        this.physics.world.on('worldbounds', function(body,up,down,right,left){
            if(down){
                wilhelm.play();
                lives--;
                emitter.emit('HUD_update', score, lives);
                if(lives>0){
                    this.scene.restart();
                }else{
                    restartScene = this.scene.key;
                    this.scene.start('Game_over');
                }
            }
        },this);

        //bonuses
        this.eggs = this.physics.add.group({
            allowGravity: false
        });
        eggsLayer.map(e=>{
            let eggtmp = this.eggs.create(e.x, e.y, 'egg').setImmovable(true);
            eggtmp.setData({isHero:false,isEnemy:false,type:'egg'});
        });

        this.physics.add.collider(this.eggs, worldLayer);
        this.physics.add.overlap(hero, this.eggs, this.collectEgg, null, this);

        //enemies
        this.enemies = this.physics.add.group({
            allowGravity: true
        });
        groundEnemiesLayer.map(e=>{
            let en = this.enemies.create(e.x, e.y, 'snake').setVelocity(Phaser.Math.FloatBetween(-95, -75), 0).setCollideWorldBounds(true).setImmovable(true);
            en.anims.play('left_snake', true);
            en.setCollideWorldBounds(false);
            en.setData({isHero:false,isEnemy:true,type:'snake'});
        });
        this.physics.add.collider(this.enemies, worldLayer);
        this.physics.add.collider(this.enemies, hero, this.enemyHit.bind(this));

        //boss
        this.boss = this.physics.add.sprite(bossesLayer.x, bossesLayer.y, 'snake_boss');
        this.boss.anims.play('left_snake_boss', true);
        this.boss.setData({lives:3, isDead:false});
        this.physics.add.collider(worldLayer, this.boss);
        this.physics.add.collider(this.boss, hero, this.bossHit.bind(this));

        //update the HUD and force it on top
        emitter.emit('HUD_update', score, lives);

        //music, theme & all
        if(!soundBox.get('theme').isPlaying)
            soundBox.get('theme').play();
    }
    bossHit(theEnemy,theHero){
        if(theEnemy.body.touching.up){
            let boss_lives = theEnemy.getData('lives');
            hit.play();
            score+=500;
            hero.setVelocityY(-630);
            hero.setVelocityX(988);
            if(boss_lives<1){
                //theEnemy.destroy();
                theEnemy.disableBody();
                this.boss.setData({lives:0,isDead:true});
            }else{
                this.boss.setData({lives:boss_lives-1,isDead:false});
                this.boss.setTint('#FF0000','#FF0000','#FF0000','#FF0000');
                setTimeout((() => {
                    this.boss.clearTint();
                }).bind(this), 100);
            }
        }else{
            enemy_hit.play();
            lives--;
            if(lives>0)
                this.scene.restart();
            else{
                restartScene = this.scene.key;
                this.scene.start('Game_over');
            }
        }
        emitter.emit('HUD_update', score, lives);
    }
    enemyHit(theHero,theEnemy){
        if(theEnemy.body.touching.up){
            hit.play();
            theEnemy.destroy();
            score+=50;
        }else{
            enemy_hit.play();
            lives--;
            if(lives>0)
                this.scene.restart();
            else{
                restartScene = this.scene.key;
                this.scene.start('Game_over');
            }
        }
        emitter.emit('HUD_update', score, lives);
    }
    collectEgg(player, egg)
    {
        egg.disableBody(true, true);
        collect.play();
        score+=10;
        emitter.emit('HUD_update', score, lives);
    }
    update(time, delta){
        // Runs once per frame for the duration of the scene
        if(this.boss.getData('isDead')){
            this.boss.on('animationcomplete', function (anim, frame) {
                if(anim.key == 'left_snake_boss_die' || anim.key == 'right_snake_boss_die' ){
                    level.play();
                    if(levelOrder.has(this.scene.key)){
                        this.scene.start(levelOrder.get(this.scene.key));
                    }else{
                        restartScene = null;
                        this.scene.start('Game_over');
                    }
                }
              }, this);
            if(hero.body.x < this.boss.body.x)
                this.boss.anims.play('left_snake_boss_die');
            else
                this.boss.anims.play('right_snake_boss_die');
        }
        if ((cursors.space.isDown || cursors.up.isDown))
        {
            if(canJump && hero.body.onFloor()){
                hero.body.setVelocityY(-300); // jump up
                canDoubleJump = true;
                canJump = false;
                jump.play();
                lastDownJump = Math.max(cursors.space.timeDown,cursors.up.timeDown);
            }else{
                if((Math.max(cursors.space.timeDown,cursors.up.timeDown)-lastDownJump > 250) && canDoubleJump){
                    canDoubleJump = false;
                    jump.play();
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
        try{
            if(!this.boss.getData('isDead')){
                let dist_b_h = Phaser.Math.Distance.Between(hero.body.x,hero.body.y,this.boss.body.x,this.boss.body.y);
                //close the gap normally if the hero is coming
                if( dist_b_h <= 550 && dist_b_h >=130 && hero.body.onFloor()){
                    if(hero.body.x < this.boss.body.x)
                        this.boss.setVelocityX(Phaser.Math.FloatBetween(-110, -95));
                    else
                        this.boss.setVelocityX(Phaser.Math.FloatBetween(95, 110));
                }
                //if the hero is jumping the boss runs away
                if( dist_b_h < 100 && !hero.body.onFloor()){
                    if(hero.body.x < this.boss.body.x)
                        this.boss.setVelocityX(Phaser.Math.FloatBetween(230, 350));
                    else
                        this.boss.setVelocityX(Phaser.Math.FloatBetween(-350, -230));
                }
                //if the hero is close and on the floor, run tu kill him
                if( dist_b_h < 130 && hero.body.onFloor()){
                    if(hero.body.x < this.boss.body.x)
                        this.boss.setVelocityX(Phaser.Math.FloatBetween(-230, -195));
                    else
                        this.boss.setVelocityX(Phaser.Math.FloatBetween(195, 230));
                }
                //if the hero is very high (after a hit), run away, quickly
                if(Math.abs(hero.body.x - this.boss.body.x) < 230 && Math.abs(hero.body.y - this.boss.body.y) > 200){
                    if(!this.boss.body.onWall()){
                        if(hero.body.x < this.boss.body.x)
                            this.boss.setVelocityX(Phaser.Math.FloatBetween(350, 550));
                        else
                            this.boss.setVelocityX(Phaser.Math.FloatBetween(-550, -350));
                    }/*else{
                        if(hero.body.x < this.boss.body.x)
                            this.boss.setVelocityX(Phaser.Math.FloatBetween(-550, -350));
                        else
                            this.boss.setVelocityX(Phaser.Math.FloatBetween(350, 550));
                    }*/
                }
                if(hero.body.x < (this.boss.body.x - 30))
                    this.boss.anims.play('left_snake_boss', true);
                if(hero.body.x > (this.boss.body.x + 30))
                    this.boss.anims.play('right_snake_boss', true);
            }
        }catch(e){
            console.log(e,'no boss or boss died');
        }
        
        /*this.enemies.children.each( e => {
            if(Phaser.Math.Distance.Between(hero.body.x,hero.body.y,e.body.x,e.body.y) <= 150){
                if(hero.body.x < e.body.x)
                    e.setVelocityX(Phaser.Math.FloatBetween(-95, -75))
                else
                    e.setVelocityX(Phaser.Math.FloatBetween(75, 95))
            }else{
                e.setVelocityX(0);
            }
            if(hero.body.x < e.body.x && e.anims.currentAnim.key != 'left_snake')
                e.anims.play('left_snake');
            if(hero.body.x > e.body.x && e.anims.currentAnim.key != 'right_snake')
                e.anims.play('right_snake');
        })*/
    }
}




class Ice_1 extends Phaser.Scene{
    constructor(){
        super('Ice_1');
    }
    preload(){

    };

    create(){
        mainCamera = this.cameras.main;
        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        map = this.make.tilemap({ key: 'ice_1_map' });
        const tileset_base = map.addTilesetImage('ice_sheet', 'ice_sheet');
        const spawnPoint = map.findObject('objects', obj => obj.name === 'spawn');
        const eggsLayer = map.filterObjects('eggs', obj => obj.type === 'gift');
        const groundEnemiesLayer = map.filterObjects('enemies', obj => obj.type === 'snowman');
        this.endPoint = map.findObject('objects', obj => obj.name === 'level_end');

        // Parameters: layer name (or index) from Tiled, tileset, x, y
        worldLayer = map.createDynamicLayer('tiles', tileset_base, 0, 0);
        worldLayer.setCollisionByProperty({collides: true});
        this.physics.world.bounds.width = worldLayer.width;
        this.physics.world.bounds.height = worldLayer.height;

        cursors = this.input.keyboard.createCursorKeys();

        hero = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'hero');
        hero.setBounce(0);
        hero.setCollideWorldBounds(true);
        hero.body.onWorldBounds = true;
        hero.body.setSize(15, 50, true);
        hero.anims.play('turn_right', true);

        this.physics.add.collider(worldLayer, hero);
        this.cameras.main.startFollow(hero, true, 0.08, 0.08);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setBackgroundColor('#ccccff'); 

        //when the hero is out of bound => losing a life
        this.physics.world.on('worldbounds', function(body,up,down,right,left){
            if(down){
                wilhelm.play();
                lives--;
                emitter.emit('HUD_update', score, lives);
                if(lives>0){
                    this.scene.restart();
                }else{
                    restartScene = this.scene.key;
                    this.scene.start('Game_over');
                }
            }
        },this);

        //bonuses
        this.eggs = this.physics.add.group({
            allowGravity: false
        });
        eggsLayer.map(e=>{
            let eggtmp = this.eggs.create(e.x, e.y, 'gift').setImmovable(true);
            eggtmp.setData({isHero:false,isEnemy:false,type:'gift'});
        });

        this.physics.add.collider(this.eggs, worldLayer);
        this.physics.add.overlap(hero, this.eggs, this.collectEgg, null, this);

        //enemies
        this.enemies = this.physics.add.group({
            allowGravity: true
        });
        this.snowballs = this.physics.add.group({
            allowGravity: true
        });
        this.timerByEnemy = new Map();
        let id = 0;
        groundEnemiesLayer.map(e=>{
            let en = this.enemies.create(e.x, e.y, 'snowman').setImmovable(true);
            en.anims.play('left_snowman', true);
            en.setCollideWorldBounds(false);
            const timedEvent = this.time.addEvent({ startAt: 100, delay: Phaser.Math.FloatBetween(1800, 2400), callback: ()=>{
                let en = this.snowballs.create(e.x, e.y, 'snowball').setCircle(3).setCollideWorldBounds(false).setImmovable(true);
                if(hero.body.x < e.x){
                    en.setVelocityX(Phaser.Math.FloatBetween(-550, -350));
                    en.setVelocityY(Phaser.Math.FloatBetween(-140, -10));
                }else{
                    en.setVelocityX(Phaser.Math.FloatBetween(350, 550));
                    en.setVelocityY(Phaser.Math.FloatBetween(-140, -10));
                }
                en.setData({isHero:false,isEnemy:true,type:'snowball'});
            }, callbackScope: this, loop: true });
            this.timerByEnemy.set(id,timedEvent);
            en.setData({isHero:false,isEnemy:true,type:'snowman',timer:id});
            id++;
        });
        this.physics.add.collider(this.enemies, worldLayer);
        this.physics.add.collider(this.enemies, hero, this.enemyHit.bind(this));
        this.physics.add.collider(this.snowballs, worldLayer, (e)=>{e.destroy()});
        this.physics.add.collider(this.snowballs, hero, this.snowBallHit.bind(this));
        //update the HUD and force it on top
        emitter.emit('HUD_update', score, lives);


        //music, theme & all
        soundBox.get('theme').stop();
        if(!soundBox.get('ice_theme').isPlaying)
            soundBox.get('ice_theme').play();
    }
    enemyHit(theHero,theEnemy){
        hit.play();
        let t = theEnemy.getData('timer');
        score+=150;
        let tm = this.timerByEnemy.get(t);
        tm.destroy();
        //theEnemy.destroy();
        theEnemy.disableBody();
        if(hero.body.x > theEnemy.body.x + 10)
            theEnemy.anims.play('right_snowman_die');
        else
            theEnemy.anims.play('left_snowman_die');
        theEnemy.setData('isDead', true);
        emitter.emit('HUD_update', score, lives);
    }
    snowBallHit(theHero,theBall){
        enemy_hit.play();
        lives--;
        emitter.emit('HUD_update', score, lives);
        if(lives>0){
            this.scene.restart();
        }else{
            restartScene = this.scene.key;
            this.scene.start('Game_over');
        }
    }
    collectEgg(player, egg)
    {
        egg.disableBody(true, true);
        collect.play();
        score+=10;
        emitter.emit('HUD_update', score, lives);
    }
    update(time, delta){
        // Runs once per frame for the duration of the scene
        if(Phaser.Math.Distance.Between(hero.body.x,hero.body.y,this.endPoint.x,this.endPoint.y) <= 50){
            level.play();
            if(levelOrder.has(this.scene.key)){
                this.scene.start(levelOrder.get(this.scene.key));
            }else{
                restartScene = this.scene.key;
                this.scene.start('Game_over');
            }
        }
        if ((cursors.space.isDown || cursors.up.isDown))
        {
            if(canJump && hero.body.onFloor()){
                hero.body.setVelocityY(-300); // jump up
                canDoubleJump = true;
                canJump = false;
                jump.play();
                lastDownJump = Math.max(cursors.space.timeDown,cursors.up.timeDown);
            }else{
                if((Math.max(cursors.space.timeDown,cursors.up.timeDown)-lastDownJump > 250) && canDoubleJump){
                    canDoubleJump = false;
                    jump.play();
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
        this.enemies.children.each( e => {
            if(!e.getData('isDead')){
                if(hero.body.x < e.body.x && e.anims.currentAnim.key != 'left_snowman')
                    e.anims.play('left_snowman');
                if(hero.body.x > e.body.x && e.anims.currentAnim.key != 'right_snowman')
                    e.anims.play('right_snowman');
            }
        });
    }
}


class Ice_2 extends Phaser.Scene{
    constructor(){
        super('Ice_2');
    }
    preload(){

    };

    create(){
        mainCamera = this.cameras.main;
        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        map = this.make.tilemap({ key: 'ice_2_map' });
        const tileset_base = map.addTilesetImage('ice_sheet', 'ice_sheet');
        const spawnPoint = map.findObject('objects', obj => obj.name === 'spawn');
        const eggsLayer = map.filterObjects('eggs', obj => obj.type === 'gift');
        const groundEnemiesLayer = map.filterObjects('enemies', obj => obj.type === 'snowman');
        this.endPoint = map.findObject('objects', obj => obj.name === 'level_end');

        // Parameters: layer name (or index) from Tiled, tileset, x, y
        worldLayer = map.createDynamicLayer('tiles', tileset_base, 0, 0);
        worldLayer.setCollisionByProperty({collides: true});
        this.physics.world.bounds.width = worldLayer.width;
        this.physics.world.bounds.height = worldLayer.height;

        cursors = this.input.keyboard.createCursorKeys();

        hero = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'hero');
        hero.setBounce(0);
        hero.setCollideWorldBounds(true);
        hero.body.onWorldBounds = true;
        hero.body.setSize(15, 50, true);
        hero.anims.play('turn_right', true);

        this.physics.add.collider(worldLayer, hero);
        this.cameras.main.startFollow(hero, true, 0.08, 0.08);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setBackgroundColor('#ccccff'); 

        //when the hero is out of bound => losing a life
        this.physics.world.on('worldbounds', function(body,up,down,right,left){
            if(down){
                wilhelm.play();
                lives--;
                emitter.emit('HUD_update', score, lives);
                if(lives>0){
                    this.scene.restart();
                }else{
                    restartScene = this.scene.key;
                    this.scene.start('Game_over');
                }
            }
        },this);

        //bonuses
        this.eggs = this.physics.add.group({
            allowGravity: false
        });
        eggsLayer.map(e=>{
            let eggtmp = this.eggs.create(e.x, e.y, 'gift').setImmovable(true);
            eggtmp.setData({isHero:false,isEnemy:false,type:'gift'});
        });

        this.physics.add.collider(this.eggs, worldLayer);
        this.physics.add.overlap(hero, this.eggs, this.collectEgg, null, this);

        //enemies
        this.enemies = this.physics.add.group({
            allowGravity: true
        });
        this.snowballs = this.physics.add.group({
            allowGravity: true
        });
        this.timerByEnemy = new Map();
        let id = 0;
        groundEnemiesLayer.map(e=>{
            let en = this.enemies.create(e.x, e.y, 'snowman').setImmovable(true);
            en.anims.play('left_snowman', true);
            en.setCollideWorldBounds(false);
            const timedEvent = this.time.addEvent({ startAt: 100, delay: Phaser.Math.FloatBetween(1800, 2400), callback: ()=>{
                let en = this.snowballs.create(e.x, e.y, 'snowball').setCircle(3).setCollideWorldBounds(false).setImmovable(true);
                if(hero.body.x < e.x){
                    en.setVelocityX(Phaser.Math.FloatBetween(-550, -350));
                    en.setVelocityY(Phaser.Math.FloatBetween(-140, -10));
                }else{
                    en.setVelocityX(Phaser.Math.FloatBetween(350, 550));
                    en.setVelocityY(Phaser.Math.FloatBetween(-140, -10));
                }
                en.setData({isHero:false,isEnemy:true,type:'snowball'});
            }, callbackScope: this, loop: true });
            this.timerByEnemy.set(id,timedEvent);
            en.setData({isHero:false,isEnemy:true,type:'snowman',timer:id});
            id++;
        });
        this.physics.add.collider(this.enemies, worldLayer);
        this.physics.add.collider(this.enemies, hero, this.enemyHit.bind(this));
        this.physics.add.collider(this.snowballs, worldLayer, (e)=>{e.destroy()});
        this.physics.add.collider(this.snowballs, hero, this.snowBallHit.bind(this));
        //update the HUD and force it on top
        emitter.emit('HUD_update', score, lives);

        //music, theme & all
        soundBox.get('theme').stop();
        if(!soundBox.get('ice_theme').isPlaying)
            soundBox.get('ice_theme').play();
    }
    enemyHit(theHero,theEnemy){
        hit.play();
        let t = theEnemy.getData('timer');
        score+=150;
        let tm = this.timerByEnemy.get(t);
        tm.destroy();
        //theEnemy.destroy();
        theEnemy.disableBody();
        if(hero.body.x > theEnemy.body.x + 10)
            theEnemy.anims.play('right_snowman_die');
        else
            theEnemy.anims.play('left_snowman_die');
        theEnemy.setData('isDead', true);
        emitter.emit('HUD_update', score, lives);
    }
    snowBallHit(theHero,theBall){
        enemy_hit.play();
        lives--;
        emitter.emit('HUD_update', score, lives);
        if(lives>0){
            this.scene.restart();
        }else{
            restartScene = this.scene.key;
            this.scene.start('Game_over');
        }
    }
    collectEgg(player, egg)
    {
        egg.disableBody(true, true);
        collect.play();
        score+=10;
        emitter.emit('HUD_update', score, lives);
    }
    update(time, delta){
        // Runs once per frame for the duration of the scene
        if(Phaser.Math.Distance.Between(hero.body.x,hero.body.y,this.endPoint.x,this.endPoint.y) <= 100){
            level.play();
            if(levelOrder.has(this.scene.key)){
                this.scene.start(levelOrder.get(this.scene.key));
            }else{
                restartScene = this.scene.key;
                this.scene.start('Game_over');
            }
        }
        if ((cursors.space.isDown || cursors.up.isDown))
        {
            if(canJump && hero.body.onFloor()){
                hero.body.setVelocityY(-300); // jump up
                canDoubleJump = true;
                canJump = false;
                jump.play();
                lastDownJump = Math.max(cursors.space.timeDown,cursors.up.timeDown);
            }else{
                if((Math.max(cursors.space.timeDown,cursors.up.timeDown)-lastDownJump > 250) && canDoubleJump){
                    canDoubleJump = false;
                    jump.play();
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
        this.enemies.children.each( e => {
            if(!e.getData('isDead')){
                if(hero.body.x < e.body.x && e.anims.currentAnim.key != 'left_snowman')
                    e.anims.play('left_snowman');
                if(hero.body.x > e.body.x && e.anims.currentAnim.key != 'right_snowman')
                    e.anims.play('right_snowman');
            }
        })
    }
}


class Ice_3 extends Phaser.Scene{
    constructor(){
        super('Ice_3');
    }
    preload(){

    };

    create(){
        mainCamera = this.cameras.main;
        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        map = this.make.tilemap({ key: 'ice_3_map' });
        const tileset_base = map.addTilesetImage('ice_sheet', 'ice_sheet');
        const spawnPoint = map.findObject('objects', obj => obj.name === 'spawn');
        const eggsLayer = map.filterObjects('eggs', obj => obj.type === 'gift');
        const groundEnemiesLayer = map.filterObjects('enemies', obj => obj.type === 'snowman');
        this.endPoint = map.findObject('objects', obj => obj.name === 'level_end');

        // Parameters: layer name (or index) from Tiled, tileset, x, y
        worldLayer = map.createDynamicLayer('tiles', tileset_base, 0, 0);
        worldLayer.setCollisionByProperty({collides: true});
        this.physics.world.bounds.width = worldLayer.width;
        this.physics.world.bounds.height = worldLayer.height;

        cursors = this.input.keyboard.createCursorKeys();

        hero = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'hero');
        hero.setBounce(0);
        hero.setCollideWorldBounds(true);
        hero.body.onWorldBounds = true;
        hero.body.setSize(15, 50, true);
        hero.anims.play('turn_right', true);

        this.physics.add.collider(worldLayer, hero);
        this.cameras.main.startFollow(hero, true, 0.08, 0.08);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setBackgroundColor('#ccccff'); 

        //when the hero is out of bound => losing a life
        this.physics.world.on('worldbounds', function(body,up,down,right,left){
            if(down){
                wilhelm.play();
                lives--;
                emitter.emit('HUD_update', score, lives);
                if(lives>0){
                    this.scene.restart();
                }else{
                    restartScene = this.scene.key;
                    this.scene.start('Game_over');
                }
            }
        },this);

        //bonuses
        this.eggs = this.physics.add.group({
            allowGravity: false
        });
        eggsLayer.map(e=>{
            let eggtmp = this.eggs.create(e.x, e.y, 'gift').setImmovable(true);
            eggtmp.setData({isHero:false,isEnemy:false,type:'gift'});
        });

        this.physics.add.collider(this.eggs, worldLayer);
        this.physics.add.overlap(hero, this.eggs, this.collectEgg, null, this);

        //enemies
        this.enemies = this.physics.add.group({
            allowGravity: true
        });
        this.snowballs = this.physics.add.group({
            allowGravity: true
        });
        this.timerByEnemy = new Map();
        let id = 0;
        groundEnemiesLayer.map(e=>{
            let en = this.enemies.create(e.x, e.y, 'snowman').setImmovable(true);
            en.anims.play('left_snowman', true);
            en.setCollideWorldBounds(false);
            const timedEvent = this.time.addEvent({ startAt: 100, delay: Phaser.Math.FloatBetween(1800, 2400), callback: ()=>{
                let en = this.snowballs.create(e.x, e.y, 'snowball').setCircle(3).setCollideWorldBounds(false).setImmovable(true);
                if(hero.body.x < e.x){
                    en.setVelocityX(Phaser.Math.FloatBetween(-550, -350));
                    en.setVelocityY(Phaser.Math.FloatBetween(-140, -10));
                }else{
                    en.setVelocityX(Phaser.Math.FloatBetween(350, 550));
                    en.setVelocityY(Phaser.Math.FloatBetween(-140, -10));
                }
                en.setData({isHero:false,isEnemy:true,type:'snowball'});
            }, callbackScope: this, loop: true });
            this.timerByEnemy.set(id,timedEvent);
            en.setData({isHero:false,isEnemy:true,type:'snowman',timer:id});
            id++;
        });
        this.physics.add.collider(this.enemies, worldLayer);
        this.physics.add.collider(this.enemies, hero, this.enemyHit.bind(this));
        this.physics.add.collider(this.snowballs, worldLayer, (e)=>{e.destroy()});
        this.physics.add.collider(this.snowballs, hero, this.snowBallHit.bind(this));
        //update the HUD and force it on top
        emitter.emit('HUD_update', score, lives);

        //music, theme & all
        soundBox.get('theme').stop();
        if(!soundBox.get('ice_theme').isPlaying)
            soundBox.get('ice_theme').play();
    }
    enemyHit(theHero,theEnemy){
        hit.play();
        let t = theEnemy.getData('timer');
        score+=150;
        let tm = this.timerByEnemy.get(t);
        tm.destroy();
        //theEnemy.destroy();
        theEnemy.disableBody();
        if(hero.body.x > theEnemy.body.x + 10)
            theEnemy.anims.play('right_snowman_die');
        else
            theEnemy.anims.play('left_snowman_die');
        theEnemy.setData('isDead', true);
        score+=50;
        emitter.emit('HUD_update', score, lives);
    }
    snowBallHit(theHero,theBall){
        enemy_hit.play();
        lives--;
        emitter.emit('HUD_update', score, lives);
        if(lives>0){
            this.scene.restart();
        }else{
            restartScene = this.scene.key;
            this.scene.start('Game_over');
        }
    }
    collectEgg(player, egg)
    {
        egg.disableBody(true, true);
        collect.play();
        score+=10;
        emitter.emit('HUD_update', score, lives);
    }
    update(time, delta){
        // Runs once per frame for the duration of the scene
        if(Phaser.Math.Distance.Between(hero.body.x,hero.body.y,this.endPoint.x,this.endPoint.y) <= 100){
            level.play();
            if(levelOrder.has(this.scene.key)){
                this.scene.start(levelOrder.get(this.scene.key));
            }else{
                restartScene = this.scene.key;
                this.scene.start('Game_over');
            }
        }
        if ((cursors.space.isDown || cursors.up.isDown))
        {
            if(canJump && hero.body.onFloor()){
                hero.body.setVelocityY(-300); // jump up
                canDoubleJump = true;
                canJump = false;
                jump.play();
                lastDownJump = Math.max(cursors.space.timeDown,cursors.up.timeDown);
            }else{
                if((Math.max(cursors.space.timeDown,cursors.up.timeDown)-lastDownJump > 250) && canDoubleJump){
                    canDoubleJump = false;
                    jump.play();
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
        this.enemies.children.each( e => {
            if(!e.getData('isDead')){
                if(hero.body.x < e.body.x && e.anims.currentAnim.key != 'left_snowman')
                    e.anims.play('left_snowman');
                if(hero.body.x > e.body.x && e.anims.currentAnim.key != 'right_snowman')
                    e.anims.play('right_snowman');
            }
        })
    }
}



class Town_1 extends Phaser.Scene{
    constructor(){
        super('Town_1');
    }
    preload(){

    };

    create(){
        mainCamera = this.cameras.main;
        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        map = this.make.tilemap({ key: 'town_1_map' });
        const tileset_base = map.addTilesetImage('town_sheet', 'town_sheet');
        const tileset_base_ground = map.addTilesetImage('full_base_hack_35', 'full_base_hack_35');
        const spawnPoint = map.findObject('objects', obj => obj.name === 'spawn');
        const eggsLayer = map.filterObjects('eggs', obj => obj.type === 'food');
        const groundEnemiesLayer = map.filterObjects('enemies', obj => obj.type === 'zombie');
        this.endPoint = map.findObject('objects', obj => obj.name === 'level_end');

        // Parameters: layer name (or index) from Tiled, tileset, x, y
        worldLayer = map.createDynamicLayer('tiles', [tileset_base,tileset_base_ground], 0, 0);
        worldLayer.setCollisionByProperty({collides: true});
        this.worldLayerOver = map.createDynamicLayer('over', [tileset_base,tileset_base_ground], 0, 0);
        this.physics.world.bounds.width = worldLayer.width;
        this.physics.world.bounds.height = worldLayer.height;

        cursors = this.input.keyboard.createCursorKeys();

        hero = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'hero');
        hero.setBounce(0);
        hero.setCollideWorldBounds(true);
        hero.body.onWorldBounds = true;
        hero.body.setSize(15, 50, true);
        hero.anims.play('turn_right', true);

        this.physics.add.collider(worldLayer, hero);
        this.cameras.main.startFollow(hero, true, 0.08, 0.08);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setBackgroundColor('#ccccff'); 

        //when the hero is out of bound => losing a life
        this.physics.world.on('worldbounds', function(body,up,down,right,left){
            if(down){
                wilhelm.play();
                lives--;
                emitter.emit('HUD_update', score, lives);
                if(lives>0){
                    this.scene.restart();
                }else{
                    restartScene = this.scene.key;
                    this.scene.start('Game_over');
                }
            }
        },this);

        //bonuses
        this.eggs = this.physics.add.group({
            allowGravity: false
        });
        eggsLayer.map(e=>{
            let eggtmp = this.eggs.create(e.x, e.y, 'food').setImmovable(true).setFrame(Math.floor(Math.random()*4));
            eggtmp.setData({isHero:false,isEnemy:false,type:'food'});
        });

        this.physics.add.collider(this.eggs, worldLayer);
        this.physics.add.overlap(hero, this.eggs, this.collectEgg, null, this);

        //enemies
        this.enemies = this.physics.add.group({
            allowGravity: true
        });

        groundEnemiesLayer.map(e=>{
            let en = this.enemies.create(e.x, e.y, 'zombie').setImmovable(true);
            en.anims.play('left_zombie_walk', true);
            en.setCollideWorldBounds(false);
            en.body.setSize(45, 70, true);
            en.setData({isHero:false,isEnemy:true,type:'zombie'});
        });
        this.physics.add.collider(this.enemies, worldLayer);
        this.physics.add.collider(this.enemies, hero, this.enemyHit.bind(this));
        //update the HUD and force it on top
        emitter.emit('HUD_update', score, lives);

        //music, theme & all
        soundBox.get('ice_theme').stop();
        soundBox.get('theme').stop();
        if(!soundBox.get('zombie_theme').isPlaying)
            soundBox.get('zombie_theme').play();
    }
    enemyHit(theHero,theEnemy){
        if(theEnemy.body.touching.up){
            canDoubleJump=true;
            hit.play();
            theEnemy.disableBody();
            if(hero.body.x < theEnemy.body.x)
                theEnemy.anims.play('left_zombie_die');
            else
                theEnemy.anims.play('right_zombie_die');
            theEnemy.setData('isDead', true);
            score+=50;
        }else{
            enemy_hit.play();
            lives--;
            if(lives>0)
                this.scene.restart();
            else{
                restartScene = this.scene.key;
                this.scene.start('Game_over');
            }
        }
        emitter.emit('HUD_update', score, lives);
    }
    collectEgg(player, egg)
    {
        egg.disableBody(true, true);
        collect.play();
        score+=10;
        emitter.emit('HUD_update', score, lives);
    }
    update(time, delta){
        // Runs once per frame for the duration of the scene
        if(Phaser.Math.Distance.Between(hero.body.x,hero.body.y,this.endPoint.x,this.endPoint.y) <= 50){
            level.play();
            if(levelOrder.has(this.scene.key)){
                this.scene.start(levelOrder.get(this.scene.key));
            }else{
                restartScene = this.scene.key;
                this.scene.start('Game_over');
            }
        }
        if ((cursors.space.isDown || cursors.up.isDown))
        {
            if(canJump && hero.body.onFloor()){
                hero.body.setVelocityY(-300); // jump up
                canDoubleJump = true;
                canJump = false;
                jump.play();
                lastDownJump = Math.max(cursors.space.timeDown,cursors.up.timeDown);
            }else{
                if((Math.max(cursors.space.timeDown,cursors.up.timeDown)-lastDownJump > 250) && canDoubleJump){
                    canDoubleJump = false;
                    jump.play();
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
        this.enemies.children.each( e => {
            if(Phaser.Math.Distance.Between(hero.body.x,hero.body.y,e.body.x,e.body.y) <= 450){
                if(hero.body.x < e.body.x)
                    e.setVelocityX(Phaser.Math.FloatBetween(-50, -10));
                else
                    e.setVelocityX(Phaser.Math.FloatBetween(10, 50));
            }else{
                e.setVelocityX(0);
            }
            if(!e.getData('isDead')){
                if(hero.body.x < e.body.x && e.anims.currentAnim.key != 'left_zombie_walk')
                    e.anims.play('left_zombie_walk');
                if(hero.body.x > e.body.x && e.anims.currentAnim.key != 'right_zombie_walk')
                    e.anims.play('right_zombie_walk');
            }
        })
    }
}


class Town_2 extends Phaser.Scene{
    constructor(){
        super('Town_2');
    }
    preload(){

    };

    create(){
        mainCamera = this.cameras.main;
        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        map = this.make.tilemap({ key: 'town_2_map' });
        const tileset_base = map.addTilesetImage('town_sheet', 'town_sheet');
        const tileset_base_ground = map.addTilesetImage('full_base_hack_35', 'full_base_hack_35');
        const spawnPoint = map.findObject('objects', obj => obj.name === 'spawn');
        const eggsLayer = map.filterObjects('eggs', obj => obj.type === 'food');
        const groundEnemiesLayer = map.filterObjects('enemies', obj => obj.type === 'zombie');
        this.endPoint = map.findObject('objects', obj => obj.name === 'level_end');

        // Parameters: layer name (or index) from Tiled, tileset, x, y
        worldLayer = map.createDynamicLayer('tiles', [tileset_base,tileset_base_ground], 0, 0);
        worldLayer.setCollisionByProperty({collides: true});
        this.worldLayerOver = map.createDynamicLayer('over', [tileset_base,tileset_base_ground], 0, 0);
        this.physics.world.bounds.width = worldLayer.width;
        this.physics.world.bounds.height = worldLayer.height;

        cursors = this.input.keyboard.createCursorKeys();

        hero = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'hero');
        hero.setBounce(0);
        hero.setCollideWorldBounds(true);
        hero.body.onWorldBounds = true;
        hero.body.setSize(15, 50, true);
        hero.anims.play('turn_right', true);

        this.physics.add.collider(worldLayer, hero);
        this.cameras.main.startFollow(hero, true, 0.08, 0.08);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setBackgroundColor('#ccccff'); 

        //when the hero is out of bound => losing a life
        this.physics.world.on('worldbounds', function(body,up,down,right,left){
            if(down){
                wilhelm.play();
                lives--;
                emitter.emit('HUD_update', score, lives);
                if(lives>0){
                    this.scene.restart();
                }else{
                    restartScene = this.scene.key;
                    this.scene.start('Game_over');
                }
            }
        },this);

        //bonuses
        this.eggs = this.physics.add.group({
            allowGravity: false
        });
        eggsLayer.map(e=>{
            let eggtmp = this.eggs.create(e.x, e.y, 'food').setImmovable(true).setFrame(Math.floor(Math.random()*4));
            eggtmp.setData({isHero:false,isEnemy:false,type:'food'});
        });

        this.physics.add.collider(this.eggs, worldLayer);
        this.physics.add.overlap(hero, this.eggs, this.collectEgg, null, this);

        //enemies
        this.enemies = this.physics.add.group({
            allowGravity: true
        });

        groundEnemiesLayer.map(e=>{
            let en = this.enemies.create(e.x, e.y, 'zombie').setImmovable(true);
            en.anims.play('left_zombie_walk', true);
            en.setCollideWorldBounds(false);
            en.body.setSize(45, 70, true);
            en.setData({isHero:false,isEnemy:true,type:'zombie'});
        });
        this.maxNumberOfEnemies = groundEnemiesLayer.length;
        this.remainingEnemies = groundEnemiesLayer.length;
        this.physics.add.collider(this.enemies, worldLayer);
        this.physics.add.collider(this.enemies, hero, this.enemyHit.bind(this));
        //update the HUD and force it on top
        emitter.emit('HUD_update', score, lives);

        //music, theme & all
        soundBox.get('ice_theme').stop();
        soundBox.get('theme').stop();
        if(!soundBox.get('zombie_theme').isPlaying)
            soundBox.get('zombie_theme').play();


        this.notEnoughText = this.add.text(3371,1061, `Kill more enemies !!`,  { font: '15px Arial', fill: '#123456' });

    }
    enemyHit(theHero,theEnemy){
        if(theEnemy.body.touching.up){
            canDoubleJump=true;
            this.remainingEnemies-=1;
            hit.play();
            theEnemy.disableBody();
            if(hero.body.x < theEnemy.body.x)
                theEnemy.anims.play('left_zombie_die');
            else
                theEnemy.anims.play('right_zombie_die');
            theEnemy.setData('isDead', true);
            score+=50;
        }else{
            enemy_hit.play();
            lives--;
            if(lives>0)
                this.scene.restart();
            else{
                restartScene = this.scene.key;
                this.scene.start('Game_over');
            }
        }
        emitter.emit('HUD_update', score, lives);
    }
    collectEgg(player, egg)
    {
        egg.disableBody(true, true);
        collect.play();
        score+=10;
        emitter.emit('HUD_update', score, lives);
    }
    update(time, delta){
        // Runs once per frame for the duration of the scene
        if(Phaser.Math.Distance.Between(hero.body.x,hero.body.y,this.endPoint.x,this.endPoint.y) <= 50
            && this.remainingEnemies<=Math.floor(0.1*this.maxNumberOfEnemies)){
            level.play();
            if(levelOrder.has(this.scene.key)){
                this.scene.start(levelOrder.get(this.scene.key));
            }else{
                restartScene = this.scene.key;
                this.scene.start('Game_over');
            }
        }else{
            if(this.remainingEnemies>Math.floor(0.1*this.maxNumberOfEnemies)){
                this.notEnoughText.setText('Kill more enemies !');
            }else{
                this.notEnoughText.setText('');
            }
        }
        if ((cursors.space.isDown || cursors.up.isDown))
        {
            if(canJump && hero.body.onFloor()){
                hero.body.setVelocityY(-300); // jump up
                canDoubleJump = true;
                canJump = false;
                jump.play();
                lastDownJump = Math.max(cursors.space.timeDown,cursors.up.timeDown);
            }else{
                if((Math.max(cursors.space.timeDown,cursors.up.timeDown)-lastDownJump > 250) && canDoubleJump){
                    canDoubleJump = false;
                    jump.play();
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
        this.enemies.children.each( e => {
            if(Phaser.Math.Distance.Between(hero.body.x,hero.body.y,e.body.x,e.body.y) <= 450){
                if(hero.body.x < e.body.x)
                    e.setVelocityX(Phaser.Math.FloatBetween(-50, -10));
                else
                    e.setVelocityX(Phaser.Math.FloatBetween(10, 50));
            }else{
                e.setVelocityX(0);
            }
            if(!e.getData('isDead')){
                if(hero.body.x < e.body.x && e.anims.currentAnim.key != 'left_zombie_walk')
                    e.anims.play('left_zombie_walk');
                if(hero.body.x > e.body.x && e.anims.currentAnim.key != 'right_zombie_walk')
                    e.anims.play('right_zombie_walk');
            }
        })
    }
}


class Town_3 extends Phaser.Scene{
    constructor(){
        super('Town_3');
    }
    preload(){

    };

    create(){
        mainCamera = this.cameras.main;
        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        map = this.make.tilemap({ key: 'town_3_map' });
        const tileset_base = map.addTilesetImage('town_sheet', 'town_sheet');
        const tileset_base_ground = map.addTilesetImage('full_base_hack_35', 'full_base_hack_35');
        const spawnPoint = map.findObject('objects', obj => obj.name === 'spawn');
        const eggsLayer = map.filterObjects('eggs', obj => obj.type === 'food');
        const groundEnemiesLayer = map.filterObjects('enemies', obj => obj.type === 'zombie');
        this.endPoint = map.findObject('objects', obj => obj.name === 'level_end');

        // Parameters: layer name (or index) from Tiled, tileset, x, y
        worldLayer = map.createDynamicLayer('tiles', [tileset_base,tileset_base_ground], 0, 0);
        worldLayer.setCollisionByProperty({collides: true});
        this.worldLayerOver = map.createDynamicLayer('over', [tileset_base,tileset_base_ground], 0, 0);
        this.physics.world.bounds.width = worldLayer.width;
        this.physics.world.bounds.height = worldLayer.height;

        cursors = this.input.keyboard.createCursorKeys();

        hero = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'hero');
        hero.setBounce(0);
        hero.setCollideWorldBounds(true);
        hero.body.onWorldBounds = true;
        hero.body.setSize(15, 50, true);
        hero.anims.play('turn_right', true);

        this.physics.add.collider(worldLayer, hero);
        this.cameras.main.startFollow(hero, true, 0.08, 0.08);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setBackgroundColor('#ccccff'); 

        //when the hero is out of bound => losing a life
        this.physics.world.on('worldbounds', function(body,up,down,right,left){
            if(down){
                wilhelm.play();
                lives--;
                emitter.emit('HUD_update', score, lives);
                if(lives>0){
                    this.scene.restart();
                }else{
                    restartScene = this.scene.key;
                    this.scene.start('Game_over');
                }
            }
        },this);

        //bonuses
        this.eggs = this.physics.add.group({
            allowGravity: false
        });
        eggsLayer.map(e=>{
            let eggtmp = this.eggs.create(e.x, e.y, 'food').setImmovable(true).setFrame(Math.floor(Math.random()*4));
            eggtmp.setData({isHero:false,isEnemy:false,type:'food'});
        });

        this.physics.add.collider(this.eggs, worldLayer);
        this.physics.add.overlap(hero, this.eggs, this.collectEgg, null, this);

        //enemies
        this.enemies = this.physics.add.group({
            allowGravity: true
        });

        groundEnemiesLayer.map(e=>{
            let en = this.enemies.create(e.x, e.y, 'zombie').setImmovable(true);
            en.anims.play('left_zombie_walk', true);
            en.setCollideWorldBounds(false);
            en.body.setSize(45, 70, true);
            en.setData({isHero:false,isEnemy:true,type:'zombie'});
        });
        //console.log("Nombre de zombies : "+groundEnemiesLayer.length);
        this.physics.add.collider(this.enemies, worldLayer);
        this.physics.add.collider(this.enemies, hero, this.enemyHit.bind(this));
        //update the HUD and force it on top
        emitter.emit('HUD_update', score, lives);

        //music, theme & all
        soundBox.get('ice_theme').stop();
        soundBox.get('theme').stop();
        if(!soundBox.get('zombie_theme').isPlaying)
            soundBox.get('zombie_theme').play();


    }
    enemyHit(theHero,theEnemy){
        if(theEnemy.body.touching.up){
            canDoubleJump=true;
            this.remainingEnemies-=1;
            hit.play();
            theEnemy.disableBody();
            if(hero.body.x < theEnemy.body.x)
                theEnemy.anims.play('left_zombie_die');
            else
                theEnemy.anims.play('right_zombie_die');
            theEnemy.setData('isDead', true);
            score+=50;
        }else{
            enemy_hit.play();
            lives--;
            if(lives>0)
                this.scene.restart();
            else{
                restartScene = this.scene.key;
                this.scene.start('Game_over');
            }
        }
        emitter.emit('HUD_update', score, lives);
    }
    collectEgg(player, egg)
    {
        egg.disableBody(true, true);
        collect.play();
        score+=10;
        emitter.emit('HUD_update', score, lives);
    }
    update(time, delta){
        // Runs once per frame for the duration of the scene
        if(Phaser.Math.Distance.Between(hero.body.x,hero.body.y,this.endPoint.x,this.endPoint.y) <= 50){
            level.play();
            if(levelOrder.has(this.scene.key)){
                this.scene.start(levelOrder.get(this.scene.key));
            }else{
                restartScene = this.scene.key;
                this.scene.start('Game_over');
            }
        }
        if ((cursors.space.isDown || cursors.up.isDown))
        {
            if(canJump && hero.body.onFloor()){
                hero.body.setVelocityY(-300); // jump up
                canDoubleJump = true;
                canJump = false;
                jump.play();
                lastDownJump = Math.max(cursors.space.timeDown,cursors.up.timeDown);
            }else{
                if((Math.max(cursors.space.timeDown,cursors.up.timeDown)-lastDownJump > 250) && canDoubleJump){
                    canDoubleJump = false;
                    jump.play();
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
        this.enemies.children.each( e => {
            if(Phaser.Math.Distance.Between(hero.body.x,hero.body.y,e.body.x,e.body.y) <= 450){
                if(hero.body.x < e.body.x)
                    e.setVelocityX(Phaser.Math.FloatBetween(-50, -10));
                else
                    e.setVelocityX(Phaser.Math.FloatBetween(10, 50));
            }else{
                e.setVelocityX(0);
            }
            if(!e.getData('isDead')){
                if(hero.body.x < e.body.x && e.anims.currentAnim.key != 'left_zombie_walk')
                    e.anims.play('left_zombie_walk');
                if(hero.body.x > e.body.x && e.anims.currentAnim.key != 'right_zombie_walk')
                    e.anims.play('right_zombie_walk');
            }
        })
    }
}


class HUD extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'HUD', active: true });
    }

    create ()
    {
        //  Our Text object to display the Score
        //gold #DAA520
        this.scoreText = this.add.text(35, 580, `${score}        ❤️${lives}`,  { font: '15px Arial', fill: '#000000' });
        //this.livesText = this.add.text(650, 10, `❤️${lives}`, { font: '20px Arial', fill: '#000000' });
        //scoreText.setScrollFactor(0);
        emitter.on('HUD_update', this.HUD_display, this);
        /*
        //  Grab a reference to the Game Scene
        let ourGame = this.scene.get('GameScene');

        //  Listen for events from it
        ourGame.events.on('addScore', function () {

            this.score += 10;

            info.setText('Score: ' + this.score);

        }, this);*/
    }
    HUD_display(current_score, current_lives){
        this.scene.bringToTop();
        this.scoreText.setText(`${current_score}        ❤️${((current_lives<0)?'0':current_lives)}`);
        //this.scoreText.x = mainCamera.worldView.centerX;
        //this.scoreText.y = mainCamera.worldView.top - 50;
        //this.livesText.setText(`Lives: ${current_lives}`);
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
    parent: 'game-container', // ID of the DOM element to add the canvas to
    /*pack: {
        files: [
            {
                type: 'spritesheet',
                key: 'loader_pl',
                url: 'assets/loading_screen_platypus_running.png',
                frameConfig: { frameWidth: 200, frameHeight: 200 }
            }
        ]
    },*/
    scene: [Preload, Welcome_screen, Tutorial_1, Tutorial_2, Tower, Grass_1, Grass_2, Grass_3, Ice_1, Ice_2, Ice_3, Town_1, Town_2, Town_3, HUD, Game_over]
};

const game = new Phaser.Game(config);