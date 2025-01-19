import {z, ZodSchema} from 'zod';
import {ITask} from "./types";

/**
 * Represents a base class for tasks that can be executed with a specific input and produce an output.
 * This abstract class implements the ITask interface and provides a template for task execution.
 */
export abstract class Task<INPUT extends ZodSchema, OUTPUT extends ZodSchema> implements ITask<INPUT, OUTPUT> {
    /**
     * The unique and descriptive name of the task.
     */
    readonly name: string;

    /**
     * A detailed description of what the task does, including any assumptions or prerequisites.
     */
    readonly description: string;

    /**
     * Constructs a new task with a given name, description, and logger.
     *
     * @param name - The unique and descriptive name of the task.
     * @param description - A detailed description of what the task does, including any assumptions or prerequisites.
     */
    protected constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }

    /**
     * Returns the input and output schema for the task.
     *
     * @returns An object containing the input and output schema.
     */
    abstract schema(): { input: INPUT; output: OUTPUT };

    /**
     * Abstract method that must be implemented by subclasses to define the specific task logic.
     *
     * @param input - The input data required for the task, conforming to the input schema.
     * @returns A promise that resolves to the output of the task, conforming to the output schema.
     */
    protected abstract perform(input: z.infer<INPUT>): Promise<z.infer<OUTPUT>>;

    /**
     * Executes the task with the given input and returns a promise that resolves to the output.
     *
     * @param input - The input data required for the task, conforming to the input schema.
     * @returns A promise that resolves to the output of the task, conforming to the output schema.
     */
    execute(input: z.infer<INPUT>): Promise<z.infer<OUTPUT>> {
        return this.perform(input);
    }
}
