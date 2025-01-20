import {z, ZodSchema} from 'zod';

/**
 * Represents a task that can be executed with a specific input and produces an output.
 * Tasks are designed to be reusable and can have dependencies and versioning.
 */
export interface ITask<INPUT extends ZodSchema, OUTPUT extends ZodSchema> {
    /**
     * The unique and descriptive name of the task.
     */
    readonly name: string;

    /**
     * A detailed description of what the task does, including any assumptions or prerequisites.
     */
    readonly description: string;

    /**
     * Returns the input and output schema for the task.
     *
     * @returns An object containing the input and output schema.
     */
    schema(): { input: INPUT; output: OUTPUT };

    /**
     * Executes the task with the given input and returns a promise that resolves to the output.
     *
     * @param input - The input data required for the task, conforming to the input schema.
     * @returns A promise that resolves to the output of the task, conforming to the output schema.
     */
    execute(input: z.infer<INPUT>): Promise<z.infer<OUTPUT>>;
}