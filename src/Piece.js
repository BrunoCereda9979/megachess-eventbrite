/**
 *  @module Piece
 *  This is the superclass from wich every piece class will inherit.
 *  Every piece will be able to generate a list of posible moves.
 *  Every piece will be able to check if a move is valid.
 */

class Piece {
    constructor (name, color, value, canJump, char) {
        this.name = name;
        this.color = color;
        this.value = value;
        this.canJump = canJump;
        this.char = char;
    }

    // ----------- GETTERS & SETTERS ----------- //
    getName () {
        return this.name;
    }

    setName (name) {
        this.name = name;
    }

    getColor () {
        return this.color;
    }

    setColor (color) {
        this.color = color;
    }
    
    getValue () {
        return this.value;
    }

    setValue (value) {
        this.value = value;
    }

    getCanJump () {
        return this.canJump;
    }

    getChar () {
        return this.char;
    }

   /**
    *   @method generateListOfMoves Generate a list of posible moves given the <X, Y> location and color of the piece.
    *   @param {Number} fromX X coordinate of the piece.
    *   @param {Number} fromY Y coordinate of the piece.
    *   @param {String} pieceColor The color of the piece.
    *   @returns {Object} List of all the posible moves of the piece.
    */
    generateListOfMoves (fromX, fromY, pieceColor) {
        let toRandomToX = 0; // Random X destination
        let toRandomToY = 0; // Random Y destination
        let moveIsValid = false;
        let listOfPosibleMoves = [];
        let move = [];

        for (let i = 0; i < 16; i++) {
            for (let j = 0; j < 16; j++) {
                toRandomToX = i;
                toRandomToY = j;

                // Check if move is valid using the 'canMove' method
                moveIsValid = this.canMove(fromX, fromY, toRandomToX, toRandomToY, pieceColor);

                if (moveIsValid) {
                    // Set a new move coordinate
                    move = [toRandomToX, toRandomToY];

                    // Push new coordinate into the list of posible moves
                    listOfPosibleMoves.push(move);
                }
            }
        }
        
        return listOfPosibleMoves;
    }

   /**
    *   @method canMove Check if a move is valid given the origin and destination coodinates.
    *   @param {Number} fromX X coordinate of the piece.
    *   @param {Number} fromY Y coordinate of the piece.
    *   @param {Number} toX X coodinate of destination.
    *   @param {Number} toY Y coodinate of destination.
    *   @returns {Boolean} Flag indicating if the movement is correct or not.
    */
    canMove (fromX, fromY, toX, toY) {
        let canMove = false;
        
        // Making a move outside the board
        if ( ( toX > 15 || toX < 0 ) && ( toY > 15 || toY < 0 ) ) {
            canMove = false;
        }

        // Making a move to the same spot of the piece
        if (fromX == toX && fromY == toY) {
            canMove = false;
        }

        return canMove;
    }
}

module.exports = Piece;