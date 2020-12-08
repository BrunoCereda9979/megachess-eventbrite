
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