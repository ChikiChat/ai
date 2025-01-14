import {CoreTool, EmbeddingModel, generateText, LanguageModel} from "ai";

/**
 * Abstract class representing a provider of AI models.
 */
export abstract class Provider {
    /**
     * Unique identifier for the provider.
     */
    abstract id: string;

    /**
     * Name of the provider.
     */
    abstract name: string;

    /**
     * Description of the provider.
     */
    abstract description: string;

    /**
     * List of models provided by this provider.
     */
    abstract models: Array<Model>;

    /**
     * Default configuration for the provider.
     */
    abstract default: {
        apiURL: string; // URL for the API
        pricingURL: string; // URL for pricing information
        manageAPIKeysURL: string; // URL to manage API keys
        model: string; // Default model to use
    };

    /**
     * Method to create a language model instance.
     *
     * @param model - The model identifier.
     * @param apiKey - The API key for authentication.
     * @returns A LanguageModel instance.
     */
    abstract languageModel(model: string, apiKey: string): LanguageModel;

    /**
     * Method to create an embedding model instance.
     *
     * @param model - The model identifier.
     * @param apiKey - The API key for authentication.
     * @returns An EmbeddingModel instance.
     */
    abstract embeddingModel(model: string, apiKey: string): EmbeddingModel<string>;

    /**
     * Method to retrieve the API key, either from the provided argument or environment variable.
     *
     * @param apiKey - The API key provided as an argument.
     * @returns The API key to be used.
     */
    apiKey(apiKey: string): string {
        if (apiKey !== '') {
            return apiKey;
        }

        // Fallback to environment variable if apiKey is not provided
        return process.env[`${this.id.toUpperCase().replace(/-/g, '_')}_API_KEY`] ?? '';
    }

    /**
     * Method to probe the API to check if it's working.
     *
     * @param apiKey - The API key for authentication.
     * @returns A promise that resolves to true if the API is working, false otherwise.
     */
    async probe(apiKey: string): Promise<boolean> {
        try {
            // Attempt to generate text using the default model and provided API key
            await generateText({
                model: this.languageModel(this.apiKey(apiKey), this.default.model),
                prompt: `hi`,
                maxTokens: 1,
            });

            // Return true if the API call is successful
            return true;
        } catch (e) {
            // Return false if there's an error during the API call
            return false;
        }
    }
}

/**
 * Type representing a model provided by a provider.
 */
export type Model = {
    id: string; // Unique identifier for the model
    name: string; // Name of the model
    description: string; // Description of the model
    architecture: string; // Architecture of the model
    capabilities: Capabilities; // Capabilities of the model
    price: Price; // Pricing information for the model
}

/**
 * Type representing the capabilities of a model.
 */
export type Capabilities = {
    embedding: boolean; // Whether the model supports embeddings
    tool_call: boolean; // Whether the model supports tool calls
    rerank: boolean; // Whether the model supports reranking
    features: Array<string>; // List of additional features supported by the model
    size: {
        vocab: number; // Vocabulary size
        embedding: number; // Embedding size
        input: number; // Maximum input size
        output: number; // Maximum output size
    }
    text: IO; // Input/output capabilities for text
    image: IO; // Input/output capabilities for images
    audio: IO; // Input/output capabilities for audio
    video: IO; // Input/output capabilities for video
}

/**
 * Type representing input/output capabilities.
 */
export type IO = {
    input: boolean; // Whether input is supported
    output: boolean; // Whether output is supported
}

/**
 * Type representing pricing information for a model.
 */
export type Price = {
    input: number; // Cost per input token
    output: number; // Cost per output token
}

/**
 * Type representing usage statistics for a model.
 */
export type UsageModel = {
    tokens: {
        input: number; // Number of input tokens used
        output: number; // Number of output tokens used
    },
    cost: {
        input: number; // Total cost for input tokens
        output: number; // Total cost for output tokens
    }
}

/**
 * Type representing the initialization configuration for a LanguageModel.
 */
export type LanguageModelInit = {
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
 * Type representing the initialization configuration for a EmbeddingModel.
 */
export type EmbeddingModelInit = {
    /**
     * The model identifier for embeddings.
     * Defaults to {@link DEFAULT_EMBEDDING_MODEL_NAME}.
     */
    readonly model: string;
}