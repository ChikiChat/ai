/**
 * Represents the output of a task.
 * The output can be of any type, allowing flexibility in the data returned by the task.
 */
interface IOutput {
    /**
     * The output data produced by the task.
     * This can be of any type, providing flexibility in the data returned.
     */
    output: any;
}

/**
 * Represents a task that can be executed with a specific input and produces an output.
 * Tasks are designed to be reusable and can have dependencies and versioning.
 */
export interface ITask<INPUT, OUTPUT extends IOutput> {
    /**
     * The name of the task, which should be unique and descriptive.
     */
    readonly name: string;

    /**
     * A detailed description of what the task does, including any assumptions or prerequisites.
     */
    readonly description: string;

    /**
     * Executes the task with the given input and returns a promise that resolves to the output.
     *
     * @param input - The input data required for the task.
     * @returns A promise that resolves to the output of the task.
     */
    execute(input: INPUT): Promise<OUTPUT>;
}

/**
 * Represents a base class for tasks that can be executed with a specific input and produce an output.
 * This abstract class implements the ITask interface and provides a template for task execution.
 */
export abstract class Task<INPUT, OUTPUT extends IOutput> implements ITask<INPUT, OUTPUT> {
    /**
     * The name of the task, which should be unique and descriptive.
     */
    readonly name: string;

    /**
     * A detailed description of what the task does, including any assumptions or prerequisites.
     */
    readonly description: string;

    /**
     * Constructs a new task with a given name and description.
     *
     * @param name - The name of the task, which should be unique and descriptive.
     * @param description - A detailed description of what the task does, including any assumptions or prerequisites.
     */
    protected constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }

    /**
     * Executes the task with the given input and returns a promise that resolves to the output.
     *
     * @param input - The input data required for the task.
     * @returns A promise that resolves to the output of the task.
     */
    execute(input: INPUT): Promise<OUTPUT> {
        return this.perform(input);
    }

    /**
     * Abstract method that must be implemented by subclasses to define the specific task logic.
     *
     * @param input - The input data required for the task.
     * @returns A promise that resolves to the output of the task.
     */
    protected abstract perform(input: INPUT): Promise<OUTPUT>;
}