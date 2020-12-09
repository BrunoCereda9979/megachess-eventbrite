// Spot class
const Spot = require('./Spot');

// Piece classes
const Pawn = require('./pieces/Pawn');
const Horse = require('./pieces/Horse');
const Bishop = require('./pieces/Bishop');
const Rook = require('./pieces/Rook');
const Queen = require('./pieces/Queen');
const King = require('./pieces/King');

class Board {

    generateBoard (boardString) {
        let array = [];
        let matrix = [];
        let board;

        // Make string into array of Spot objects
        array = this.stringToArray(boardString);
        
        // Make array into matrix of Spot objects
        matrix = this.arrayToMatrix(array, 16);

        // Set coordinates of the spots
        matrix = this.setSpotCoordinates(matrix);

        // Fill empty matrix with pieces
        board = this.fillBoard(matrix);

        return board;
    }

    displayBoard (board) {
        let i, j, row;

        console.log(`> ----------------------- BOARD ----------------------- <`);
        for (i = 0; i <= 15; i++) {
            for (j = 0; j <= 15; j++) {
                let piece = board[i][j].getPiece();
                let show = null;

                if (piece != null) {
                    show = piece.getChar();
                }
                else {
                    show = '-';
                }

                row += `[${show}]`;

                if (j == 15) {
                    console.log(row);
                    row = '';
                }
            }
        }
    }


    stringToArray (string) {
        let boardArray = [];

        for (let i = 0; i < string.length; i++) {
            let pieceChar = string.charAt(i);
            
            
            if (pieceChar == ' ') {
                pieceChar = '-';
            }

            // Generate a new empty Spot
            let spot = new Spot(null, pieceChar);
            
            // Fill array with the new empty spot
            boardArray.push(spot);
        }
        
        return boardArray;
    }

    arrayToMatrix (array, elementsPerSubArray) {
        var matrix = []; 
        let i, j;
        
        for (i = 0, j = -1; i < array.length; i++) {
            if (i % elementsPerSubArray === 0) {
                j++;
                matrix[j] = [];
            }
        
            matrix[j].push(array[i]);
        }

        return matrix;
    }

    setSpotCoordinates (boardMatrix) {
        for (let i = 0; i < 16; i++) {
            for (let j = 0; j < 16; j++) {
                boardMatrix[i][j].setCoordinates(i, j);
            }   
        }
        
        return boardMatrix;
    }

    fillBoard (boardMatrix) {
        for (let i = 0; i <= 15; i++) {
            for (let j = 0; j <= 15; j++) {
                // Get the piece character of the Spot
                let pieceChar = boardMatrix[i][j].getPieceChar();

                // Create the piece given the piece character of the spot
                let newPiece = this.createPiece(pieceChar);

                // Fill spot with new Piece
                boardMatrix[i][j].setPiece(newPiece);
            }
        }
        
        return boardMatrix;
    }

    createPiece (pieceChar) {
        let color = '';
        let piece = null;
        
        if (pieceChar == 'P') { // <------ WHITE & BLACK PAWN
            color = 'white';
            piece = new Pawn('Pawn', color, 10, false, 'P');
        }
        else if (pieceChar == 'p') {
            color = 'black';
            piece = new Pawn('Pawn', color, 10, false, 'p');
        }
        if (pieceChar == 'H') { // <------ WHITE & BLACK HORSE
            color = 'white';
            piece = new Horse('Horse', color, 30, true, 'H');
        }
        else if (pieceChar == 'h') {
            color = 'black';
            piece = new Horse('Horse', color, 30, true, 'h');
        }
        if (pieceChar == 'B') { // <------ WHITE & BLACK BISHOP
            color = 'white';
            piece = new Bishop('Bishop', color, 40, false, 'B');
        }
        else if (pieceChar == 'b') {
            color = 'black';
            piece = new Bishop('Bishop', color, 40, false, 'b');
        }
        if (pieceChar == 'R') { // <------ WHITE & BLACK ROOK
            color = 'white';
            piece = new Rook('Rook', color, 60, false, 'R');
        }
        else if (pieceChar == 'r') {
            color = 'black';
            piece = new Rook('Rook', color, 60, false, 'r');
        }
        if (pieceChar == 'Q') { // <------ WHITE & BLACK QUEEN
            color = 'white';
            piece = new Queen('Queen', color, 5, false, 'Q');
        }
        else if (pieceChar == 'q') {
            color = 'black';
            piece = new Queen('Queen', color, 5, false, 'q');
        }
        if (pieceChar == 'K') { // <------ WHITE & BLACK KING
            color = 'white';
            piece = new King('King', color, 100, false, 'K');
        }
        else if (pieceChar == 'k') {
            color = 'black';
            piece = new King('King', color, 100, false, 'k');
        }

        return piece;
    }
}

module.exports = Board;