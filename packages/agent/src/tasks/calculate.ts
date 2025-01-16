import * as mathjs from "mathjs";
import {z} from "zod";
import {Task} from "./task";

// Define the input schema for the TaskCalculate task
const InputSchema = z.object({
    expression: z.string().trim(),
    scope: z.optional(z.record(z.any()))
});

// Define the output schema for the TaskCalculate task
const OutputSchema = z.object({
    output: z.union([z.number(), z.string()]),
});

type Input = z.infer<typeof InputSchema>;
type Output = z.infer<typeof OutputSchema>;

/**
 * TaskCalculate class extends the Task class to perform mathematical expression evaluations.
 * It uses the mathjs library to evaluate expressions and can handle both string expressions and matrices.
 */
export class TaskCalculate extends Task<typeof InputSchema, typeof OutputSchema> {
    constructor(logger: Logger) {
        super('Calculate', 'Calculates the result of a mathematical expression.', logger);
    }

    /**
     * Returns the input and output schemas for the TaskCalculate task.
     *
     * @returns An object containing the input and output schemas.
     */
    schema(): { input: typeof InputSchema, output: typeof OutputSchema } {
        return {input: InputSchema, output: OutputSchema};
    }

    /**
     * Perform the calculation of a mathematical expression.
     *
     * @param input - The input object containing the expression and optional scope.
     * @returns An object containing the result of the expression evaluation.
     * @throws Will throw an error if the evaluation process fails.
     */
    protected async perform(input: Input): Promise<Output> {
        const {expression, scope} = this.schema().input.parse(input);
        const output = mathjs.evaluate(expression, scope || {});

        this.logger.debug('task(calculate)', {expression, output});

        return {
            output: output,
        };
    }
}
