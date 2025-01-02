import {EmbeddingModel, generateText, LanguageModel} from "ai";

export abstract class Provider {
    abstract id: string;
    abstract name: string;
    abstract description: string;
    abstract models: Array<Model>;
    abstract default: {
        apiURL: string;
        pricingURL: string;
        manageAPIKeysURL: string;
        model: string;
    };

    abstract languageModel(model: string, apiKey: string): LanguageModel;

    abstract embeddingModel(model: string, apiKey: string): EmbeddingModel<string>;

    apiKey(apiKey: string): string {
        if (apiKey !== '') {
            return apiKey;
        }

        return process.env[`${this.id.toUpperCase().replace(/-/g, '_')}_API_KEY`] ?? '';
    }

    async probe(apiKey: string): Promise<boolean> {
        try {
            await generateText({
                model: this.languageModel(this.apiKey(apiKey), this.default.model),
                prompt: `hi`,
                maxTokens: 1,
            });

            return true;
        } catch (e) {
            return false;
        }
    }
}

export type Model = {
    id: string;
    name: string;
    description: string;
    architecture: string;
    capabilities: Capabilities,
    price: Price;
}

export type Capabilities = {
    embedding: boolean;
    tool_call: boolean;
    rerank: boolean;
    features: Array<string>;
    size: {
        vocab: number;
        embedding: number;
        input: number;
        output: number;
    }
    text: IO
    image: IO
    audio: IO
    video: IO
}

export type IO = {
    input: boolean;
    output: boolean;
}

export type Price = {
    input: number;
    output: number;
}

export type UsageModel = {
    tokens: {
        input: number;
        output: number;
    },
    cost: {
        input: number;
        output: number;
    }
}