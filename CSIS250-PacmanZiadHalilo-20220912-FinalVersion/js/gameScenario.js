var myGame = new Game();
var maps = new map(myGame);

myGame.addSprite(maps);
var user = new userController(25,maps);
var layer = new Backgroundinfo(user, myGame);
var enemy1 = new Enemy(280,320,"#FFFFFF",maps,user,myGame);
var enemy2 = new Enemy(300,320,"#FFFFFF",maps,user,myGame);
var enemy3 = new Enemy(320,320,"#FFFFFF",maps,user,myGame);
myGame.addSprite(user);
myGame.addSprite(enemy1);
myGame.addSprite(enemy2);
myGame.addSprite(enemy3);
maps.init(user);
myGame.addSprite(layer);


function animate(game) {
	game.update();
	game.draw();

	requestAnimFrame(function () {
		animate(game);
	});


}


animate(myGame);

if(82 in keysDown){
location.reload();
 }


