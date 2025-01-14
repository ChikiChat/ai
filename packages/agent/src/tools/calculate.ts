import {tool} from 'ai';
import {z} from 'zod';
import {TaskCalculate} from "../tasks";

/**
 * Defines a tool for evaluating mathematical expressions using the TaskCalculate class.
 * This tool leverages the mathjs library to handle a variety of mathematical expressions.
 */
export const toolCalculate = tool({
    description: 'A tool for evaluating mathematical expressions. Example expressions: ' + "'1.2 * (2 + 4.5)', '12.7 cm to inch', 'sin(45 deg) ^ 2'.",
    parameters: z.object({expression: z.string()}).describe('The mathematical expression to evaluate.'),
    execute: async ({expression}) => (new TaskCalculate()).run(expression),
})