import {Request} from '../request';
import {generateText} from "ai";
import {languageModel} from "@chikichat/model";

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
     * Executes the agent with the provided arguments.
     *
     * @param args - Any arguments required for the agent execution.
     * @returns The output of the agent.
     */
    run(args: { [key: string]: any }): Promise<OUTPUT>;
}

/**
 * A base class for implementing agents.
 * @template OUTPUT - The type of the output produced by the agent.
 */
export class Agent<OUTPUT> implements IAgent<OUTPUT> {
    /**
     * The name of the agent.
     */
    readonly name: string;

    /**
     * A description of what the agent does.
     */
    readonly description: string;

    /**
     * The request object for the agent.
     */
    readonly request: Request<OUTPUT>;

    /**
     * Constructs a new agent with a name and description.
     *
     * @param name - The name of the agent.
     * @param description - A description of what the agent does.
     * @param request - The request object for the agent.
     */
    constructor(name: string, description: string, request: Request<OUTPUT>) {
        this.name = name;
        this.description = description;
        this.request = request;
    }

    /**
     * Executes the agent with the provided arguments.
     * This method should be overridden by subclasses to provide specific agent logic.
     *
     * @returns The output of the agent.
     * @param args
     */
    async run(args: { [key: string]: any }): Promise<OUTPUT> {
        const {text} = await generateText({
            prompt: this.request.prompt.toString(args),
            model: languageModel(this.request.model),
            maxTokens: this.request.maxTokens,
            maxSteps: this.request.maxSteps,
            temperature: this.request.temperature,
            topP: this.request.topP,
            topK: this.request.topK,
            presencePenalty: this.request.presencePenalty,
            frequencyPenalty: this.request.frequencyPenalty,
            tools: this.request.tools,
        });

        return this.request.prompt.parse(text);
    }
}




