/**
 * @module Horse
 */

const Piece = require("../Piece");

/**
 *  This is the Horse class, it inherits from the Piece class.
 */

class Horse extends Piece {
    constructor (...args) {
        super (...args);
    }

   /**
    *  A horse can make an L type of move.
    */
    canMove (fromX, fromY, toX, toY) {
        super.canMove(fromX, fromY, toX, toY);
        
        let canMove = false;
        
        if ((Math.abs(fromX - toX) == 2 && Math.abs(fromY - toY) == 1) || (Math.abs(fromX - toX) == 1 && Math.abs(fromY - toY) == 2)) {
            canMove = true;
        }

        return canMove;
    }  
}

module.exports = Horse;