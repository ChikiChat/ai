import {CoreTool} from "ai";
import {DEFAULT_LANGUAGE_MODEL_NAME} from '@chikichat/model';
import {IPrompt} from './prompts';

/**
 * The default maximum number of tokens to generate in the completion.
 * This value ensures that the generated text does not exceed a reasonable length.
 */
export const DEFAULT_MAX_TOKENS = 4096;

/**
 * The default maximum number of steps to generate in the completion.
 * This value controls the number of iterations or segments in the text generation process.
 */
export const DEFAULT_MAX_STEPS = 2;

/**
 * The default temperature value for controlling the randomness of predictions.
 * Lower values make the model more deterministic, while higher values increase randomness.
 */
export const DEFAULT_TEMPERATURE = 0.8;

/**
 * The default value for nucleus sampling (top-p sampling).
 * The model considers the smallest set of tokens whose cumulative probability exceeds this value.
 */
export const DEFAULT_TOP_P = 0.90;

/**
 * The default value for limiting the model to the top K most likely next tokens.
 * This helps control the diversity of the generated text.
 */
export const DEFAULT_TOP_K = 40;

/**
 * The default presence penalty value.
 * Penalizes new tokens based on whether they appear in the text so far.
 * Increases the model's likelihood to talk about new topics.
 */
export const DEFAULT_PRESENCE_PENALTY = 0.0;

/**
 * The default frequency penalty value.
 * Penalizes new tokens based on their existing frequency in the text so far.
 * Decreases the model's likelihood to repeat the same line verbatim.
 */
export const DEFAULT_FREQUENCY_PENALTY = 0.0;

/**
 * Represents a request for generating a completion based on a given prompt.
 * This type encapsulates all the necessary parameters required to configure
 * the behavior of the text generation model.
 */
export type Request<OUTPUT = string> = {
    /**
     * The input prompt used by the model to generate a response.
     */
    readonly prompt: IPrompt<OUTPUT>;

    /**
     * The model identifier for text generation.
     * Defaults to {@link DEFAULT_LANGUAGE_MODEL_NAME}.
     */
    readonly model: string;

    /**
     * The maximum number of tokens to generate.
     * Defaults to {@link DEFAULT_MAX_TOKENS}.
     */
    readonly maxTokens?: number;

    /**
     * The maximum number of steps to generate.
     * Defaults to {@link DEFAULT_MAX_STEPS}.
     */
    readonly maxSteps?: number;

    /**
     * Controls the randomness of the generated text.
     * Lower values make the output more deterministic.
     * Defaults to {@link DEFAULT_TEMPERATURE}.
     */
    readonly temperature?: number;

    /**
     * Implements nucleus sampling to control text diversity.
     * The model considers tokens whose cumulative probability exceeds this value.
     * Defaults to {@link DEFAULT_TOP_P}.
     */
    readonly topP?: number;

    /**
     * Limits the model to the top K most likely next tokens.
     * Helps control text diversity.
     * Defaults to {@link DEFAULT_TOP_K}.
     */
    readonly topK?: number;

    /**
     * Penalizes tokens that have already appeared in the text.
     * Encourages the model to introduce new topics.
     * Defaults to {@link DEFAULT_PRESENCE_PENALTY}.
     */
    readonly presencePenalty?: number;

    /**
     * Penalizes tokens based on their frequency in the text.
     * Reduces the likelihood of repeating the same line.
     * Defaults to {@link DEFAULT_FREQUENCY_PENALTY}.
     */
    readonly frequencyPenalty?: number;

    /**
     * The tools available for the model to use.
     * The model must support tool invocation.
     * Defaults to an empty object.
     */
    readonly tools?: Record<string, CoreTool>;
}

/**
 * Creates a request object with default values for any missing properties.
 *
 * @param request - The request object to be processed.
 * @returns A new request object with default values applied where necessary.
 */
export const createRequest = (request: Request): Request => ({
    prompt: request.prompt,
    model: request.model || DEFAULT_LANGUAGE_MODEL_NAME,
    maxTokens: request.maxTokens ?? DEFAULT_MAX_TOKENS,
    maxSteps: request.maxSteps ?? DEFAULT_MAX_STEPS,
    temperature: request.temperature ?? DEFAULT_TEMPERATURE,
    topP: request.topP ?? DEFAULT_TOP_P,
    topK: request.topK ?? DEFAULT_TOP_K,
    presencePenalty: request.presencePenalty ?? DEFAULT_PRESENCE_PENALTY,
    frequencyPenalty: request.frequencyPenalty ?? DEFAULT_FREQUENCY_PENALTY,
    tools: request.tools ?? {}
});
