import {Provider} from '../types';
import {EmbeddingModel, generateText, LanguageModel} from "ai";
import {createGroq, GroqProvider} from "@ai-sdk/groq";

export class Groq extends Provider {
    id = 'groq';
    name = 'Groq';
    description = 'Groq AI API provides access to advanced models for text generation and understanding.';
    models = [
        {
            id: `${this.id}/llama-3.3-70b-specdec`,
            name: 'LLaMA 3.3 (70B) Specdec',
            description: '',
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 8192, output: 8192},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000005900, output: 0.0000009900},
        },
        {
            id: `${this.id}/gemma2-9b-it`,
            name: 'Gemma 2 (9B) Instruct',
            description: '',
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 8192, output: 8192},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000002000, output: 0.0000002000},
        },
        {
            id: `${this.id}/llama-3.3-70b-versatile`,
            name: 'LLaMA 3.3 (70B) Versatile',
            description: '',
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 131072, output: 8192},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000005900, output: 0.0000007900},
        },
        {
            id: `${this.id}/gemma-7b-it`,
            name: 'Gemma (7B) Instruct',
            description: '',
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 8192, output: 8192},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000000700, output: 0.0000000700},
        },
        {
            id: `${this.id}/llama-3.2-90b-vision-preview`,
            name: 'LLaMA 3.2 (90B) Vision (Preview)',
            description: '',
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 8192, output: 4096},
                text: {input: true, output: true},
                image: {input: true, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000009000, output: 0.0000009000},
        },
        {
            id: `${this.id}/llama-3.2-11b-vision-preview`,
            name: 'LLaMA 3.2 (11B) Vision (Preview)',
            description: '',
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 8192, output: 4096},
                text: {input: true, output: true},
                image: {input: true, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000001800, output: 0.0000001800},
        },
        {
            id: `${this.id}/llama-3.2-3b-preview`,
            name: 'LLaMA 3.2 (3B) (Preview)',
            description: '',
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 8192, output: 8192},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000000600, output: 0.0000000600},
        },
        {
            id: `${this.id}/llama-3.2-1b-preview`,
            name: 'LLaMA 3.2 (1B) (Preview)',
            description: '',
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 8192, output: 8192},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000000400, output: 0.0000000400},
        },
        {
            id: `${this.id}/llama-3.1-70b-versatile`,
            name: 'LLaMA 3.1 (70B) Versatile',
            description: '',
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 32768, output: 8192},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000005900, output: 0.0000007900},
        },
        {
            id: `${this.id}/llama-3.1-8b-instant`,
            name: 'LLaMA 3.1 (8B) Instant',
            description: '',
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 131072, output: 8192},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000000500, output: 0.0000000800},
        },
        {
            id: `${this.id}/llama3-groq-70b-8192-tool-use-preview`,
            name: 'LLaMA 3 (70B) Groq Tool Use (Preview)',
            description: '',
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 8192, output: 8192},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000008900, output: 0.0000008900},
        },
        {
            id: `${this.id}/llama3-70b-8192`,
            name: 'LLaMA 3 (70B)',
            description: '',
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 8192, output: 8192},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000005900, output: 0.0000007900},
        },
        {
            id: `${this.id}/llama3-groq-8b-8192-tool-use-preview`,
            name: 'LLaMA 3 (8B) Groq Tool Use (Preview)',
            description: '',
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 8192, output: 8192},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000001900, output: 0.0000001900},
        },
        {
            id: `${this.id}/llama3-8b-8192`,
            name: 'LLaMA 3 (8B)',
            description: '',
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 8192, output: 8192},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000000500, output: 0.0000000800},
        },
        {
            id: `${this.id}/llama-guard-3-8b`,
            name: 'LLaMA Guard 3 (8B)',
            description: '',
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 8192, output: 8192},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000002000, output: 0.0000002000},
        },
        {
            id: `${this.id}/mixtral-8x7b-32768`,
            name: 'Mixtral (8X7B) Instruct',
            description: '',
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 32768, output: 32768},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000002400, output: 0.0000002400},
        },
    ];
    apiURL = 'https://api.groq.com/openai/v1';
    pricingURL = 'https://groq.com/pricing';

    create(apiKey: string): GroqProvider {
        return createGroq({baseURL: this.apiURL, apiKey: apiKey});
    }

    languageModel(apiKey: string, model: string): LanguageModel {
        return this.create(apiKey)(model);
    }

    embeddingModel(_apiKey: string, _model: string): EmbeddingModel<string> {
        throw new Error('Provider ' + this.name + ' does not support embeddings');
    }

    async check(apiKey: string) {
        try {
            await generateText({
                model: this.languageModel(apiKey, 'llama-3.1-8b-instant'),
                prompt: 'hi',
                maxTokens: 1,
            });

            return true;
        } catch (e) {
            return false;
        }
    }
}