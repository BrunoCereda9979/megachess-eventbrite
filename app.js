const Gateway = require('./src/Gateway');
const Game = require('./src/Game');

// New Gateway
const MegachessGateway = new Gateway();

// New Game
const MegachessGame = new Game(MegachessGateway);

// Subscribe Game class to the gateway class to listen to messages
MegachessGateway.subscribe(MegachessGame);