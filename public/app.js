;
jQuery(function($){    
    'use strict';

    /**
     * All the code relevant to Socket.IO is collected in the IO namespace.
     *
     * @type {{init: Function, bindEvents: Function, onConnected: Function, onNewGameCreated: Function, playerJoinedRoom: Function, beginNewGame: Function, onNewWordData: Function, hostCheckAnswer: Function, gameOver: Function, error: Function}}
     */
    var IO = {

        /**
         * This is called when the page is displayed. It connects the Socket.IO client
         * to the Socket.IO server
         */
        init: function() {
            IO.socket = io.connect();
            IO.bindEvents();
        },

        /**
         * While connected, Socket.IO will listen to the following events emitted
         * by the Socket.IO server, then run the appropriate function.
         */
        bindEvents : function() {
            IO.socket.on('connected', IO.onConnected );
            IO.socket.on('newGameCreated', IO.onNewGameCreated );
            IO.socket.on('playerJoinedRoom', IO.playerJoinedRoom );
            IO.socket.on('beginNewGame', IO.beginNewGame );
            IO.socket.on('newWordData', IO.onNewWordData);
            IO.socket.on('hostCheckAnswer', IO.hostCheckAnswer);
            IO.socket.on('gameOver', IO.gameOver);
            IO.socket.on('error', IO.error );
        },

        /**
         * The client is successfully connected!
         */
        onConnected : function() {
            // Cache a copy of the client's socket.IO session ID on the App
            App.mySocketId = IO.socket.socket.sessionid;
            // console.log(data.message);
        },

        /**
         * A new game has been created and a random game ID has been generated.
         * @param data {{ gameId: int, mySocketId: * }}
         */
        onNewGameCreated : function(data) {
            App.Host.gameInit(data);
        },

        /**
         * A player has successfully joined the game.
         * @param data {{playerName: string, gameId: int, mySocketId: int}}
         */
        playerJoinedRoom : function(data) {
            // When a player joins a room, do the updateWaitingScreen funciton.
            // There are two versions of this function: one for the 'host' and
            // another for the 'player'.
            //
            // So on the 'host' browser window, the App.Host.updateWiatingScreen function is called.
            // And on the player's browser, App.Player.updateWaitingScreen is called.
            App[App.myRole].updateWaitingScreen(data);
        },

        /**
         * Both players have joined the game.
         * @param data
         */
        beginNewGame : function(data) {
            App[App.myRole].gameCountdown(data);
        },

        /**
         * Let everyone know the game has ended.
         * @param data
         */
        gameOver : function(data) {
            App[App.myRole].endGame(data);
        },

        /**
         * An error has occurred.
         * @param data
         */
        error : function(data) {
            alert(data.message);
        }

    };

    var App = {

        /**
         * Keep track of the gameId, which is identical to the ID
         * of the Socket.IO Room used for the players and host to communicate
         *
         */
        gameId: 0,

        /**
         * This is used to differentiate between 'Host' and 'Player' browsers.
         */
        myRole: '',   // 'Player' or 'Host'

        /**
         * The Socket.IO socket object identifier. This is unique for
         * each player and host. It is generated when the browser initially
         * connects to the server when the page loads for the first time.
         */
        mySocketId: '',

        /**
         * Identifies the current round. Starts at 0 because it corresponds
         * to the array of word data stored on the server.
         */
        currentRound: 0,

        /* *************************************
         *                Setup                *
         * *********************************** */

        /**
         * This runs when the page initially loads.
         */
        init: function () {
            App.cacheElements();
            App.initScreen();
            App.bindEvents();

            // Initialize the fastclick library
            FastClick.attach(document.body);
        },

        /**
         * Create references to on-screen elements used throughout the game.
         */
        cacheElements: function () {
            App.$doc = $(document);

            // Templates
            App.$pacman = $('#pacman').html();
            App.$controller = $('#controller').html();
        },

        /**
         * Decide if the controller or game
         */
        initScreen: function () {
            pacman.init();
        },

        /**
         * Create some click handlers for the various buttons that appear on-screen.
         */
        bindEvents: function () {
            // Host

            // Player
        },

        /* *************************************
         *             Game Logic              *
         * *********************************** */


        /* *******************************
           *         HOST CODE           *
           ******************************* */
        Host : {

            
        },


        /* *****************************
           *        PLAYER CODE        *
           ***************************** */

        Player : {

            
        },


        /* **************************
                  UTILITY CODE
           ************************** */
    };

    var pacman = {

    var game;

    function init() {
        game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });
    }

    function preload() {

        game.load.image('phaser', 'assets/sprites/phaser-dude.png');

    }

    var sprite;

    var upKey;
    var downKey;
    var leftKey;
    var rightKey;

    function create() {

        game.stage.backgroundColor = '#736357';

        sprite = game.add.sprite(300, 300, 'phaser');

        //  In this example we'll create 4 specific keys (up, down, left, right) and monitor them in our update function

        upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

    }

    function update() {

        if (upKey.isDown)
        {
            sprite.y--;
        }
        else if (downKey.isDown)
        {
            sprite.y++;
        }

        if (leftKey.isDown)
        {
            sprite.x--;
        }
        else if (rightKey.isDown)
        {
            sprite.x++;
        }

    }
}

var pacman = {

    var game;

    function init() {
        game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });
    }

    function preload() {

        game.load.image('phaser', 'assets/sprites/phaser-dude.png');

    }

    var sprite;

    var upKey;
    var downKey;
    var leftKey;
    var rightKey;

    function create() {

        game.stage.backgroundColor = '#736357';

        sprite = game.add.sprite(300, 300, 'phaser');

        //  In this example we'll create 4 specific keys (up, down, left, right) and monitor them in our update function

        upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

    }

    function update() {

        if (upKey.isDown)
        {
            sprite.y--;
        }
        else if (downKey.isDown)
        {
            sprite.y++;
        }

        if (leftKey.isDown)
        {
            sprite.x--;
        }
        else if (rightKey.isDown)
        {
            sprite.x++;
        }

    }
}

    IO.init();
    App.init();

}($));
