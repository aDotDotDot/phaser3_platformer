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
let hiScore = 0;
if(localStorage.getItem('plit_hi_score'))
    hiScore = localStorage.getItem('plit_hi_score');
let scoreText;
let mainCamera;
let restartScene = 'Welcome_screen';
let jump, hit, collect, level, enemy_hit, wilhelm;
let hasBeenThroughTutorial = false;
const soundBox = new Map();
const levelOrder = new Map();
levelOrder.set('Tutorial_1','Tutorial_2');
levelOrder.set('Tutorial_2','Tower');
levelOrder.set('Tower','Grass_1');
levelOrder.set('Grass_1','Grass_2');
levelOrder.set('Grass_2','Grass_3');
levelOrder.set('Grass_3','Ice_1');
levelOrder.set('Ice_1','Ice_2');
levelOrder.set('Ice_2','Ice_3');
levelOrder.set('Ice_3','Town_1');
levelOrder.set('Town_1','Town_2');
levelOrder.set('Town_2','Town_3');


const emitter = new Phaser.Events.EventEmitter();