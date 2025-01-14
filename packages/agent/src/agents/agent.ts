import {generateText} from "ai";
import {languageModel, LanguageModelInit} from "@chikichat/model";
import {IPrompt} from "../prompts";

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
     * The prompt used by the agent.
     */
    readonly prompt: IPrompt<OUTPUT>;

    /**
     * The initialization configuration for the language model.
     */
    readonly init: LanguageModelInit;

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
     * The prompt used by the agent.
     */
    readonly prompt: IPrompt<OUTPUT>;

    /**
     * The initialization configuration for the language model.
     */
    readonly init: LanguageModelInit;

    /**
     * Constructs a new agent with a name, description, prompt, and initialization configuration.
     *
     * @param name - The name of the agent.
     * @param description - A description of what the agent does.
     * @param prompt - The prompt used by the agent.
     * @param init - The initialization configuration for the language model.
     */
    constructor(name: string, description: string, prompt: IPrompt<OUTPUT>, init: LanguageModelInit) {
        this.name = name;
        this.description = description;
        this.prompt = prompt;
        this.init = init;
    }

    /**
     * Executes the agent with the provided arguments.
     * This method should be overridden by subclasses to provide specific agent logic.
     *
     * @param args - An object containing any arguments required for the agent execution.
     * @returns A promise that resolves to the output of the agent.
     */
    async run(args: { [key: string]: any }): Promise<OUTPUT> {
        const {text} = await generateText({
            prompt: this.prompt.toString(args),
            model: languageModel(this.init.model),
            maxTokens: this.init.maxTokens,
            maxSteps: this.init.maxSteps,
            temperature: this.init.temperature,
            topP: this.init.topP,
            topK: this.init.topK,
            presencePenalty: this.init.presencePenalty,
            frequencyPenalty: this.init.frequencyPenalty,
            tools: this.init.tools,
        });

        return this.prompt.parse(text);
    }
}




