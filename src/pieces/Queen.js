/**
 *  @module Queen
 */

const Piece = require("../Piece");

/**
*  This is the Queen class, it inherits from the Piece class.
*/
class Queen extends Piece {
    constructor (...args) {
        super (...args);
    }

   /** 
    *   A Queen can move horizontally, vertically or diagonally any number of spots it wants
    */
    canMove (fromX, fromY, toX, toY) {
        super.canMove(fromX, fromY, toX, toY);
        
        let canMove = false;

        if ( toX == fromX || toY == fromY || (Math.abs(fromX - toX) == Math.abs(fromY - toY)) ) {
            canMove = true;
        }

        return canMove;
    } 
}

module.exports = Queen;