class Spot {
    constructor (piece, char) {
        this.piece = piece;
        this.pieceChar = char;
        this.coordinates = [];
    }

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

    isEmpty () {
        let empty = false;

        if (this.piece == null) {
            empty = true;
        }

        return empty;
    }
}

module.exports = Spot;