/**
 *  @module Spot
 *  This class represents a spot inside of the chess board.
 *  It provides methods to get and set a piece inside of it.
 */

class Spot {
    constructor (piece, char) {
        this.piece = piece;
        this.pieceChar = char;
        this.coordinates = [];
    }

    // ------------- GETTERS & SETTERS ------------- //
    getPieceChar () {
        return this.pieceChar;
    }

    getPiece () {
        return this.piece;
    }

    setPiece (piece) {
        this.piece = piece;
    }

    getCoordinates () {
        return this.coordinates;
    }

    setCoordinates (x, y) {
        this.coordinates = [x, y];
    }

   /**
    *  @method isEmpty Checks if the spot is empty.
    *  @returns {Boolean} Flag indicating if the spot is empty or not.
    */
    isEmpty () {
        let empty = false;

        if (this.piece == null) {
            empty = true;
        }

        return empty;
    }
}

module.exports = Spot;