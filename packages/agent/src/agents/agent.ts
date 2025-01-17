import {LanguageModelInit} from '@chikichat/model';
import {IPrompt} from '../prompts';
import {TaskLlmGenerate} from '../tasks';

/**
 * Interface for an agent that performs a specific task and returns an output.
 */
export interface IAgent<OUTPUT> {
    /**
     * The name of the agent.
     */
    readonly name: string;

    /**
     * A description of what the agent does.
     */
    readonly description: string;

    /**
     * The task used to generate text.
     */
    readonly generate: TaskLlmGenerate;

    /**
     * Executes the agent with the provided arguments.
     *
     * @param args - An object containing any arguments required for the agent execution.
     * @returns A promise that resolves to the output of the agent.
     */
    run(...args: any): Promise<OUTPUT>;
}

/**
 * An agent is a component that performs a specific task and returns an output.
 *
 * @template OUTPUT - The type of the output produced by the agent.
 */
export class Agent<OUTPUT = string> implements IAgent<OUTPUT> {
    /**
     * The name of the agent.
     */
    readonly name: string;

    /**
     * A description of what the agent does.
     */
    readonly description: string;

    /**
     * The task used to generate text.
     */
    readonly generate: TaskLlmGenerate;

    /**
     * Constructs a new agent with a name, description, prompt, and initialization configuration.
     *
     * @param name - The name of the agent.
     * @param description - A description of what the agent does.
     * @param init - The initialization configuration for the language model.
     * @param prompt - The prompt used by the agent.
     */
    constructor(name: string, description: string, init: LanguageModelInit, prompt: IPrompt<OUTPUT>) {
        this.name = name;
        this.description = description;
        this.generate = new TaskLlmGenerate<OUTPUT>(init, prompt);
    }

    /**
     * Executes the agent with the provided arguments.
     * This method should be overridden by subclasses to provide specific agent logic.
     *
     * @param args - An object containing any arguments required for the agent execution.
     * @returns A promise that resolves to the output of the agent.
     */
    async run(args: { [key: string]: any }): Promise<OUTPUT> {
        const {text} = await this.generate.run(args);

        return this.generate.prompt.parse(text);
    }
}
