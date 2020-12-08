const Piece = require("../Piece");

/**
 *  This is the Bishop class, it inherits from the Piece class.
 */

class Bishop extends Piece {
    constructor (...args) {
        super (...args);
    }

   /**
    *   A Bishop can only move in diagonal any number of spots it wants.
    */
    canMove (fromX, fromY, toX, toY) {
        super.canMove(fromX, fromY, toX, toY);
        
        let canMove = false;
        let numberOfVerticalSpots = Math.abs(fromX - toX);
        let numberOfHorizontalSpots = Math.abs(fromY - toY);
        
        // Horizontal and vertical spots should be equal
        if ( numberOfHorizontalSpots == numberOfVerticalSpots ) {
            canMove = true;
        }

        return canMove;
    } 
}

module.exports = Bishop;