import {IPrompt} from './prompt';
import {DEFAULT_LANGUAGE_MODEL_NAME} from '@chikichat/model';
import {CoreTool} from "ai";

/**
 * Represents a request for generating a completion based on a given prompt.
 * This class encapsulates all the necessary parameters required to configure
 * the behavior of the text generation model.
 */
export type Request<T = string> = {
    /**
     * The input prompt that the model will use to generate a response.
     */
    readonly prompt: IPrompt<T>;

    /**
     * The identifier of the model to be used for generating the completion.
     * Defaults to {@link DEFAULT_LANGUAGE_MODEL_NAME}.
     */
    readonly model: string;

    /**
     * The maximum number of tokens to generate in the completion.
     * Defaults to 4096.
     */
    readonly maxTokens?: number;

    /**
     * The maximum number of steps to generate in the completion.
     * Defaults to 2.
     */
    readonly maxSteps?: number;
    /**
     * Controls the randomness of predictions by scaling the logits before applying softmax.
     * Lower values make the model more deterministic, while higher values increase randomness.
     * Defaults to 0.8.
     */
    readonly temperature?: number;

    /**
     * Implements nucleus sampling, where the model considers the smallest set of tokens
     * whose cumulative probability exceeds this value. This parameter is used for controlling
     * the diversity of the generated text. Defaults to 0.90.
     */
    readonly topP?: number;

    /**
     * Limits the model to consider only the top K most likely next tokens.
     * This parameter is used for controlling the diversity of the generated text.
     * Defaults to 40.
     */
    readonly topK?: number;

    /**
     * Penalizes new tokens based on whether they appear in the text so far.
     * Increases the model's likelihood to talk about new topics. Defaults to 0.0.
     */
    readonly presencePenalty?: number;

    /**
     * Penalizes new tokens based on their existing frequency in the text so far.
     * Decreases the model's likelihood to repeat the same line verbatim. Defaults to 0.0.
     */
    readonly frequencyPenalty?: number;

    /**
     The tools that the model can call. The model needs to support calling tools.
     */
    readonly tools?: Record<string, CoreTool>;
}

/**
 * Creates a request object with default values for any missing properties.
 *
 * @param request - The request object to be processed.
 *
 * @returns A new request object with default values applied where necessary.
 */
export const createRequest = (request: Request): Request => {
    return {
        prompt: request.prompt,
        model: request.model || DEFAULT_LANGUAGE_MODEL_NAME,
        maxTokens: request.maxTokens || 4096,
        maxSteps: request.maxSteps || 2,
        temperature: request.temperature || 0.8,
        topP: request.topP || 0.90,
        topK: request.topK || 40,
        presencePenalty: request.presencePenalty || 0.0,
        frequencyPenalty: request.frequencyPenalty || 0.0,
        tools: request.tools || {}
    };
}
