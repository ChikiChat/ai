import {Provider} from '../../types';
import {EmbeddingModel, LanguageModel} from "ai";
import {createGoogleGenerativeAI, GoogleGenerativeAIProvider} from "@ai-sdk/google";

export class GoogleGenerativeAI extends Provider {
    id = 'google-generative-ai';
    name = 'Google Generative AI';
    description = `Google's Generative Language API provides access to advanced models for text generation and understanding.`;
    models = [
        {
            id: `${this.id}/models/gemini-1.5-flash-latest`,
            name: 'Gemini 1.5 Flash Latest',
            description: `Alias that points to the most recent production (non-experimental) release of Gemini 1.5 Flash, our fast and versatile multimodal model for scaling across diverse tasks.`,
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
            id: `${this.id}/models/gemini-1.5-flash-002`,
            name: 'Gemini 1.5 Flash 002',
            description: `Stable version of Gemini 1.5 Flash, our fast and versatile multimodal model for scaling across diverse tasks, released in September of 2024.`,
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
            id: `${this.id}/models/gemini-1.5-flash-001`,
            name: 'Gemini 1.5 Flash 001',
            description: `Stable version of Gemini 1.5 Flash, our fast and versatile multimodal model for scaling across diverse tasks, released in May of 2024.`,
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
            id: `${this.id}/models/gemini-1.5-flash-8b-latest`,
            name: 'Gemini 1.5 Flash-8B Latest',
            description: `Alias that points to the most recent production (non-experimental) release of Gemini 1.5 Flash-8B, our smallest and most cost effective Flash model, released in October of 2024.`,
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
            id: `${this.id}/models/gemini-1.5-flash-8b-001`,
            name: 'Gemini 1.5 Flash-8B 001',
            description: `Stable version of Gemini 1.5 Flash-8B, our smallest and most cost effective Flash model, released in October of 2024.`,
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
            id: `${this.id}/models/gemini-1.5-pro-latest`,
            name: 'Gemini 1.5 Pro Latest',
            description: `Alias that points to the most recent production (non-experimental) release of Gemini 1.5 Pro, our mid-size multimodal model that supports up to 2 million tokens.`,
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
            id: `${this.id}/models/gemini-1.5-pro-002`,
            name: 'Gemini 1.5 Pro 002',
            description: `Stable version of Gemini 1.5 Pro, our mid-size multimodal model that supports up to 2 million tokens, released in September of 2024.`,
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
            id: `${this.id}/models/gemini-1.5-pro-001`,
            name: 'Gemini 1.5 Pro 001',
            description: `Stable version of Gemini 1.5 Pro, our mid-size multimodal model that supports up to 2 million tokens, released in May of 2024.`,
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
            id: `${this.id}/models/gemini-1.0-pro-latest`,
            name: 'Gemini 1.0 Pro Latest',
            description: `The original Gemini 1.0 Pro model. This model will be discontinued on February 15th, 2025. Move to a newer Gemini version.`,
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: false,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 30720, output: 2048},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000005000, output: 0.0000015000},
        },
        {
            id: `${this.id}/models/gemini-1.0-pro-001`,
            name: 'Gemini 1.0 Pro 001 (Tuning)',
            description: `The original Gemini 1.0 Pro model version that supports tuning. Gemini 1.0 Pro will be discontinued on February 15th, 2025. Move to a newer Gemini version.`,
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: false,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 30720, output: 2048},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000005000, output: 0.0000015000},
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