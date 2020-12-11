const Board = require('./Board');
const Player = require('./Player');

/**
*   @module Game 
*   @author Bruno Cereda
*
*   ** THIS CLASS WILL CONTROL THE OVERALL FLOW OF THE GAME AND COMMUNICATION WITH THE GATEWAY **.
*   Its subscribed to the Gateway class and is expecting new messages.
*   Every new message arriving is checked for its event and data.
*   Every event will trigger different responses wich will be sended back to the gateway. 
*
*   OBSERVER in the OBSERVER PATTERN (Observing the Gateway for messages)
*/

class Game {

    constructor (gateway) {
        this.gateway = gateway;
        this.board = new Board();
        this.player = new Player('BrunoCereda');
        this.gameOnCourse = false;
    }


   /**
    *   @method newMessage Gets message from the server, checks for event and data and sends a response.        
    *   @param {Object} message Message comming from the gateway.
    */
    newMessage (message) {
        let event = message.event;
        let data = message.data;

        // Check event
        switch (event) {
            case 'update_user_list':
                console.log(`> Players Connected: ${data.users_list}`);

                // ACTION: Challenge a player
                if (this.gameOnCourse == false) {
                    this.challengePlayer(data.users_list);
                }

                break;

            case 'ask_challenge': 
                console.log(`> ¡${data.username} HAS CHALLENGED YOU!`);

                // ACTION -> Acept Challenge
                if (this.gameOnCourse == false) {
                    this.sendResponse('accept_challenge', {"board_id": data.board_id});
                }
                break;

            case 'your_turn':
                console.log(`\n> My Turn (I'm ${data.actual_turn})`);
                
                this.gameOnCourse = true;
    
                // Generate Board
                let actualBoard = this.board.generateBoard(data.board);

                // Display Board
                this.board.displayBoard(actualBoard);
                
                // Make move
                let move = this.player.generateMove(actualBoard, data.actual_turn);

                // Send move
                this.sendResponse('move', {
                    "board_id": data.board_id,
                    "turn_token": data.turn_token,
                    "from_row": move[0],
                    "from_col": move[1],
                    "to_row": move[2],
                    "to_col": move[3]
                });

                break;

            case 'gameover':
                this.gameOnCourse = false;

                console.log('>>>> GAME OVER');
                let whitePlayer = data.white_username;
                let blackPlayer = data.black_username;
                let whiteScore = data.white_score;
                let blackScore = data.black_score;

                if (whiteScore > blackScore) {
                    console.log(`> ${whitePlayer} WINS WITH ${whiteScore} POINTS`);
                    console.log(`> ${blackPlayer} LOOSES WITH ${blackScore} POINTS`);
                }
                else {
                    console.log(`> ${blackPlayer} WINS WITH ${blackScore} POINTS`);
                    console.log(`> ${whitePlayer} LOOSES WITH ${whiteScore} POINTS`);
                }

                break;

            case 'response_error':
                console.log(`>>>> There is an error with the server response`);

            default:
                console.log(`> Unknown Event: ${event}`);
                break;
        }
    }


   /**
    *   @method challengePlayer Challenge a random player from the users list.        
    *   @param {Array} usersList List of connected users.
    */
    challengePlayer (usersList) {
        let random = Math.floor(Math.random() * usersList.length);
        let opponentUsername = usersList[random];
    
        this.sendResponse('challenge', {"username": opponentUsername, "message": "Te desafío papá"});
        console.log(`> You have challenged ${opponentUsername}`);
    }


   /**
    *   @method sendResponse Send response to the gateway.        
    *   @param {String} action The action to perform.
    *   @param {Object} data The data to send along with the action.
    */
    sendResponse (action, data) {
        let response = this.buildResponse(action, data);

        setTimeout(() => {
            this.gateway.send(response);
        }, 1900);
    }

   /**
    *   @method buildResponse Build the response object.        
    *   @param {String} action The action to perform.
    *   @param {Object} data The data to send along with the action.
    *   @returns {Object} Response object.
    */
    buildResponse (action, data) {
        let response = {
            "action": action,
            "data": data
        }

        return response;
    }
}

module.exports = Game;