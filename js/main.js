
let hero;
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
const levelOrder = new Map();
levelOrder.set('Tutorial_1','Tutorial_2');
levelOrder.set('Tutorial_2','Tower');
levelOrder.set('Tower','Grass_1');
levelOrder.set('Grass_1','Grass_2');
levelOrder.set('Grass_2','Grass_3');
levelOrder.set('Grass_3','Game_over');


const emitter = new Phaser.Events.EventEmitter();

class Preload extends Phaser.Scene{
    constructor(){
        super('Preload');
    }
    preload(){
        this.load.image('full_base_hack_35', 'assets/full_base_hack_35.png');
        this.load.image('egg', 'assets/egg_28.png');
        this.load.spritesheet('snake', 'assets/snake.png', { frameWidth: 24, frameHeight: 24 });
        this.load.spritesheet('hero', 'assets/full_platypus_sheet.png', { frameWidth: 50, frameHeight: 50 });
        this.load.spritesheet('snake_boss', 'assets/snake_boss.png', { frameWidth: 70, frameHeight: 70 });

        this.load.tilemapTiledJSON('welcome_map', 'assets/welcome_screen.json');
        this.load.tilemapTiledJSON('game_over_map', 'assets/game_over.json');
        this.load.tilemapTiledJSON('map', 'assets/tuto_1.json');
        this.load.tilemapTiledJSON('tuto_2_map', 'assets/tuto_2.json');
        this.load.tilemapTiledJSON('tower_map', 'assets/tower.json');
        this.load.tilemapTiledJSON('grass_1_map', 'assets/grass_1.json');
        this.load.tilemapTiledJSON('grass_2_map', 'assets/grass_2.json');
        this.load.tilemapTiledJSON('grass_3_map', 'assets/grass_3.json');

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
        //console.log(this);
    }

    update(time, delta){
        if(this.keyGo.isDown){
            //this.scene.bringToTop('Tutorial_1');
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

        //console.log(this);
    }

    update(time, delta){
        if(this.keyGo.isDown){
            lives = 3;
            score = 0;
            //this.scene.bringToTop('Tutorial_1');
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
    }

    collectEgg(player, egg)
    {
        egg.disableBody(true, true);
        score+=10;
        emitter.emit('HUD_update', score, lives);
    }
    update(time, delta){
        if(Phaser.Math.Distance.Between(hero.body.x,hero.body.y,this.endPoint.x,this.endPoint.y) <= 50){
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
        enemies_map.map(e=>{
            let en = enemies.create(e.x, e.y, 'snake').setVelocity(Phaser.Math.FloatBetween(-95, -75), 0).setCollideWorldBounds(true).setImmovable(true);
            en.anims.play('left_snake', true);
            en.setData({isHero:false,isEnemy:true,type:'snake'});
        });
        this.physics.add.collider(enemies, worldLayer);
        this.physics.add.collider(enemies, hero, this.enemyHit.bind(this));
        this.enemies = enemies;
        emitter.emit('HUD_update', score, lives);
        this.endPoint = map.findObject('objects', obj => obj.name === 'level_end');
    }
    enemyHit(theHero,theEnemy){
        if(theEnemy.body.touching.up){
            theEnemy.destroy();
            score+=50;
        }else{
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
        score+=10;
        emitter.emit('HUD_update', score, lives);
    }
    update(time, delta){
        if(Phaser.Math.Distance.Between(hero.body.x,hero.body.y,this.endPoint.x,this.endPoint.y) <= 50){
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
        this.enemies.children.each( e => {
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
    }

    collectEgg(player, egg)
    {
        egg.disableBody(true, true);
        score+=10;
        emitter.emit('HUD_update', score, lives);
    }
    update(time, delta){
        if(Phaser.Math.Distance.Between(hero.body.x,hero.body.y,this.endPoint.x,this.endPoint.y) <= 50){
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
        hero.anims.play('turn_right', true);

        this.physics.add.collider(worldLayer, hero);
        this.cameras.main.startFollow(hero, true, 0.08, 0.08);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setBackgroundColor('#ccccff'); 

        //when the hero is out of bound => losing a life
        this.physics.world.on('worldbounds', function(body,up,down,right,left){
            if(down){
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
    }
    enemyHit(theHero,theEnemy){
        if(theEnemy.body.touching.up){
            theEnemy.destroy();
            score+=50;
        }else{
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
        score+=10;
        emitter.emit('HUD_update', score, lives);
    }
    update(time, delta){
        // Runs once per frame for the duration of the scene
        if(Phaser.Math.Distance.Between(hero.body.x,hero.body.y,this.endPoint.x,this.endPoint.y) <= 50){
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
        this.enemies.children.each( e => {
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
        hero.anims.play('turn_right', true);

        this.physics.add.collider(worldLayer, hero);
        this.cameras.main.startFollow(hero, true, 0.08, 0.08);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setBackgroundColor('#ccccff'); 

        //when the hero is out of bound => losing a life
        this.physics.world.on('worldbounds', function(body,up,down,right,left){
            if(down){
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
    }
    enemyHit(theHero,theEnemy){
        if(theEnemy.body.touching.up){
            theEnemy.destroy();
            score+=50;
        }else{
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
        score+=10;
        emitter.emit('HUD_update', score, lives);
    }
    update(time, delta){
        // Runs once per frame for the duration of the scene
        if(Phaser.Math.Distance.Between(hero.body.x,hero.body.y,this.endPoint.x,this.endPoint.y) <= 50){
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
        this.enemies.children.each( e => {
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
        hero.anims.play('turn_right', true);

        this.physics.add.collider(worldLayer, hero);
        this.cameras.main.startFollow(hero, true, 0.08, 0.08);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setBackgroundColor('#ccccff'); 

        //when the hero is out of bound => losing a life
        this.physics.world.on('worldbounds', function(body,up,down,right,left){
            if(down){
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
    }
    bossHit(theEnemy,theHero){
        if(theEnemy.body.touching.up){
            let boss_lives = theEnemy.getData('lives');
            score+=500;
            hero.setVelocityY(-630);
            hero.setVelocityX(988);
            if(boss_lives<1){
                theEnemy.destroy();
                this.boss.setData({lives:0,isDead:true});
            }else{
                this.boss.setData({lives:boss_lives-1,isDead:false});
                this.boss.setTint('#FF0000','#FF0000','#FF0000','#FF0000');
                setTimeout((() => {
                    this.boss.clearTint();
                }).bind(this), 100);
            }
        }else{
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
            theEnemy.destroy();
            score+=50;
        }else{
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
        score+=10;
        emitter.emit('HUD_update', score, lives);
    }
    update(time, delta){
        // Runs once per frame for the duration of the scene
        if(this.boss.getData('isDead')){
            if(levelOrder.has(this.scene.key)){
                this.scene.start(levelOrder.get(this.scene.key));
            }else{
                restartScene = null;
                this.scene.start('Game_over');
            }
        }
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
        try{
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
        this.scoreText.setText(`${current_score}        ❤️${current_lives}`);
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
    scene: [Preload, Welcome_screen, Tutorial_1, Tutorial_2, Tower, Grass_1, Grass_2, Grass_3, HUD, Game_over]
};

const game = new Phaser.Game(config);