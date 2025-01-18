import {EmbeddingModel, EmbeddingModelUsage, LanguageModel, LanguageModelUsage} from "ai";
import {
    DEFAULT_EMBEDDING_MODEL_NAME,
    DEFAULT_FREQUENCY_PENALTY,
    DEFAULT_LANGUAGE_MODEL_NAME,
    DEFAULT_MAX_STEPS,
    DEFAULT_MAX_TOKENS,
    DEFAULT_PRESENCE_PENALTY,
    DEFAULT_TEMPERATURE,
    DEFAULT_TOP_K,
    DEFAULT_TOP_P,
    EmbeddingModelInit,
    EmbeddingModelInitSchema,
    LanguageModelInit,
    LanguageModelInitSchema,
    Model,
    UsageModel
} from "./types";
import {Provider} from "./providers/provider";
import {providers} from "./providers";

export * from "./types";
export * from "./providers";

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
        const tokens = usage.tokens || 0;

        return {
            tokens: {
                input: tokens,
                output: 0
            },
            cost: {
                input: m.price.input * tokens,
                output: 0
            }
        };
    }

    const promptTokens = usage.promptTokens || 0;
    const completionTokens = usage.completionTokens || 0;

    return {
        tokens: {
            input: promptTokens,
            output: completionTokens
        },
        cost: {
            input: m.price.input * promptTokens,
            output: m.price.output * completionTokens
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
 * Initializes a language model configuration by parsing the input and applying default values where necessary.
 *
 * @param init - An object containing the initial configuration for the language model.
 * @returns A new object with the parsed and defaulted configuration for the language model.
 */
export const languageModelInit = (init: LanguageModelInit): LanguageModelInit => {
    const parsed = LanguageModelInitSchema.parse(init);

    return {
        model: parsed.model ?? DEFAULT_LANGUAGE_MODEL_NAME,
        maxTokens: parsed.maxTokens ?? DEFAULT_MAX_TOKENS,
        maxSteps: parsed.maxSteps ?? DEFAULT_MAX_STEPS,
        temperature: parsed.temperature ?? DEFAULT_TEMPERATURE,
        topP: parsed.topP ?? DEFAULT_TOP_P,
        topK: parsed.topK ?? DEFAULT_TOP_K,
        presencePenalty: parsed.presencePenalty ?? DEFAULT_PRESENCE_PENALTY,
        frequencyPenalty: parsed.frequencyPenalty ?? DEFAULT_FREQUENCY_PENALTY,
        tools: parsed.tools ?? {}
    }
};

/**
 * Initializes an embedding model configuration by parsing the input and applying default values where necessary.
 *
 * @param init - An object containing the initial configuration for the embedding model. Defaults to an empty object if not provided.
 * @returns A new object with the parsed and defaulted configuration for the embedding model.
 */
export const embeddingModelInit = (init: EmbeddingModelInit = {}): EmbeddingModelInit => {
    const parsed = EmbeddingModelInitSchema.parse(init);

    return {
        model: parsed.model ?? DEFAULT_EMBEDDING_MODEL_NAME,
    }
};

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
