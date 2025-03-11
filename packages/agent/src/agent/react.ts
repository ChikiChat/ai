import {CoreMessage, generateText, LanguageModel} from "ai";
import {EventEmitter} from 'events';
import {ConfigStep, IAgent, Input, Output} from "./types";
import {Prompt} from "../prompt";
import {
    DEFAULT_FREQUENCY_PENALTY,
    DEFAULT_MAX_TOKENS,
    DEFAULT_PRESENCE_PENALTY,
    DEFAULT_TEMPERATURE,
    DEFAULT_TOP_K,
    DEFAULT_TOP_P,
    languageModel,
    usageModel
} from "@chikichat/model";
import {Memory} from "../memory";

/**
 * AgentReAct (Reason + Act) is a class that implements an agent capable of reasoning and acting based on a series of steps.
 * It extends the `EventEmitter` class to allow for event-driven communication and implements the `IAgent` interface.
 * The agent maintains a history of messages and steps, and it can execute tasks by generating text using a language model.
 * The agent can also react to new inputs by adding steps and performing tasks accordingly.
 */
export class AgentReAct<OUTPUT = string> extends EventEmitter implements IAgent<OUTPUT> {
    readonly config: ConfigStep<OUTPUT>;

    /**
     * Memory to store key-value pairs for the agent's context.
     */
    memory: Memory<string, any> = new Memory();

    /**
     * Array to store the messages exchanged during the agent's operation.
     */
    private messages: CoreMessage[] = [];

    /**
     * Map to store the steps performed by the agent, including input and output.
     */
    steps: Map<number, { input: Input<OUTPUT>; output: Output<OUTPUT> }> = new Map();

    /**
     * Counter to track the number of steps performed by the agent.
     * This counter is incremented each time the `addStep` method is called.
     */
    private step: number = 0;

    constructor(config: ConfigStep<OUTPUT>) {
        super();

        this.config = config;
        this.addStep(config.init);
    }

    /**
     * Adds a step to the agent's workflow with the given input configuration.
     *
     * @param input - The configuration for the step, including language model initialization and an optional parser.
     * @throws Will throw an error if the maximum number of steps is reached.
     */
    private addStep(input: Input<OUTPUT>): void {
        this.step++;
        this.steps.set(this.step, {
            input: input,
            output: {} as Output<OUTPUT>
        });
    }

    /**
     * Executes the current step of the agent's workflow.
     *
     * @param args - An object containing the arguments needed for the task.
     * @returns A promise that resolves to the output of the task.
     */
    async execute(args: { [key: string]: any } = {}): Promise<Output<OUTPUT>> {
        if (this.step > this.config.maxSteps) {
            return this.steps.get(this.step - 1)!.output;
        }

        const {input} = this.steps.get(this.step)!;
        const template = new Prompt<OUTPUT>(input.prompt, input.parser);
        const prompt = template.toString(args);

        this.messages.push({role: 'user', content: prompt});
        const {text, finishReason, usage} = await generateText({
            messages: this.messages,
            model: languageModel(input.model) as LanguageModel,
            maxTokens: input.maxTokens || DEFAULT_MAX_TOKENS,
            maxSteps: 2,
            temperature: input.temperature || DEFAULT_TEMPERATURE,
            topP: input.topP || DEFAULT_TOP_P,
            topK: input.topK || DEFAULT_TOP_K,
            presencePenalty: input.presencePenalty || DEFAULT_PRESENCE_PENALTY,
            frequencyPenalty: input.frequencyPenalty || DEFAULT_FREQUENCY_PENALTY,
            tools: input.tools || {},
        });

        if (finishReason === "tool-calls") {
            /**
             * TODO: Handle tool calls and results by adding them to the messages array. ???
             */
        } else {
            this.messages.push({role: 'assistant', content: text});
        }

        const output: Output<OUTPUT> = {
            input: prompt,
            output: {
                raw: text,
                output: template.parse(text)
            },
            finishReason: finishReason,
            usage: usageModel(input.model, usage)
        };

        this.steps.set(this.step, {input: input, output: output});

        if (this.config.onStepFinish) {
            return this.config.onStepFinish(this.step, input, output);
        }

        return output;
    }

    /**
     * Adds a new step to the agent's workflow and executes it.
     *
     * @param input - The configuration for the new step.
     * @param args - An object containing the arguments needed for the task.
     * @returns A promise that resolves to the output of the task.
     */
    async act(input: Input<OUTPUT>, args: { [key: string]: any } = {}): Promise<Output<OUTPUT>> {
        this.addStep(input);

        return this.execute(args);
    }
}
