/**
 * A module for two number addition
 * @module module
 */

/** Creates a new Operation
 * @class
 */

export class Operation {
    /**
     * constructor 
     * @param {number} x First operand
     * @param {number} y Second operand
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    /**
      * @desc Adds two numbers
      * @param {number} x First operand
      * @param {number} y Second operand
      * @returns {number} Sum of x and y
      */
    sum() {
        return this.x + this.y;
    }
}