var controller = {

	prevX: Array.apply(null, new Array(10)).map(Number.prototype.valueOf,0),
	prevY: Array.apply(null, new Array(10)).map(Number.prototype.valueOf,0),

	touchWasDown: false,
	
	init: function(){
		game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: controller.create, update: controller.update, render: controller.render });
	},

	create: function() {
	    game.stage.backgroundColor = '#454645';
	},

	update: function() {
		if(game.input.pointer1.isDown && !touchWasDown){
			controller.prevX = Array.apply(null, new Array(10)).map(Number.prototype.valueOf,game.input.pointer1.x);
			controller.prevY = Array.apply(null, new Array(10)).map(Number.prototype.valueOf,game.input.pointer1.y);
		}else{
			var move = controller.controllerLogic(game.input.pointer1.x, game.input.pointer1.y);
			IO.controllerMoved(move);
			controller.updatePrevArray(controller.prevX, game.input.pointer1.x);
			controller.updatePrevArray(controller.prevY, game.input.pointer1.y);
		}

	},

	controllerLogic: function(x, y){
 	var move = 0;
 	var movementThreshold = 10;
 	if(event.type != 'touchend'){
 		var dX = x - controller.prevX[0];
 		var dY = y - controller.prevY[0];
 		if(Math.abs(dX) > movementThreshold || Math.abs(dY) > movementThreshold){		
 			if(Math.abs(dX) > Math.abs(dY)){
 				if(dX > 0){
 					move = 2;
 				}else{
 					move = 4;
 				}
 			}else{
 				if(dY > 0){
 					move = 3;
 				}else{
 					move = 1;
 				}
 			}
 		}else{
 			move = -1;
 		}
 	}
 	return move;
 },

	updatePrevArray : function (prev,newMove){
            prev.push(newMove);
            prev.shift();
        },

	

	render: function() {
	    //  Just renders out the pointer data when you touch the canvas
	    game.debug.pointer(game.input.pointer1);

	}
}