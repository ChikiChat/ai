import {Provider} from '../../types';
import {EmbeddingModel, LanguageModel} from "ai";
import {createGoogleGenerativeAI, GoogleGenerativeAIProvider} from "@ai-sdk/google";

export class GoogleGenerativeAI extends Provider {
    id = 'google-generative-ai';
    name = 'Google Generative AI';
    description = `Create, discover, summarize and automate with Google Cloud's generative AI products and services.`;
    models = [
        {
            id: `${this.id}/models/gemini-2.0-flash-exp`,
            name: 'Gemini 2.0 Flash',
            description: `Gemini 2.0 Flash delivers next-gen features and improved capabilities, including superior speed, native tool use, multimodal generation, and a 1M token context window.`,
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 1000000, output: 8192},
                text: {input: true, output: true},
                image: {input: true, output: false},
                audio: {input: true, output: false},
                video: {input: true, output: false},
            },
            price: {input: 0.0000000000, output: 0.0000000000},
        },
        {
            id: `${this.id}/models/gemini-1.5-flash`,
            name: 'Gemini 1.5 Flash',
            description: `Gemini 1.5 Flash is a fast and versatile multimodal model for scaling across diverse tasks.`,
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 1000000, output: 8192},
                text: {input: true, output: true},
                image: {input: true, output: false},
                audio: {input: true, output: false},
                video: {input: true, output: false},
            },
            price: {input: 0.0000000750, output: 0.0000003000},
        },
        {
            id: `${this.id}/models/gemini-1.5-flash-8b`,
            name: 'Gemini 1.5 Flash-8B',
            description: `Gemini 1.5 Flash-8B is a small model designed for lower intelligence tasks.`,
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 1000000, output: 8192},
                text: {input: true, output: true},
                image: {input: true, output: false},
                audio: {input: true, output: false},
                video: {input: true, output: false},
            },
            price: {input: 0.0000000375, output: 0.0000001500},
        },
        {
            id: `${this.id}/models/gemini-1.5-pro`,
            name: 'Gemini 1.5 Pro',
            description: `Gemini 1.5 Pro is a mid-size multimodal model that is optimized for a wide-range of reasoning tasks.`,
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 2000000, output: 8192},
                text: {input: true, output: true},
                image: {input: true, output: false},
                audio: {input: true, output: false},
                video: {input: true, output: false},
            },
            price: {input: 0.0000012500, output: 0.0000050000},
        },
        {
            id: `${this.id}/models/text-embedding-004`,
            name: 'Text Embedding 004',
            description: `Obtain a distributed representation of a text.`,
            architecture: '',
            capabilities: {
                embedding: true,
                tool_call: false,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 768, input: 2048, output: 0},
                text: {input: true, output: false},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000000000, output: 0.0000000000},
        },
        {
            id: `${this.id}/models/embedding-001`,
            name: 'Embedding 001',
            description: `Obtain a distributed representation of a text.`,
            architecture: '',
            capabilities: {
                embedding: true,
                tool_call: false,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 768, input: 2048, output: 0},
                text: {input: true, output: false},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000000000, output: 0.0000000000},
        },
    ];
    default = {
        apiURL: 'https://generativelanguage.googleapis.com/v1beta',
        pricingURL: 'https://ai.google.dev/pricing',
        manageAPIKeysURL: 'https://aistudio.google.com/app/apikey',
        model: 'models/gemini-1.5-flash-8b-latest',
    };

    create(apiKey: string): GoogleGenerativeAIProvider {
        return createGoogleGenerativeAI({baseURL: this.default.apiURL, apiKey: this.apiKey(apiKey)});
    }

    languageModel(model: string, apiKey: string = ''): LanguageModel {
        return this.create(apiKey)(model);
    }

    embeddingModel(model: string, apiKey: string = ''): EmbeddingModel<string> {
        return this.create(apiKey).textEmbeddingModel(model);
    }
}