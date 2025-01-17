import {
    DEFAULT_FREQUENCY_PENALTY,
    DEFAULT_MAX_STEPS,
    DEFAULT_MAX_TOKENS,
    DEFAULT_PRESENCE_PENALTY,
    DEFAULT_TEMPERATURE,
    DEFAULT_TOP_K,
    DEFAULT_TOP_P,
    languageModel,
    LanguageModelInit
} from '@chikichat/model';
import {IPrompt} from '../prompts';
import {CoreMessage, generateText} from "ai";
import {EventEmitter} from 'events';

/**
 * Interface for an agent that performs a specific task.
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
     * Initialization configuration for the language model.
     */
    readonly init: LanguageModelInit;

    /**
     * The prompt configuration for the agent.
     */
    readonly prompt: IPrompt<OUTPUT>;

    /**
     * Executes the agent's task with the provided arguments.
     * @param args - An object containing key-value pairs of arguments required for the task.
     * @returns The output of the agent's task.
     */
    execute(args: { [key: string]: any }): Promise<OUTPUT>;
}

/**
 * An agent is a component that performs a specific task and returns an output.
 *
 * @template OUTPUT - The type of the output produced by the agent.
 */
export class Agent<OUTPUT = string> extends EventEmitter implements IAgent<OUTPUT> {
    /**
     * The name of the agent.
     */
    readonly name: string;

    /**
     * A description of what the agent does.
     */
    readonly description: string;

    /**
     * Initialization configuration for the language model.
     */
    readonly init: LanguageModelInit;

    /**
     * The prompt configuration for the agent.
     */
    readonly prompt: IPrompt<OUTPUT>;

    /**
     * Stores the conversation messages.
     */
    private messages: CoreMessage[];

    /**
     * Constructs a new agent with a name, description, prompt, and initialization configuration.
     *
     * @param name - The name of the agent.
     * @param description - A description of what the agent does.
     * @param init - The initialization configuration for the language model.
     * @param prompt - The prompt used by the agent.
     */
    constructor(name: string, description: string, init: LanguageModelInit, prompt: IPrompt<OUTPUT>) {
        super();
        this.name = name;
        this.description = description;
        this.init = {
            model: init.model,
            maxTokens: init.maxTokens ?? DEFAULT_MAX_TOKENS,
            maxSteps: init.maxSteps ?? DEFAULT_MAX_STEPS,
            temperature: init.temperature ?? DEFAULT_TEMPERATURE,
            topP: init.topP ?? DEFAULT_TOP_P,
            topK: init.topK ?? DEFAULT_TOP_K,
            presencePenalty: init.presencePenalty ?? DEFAULT_PRESENCE_PENALTY,
            frequencyPenalty: init.frequencyPenalty ?? DEFAULT_FREQUENCY_PENALTY,
            tools: init.tools ?? {},
        };
        this.prompt = prompt;
        this.messages = [];
    }

    /**
     * Executes the agent with the provided arguments.
     * This method should be overridden by subclasses to provide specific agent logic.
     *
     * @param args - An object containing any arguments required for the agent execution.
     * @returns A promise that resolves to the output of the agent.
     */
    async execute(args: { [key: string]: any } = {}): Promise<OUTPUT> {
        if (this.messages.length === 0) {
            const content = this.prompt.toString(args);
            this.messages.push({role: 'user', content});

            this.emit('init', {
                prompt: content,
                ...this.init,
            });
        }

        const {text} = await generateText({
            model: languageModel(this.init.model),
            messages: this.messages,
            maxTokens: this.init.maxTokens,
            maxSteps: 2,
            temperature: this.init.temperature,
            topP: this.init.topP,
            topK: this.init.topK,
            presencePenalty: this.init.presencePenalty,
            frequencyPenalty: this.init.frequencyPenalty,
            tools: this.init.tools,
            onStepFinish: ({text, toolCalls, toolResults, finishReason, usage}) => {
                if (toolResults.length === 0) {
                    this.messages.push({role: 'assistant', content: text});
                }

                this.emit('step_finish', text, toolCalls, toolResults, finishReason, usage);
            }
        });

        return this.prompt.parse(text);
    }

    /**
     * Reacts to a new prompt and continues the conversation.
     *
     * @param prompt - The new prompt to react to.
     * @returns A promise that resolves to the output of the agent.
     */
    async react(prompt: string): Promise<OUTPUT> {
        this.messages.push({role: 'user', content: prompt});
        this.emit('react', prompt);

        return this.execute({});
    }
}
