
class Player {
   /** 
    *   @module Player
    *   @author BrunoCereda
    * 
    *   ** THIS CLASS IS THE BOT PLAYER, IT WILL GENERATE MOVES FOR THE PIECES **
    *   A move is represented by an array of 4 elements with the format [fromX, fromY, toX, toY].
    *   The main method of the class is the 'generateMove' method wich will generate the said array.
    *   It will select random pieces that are closer to the center and generate random valid moves for them.
    */

    constructor (name) {
        this.name = name;
    }    

    
   /** 
    *   @method generateMove Selects a random piece an generates a move for it.
    *   @param {Object} board The current board.
    *   @param {String} myColor The color of the player (black or white).
    *   @returns {Array} Array representing the move to make.
    */
    generateMove (board, myColor) {
        let move = null; // The movement array
        let moveSelected = false; // Flag

        // Get all my pieces with their coordinates
        let myPieces = this.getAllMyPieces(board, myColor);
        
        while (move == null) {
            // Get the pieces closer to center
            let piecesCloserToCenter = this.getPiecesCloserToCenter(myPieces);
            
            // Select a random piece from 'piecesCloserToCenter'
            let randomPieceToMove = piecesCloserToCenter[Math.floor(Math.random() * piecesCloserToCenter.length)];

            // Check surroundings of the piece
            let clear = this.checkPieceSurroundings(randomPieceToMove, board);
    
            if (clear == true) {
                // Generate all posible moves for the selected piece
                let posibleMoves = this.getPosibleMoves(randomPieceToMove, myColor);
                
                // If there is only one move posible, select it
                if (posibleMoves.length == 1) {
                    move = [randomPieceToMove.coordinates[0], randomPieceToMove.coordinates[1], posibleMoves[0][0], posibleMoves[0][1]];
                    if (move != null) {
                        console.log(`> Moved ${randomPieceToMove.piece.getName()} FROM <${move[0]},${move[1]}> TO <${move[2]},${move[3]}>`);
                    }
                }
                else {
                    // Select a random valid move from 'posibleMoves'
                    move = this.selectValidMove(randomPieceToMove, posibleMoves, board);

                    if (move != null) {
                        console.log(`> Moved ${randomPieceToMove.piece.getName()} FROM <${move[0]},${move[1]}> TO <${move[2]},${move[3]}>`);
                    }
                }
            }
        }

        return move;
    }


   /**
    *   @method getAllMyPieces Retreives all the pieces of the player from the board.
    *   @param {Array} board The current board.
    *   @param {String} myColor The color of the player (black or white).
    *   @returns {Array} A list containing the pieces of the player and their coordinates.
    */
    getAllMyPieces (board, myColor) {
        let myPieces = []; // List of all my pieces

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                let spot = board[i][j];

                if (spot.isEmpty() == false) {
                    let piece = spot.getPiece();

                    if (piece.getColor() == myColor) {
                        let pieceLocation = spot.getCoordinates();
                        let distanceToTarget = this.calcDistanceToTarget(pieceLocation, board, myColor);
                        
                        let newPiece = {
                            "piece": piece,
                            "coordinates": pieceLocation,
                            "distanceToTarget": distanceToTarget
                        }
                        
                        myPieces.push(newPiece);
                    }
                }
            }
        }
        
        return myPieces;
    }


   /**
    *   @method calcDistanceToObjective Calculates the distance of a piece to their target row.
    *   @param {Array} pieceLocation The piece coodinates.
    *   @param {Object} board The actual board.
    *   @param {String} color The color of the player (black or white).
    */
    calcDistanceToTarget (pieceLocation, board, color) {
        let distance = 0;
        let fromX = pieceLocation[0]; // X coordinate of the piece
        let blackTargetRow = 15; // Row 15 is the target of black pieces
        let whiteTargetRow = 0; // Row 0 is the target of white pieces
 
        if (color == 'white') {
            distance = Math.abs(fromX - whiteTargetRow);
        }
        else if (color == 'black') {
            distance = Math.abs(fromX - blackTargetRow);
        }

        return distance;
    }


   /**
    *   @method getPiecesCloserToCenter Returns a list of the pieces closer to the center.
    *   @param {Array} piecesList List of all my pieces.
    */
    getPiecesCloserToCenter (piecesList) {
        let piecesCloserToCenter = [];
        let closerDistance = piecesList[0].distanceToTarget;

        for (let i = 0; i < piecesList.length; i++) {
            let distance = piecesList[i].distanceToTarget;
            
            if (distance <= closerDistance) {
                piecesCloserToCenter.push(piecesList[i]);
            }
        }

        return piecesCloserToCenter;
    }


   /**
    *   @method getPosibleMoves Gets all the posible moves of the selected piece.
    *   @param {Object} randomPiece The object literal containing the piece object and its coordinates.
    *   @returns {Object} List containing all the coordinates of the posible moves for the selected piece.
    */
    getPosibleMoves (randomPiece) {
        let piece = randomPiece.piece;
        let pieceColor = piece.getColor();
        let fromX = randomPiece.coordinates[0];
        let fromY = randomPiece.coordinates[1];
        
        // Generate the list of all the posible moves of the selected piece
        let listOfPosibleMoves = piece.generateListOfMoves(fromX, fromY, pieceColor);
        
        return listOfPosibleMoves;
    }


   /**
    *   @method selectValidMove Selects a valid move from all the posible moves of the piece.
    *   @param {Object} randomPiece The random selected piece.
    *   @param {Array} posibleMoves All the posible moves of the random selected piece.
    *   @param {Array} board The actual board.
    *   @returns {Array} Array with the coordinates of the valid move.
    */
    selectValidMove (randomPiece, posibleMoves, board) {
        let move = null;
        let valid = false;
        let myPiece = randomPiece.piece;
        let myPieceColor = myPiece.getColor();
        let fromX = randomPiece.coordinates[0];
        let fromY = randomPiece.coordinates[1];

        while (valid == false || posibleMoves.length == 0) {

            if (posibleMoves.length == 0) {
                valid = false;
                break;
            }

            // Select a random move from 'posibleMoves'
            let randomMove = posibleMoves[Math.floor(Math.random() * posibleMoves.length)];
            let toX = randomMove[0];
            let toY = randomMove[1];
            let targetSpot = board[toX][toY];
            
            // If the target spot is empty or has an enemy piece the move is valid.
            if (targetSpot.isEmpty() == true || (targetSpot.isEmpty() == false && targetSpot.getPiece().getColor() != myPieceColor)) {
                move = [fromX, fromY, toX, toY];
                valid = true;
            }
            // If not valid then remove the posible move from the 'posibleMoves' array
            else {
                for (let i = 0; i < posibleMoves.length; i++) {
                    if (posibleMoves[i] === randomMove) {
                        posibleMoves.splice(i, 1);
                    }
                }
            }
        }

        return move;
    }


   /**
    *   @method checkPieceSurroundings Checks the selected piece surroudings.
    *   @param {Object} randomPiece The random piece selected.
    *   @param {Object} board The actual board.
    *   @returns {Boolean} Flag indicating the piece is clear to move.
    */
    checkPieceSurroundings (randomPiece, board) {
        let clearToMove = false; // Flag indicating it's clear to move
        let myPiece = randomPiece.piece;
        let myPieceColor = myPiece.getColor();
        let fromX = randomPiece.coordinates[0]; // X coordinate of my piece
        let fromY = randomPiece.coordinates[1]; // Y coordinate of my piece

        // Piece is on the top border of the board
        if (fromX == 0) {
            let bottomSpot = board[fromX + 1][fromY];
            let rightSpot = board[fromX][fromY + 1];
            let leftSpot = board[fromX][fromY - 1];
            let bottomRightCornerSpot = board[fromX + 1][fromY + 1];
            let bottomLeftCornerSpot = board[fromX + 1][fromY - 1];
    
            if (
                (bottomSpot.isEmpty() || (bottomSpot.getPiece().getColor() != myPieceColor)) && 
                (rightSpot.isEmpty() || (rightSpot.getPiece().getColor() != myPieceColor)) && 
                (leftSpot.isEmpty() || (leftSpot.getPiece().getColor() != myPieceColor)) && 
                (bottomRightCornerSpot.isEmpty() || (bottomRightCornerSpot.getPiece().getColor() != myPieceColor)) && 
                (bottomLeftCornerSpot.isEmpty() || (bottomLeftCornerSpot.getPiece().getColor() != myPieceColor))
            ) {
                clearToMove = true;
            }
        }
        // Piece is on the top left corner (0, 0)
        else if (fromX == 0 && fromY == 0) {
            let rightSpot = board[fromX][fromY + 1];
            let bottomSpot = board[fromX + 1][fromY];
            let bottomRightCornerSpot = board[fromX + 1][fromY + 1];

            if (
                (rightSpot.isEmpty() || (rightSpot.getPiece().getColor() != myPieceColor)) && 
                (bottomSpot.isEmpty() || (bottomSpot.getPiece().getColor() != myPieceColor)) && 
                (bottomRightCornerSpot.isEmpty() || (bottomRightCornerSpot.getPiece().getColor() != myPieceColor))
            ) {
                clearToMove = true;
            }
        }
        // Piece is on the top right corner (0, 15)
        else if (fromX == 0 && fromY == 15) {
            let leftSpot = board[fromX][fromY - 1];
            let bottomSpot = board[fromX + 1][fromY];
            let bottomLeftCornerSpot = board[fromX + 1][fromY - 1];

            if (
                (leftSpot.isEmpty() || (leftSpot.getPiece().getColor() != myPieceColor)) && 
                (bottomSpot.isEmpty() || (bottomSpot.getPiece().getColor() != myPieceColor)) && 
                (bottomLeftCornerSpot.isEmpty() || (bottomLeftCornerSpot.getPiece().getColor() != myPieceColor))
            ) {
                clearToMove = true;
            }
        }
        // Piece is on the bottom left corner (15, 0)
        else if (fromX == 0 && fromY == 15) {
            let topSpot = board[fromX - 1][fromY];
            let rightSpot = board[fromX][fromY + 1];
            let topRightCornerSpot = board[fromX - 1][fromY + 1];

            if (
                (topSpot.isEmpty() || (topSpot.getPiece().getColor() != myPieceColor)) && 
                (rightSpot.isEmpty() || (rightSpot.getPiece().getColor() != myPieceColor)) && 
                (topRightCornerSpot.isEmpty() || (topRightCornerSpot.getPiece().getColor() != myPieceColor))
            ) {
                clearToMove = true;
            }
        }
        // Piece is on the bottom right corner (15, 15)
        else if (fromX == 0 && fromY == 15) {
            let topSpot = board[fromX - 1][fromY];
            let leftSpot = board[fromX][fromY - 1];
            let topLeftCornerSpot = board[fromX - 1][fromY - 1];

            if (
                (topSpot.isEmpty() || (topSpot.getPiece().getColor() != myPieceColor)) && 
                (leftSpot.isEmpty() || (leftSpot.getPiece().getColor() != myPieceColor)) && 
                (topLeftCornerSpot.isEmpty() || (topLeftCornerSpot.getPiece().getColor() != myPieceColor))
            ) {
                clearToMove = true;
            }
        }
        // Piece is on the bottom border of the board
        else if (fromX == 15) {
            let topSpot = board[fromX - 1][fromY];
            let rightSpot = board[fromX][fromY + 1];
            let leftSpot = board[fromX][fromY - 1];
            let topRightCornerSpot = board[fromX - 1][fromY + 1];
            let topLeftCornerSpot = board[fromX - 1][fromY - 1];
    
            if (
                (topSpot.isEmpty() || (topSpot.getPiece().getColor() != myPieceColor)) && 
                (rightSpot.isEmpty() || (rightSpot.getPiece().getColor() != myPieceColor)) && 
                (leftSpot.isEmpty() || (leftSpot.getPiece().getColor() != myPieceColor)) && 
                (topRightCornerSpot.isEmpty() || (topRightCornerSpot.getPiece().getColor() != myPieceColor)) && 
                (topLeftCornerSpot.isEmpty() || (topLeftCornerSpot.getPiece().getColor() != myPieceColor))
            ) {
                clearToMove = true;
            }
        }
        // Piece is on the left border of the board
        else if (fromY == 0) {
            let topSpot = board[fromX - 1][fromY];
            let bottomSpot = board[fromX + 1][fromY];
            let rightSpot = board[fromX][fromY + 1];
            let topRightCornerSpot = board[fromX - 1][fromY + 1];
            let bottomRightCornerSpot = board[fromX + 1][fromY + 1];
    
            if (
                (topSpot.isEmpty() || (topSpot.getPiece().getColor() != myPieceColor)) && 
                (bottomSpot.isEmpty() || (bottomSpot.getPiece().getColor() != myPieceColor)) && 
                (rightSpot.isEmpty() || (rightSpot.getPiece().getColor() != myPieceColor)) && 
                (topRightCornerSpot.isEmpty() || (topRightCornerSpot.getPiece().getColor() != myPieceColor)) && 
                (bottomRightCornerSpot.isEmpty() || (bottomRightCornerSpot.getPiece().getColor() != myPieceColor))
            ) {
                clearToMove = true;
            }
        }
        // Piece is on the right border of the board
        else if (fromY == 15) {
            let topSpot = board[fromX - 1][fromY]; // Check TOP
            let bottomSpot = board[fromX + 1][fromY]; // Check BOTTOM
            let leftSpot = board[fromX][fromY - 1]; // Check LEFT
            let topLeftCornerSpot = board[fromX - 1][fromY - 1]; // Check LEFT TOP CORNER
            let bottomLeftCornerSpot = board[fromX + 1][fromY - 1]; // Check LEFT BOTTOM CORNER
    
            if (
                (topSpot.isEmpty() || (topSpot.getPiece().getColor() != myPieceColor)) && 
                (bottomSpot.isEmpty() || (bottomSpot.getPiece().getColor() != myPieceColor)) && 
                (leftSpot.isEmpty() || (leftSpot.getPiece().getColor() != myPieceColor)) && 
                (topLeftCornerSpot.isEmpty() || (topLeftCornerSpot.getPiece().getColor() != myPieceColor)) && 
                (bottomLeftCornerSpot.isEmpty() || (bottomLeftCornerSpot.getPiece().getColor() != myPieceColor))
            ) {
                clearToMove = true;
            }
        }
        // Piece is not in any corner so check all surroundings
        else {
            let topSpot = board[fromX - 1][fromY];
            let bottomSpot = board[fromX + 1][fromY];
            let rightSpot = board[fromX][fromY + 1];
            let leftSpot = board[fromX][fromY - 1];
            let topRightCornerSpot = board[fromX - 1][fromY + 1];
            let topLeftCornerSpot = board[fromX - 1][fromY - 1];
            let bottomRightCornerSpot = board[fromX + 1][fromY + 1];
            let bottomLeftCornerSpot = board[fromX + 1][fromY - 1];
    
            if (
                (topSpot.isEmpty() || (topSpot.getPiece().getColor() != myPieceColor)) || 
                (bottomSpot.isEmpty() || (bottomSpot.getPiece().getColor() != myPieceColor)) || 
                (rightSpot.isEmpty() || (rightSpot.getPiece().getColor() != myPieceColor)) || 
                (leftSpot.isEmpty() || (leftSpot.getPiece().getColor() != myPieceColor)) || 
                (topRightCornerSpot.isEmpty() || (topRightCornerSpot.getPiece().getColor() != myPieceColor)) || 
                (topLeftCornerSpot.isEmpty() || (topLeftCornerSpot.getPiece().getColor() != myPieceColor)) || 
                (bottomRightCornerSpot.isEmpty() || (bottomRightCornerSpot.getPiece().getColor() != myPieceColor)) || 
                (bottomLeftCornerSpot.isEmpty() || (bottomLeftCornerSpot.getPiece().getColor() != myPieceColor))
            ) {
                clearToMove = true;
            }
        }
        
        return clearToMove;
    }
}

module.exports = Player;