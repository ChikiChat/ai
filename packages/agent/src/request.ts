import { Prompt } from './prompt';
import { DEFAULT_LANGUAGE_MODEL_NAME } from "@chikichat/model";

/**
 * Represents a request for generating a completion based on a given prompt.
 * This class encapsulates all the necessary parameters required to configure
 * the behavior of the text generation model.
 */
export class Request {
    /**
     * The input prompt that the model will use to generate a response.
     */
    readonly prompt: Prompt;

    /**
     * The identifier of the model to be used for generating the completion.
     * Defaults to {@link DEFAULT_LANGUAGE_MODEL_NAME}.
     */
    readonly model: string;

    /**
     * The maximum number of tokens to generate in the completion.
     * Defaults to 2048.
     */
    readonly maxTokens: number;

    /**
     * Controls the randomness of predictions by scaling the logits before applying softmax.
     * Lower values make the model more deterministic, while higher values increase randomness.
     * Defaults to 0.8.
     */
    readonly temperature: number;

    /**
     * Implements nucleus sampling, where the model considers the smallest set of tokens
     * whose cumulative probability exceeds this value. This parameter is used for controlling
     * the diversity of the generated text. Defaults to 0.90.
     */
    readonly topP: number;

    /**
     * Limits the model to consider only the top K most likely next tokens.
     * This parameter is used for controlling the diversity of the generated text.
     * Defaults to 40.
     */
    readonly topK: number;

    /**
     * Penalizes new tokens based on whether they appear in the text so far.
     * Increases the model's likelihood to talk about new topics. Defaults to 0.0.
     */
    readonly presencePenalty: number;

    /**
     * Penalizes new tokens based on their existing frequency in the text so far.
     * Decreases the model's likelihood to repeat the same line verbatim. Defaults to 0.0.
     */
    readonly frequencyPenalty: number;

    constructor(
        prompt: Prompt,
        model: string = DEFAULT_LANGUAGE_MODEL_NAME,
        maxTokens: number = 2048,
        temperature: number = 0.8,
        topP: number = 0.90,
        topK: number = 40,
        presencePenalty: number = 0.0,
        frequencyPenalty: number = 0.0
    ) {
        this.model = model;
        this.prompt = prompt;
        this.maxTokens = maxTokens;
        this.temperature = temperature;
        this.topP = topP;
        this.topK = topK;
        this.presencePenalty = presencePenalty;
        this.frequencyPenalty = frequencyPenalty;
    }
}
