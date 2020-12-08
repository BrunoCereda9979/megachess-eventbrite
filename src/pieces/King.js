/**
 *  @module King
 */

const Piece = require("../Piece");

/**
*  This is the King class, it inherits from the Piece class.
*/
class King extends Piece {
    constructor (...args) {
        super (...args);
    }

   /**
    *   A king can move anywhere just one spot at a time
    */
    canMove (fromX, fromY, toX, toY) {
        super.canMove(fromX, fromY, toX, toY);
        
        let canMove = false;

        if (
            (Math.abs(fromX - toX) == 1 && toY == fromY) || 
            (Math.abs(fromY - toY) == 1 && toX == fromX) ||
            (Math.abs(fromX - toX) == 1 && Math.abs(fromY - toY) == 1)
        ) {
            canMove = true;
        }
        
        return canMove;
    } 
}

module.exports = King;