import { Operation } from './module.js';

const [, , ...operands] = process.argv;
let numbers = operands.map((operand) => parseInt(operand));

let operation = new Operation(...numbers);
console.log(operation.sum());

