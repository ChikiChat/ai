import {CoreMessage, generateText} from "ai";
import {EventEmitter} from 'events';
import {IAgent, Input, Output} from "./types";
import {ILogger, Logger} from "../logger";
import {Prompt} from "../prompts";
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
     * The logger for the agent.
     */
    readonly logger: ILogger;

    /**
     * Array to store the messages exchanged during the agent's operation.
     */
    messages: CoreMessage[] = [];

    /**
     * Map to store the steps performed by the agent, including input and output.
     */
    steps: Map<number, { input: Input<OUTPUT>; output: Output<OUTPUT> }> = new Map<number, {
        input: Input<OUTPUT>;
        output: Output<OUTPUT>
    }>();

    /**
     * The maximum number of steps the agent can perform.
     */
    readonly maxSteps: number;

    /**
     * Counter to track the number of steps performed by the agent.
     * This counter is incremented each time the `perform` method is called.
     */
    step: number = 0;

    constructor(name: string, description: string, input: Input<OUTPUT>, maxSteps?: number, logger?: ILogger) {
        super();
        this.name = name;
        this.description = description;
        this.addStep(input);

        this.maxSteps = maxSteps || 5;
        this.logger = logger || new Logger(name);


    }

    /**
     * Adds a step to the agent's workflow with the given input configuration.
     *
     * @param input - The configuration for the step, including language model initialization and an optional parser.
     * @throws Will throw an error if the maximum number of steps is reached.
     */
    addStep(input: Input<OUTPUT>): void {
        this.step++;
        if (this.step > this.maxSteps) {
            throw new Error(`Maximum steps (${this.maxSteps}) reached.`);
        }

        this.steps.set(this.step, {
            input: input,
            output: {} as Output<OUTPUT>
        });
    }

    /**
     * Performs the task with the given arguments.
     *
     * @param args - An object containing the arguments needed for the task.
     *               The structure of this object should be consistent with the requirements of the specific task.
     * @returns A promise that resolves to the output of the task.
     *          The output is of type Output<OUTPUT>, which includes the raw output, parsed output, finish reason, and usage details.
     * @throws Will throw an error if the task cannot be performed due to invalid arguments or other issues.
     */
    async perform(args: { [key: string]: any }): Promise<Output<OUTPUT>> {
        const {input, output} = this.steps.get(this.step)!;
        const template = new Prompt<OUTPUT>(input.prompt, input.parser);
        const prompt = template.toString(args);

        this.messages.push({role: 'user', content: prompt});
        const {text, finishReason, usage} = await generateText({
            messages: this.messages,
            model: languageModel(input.model),
            maxTokens: input.maxTokens || DEFAULT_MAX_TOKENS,
            maxSteps: 2,
            temperature: input.temperature || DEFAULT_TEMPERATURE,
            topP: input.topP || DEFAULT_TOP_P,
            topK: input.topK || DEFAULT_TOP_K,
            presencePenalty: input.presencePenalty || DEFAULT_PRESENCE_PENALTY,
            frequencyPenalty: input.frequencyPenalty || DEFAULT_FREQUENCY_PENALTY,
            tools: input.tools || {},
        });
        this.messages.push({role: 'assistant', content: text});

        output.input = prompt;
        output.output = {
            raw: text,
            output: template.parse(text)
        };
        output.finishReason = finishReason;
        output.usage = usageModel(input.model, usage);

        this.steps.set(this.step, {input: input, output: output});

        return output;
    }
}
