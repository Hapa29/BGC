var io;
var gameSocket;

var host;
var controller;

/**
 * This function is called by index.js to initialize a new game instance.
 *
 * @param sio The Socket.IO library
 * @param socket The socket object for the connected client.
 */
exports.initGame = function(sio, socket){
    io = sio;
    gameSocket = socket;
    gameSocket.emit('connected', { message: "You are connected!" });

    gameSocket.on('joinGame', joinGame);
    gameSocket.on('controllerInput', controllerInput);
}

function joinGame() {
    if(host == null){
        console.log("A host has joined", 'You are connected');
        host = this;
        this.emit('hostConnected', 'You are the host');
    }else if(controller == null){
        console.log("A controller has connected");
        controller = this;
        this.emit('controllerConnected', 'You are the controller');
    }
}

function controllerInput(move) {
    host.emit('playerMovement', move);
}