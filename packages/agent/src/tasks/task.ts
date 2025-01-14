/**
 * Interface representing a task that can be executed.
 *
 * @template OUTPUT - The type of the output produced by the task.
 */
export interface ITask<OUTPUT> {
    /**
     * The name of the task.
     */
    readonly name: string;

    /**
     * A description of what the task does.
     */
    readonly description: string;

    /**
     * Executes the task with the provided arguments.
     *
     * @param args - Any arguments required for the task execution.
     * @returns The output of the task.
     */
    run(...args: any): Promise<OUTPUT>;
}

/**
 * A base class for implementing tasks.
 * @template OUTPUT - The type of the output produced by the task.
 */
export class Task<OUTPUT> implements ITask<OUTPUT> {
    /**
     * The name of the task.
     */
    readonly name: string;

    /**
     * A description of what the task does.
     */
    readonly description: string;

    /**
     * Constructs a new task with a name and description.
     *
     * @param name - The name of the task.
     * @param description - A description of what the task does.
     */
    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }

    /**
     * Executes the task with the provided arguments.
     * This method should be overridden by subclasses to provide specific task logic.
     *
     * @param _args - Any arguments required for the task execution.
     * @returns The output of the task.
     */
    async run(..._args: any): Promise<OUTPUT> {
        throw new Error('Method not implemented.');
    }
}
