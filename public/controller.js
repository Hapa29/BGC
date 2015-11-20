var controller = {

	prevX: Array.apply(null, new Array(10)).map(Number.prototype.valueOf,0),
	prevY: Array.apply(null, new Array(10)).map(Number.prototype.valueOf,0),
	
	init: function(sock){
		controller.socket = sock;
		var gameAreaController = document.getElementById("gameArea");
            gameAreaController.addEventListener('touchstart', initiateControllerInput, false);
            gameAreaController.addEventListener('touchmove', controllerInput, false);
            gameAreaController.addEventListener('touchend', controllerInput, false);
            function initiateControllerInput(event){
                controller.prevX = Array.apply(null, new Array(10)).map(Number.prototype.valueOf,event.changedTouches[0].pageX);
                controller.prevY = Array.apply(null, new Array(10)).map(Number.prototype.valueOf,event.changedTouches[0].pageY);
            }
            function controllerInput(event){
                //console.log(App.prevX);
                var move = controller.controllerLogic(event, controller.prevX, controller.prevY);
                //App.reflectMovement(event, move);
                if(move >=0){
                	controller.socket.emit('controllerInput',move);
            	}
                controller.updatePrevArray(controller.prevX, event.changedTouches[0].pageX);
                controller.updatePrevArray(controller.prevY, event.changedTouches[0].pageY);
            }
	},

	

	updatePrevArray : function (prev,newMove){
            prev.push(newMove);
            prev.shift();
        },


     controllerLogic: function(event, prevX, prevY){
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
 	//console.log(event.type);
 	return move;
 }
}