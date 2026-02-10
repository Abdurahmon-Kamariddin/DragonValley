
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
let f = new FontFace('Press Start 2P', 'url(../FONTS/Press_Start_2P/PressStart2P-Regular.ttf)');
//Our constant variables
const gravity = 0.2;
var obstacleSpeed = -5;
var obstacleIncreaseSpeed = -0.0005;
let gameOver = false;
let score = 0;
let flap = new Audio('../AUDIO/flap.mp3');
let scoreplus = new Audio('../AUDIO/coinsound.mp3');
let loss = new Audio('../AUDIO/roar.mp3');
// Our player properties
class Player {
    constructor() {
        this.position = {
            x: canvas.width / 10,
            y: canvas.height / 2
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 49;
        this.height = 40;
        this.speed = 4;
        this.image = new Image();
        this.image.src = "../IMAGES/dragonsprite.png"

    }
    //Actually drawing out our player
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)

    }
    update() {
        if (gameOver) {
            return
        }
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        this.velocity.y += gravity;

    }
}

//Checking the state of the right and left key and setting their boolean in the switch case later
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    up: {
        pressed: false
    }
}
class lWall {
    constructor() {
        this.x = -5;
        this.y = 0;
        this.width = 5;
        this.height = canvas.height;
    }
    draw() {
        c.fillRect(this.x, this.y, this.width, this.height);
    }
}
class rWall {
    constructor() {
        this.x = -5;
        this.y = 0;
        this.width = 5;
        this.height = canvas.height;
    }
    draw() {
        c.fillRect(this.x, this.y, this.width, this.height);
    }
}
class Ceiling {
    constructor() {
        this.x = 0;
        this.y = -5;
        this.width = canvas.width;
        this.height = 5;
    }
    draw() {
        c.fillRect(this.x, this.y, this.width, this.height);
    }
}
class Floor {
    constructor() {
        this.x = 0;
        this.y = canvas.height;
        this.width = canvas.width;
        this.height = 5;
    }
    draw() {
        c.fillRect(this.x, this.y, this.width, this.height);
    }
}
const backimage = new Image();
const player = new Player();
const lwall = new lWall();
const rwall = new rWall();
const ceiling = new Ceiling();
const floor = new Floor();
backimage.src = '../IMAGES/canvasback.png';

let gameoverscreen = new Image();
gameoverscreen.src = '../IMAGES/gameoverscreen.png';

function Background() {
    this.x = 0;
    this.y = 0
    this.width = backimage.width;
    this.height = backimage.height;
    this.render = function () {
        c.drawImage(backimage, (this.x--), 0);
        if (this.x <= -687) {
            this.x = 0;
        }
    }
}
var background = new Background();
//Trees
let treeArray = [];
let treeWidth = 64;
let treeHeight = 512;
let treeX = canvas.width;
let treeY = 0
let topTreeImg;
let bottomTreeImg;
topTreeImg = new Image();
topTreeImg.src = '../IMAGES/toptree.png';
bottomTreeImg = new Image();
bottomTreeImg.src = '../IMAGES/bottree.jpg';
setInterval(placeTrees, 1500);

function placeTrees() {
    if (gameOver) {
        return;
    }
    let randomTreeY = treeY - treeHeight / 4 - Math.random() * (treeHeight / 2);
    let opening = canvas.height / 4;
    let topTree = {
        img: topTreeImg,
        x: treeX,
        y: randomTreeY,
        width: treeWidth,
        height: treeHeight,
        passed: false
    }
    treeArray.push(topTree)
    let bottomTree = {
        img: bottomTreeImg,
        x: treeX,
        y: randomTreeY + treeHeight + opening,
        width: treeWidth,
        height: treeHeight,
        passed: false
    }
    treeArray.push(bottomTree);
}
function collisionCheck(a, b) {
    return a.position.x < b.x + b.width &&
        a.position.x + a.width > b.x &&
        a.position.y < b.y + b.height &&
        a.position.y + a.height > b.y;

}

//Our properties are animated here
function game() {
    requestAnimationFrame(game);
    if (gameOver) {
        c.clearRect(0, 0, canvas.width, canvas.height);
        c.drawImage(gameoverscreen, 0, 0, canvas.width, canvas.height);
        document.getElementById('restartbutton').style.display = 'block';
        document.getElementById('restartbutton').style.marginRight = '1100px';
        document.getElementById('scoreinfo').innerHTML = 'Score : ' + score;
        document.getElementById('scoreinfo').style.visibility = 'visible';
        return;
    }
    lwall.draw();
    rwall.draw();
    ceiling.draw();
    floor.draw();
    //Our animated background
    background.render();
    //Our player input returns
    if (keys.up.pressed) {
        console.log('up');
        flap.play();
        player.velocity.y = -5;
    } else if (keys.right.pressed) {
        console.log('right');
        player.velocity.x = player.speed;
    } else if (keys.left.pressed) {
        console.log('left');
        player.velocity.x = -player.speed;
    } else player.velocity.x = 0;
    player.update();

    //Trees
    for (let i = 0; i < treeArray.length; i++) {
        let tree = treeArray[i];
        tree.x += obstacleSpeed;
        obstacleSpeed += obstacleIncreaseSpeed;
        c.drawImage(tree.img, tree.x, tree.y, tree.width, tree.height);
        //If the tree is passed then we increment the score by 0.5x2
        if (!tree.passed && player.position.x > tree.x + tree.width) {
            score += 0.5;
            scoreplus.play();
            tree.passed = true;
        }
        //We clear the trees from the array that have been passed and off the canvas screen
        while (treeArray.length > 0 && treeArray[0].x < -treeWidth) {
            treeArray.splice(0, 1);
        }
        //Collision checking with the trees
        if (collisionCheck(player, tree)) {
            console.log('collides');
            gameOver = true;
            loss.play();
        }
    }
    //Collision checking with the edges of the canvas
    if (collisionCheck(player, lwall) || collisionCheck(player, rwall) || collisionCheck(player, ceiling) || collisionCheck(player, floor)) {
        console.log('collides');
        gameOver = true;
        loss.play();
    }
    if (gameOver) {
        if (sessionStorage.loggedInUsern !== undefined) {
            let usrObj = JSON.parse(localStorage[sessionStorage.loggedInUsern]);
            //If their current score is higher than their previously recorded scores then we update it
            if (usrObj.score < score) {
                console.log(usrObj.score + " is the currently score")
                usrObj.score = score
                console.log(usrObj.score + " should be the updated one")
                console.log('High score updated')
                //Updates the current logged in persons account
                localStorage.setItem(usrObj.username, JSON.stringify(usrObj));

            }
        }
    }
    //Score
    c.fillStyle = 'aqua';
    c.font = 'bold 30px sans-serif';
    c.fillText('Score: ' + score, 45, 45, 100, 75);
}


//Our event listeners
addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
        case 65:
            keys.left.pressed = true;
            break;
        case 68:
            keys.right.pressed = true;
            break;
        case 87:
            keys.up.pressed = true;
            break;
    }

})

addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
        case 65:
            keys.left.pressed = false;
            break;
        case 68:
            keys.right.pressed = false;
            break;
        case 87:
            keys.up.pressed = false;
            break;
    }

})

function startGame() {
    var button = document.getElementById('startbutton')
    button.style.display = 'none';
    game();
}
function restartGame() {
    location.reload();
}
