import {EmbeddingModel, LanguageModel} from "ai";

export abstract class Provider {
    abstract id: string;
    abstract name: string;
    abstract description: string;
    abstract models: Array<Model>;
    abstract apiURL: string;
    abstract pricingURL: string;

    abstract languageModel(apiKey: string, model: string): LanguageModel;

    abstract embeddingModel(apiKey: string, model: string): EmbeddingModel<string>;

    abstract check(apiKey: string): Promise<boolean>;
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