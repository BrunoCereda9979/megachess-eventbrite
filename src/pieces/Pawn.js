/**
 * @module Pawn
 */

const Piece = require("../Piece");

/**
 *  This is the Pawn class, it inherits from the Piece class.
 */

class Pawn extends Piece {
    constructor (...args) {
        super (...args);
    }

   /**
    *   A Pawn can only move forward one spot, if it's the first move it can move two spots.
    */
    canMove (fromX, fromY, toX, toY, color) {
        super.canMove(fromX, fromY, toX, toY);
        
        let canMove = false;

        if (color == 'white') {
            // First move can be two positions
            if ( ( fromX == 12 || fromX == 13 ) && ( toX == fromX - 2 ) && (toY == fromY)) {
                canMove = true;
            }
            else if (toX == ( fromX - 1 ) && toY == fromY) {
                canMove = true;
            }
        }
        else if (color == 'black') {
            // First move can be two positions
            if ( ( fromX == 2 || fromX == 3 ) && ( toX == fromX + 2 ) && ( toY == fromY ) ) {
                canMove = true;
            }
            else if (toX == ( fromX + 1 ) && toY == fromY) {
                canMove = true;
            }
        }

        return canMove;
    }  
}

module.exports = Pawn;