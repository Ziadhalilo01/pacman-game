var keysDown = {};

addEventListener("keydown", function (e) {

    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

class Game {
    constructor() {
        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.sprites = [];
        this.background = new Image();
        this.x = 0;
        this.y = 0;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.speed = 6;
        this.gameEnds = false;
        this.walls = [];
        this.pause = false;


    }


    update() {
        if (80 in keysDown) {
            this.pause = true;
        } else if (67 in keysDown) {
            this.pause = false;
        }


        if (!this.pause) {
            var ldeletedArray = [];
            var lSpritesLength = this.sprites.length;
            for (var i = 0; i < lSpritesLength; i++) {
                var object = this.sprites[i].update();
                if (object) {
                    ldeletedArray.push(this.sprites[i]);
                }

            }

            for (var i = 0; i < ldeletedArray.length; i++) {
                var index = this.sprites.indexOf(ldeletedArray[i]);
                this.sprites.splice(index, 1);
            }


        } else {

        }

    }


    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = "#000000";
        this.ctx.rect(0, 0, 600, 600);
        this.ctx.fill();

        var lSpriteLength = this.sprites.length;
        for (var i = 0; i < lSpriteLength; i++) {
            this.sprites[i].draw(this.ctx);

        }
    }

    addSprite(pSprite) {
        this.sprites.push(pSprite);
    }

}

class Sprite {
    constructor() {

    }
    update() {

    }

    draw() {
    }
}

class Backgroundinfo extends Sprite {
    constructor(user, g) {
        super();

        this.user = user;
        this.play = false;
        this.pause = 0;
        this.begin = this.user.horizontalspeed;
        this.gameover = false;
        this.g = g;
        this.image = new Image();
        this.up = new Image();
        this.down = new Image();
        this.left = new Image();
        this.right = new Image();
        this.welcomebackground = new Audio();
        this.welcomebackground.src = 'assets/mp3/PACMANBEGINNING.mp3';
        this.welcomebackground.currentTime = 0;
        this.welcomebackground.muted = false;
        this.backgroundmusic = new Audio();
        this.backgroundmusic.src = 'assets/mp3/backgroundpacmangame.mp3';
    }

    update() {



        if (13 in keysDown) {
            this.play = true;
            this.gameover = false;
            this.user.x = this.user.x;
            this.user.y = this.user.y;
            this.user.horizontalspeed = this.begin;
        }
    }


    draw(ctx) {

        if (this.g.pause == true) {
            ctx.fillStyle = "#FFFFFF";
            ctx.font = "19px Courier New";
            ctx.fillText("PRESS C TO CONTINUE ", 200, 400);
            ctx.beginPath();
            ctx.fill();

        }

        if(this.user.userScore == 82){
            ctx.fillStyle = "#FFFFFF";
            ctx.font = "40px AC Mountain";
            ctx.drawImage(this.image, 0, 0, 600, 780);
            ctx.fillText("YOU WON THE GAME ", 140, 330);
            this.user.horizontalspeed = 0;
            this.user.verticalspeed = 0;
            
            ctx.font = "19px AC Mountain";
            ctx.fillText("Press ctrl+R to restart the game ", 160,460);
            ctx.beginPath();

            ctx.fill();

        }

        if (this.g.gameEnds) {
            
            ctx.fillStyle = "#FFFFFF";
            ctx.font = "40px AC Mountain";
            ctx.drawImage(this.image, 0, 0, 600, 780);
            ctx.fillText("Gameover ", 200, 280);
            ctx.fillText("Try again  ", 200, 320);
            this.user.horizontalspeed = 0;
            this.user.verticalspeed = 0;
            ctx.font = "19px AC Mountain";
            ctx.fillText("Press ctrl+R to restart the game ", 160,460);
            ctx.beginPath();

            ctx.fill();
        }

        if (!this.play) {
            this.image.src = "img/pacmanbackground.jpg";
            var play = this.welcomebackground.play();
            if (play !== undefined) {
                play.then(_ => {
                  play;
                })
                .catch(error => {
                  play;
                });
              }

            if (this.welcomebackground.currentTime >= 4){
                this.welcomebackground.muted = true;
                this.welcomebackground.pause();

            }

            


            this.user.x = 40;
            this.user.y = 40;
            this.user.horizontalspeed = this.pause;
            ctx.fillStyle = "#FFFFFF";
            //ctx.font = "19px Courier New";
            ctx.font = "40px AC Mountain";
            ctx.drawImage(this.image, 0, 0, 600, 780);

            ctx.fillText("\t\tWELCOME TO PACMAN GAME " + "", 20, 250);
            ctx.font = "15px AC Mountain";
            this.up.src = "img/uparrow.png";
            ctx.drawImage(this.up, 460, 470, 15, 15);

            this.down.src = "img/downarrow.png";
            ctx.drawImage(this.down, 460, 500, 15, 15);


            this.left.src = "img/leftarrow.png";
            ctx.drawImage(this.left, 460, 530, 15, 15);
            this.right.src = "img/rightarrow.png";
            ctx.drawImage(this.right, 462, 560, 15, 15);


            ctx.fillText("\t\tPRESS ENTER TO PLAY " + "", 220, 455);
            ctx.fillText("\t\HOW TO PLAY:- " + "", 460, 460);
            ctx.fillText("MOVE UP " + "", 490, 485);
            ctx.fillText("MOVE LEFT " + "", 490, 543);
            ctx.fillText("MOVE RIGHT " + "", 490, 573);
            ctx.fillText("MOVE DOWN " + "", 490, 512);
            
            
            ctx.fillText("\t\STORY:- " + "", 20, 480);
            ctx.fillText("PACMAN HAS TO EAT THE STARS " + "", 20, 520);
            ctx.fillText("IF HE EATS ALL THE STARS, HE'LL WIN THE GAME" + "", 20, 540);
            ctx.fillText("PACMAN HAS 3 LIVES " + "", 20, 500);
            ctx.fillText("PACMAN SHOULD NOT TOUCH THE ENEMY TO NOT LOSS A LIFE " + "", 10, 560);
            ctx.fillText("IF HE LOSSES ALL HIS LIVES HE'LL LOSS THE GAME " + "", 20, 580);

            ctx.font = "19px AC Mountain";
            ctx.fillText("SCORE: " + this.user.userScore, 600, 600 / 7);
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = this.color;
            ctx.fill();


        } else {
            this.welcomebackground.pause();
            user.horizontalspeed = this.begin;
            ctx.fillStyle = "#FFFFFF";
            ctx.font = "19px AC Mountain";
            ctx.fillText("SCORE: " + this.user.userScore, 800 / 17, 600 / 17);
            this.backgroundmusic.play();
            ctx.beginPath();
            ctx.fill();
        }
    }
}


class Heart extends Sprite {
    constructor(x, y,user) {
        super();
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
        this.user = user;
        this.image = new Image();
        
        this.audio = new Audio();
        this.audio.src = 'assets/mp3/lost-life.mp3';

    }

    update() {
        if(this.user.userkilled){
            this.user.userkilled = false;
            this.audio.play();
            return true;
        }
     }

    draw(context) {
        this.image.src = "img/heartlives.png"
        context.beginPath();
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.fill();
    }
}

class map extends Sprite {
    constructor(game) {
        super();
        this.eat = false;
        this.indexdeletestar;
        this.boundaryarray = [];
        this.foodarray = [];
        this.game = game;
        this.heartarray = [];
        this.wall = [

            ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
            ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
            ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
            ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
            ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '1', ' ', ' ', '1', ' ', ' ', '1', ' ', ' ', '1', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
            ['-', ' ', ' ', ' ', ' ', '1', ' ', '1', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '1', ' ', '1', ' ', '1', ' ', ' ', '-'],
            ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
            ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
            ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '1', ' ', ' ', '1', ' ', ' ', '1', ' ', ' ', '1', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
            ['-', ' ', ' ', ' ', ' ', '1', ' ', '1', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '1', ' ', '1', ' ', '1', ' ', ' ', '-'],
            ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
            ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
            ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '1', ' ', ' ', '1', ' ', ' ', '1', ' ', ' ', '1', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
            ['-', ' ', ' ', '1', ' ', '-', '-', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', '-', '-', ' ', '1', ' ', ' ', '-'],
            ['-', ' ', ' ', ' ', ' ', '-', '-', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', '-', '-', ' ', ' ', ' ', ' ', '-'],
            ['-', ' ', ' ', ' ', ' ', '-', '-', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', '-', '-', ' ', ' ', ' ', ' ', '-'],
            ['-', ' ', ' ', ' ', ' ', '-', '-', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', '-', '-', ' ', ' ', ' ', ' ', '-'],
            ['-', ' ', ' ', '1', ' ', '-', '-', '-', ' ', ' ', '1', ' ', ' ', '1', ' ', ' ', '1', ' ', ' ', '1', ' ', ' ', '-', '-', '-', ' ', '1', ' ', ' ', '-'],
            ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
            ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
            ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
            ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', '-', '-', '-', '-', '-', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
            ['-', ' ', ' ', '1', ' ', ' ', '1', ' ', ' ', '1', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-', ' ', '1', ' ', ' ', '1', ' ', ' ', '1', ' ', ' ', '-'],
            ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
            ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
            ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
            ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
            ['-', ' ', ' ', '1', ' ', ' ', '1', ' ', ' ', '1', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', '1', ' ', ' ', '1', ' ', ' ', '1', ' ', ' ', '-'],
            ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
            ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
            ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
            ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
            ['-', ' ', ' ', '1', ' ', ' ', '1', ' ', ' ', '1', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', '1', ' ', ' ', '1', ' ', ' ', '1', ' ', ' ', '-'],
            ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
            ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
            ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
            ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', '-', '-', '-', '-', '-', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
            ['-', ' ', ' ', '1', ' ', ' ', '1', ' ', ' ', '1', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '1', ' ', ' ', '1', ' ', ' ', '1', ' ', ' ', '-'],
            ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
            ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
            ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
            ['-', ' ', ' ', '1', ' ', '-', '-', '-', ' ', ' ', '1', ' ', ' ', '1', ' ', ' ', '1', ' ', ' ', '1', ' ', ' ', '-', '-', '-', ' ', '1', ' ', ' ', '-'],
            ['-', ' ', ' ', ' ', ' ', '-', '-', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', '-', '-', ' ', ' ', ' ', ' ', '-'],
            ['-', ' ', ' ', ' ', ' ', '-', '-', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', '-', '-', ' ', ' ', ' ', ' ', '-'],
            ['-', ' ', ' ', ' ', ' ', '-', '-', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', '-', '-', ' ', ' ', ' ', ' ', '-'],
            ['-', ' ', ' ', '1', ' ', '-', '-', '-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-', '-', '-', ' ', '1', ' ', ' ', '-'],
            ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '1', ' ', ' ', '1', ' ', ' ', '1', ' ', ' ', '1', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
            ['-', '2', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
            ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
            ['-', ' ', ' ', '1', ' ', '1', ' ', '1', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '1', ' ', '1', ' ', '1', ' ', ' ', '-'],
            ['-', '2', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
            ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '1', ' ', ' ', '1', ' ', ' ', '1', ' ', ' ', '1', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
            ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
            ['-', '2', ' ', '1', ' ', '1', ' ', '1', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '1', ' ', '1', ' ', '1', ' ', ' ', '-'],
            ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
            ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
            ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
            ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-']];
        this.wallsdraw;
        this.foodsdraw;
        this.heartdraw;




    }

    init(user) {
        for (let i = 0; i < this.wall.length; i++) {
            for (let j = 0; j < this.wall[i].length; j++) {
                if (this.wall[i][j] == '-') {
                    this.wallsdraw = new boundary(10 * i, 20 * j);
                    this.boundaryarray.push(this.wallsdraw);
                    this.game.addSprite(this.wallsdraw);
                } else if (this.wall[i][j] == '1') {
                    this.foodsdraw = new star(10 * i, 20 * j, user);
                    this.foodarray.push(this.foodsdraw);
                    this.game.addSprite(this.foodsdraw);
                }else if (this.wall[i][j] == '2') {
                    this.heartdraw = new Heart(10 * i, 20 * j,user);
                    this.heartarray.push(this.heartdraw);
                    this.game.addSprite(this.heartdraw);
                }

            }
        }
    }

    update() {


    }


    draw(context) {
        context.fillStyle = "#A3F7BF";
        context.fillRect(this.x, this.y, this.width, this.height);

    }
}

class boundary extends Sprite {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 20;


    }

    update() {


    }

    draw(context) {
        context.fillStyle = "#A3F7BF";
        context.fillRect(this.x, this.y, this.width, this.height);

    }
}

class star extends Sprite {
    constructor(x, y, user) {
        super();
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
        this.user = user;
        this.audio = new Audio();
        this.audio.src = 'assets/mp3/pacman_eatfruit.wav';
        this.image = new Image();
    }

    update() {

        if (this.y < this.user.y + 25 &&
            this.y + this.height > this.user.y &&
            this.x < this.user.x + 25 &&
            this.x + this.width > this.user.x
        ) {
            this.user.userScore++;
            this.audio.play();
            return true;
        }

    }


    draw(context) {
        this.image.src = "img/star2.png";
        context.beginPath();
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.fill();
    }
}

class userController extends Sprite {
    constructor(radius, map) {
        super();
        this.x = 50;
        this.y = 50;
        this.radius = radius;
        this.verticalspeed = 5;
        this.lives = 3;
        this.userScore = 0;
        this.horizontalspeed = 5;
        this.map = map;
        this.myGame = myGame;
        this.image = new Image();

    }

    update() {

        if (39 in keysDown) {
            var collide = false;
            var test = this.x + this.horizontalspeed;
            for (let i = 0; i < this.map.boundaryarray.length; i++) {
                if (this.map.boundaryarray[i].y < this.y + 25 &&
                    this.map.boundaryarray[i].y + this.map.boundaryarray[i].height > this.y &&
                    this.map.boundaryarray[i].x < test + 25 &&
                    this.map.boundaryarray[i].x + this.map.boundaryarray[i].width > test
                ) {
                    collide = true;

                }
            }
            if (collide) {

            } else {
                this.x = test;
            }
        }

        if (37 in keysDown) {
            var collide = false;
            var test = this.x - this.horizontalspeed;
            for (let i = 0; i < this.map.boundaryarray.length; i++) {
                if (this.map.boundaryarray[i].y < this.y + 25 &&
                    this.map.boundaryarray[i].y + this.map.boundaryarray[i].height > this.y &&
                    this.map.boundaryarray[i].x < test + 25 &&
                    this.map.boundaryarray[i].x + this.map.boundaryarray[i].width > test
                ) {
                    collide = true;

                }
            }
            if (collide) {

            } else {
                this.x = test;
            }
        }

        if (40 in keysDown) {
            var collide = false;
            var test = this.y + this.verticalspeed;
            for (let i = 0; i < this.map.boundaryarray.length; i++) {
                if (this.map.boundaryarray[i].y < test + 25 &&
                    this.map.boundaryarray[i].y + this.map.boundaryarray[i].height > test &&
                    this.map.boundaryarray[i].x < this.x + 25 &&
                    this.map.boundaryarray[i].x + this.map.boundaryarray[i].width > this.x
                ) {
                    collide = true;

                }
            }
            if (collide) {

            } else {
                this.y = test;
            }

        }

        if (38 in keysDown) {
            var collide = false;
            var test = this.y - this.verticalspeed;
            for (let i = 0; i < this.map.boundaryarray.length; i++) {
                if (this.map.boundaryarray[i].y < test + 25 &&
                    this.map.boundaryarray[i].y + this.map.boundaryarray[i].height > test &&
                    this.map.boundaryarray[i].x < this.x + 25 &&
                    this.map.boundaryarray[i].x + this.map.boundaryarray[i].width > this.x
                ) {
                    collide = true;

                }
            }
            if (collide) {

            } else {
                this.y = test;
            }
        }
    }



    draw(context) {
        this.image.src = "img/userpacman.png";
        context.fillStyle = this.color;
        context.beginPath();
        context.drawImage(this.image, this.x, this.y, 25, 25);
        context.fill();
    }
}

class Enemy extends Sprite {
    constructor(x, y, color, map, user, myGame) {
        super();
        this.x = x;
        this.y = y;
        this.verticalspeed = Math.floor((Math.random() * 1) + 3);
        this.horizontalspeed = Math.floor((Math.random() * 1) + 3);
        this.map = map;
        this.counter = 0;
        this.image = new Image();
        this.user = user;
        this.myGame = myGame;
        this.vunerable = true;
        this.counter = 0;
    }

    update() {
        if(this.user.userScore == 82){
            
            this.horizontalspeed = 0;
            this.verticalspeed = 0;
            this.user.horizontalspeed = 0;
            this.user.verticalspeed = 0;
        

        }


        if (!this.vunerable) {
            this.counter++;
            if (this.counter > 100) {
                this.counter = 0;
                this.vunerable = true;
            }
        }

        for (let i = 0; i < this.map.boundaryarray.length; i++) {

            if (this.x >= 0 || this.x < 0) {
                if (this.map.boundaryarray[i].y <= this.y + this.verticalspeed + 25 &&
                    this.map.boundaryarray[i].y + this.map.boundaryarray[i].height >= this.y + this.verticalspeed &&
                    this.map.boundaryarray[i].x <= this.x + this.horizontalspeed + 25 &&
                    this.map.boundaryarray[i].x + this.map.boundaryarray[i].width >= this.x + this.horizontalspeed) {


                    this.horizontalspeed = -this.horizontalspeed;
                    if (this.horizontalspeed > 0) {
                        this.horizontalspeed = (this.horizontalspeed + Math.random()) / 1.5;
                    } else {
                        this.horizontalspeed = (this.horizontalspeed - Math.random()) / 1.5;

                    }

                }
            }

            if (this.y >= 0) {
                if (this.map.boundaryarray[i].y <= this.y + this.verticalspeed + 25 &&
                    this.map.boundaryarray[i].y + this.map.boundaryarray[i].height >= this.y + this.verticalspeed &&
                    this.map.boundaryarray[i].x <= this.x + this.horizontalspeed + 25 &&
                    this.map.boundaryarray[i].x + this.map.boundaryarray[i].width >= this.x + this.horizontalspeed) {



                    this.verticalspeed = -this.verticalspeed;
                    if (this.verticalspeed > 0) {
                        this.verticalspeed = (this.verticalspeed + Math.random()) / 1.5;
                    } else {
                        this.verticalspeed = (this.verticalspeed - Math.random()) / 1.5;

                    }
                    this.horizontalspeed = -this.horizontalspeed;
                    if (this.horizontalspeed > 0) {
                        this.horizontalspeed = (this.horizontalspeed + Math.random()) / 1.5;
                    } else {
                        this.horizontalspeed = (this.horizontalspeed - Math.random()) / 1.5;

                    }

                }
            }

            if (this.y < 0) {
                if (this.map.boundaryarray[i].y <= this.y + this.verticalspeed + 25 &&
                    this.map.boundaryarray[i].y + this.map.boundaryarray[i].height >= this.y + this.verticalspeed &&
                    this.map.boundaryarray[i].x <= this.x + this.horizontalspeed + 25 &&
                    this.map.boundaryarray[i].x + this.map.boundaryarray[i].width >= this.x + this.horizontalspeed) {



                    this.verticalspeed = -this.verticalspeed;
                    if (this.verticalspeed > 0) {
                        this.verticalspeed = (this.verticalspeed + Math.random()) / 1.5;
                    } else {
                        this.verticalspeed = (this.verticalspeed - Math.random()) / 1.5;

                    }

                    this.horizontalspeed = -this.horizontalspeed;
                    if (this.horizontalspeed > 0) {
                        this.horizontalspeed = (this.horizontalspeed + Math.random()) / 1.5;
                    } else {
                        this.horizontalspeed = (this.horizontalspeed - Math.random()) / 1.5;

                    }
                }
            }


        }

        this.x = this.x + this.horizontalspeed;
        this.y = this.y + this.verticalspeed;
        if (this.user.lives > 0)
            if (this.vunerable)
                if (this.y < this.user.y + 25 &&
                    this.y + 25 > this.user.y &&
                    this.x < this.user.x + 25 &&
                    this.x + 25 > this.user.x
                ) {
                    this.user.userkilled = true;
                    this.vunerable = false;
                    this.user.lives--;
                    if (this.user.lives == 0) {
                        this.myGame.gameEnds = true;
                    }

                }
    }


    draw(context) {
        this.image.src = "img/enemy1copy.png";
        context.fillStyle = this.color;
        context.beginPath();
        context.drawImage(this.image, this.x, this.y, 25, 25);
        context.fill();
    }
}

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();
