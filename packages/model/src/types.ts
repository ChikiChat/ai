import z from "zod";

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
 * Schema for defining a tool that can be used by a language model.
 */
export const ToolSchema = z.object({
    /**
     * Type of the tool, defaults to "function"
     */
    type: z.literal("function").optional(),
    /**
     * Description of the tool
     */
    description: z.string(),
    /**
     * Parameters required by the tool
     */
    parameters: z.any(),
    /**
     * Function to execute the tool
     */
    execute: z.function().args(z.any()).returns(z.promise(z.any())),
});

/**
 * Schema for initializing a language model.
 */
export const LanguageModelInitSchema = z.object({
    /**
     * The model identifier for text generation.
     * Defaults to {@link DEFAULT_LANGUAGE_MODEL_NAME}.
     */
    model: z.string().optional(),

    /**
     * The maximum number of tokens to generate.
     * Defaults to {@link DEFAULT_MAX_TOKENS}.
     */
    maxTokens: z.number().optional(),

    /**
     * The maximum number of steps to generate.
     * Defaults to {@link DEFAULT_MAX_STEPS}.
     */
    maxSteps: z.number().optional(),

    /**
     * Controls the randomness of the generated text.
     * Lower values make the output more deterministic.
     * Defaults to {@link DEFAULT_TEMPERATURE}.
     */
    temperature: z.number().optional(),

    /**
     * Implements nucleus sampling to control text diversity.
     * The model considers tokens whose cumulative probability exceeds this value.
     * Defaults to {@link DEFAULT_TOP_P}.
     */
    topP: z.number().optional(),

    /**
     * Limits the model to the top K most likely next tokens.
     * Helps control text diversity.
     * Defaults to {@link DEFAULT_TOP_K}.
     */
    topK: z.number().optional(),

    /**
     * Penalizes tokens that have already appeared in the text.
     * Encourages the model to introduce new topics.
     * Defaults to {@link DEFAULT_PRESENCE_PENALTY}.
     */
    presencePenalty: z.number().optional(),

    /**
     * Penalizes tokens based on their frequency in the text.
     * Reduces the likelihood of repeating the same line.
     * Defaults to {@link DEFAULT_FREQUENCY_PENALTY}.
     */
    frequencyPenalty: z.number().optional(),

    /**
     * The tools available for the model to use.
     * The model must support tool invocation.
     * Defaults to an empty object.
     */
    tools: z.record(z.string(), ToolSchema).optional(),
});

/**
 * Schema for initializing an embedding model.
 */
export const EmbeddingModelInitSchema = z.object({
    /**
     * The model identifier for embeddings.
     * Defaults to {@link DEFAULT_EMBEDDING_MODEL_NAME}.
     */
    model: z.string().optional(),
});

/**
 * Type representing a tool that can be used by a language model.
 */
export type Tool = z.infer<typeof ToolSchema>;

/**
 * Type representing the initialization parameters for a language model.
 */
export type LanguageModelInit = z.infer<typeof LanguageModelInitSchema>;

/**
 * Type representing the initialization parameters for an embedding model.
 */
export type EmbeddingModelInit = z.infer<typeof EmbeddingModelInitSchema>;