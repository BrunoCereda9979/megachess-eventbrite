const Piece = require("../Piece");

/**
 *  This is the Rook class, it inherits from the Piece class.
 */

class Rook extends Piece {
    constructor (...args) {
        super (...args);
    }

   /**
    *   A Rook can move vertically or horizontally any number of spots it wants.
    */
    canMove (fromX, fromY, toX, toY) {
        super.canMove(fromX, fromY, toX, toY);
        
        let canMove = false;

        if ( fromX == toX || fromY == toY ) { 
            canMove = true;
        }

        return canMove;
    } 
}

module.exports = Rook;