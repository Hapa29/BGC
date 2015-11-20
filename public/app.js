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
            IO.socket.emit('joinGame');
            console.log('tried to join the game');
        },

        /**
         * While connected, Socket.IO will listen to the following events emitted
         * by the Socket.IO server, then run the appropriate function.
         */
        bindEvents : function() {
            IO.socket.on('hostConnected', IO.hostConnected);
            IO.socket.on('controllerConnected', IO.controllerConnected);

            IO.socket.on('playerMovement', IO.playerMovement);
        },

        hostConnected : function(message) {
            console.log(message);
            App.myRole = 'host';
            App.init();
        },

        controllerConnected : function(message) {
            console.log(message);
            App.myRole = 'controller';
            App.init();
        },

        playerMovement : function(move) {
            //console.log("Move player "+move);
            riht.changeDirection(move);
        },

        controllerMoved : function(move) {
            IO.socket.emit('controllerInput',move);
        }

    };

    var App = {

        /**
         * This is used to differentiate between 'Host' and 'Player' browsers.
         */
        myRole: '',   // 'Controller' or 'Host'

        /* *************************************
         *                Setup                *
         * *********************************** */

        /**
         * This runs when the page initially loads.
         */
        init: function () {
            App.cacheElements();
            App.initScreen();

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
            if(App.myRole == 'host'){
                riht.init();
            }else if(App.myRole == 'controller'){
                document.body.innerHTML = "<div id='gameArea'>Hello</div>";
                controller.init(IO.socket);
            }
        },

        
    };

    IO.init();
    App.init(IO);

}($));
