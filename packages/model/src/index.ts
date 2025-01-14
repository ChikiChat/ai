import {EmbeddingModelInit, LanguageModelInit, Model, Provider, UsageModel} from "./types";
import {
    AI21,
    Anthropic,
    Cohere,
    DeepSeek,
    GoogleGenerativeAI,
    Groq,
    Mistral,
    Nvidia,
    OpenAI,
    OpenRouter,
    SambaNova,
    xAI
} from "./providers";
import {EmbeddingModel, EmbeddingModelUsage, LanguageModel, LanguageModelUsage} from "ai";

export * from "./types";
export * from "./providers";

/**
 * Default language model name.
 */
export const DEFAULT_LANGUAGE_MODEL_NAME: string = process.env['LANGUAGE_MODEL_NAME'] ?? 'anthropic/claude-3-5-sonnet-20241022';

/**
 * Default embedding model name.
 */
export const DEFAULT_EMBEDDING_MODEL_NAME: string = process.env['EMBEDDING_MODEL_NAME'] ?? 'mistral/mistral-embed';

/**
 * The default maximum number of tokens to generate in the completion.
 * This value ensures that the generated text does not exceed a reasonable length.
 */
export const DEFAULT_MAX_TOKENS: number = parseInt(process.env['EMBEDDING_MODEL_NAME'] ?? '4096');

/**
 * The default maximum number of steps to generate in the completion.
 * This value controls the number of iterations or segments in the text generation process.
 */
export const DEFAULT_MAX_STEPS: number = parseInt(process.env['MAX_STEPS'] ?? '2');

/**
 * The default temperature value for controlling the randomness of predictions.
 * Lower values make the model more deterministic, while higher values increase randomness.
 */
export const DEFAULT_TEMPERATURE: number = parseFloat(process.env['TEMPERATURE'] ?? '0.8');

/**
 * The default value for nucleus sampling (top-p sampling).
 * The model considers the smallest set of tokens whose cumulative probability exceeds this value.
 */
export const DEFAULT_TOP_P: number = parseFloat(process.env['TOP_P'] ?? '0.90');

/**
 * The default value for limiting the model to the top K most likely next tokens.
 * This helps control the diversity of the generated text.
 */
export const DEFAULT_TOP_K: number = parseInt(process.env['TOP_K'] ?? '40');

/**
 * The default presence penalty value.
 * Penalizes new tokens based on whether they appear in the text so far.
 * Increases the model's likelihood to talk about new topics.
 */
export const DEFAULT_PRESENCE_PENALTY: number = parseFloat(process.env['PRESENCE_PENALTY'] ?? '0.0');

/**
 * The default frequency penalty value.
 * Penalizes new tokens based on their existing frequency in the text so far.
 * Decreases the model's likelihood to repeat the same line verbatim.
 */
export const DEFAULT_FREQUENCY_PENALTY: number = parseFloat(process.env['FREQUENCY_PENALTY'] ?? '0.0');

/**
 * List of all providers.
 */
export const providers: Array<Provider> = [
    new AI21(),
    new Anthropic(),
    new Cohere(),
    new DeepSeek(),
    new GoogleGenerativeAI(),
    new Groq(),
    new Mistral(),
    new Nvidia(),
    new OpenAI(),
    new OpenRouter(),
    new SambaNova(),
    new xAI(),
];

/**
 * Flatten the list of models from all providers.
 */
export const models = providers.flatMap(provider => provider.models);

/**
 * Get a language model instance for a given model name and API key.
 *
 * @param model - The model name in the format "provider/model".
 * @param apiKey - The API key for authentication (optional).
 * @returns A LanguageModel instance.
 */
export const languageModel = (model: string, apiKey: string = ''): LanguageModel => {
    return <LanguageModel>getModel(model, apiKey, (provider: Provider, modelID: string, apiKey: string) => provider.languageModel(modelID, apiKey));
};

/**
 * Get an embedding model instance for a given model name and API key.
 *
 * @param model - The model name in the format "provider/model".
 * @param apiKey - The API key for authentication (optional).
 * @returns An EmbeddingModel instance.
 */
export const embeddingModel = (model: string, apiKey: string = ''): EmbeddingModel<string> => {
    return <EmbeddingModel<string>>getModel(model, apiKey, (provider: Provider, modelID: string, apiKey: string) => provider.embeddingModel(modelID, apiKey));
};

/**
 * Calculate usage statistics for a given model and usage data.
 *
 * @param model - The model name in the format "provider/model".
 * @param usage - Usage data for the model.
 * @returns UsageModel containing token and cost information.
 */
export const usageModel = (model: string, usage: LanguageModelUsage | EmbeddingModelUsage): UsageModel => {
    const {model: m} = providerAndModel(model);

    if (isEmbeddingModelUsage(usage)) {
        return {
            tokens: {
                input: usage.tokens,
                output: 0
            },
            cost: {
                input: m.price.input * usage.tokens,
                output: 0
            }
        };
    }

    return {
        tokens: {
            input: usage.promptTokens,
            output: usage.completionTokens
        },
        cost: {
            input: m.price.input * usage.promptTokens,
            output: m.price.output * usage.completionTokens
        }
    };
};

/**
 * Get the provider and model details for a given model name.
 *
 * @param model - The model name in the format "provider/model".
 * @returns An object containing the provider, model, providerID, and modelID.
 * @throws Error if the provider or model is not found.
 */
export const providerAndModel = (model: string): {
    provider: Provider,
    model: Model,
    providerID: string,
    modelID: string
} => {
    const providerID = model.split('/')[0]?.toLowerCase() ?? '';
    const p = providers.find(p => p.id === providerID);
    if (!p) {
        throw new Error(`Provider ${providerID} not found`);
    }

    const modelID = model.split('/').slice(1).join('/');
    const m = p.models.find(m => m.id === model);
    if (!m) {
        throw new Error(`Provider ${p.name} does not have model ${modelID}`);
    }

    return {provider: p, model: m, providerID, modelID};
};

/**
 * Initializes a language model configuration with default values where necessary.
 *
 * @param {string} [model=DEFAULT_LANGUAGE_MODEL_NAME] - The name of the language model to use. Defaults to DEFAULT_LANGUAGE_MODEL_NAME if not provided.
 * @returns {LanguageModelInit} - A configuration object for the language model with default values applied where necessary.
 */
export const languageModelInit = (model: string = DEFAULT_LANGUAGE_MODEL_NAME): LanguageModelInit => ({
    model: model,
    maxTokens: DEFAULT_MAX_TOKENS,
    maxSteps: DEFAULT_MAX_STEPS,
    temperature: DEFAULT_TEMPERATURE,
    topP: DEFAULT_TOP_P,
    topK: DEFAULT_TOP_K,
    presencePenalty: DEFAULT_PRESENCE_PENALTY,
    frequencyPenalty: DEFAULT_FREQUENCY_PENALTY,
    tools: {}
});

/**
 * Initializes an embedding model configuration with default values where necessary.
 *
 * @param {string} [model=DEFAULT_EMBEDDING_MODEL_NAME] - The name of the embedding model to use. Defaults to DEFAULT_EMBEDDING_MODEL_NAME if not provided.
 * @returns {EmbeddingModelInit} - A configuration object for the embedding model with default values applied where necessary.
 */
export const embeddingModelInit = (model: string = DEFAULT_EMBEDDING_MODEL_NAME): EmbeddingModelInit => ({
    model: model
});

/**
 * Helper function to get a model instance using a provider and model ID.
 *
 * @param model - The model name in the format "provider/model".
 * @param apiKey - The API key for authentication.
 * @param fn - Function to create a model instance.
 * @returns A LanguageModel or EmbeddingModel instance.
 */
const getModel = (model: string, apiKey: string, fn: (provider: Provider, modelID: string, apiKey: string) => LanguageModel | EmbeddingModel<string>): LanguageModel | EmbeddingModel<string> => {
    const {provider, modelID} = providerAndModel(model);

    return fn(provider, modelID, apiKey);
};

/**
 * Type guard to check if the usage data is for an embedding model.
 *
 * @param usage - Usage data for the model.
 * @returns True if the usage data is for an embedding model, false otherwise.
 */
const isEmbeddingModelUsage = (usage: LanguageModelUsage | EmbeddingModelUsage): usage is EmbeddingModelUsage => {
    return (usage as EmbeddingModelUsage).tokens !== undefined;
};
