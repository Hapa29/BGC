var controller = {

	game: null,
	prevX: Array.apply(null, new Array(10)).map(Number.prototype.valueOf,0),
	

	init: function(){
		game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: controller.create, render: controller.render });
	},

	create: function() {

	    game.stage.backgroundColor = '#454645';

	    //  By default Phaser only starts 2 pointers (enough for 2 fingers at once)

	    App.prevX = ;
            App.;

	    gameAreaController.addEventListener('touchstart', initiateControllerInput, false);
            gameAreaController.addEventListener('touchmove', controllerInput, false);
            gameAreaController.addEventListener('touchend', controllerInput, false);
            function initiateControllerInput(event){
                App.reflectMovement(event, 0);
                App.prevX = Array.apply(null, new Array(10)).map(Number.prototype.valueOf,event.changedTouches[0].pageX);
                App.prevY = Array.apply(null, new Array(10)).map(Number.prototype.valueOf,event.changedTouches[0].pageY);
            }
            function controllerInput(event){
                //console.log(App.prevX);
                var move = controllerLogic(event, App.prevX, App.prevY);
                App.reflectMovement(event, move);
                App.updatePrevArray(App.prevX, event.changedTouches[0].pageX);
                App.updatePrevArray(App.prevY, event.changedTouches[0].pageY);
            }


        updatePrevArray : function (prev,newMove){
            prev.push(newMove);
            prev.shift();
        },

	},

	function controllerLogic(event, prevX, prevY){
 	var move = 0;
 	var movementThreshold = 10;
 	var x = event.changedTouches[0].pageX;
 	var y = event.changedTouches[0].pageY;
 	if(event.type != 'touchend'){
 		var dX = x - prevX[0];
 		var dY = y - prevY[0];
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
 	console.log(event.type);
 	return move;
 }

	render: function() {

	    //  Just renders out the pointer data when you touch the canvas
	    game.debug.pointer(game.input.mousePointer);
	    game.debug.pointer(game.input.pointer1);
	    game.debug.pointer(game.input.pointer2);
	    game.debug.pointer(game.input.pointer3);
	    game.debug.pointer(game.input.pointer4);
	    game.debug.pointer(game.input.pointer5);
	    game.debug.pointer(game.input.pointer6);

	}
}