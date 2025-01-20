import {generateText} from "ai";
import {EventEmitter} from 'events';
import {Config, IAgent, Output} from "./types";
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

/**
 * An agent is a component that performs a specific task and returns an output.
 *
 * @template OUTPUT - The type of the output produced by the agent.
 */
export class Agent<OUTPUT extends string> extends EventEmitter implements IAgent<OUTPUT> {
    readonly config: Config<OUTPUT>;

    constructor(config: Config<OUTPUT>) {
        super();
        this.config = config;
    }

    /**
     * Executes the current step of the agent's workflow.
     *
     * @param args - An object containing the arguments needed for the task.
     * @returns A promise that resolves to the output of the task.
     */
    async execute(args: { [key: string]: any } = {}): Promise<Output<OUTPUT>> {
        const template = new Prompt<OUTPUT>(this.config.init.prompt, this.config.init.parser);
        const prompt = template.toString(args);

        const {text, finishReason, usage} = await generateText({
            prompt: prompt,
            model: languageModel(this.config.init.model),
            maxTokens: this.config.init.maxTokens || DEFAULT_MAX_TOKENS,
            maxSteps: 2,
            temperature: this.config.init.temperature || DEFAULT_TEMPERATURE,
            topP: this.config.init.topP || DEFAULT_TOP_P,
            topK: this.config.init.topK || DEFAULT_TOP_K,
            presencePenalty: this.config.init.presencePenalty || DEFAULT_PRESENCE_PENALTY,
            frequencyPenalty: this.config.init.frequencyPenalty || DEFAULT_FREQUENCY_PENALTY,
            tools: this.config.init.tools || {},
        });

        return {
            input: prompt,
            output: {
                raw: text,
                output: template.parse(text)
            },
            finishReason: finishReason,
            usage: usageModel(this.config.init.model, usage)
        };
    }
}
