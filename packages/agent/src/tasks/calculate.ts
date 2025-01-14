import { Task } from "./task";
import type { MathExpression, Matrix } from "mathjs";
import * as mathjs from "mathjs";

/**
 * TaskCalculate class extends the Task class to perform mathematical expression evaluations.
 * It uses the mathjs library to evaluate expressions and can handle both string expressions and matrices.
 */
export class TaskCalculate extends Task<any> {
    constructor() {
        super('Calculate', 'Calculates the result of a mathematical expression.');
    }

    /**
     * Executes the calculation of a mathematical expression.
     * Evaluates the provided expression and returns the result.
     *
     * @param expression - The mathematical expression to evaluate. This can be a string or a matrix.
     * @param scope - An optional object containing variables and functions to be used during the evaluation of the expression.
     * @returns A promise that resolves to the result of the expression evaluation.
     */
    async run(expression: MathExpression | Matrix, scope?: object): Promise<any> {
        return mathjs.evaluate(expression, scope);
    }
}
