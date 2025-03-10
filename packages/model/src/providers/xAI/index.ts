import {EmbeddingModel, LanguageModel} from "ai";
import {createXai, XaiProvider} from "@ai-sdk/xai";
import {Provider} from '../provider';
import {RequestInit} from "../../types";

export class xAI extends Provider {
    id = 'xai';
    name = 'xAI';
    description = `xAI is an AI company with the mission of advancing scientific discovery and gaining a deeper understanding of our universe.`;
    models = [
        {
            id: `${this.id}/grok-beta`,
            name: 'Grok 3',
            description: ``,
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 131072, output: 0},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000050000, output: 0.0000150000},
        },
        {
            id: `${this.id}/grok-2-1212`,
            name: 'Grok 2',
            description: ``,
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 131072, output: 0},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000020000, output: 0.0000100000},
        },
        {
            id: `${this.id}/grok-2-vision-1212`,
            name: 'Grok 2 Vision',
            description: ``,
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 8192, output: 0},
                text: {input: true, output: true},
                image: {input: true, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000020000, output: 0.0000100000},
        },
        {
            id: `${this.id}/grok-beta`,
            name: 'Grok Beta',
            description: ``,
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 131072, output: 0},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000050000, output: 0.0000150000},
        },
        {
            id: `${this.id}/grok-vision-beta`,
            name: 'Grok Vision Beta',
            description: ``,
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 8192, output: 0},
                text: {input: true, output: true},
                image: {input: true, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000050000, output: 0.0000150000},
        },
    ];
    default = {
        baseURL: 'https://api.x.ai/v1',
        pricingURL: 'https://docs.x.ai/docs/models',
        manageAPIKeysURL: 'https://console.x.ai/team',
        model: `grok-2-1212`,
    };

    create(init: RequestInit = {}): XaiProvider {
        return createXai({baseURL: this.baseUrl(init.baseURL), apiKey: this.apiKey(init.apiKey), headers: init.headers});
    }

    languageModel(model: string, init: RequestInit = {}): LanguageModel {
        return this.create(init)(model);
    }

    embeddingModel(_model: string, _init: RequestInit = {}): EmbeddingModel<string> {
        throw new Error(`Provider ${this.name} does not support embeddings`);
    }
}