import {
    DEFAULT_FREQUENCY_PENALTY,
    DEFAULT_MAX_STEPS,
    DEFAULT_MAX_TOKENS,
    DEFAULT_PRESENCE_PENALTY,
    DEFAULT_TEMPERATURE,
    DEFAULT_TOP_K,
    DEFAULT_TOP_P,
    languageModel,
    LanguageModelInit,
    usageModel,
    UsageModel
} from '@chikichat/model';
import {CoreMessage, FinishReason, generateText} from "ai";
import {EventEmitter} from 'events';
import {IParser, Prompt} from "../prompts";

type Step = {
    input: string;
    output: string;
    finishReason: FinishReason;
    usage: UsageModel;
}

/**
 * Interface for an agent that performs a specific task.
 */
export interface IAgent<OUTPUT> {
    /**
     * The name of the agent.
     * This should be a unique identifier for the agent.
     */
    readonly name: string;

    /**
     * A description of what the agent does.
     * This should provide a clear and concise explanation of the agent's purpose and functionality.
     */
    readonly description: string;

    /**
     * The parser used by the agent to process and interpret the output.
     * This parser is responsible for converting the raw output into a structured format of type OUTPUT.
     */
    readonly parser?: IParser<OUTPUT>;

    /**
     * Performs the task with the given arguments and optional initialization configuration.
     *
     * @param args - An object containing the arguments needed for the task.
     *               The structure of this object should be consistent with the requirements of the specific task.
     * @param init - Optional initialization configuration for the language model.
     *               This parameter allows for customization of the language model's behavior during the task execution.
     * @returns A promise that resolves to the output of the task.
     *          The output is of type OUTPUT, which is defined by the parser.
     * @throws Will throw an error if the task cannot be performed due to invalid arguments or other issues.
     */
    perform(args: { [key: string]: any }, init?: LanguageModelInit): Promise<OUTPUT>;
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
     * The parser used by the agent to process and interpret the output.
     * This parser is responsible for converting the raw output into a structured format of type OUTPUT.
     */
    readonly parser?: IParser<OUTPUT>;

    /**
     * Initialization configuration for the language model.
     * This configuration allows for customization of the language model's behavior during task execution.
     */
    init: LanguageModelInit;

    /**
     * Array to store the conversation messages.
     * This array holds all the messages exchanged between the user and the agent.
     */
    readonly messages: CoreMessage[] = [];

    /**
     * Read-only array to store the steps of the agent's process.
     * Each step includes the input, output, finish reason, and usage statistics.
     */
    readonly steps: Record<number, Step[]> = {};

    /**
     * Counter to track the number of steps performed by the agent.
     * This counter is incremented each time the `perform` method is called.
     */
    step: number = 0;

    constructor(name: string, description: string, init: LanguageModelInit, parser?: IParser<OUTPUT>) {
        super();
        this.name = name;
        this.description = description;
        this.init = init;
        this.parser = parser;
    }

    /**
     * Performs the task with the given arguments.
     *
     * @param args - An object containing the arguments needed for the task.
     *               The structure of this object should be consistent with the requirements of the specific task.
     * @returns A promise that resolves to the output of the task.
     *          The output is of type OUTPUT, which is defined by the parser.
     * @throws Will throw an error if the task cannot be performed due to invalid arguments or other issues.
     */
    async perform(args: { [key: string]: any }): Promise<OUTPUT> {
        this.step++;
        if (this.init && this.step >= (this.init.maxSteps || DEFAULT_MAX_STEPS)) {
            throw new Error(`Maximum steps (${this.init.maxSteps || DEFAULT_MAX_STEPS}) reached.`);
        }

        const prompt = new Prompt<OUTPUT>(this.init.prompt || '', this.parser);
        const input = prompt.toString(args);

        this.messages.push({role: 'user', content: input});
        const {text, finishReason, usage} = await generateText({
            messages: this.messages,
            model: languageModel(this.init.model),
            maxTokens: this.init.maxTokens || DEFAULT_MAX_TOKENS,
            maxSteps: 2,
            temperature: this.init.temperature || DEFAULT_TEMPERATURE,
            topP: this.init.topP || DEFAULT_TOP_P,
            topK: this.init.topK || DEFAULT_TOP_K,
            presencePenalty: this.init.presencePenalty || DEFAULT_PRESENCE_PENALTY,
            frequencyPenalty: this.init.frequencyPenalty || DEFAULT_FREQUENCY_PENALTY,
            tools: this.init.tools,
            // onStepFinish: ({ text, toolCalls, toolResults, finishReason, usage }) => {
            //     if (toolResults.length === 0) {
            //         this.messages.push({ role: 'assistant', content: text });
            //     }
            //
            //     this.emit('step_finish', text, toolCalls, toolResults, finishReason, usage);
            // }
        });

        this.messages.push({role: 'assistant', content: text});

        if (!this.steps[this.step]) {
            this.steps[this.step] = [];
            (this.steps[this.step] as Step[]).push({
                input: input,
                output: text,
                finishReason: finishReason,
                usage: usageModel(this.init.model, usage)
            });
        }

        return prompt.parse(text);
    }

    /**
     * Reacts to a new prompt and continues the conversation.
     *
     * @param prompt - The new prompt to react to.
     * @param args - An object containing the arguments needed for the task.
     *               The structure of this object should be consistent with the requirements of the specific task.
     * @returns A promise that resolves to the output of the agent.
     *          The output is of type OUTPUT, which is defined by the parser.
     * @throws Will throw an error if the task cannot be performed due to invalid arguments or other issues.
     */
    async react(prompt: string, args: { [key: string]: any }): Promise<OUTPUT> {
        this.init.prompt = prompt;

        return this.perform(args);
    }
}

