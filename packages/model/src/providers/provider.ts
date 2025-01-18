import {EmbeddingModel, generateText, LanguageModel} from "ai";
import {languageModel} from "../index";
import {Model} from "../types";

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
    apiKey(apiKey: string = ''): string {
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
    async probe(apiKey: string = ''): Promise<boolean> {
        try {
            // Attempt to generate text using the default model and provided API key
            await generateText({
                prompt: `hi`,
                model: languageModel(this.default.model, this.apiKey(apiKey)),
                maxTokens: 1,
                maxSteps: 1
            });

            // Return true if the API call is successful
            return true;
        } catch (e) {
            // Return false if there's an error during the API call
            return false;
        }
    }
}