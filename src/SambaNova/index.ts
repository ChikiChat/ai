import {Provider} from '../types';
import {EmbeddingModel, generateText, LanguageModel} from "ai";
import {createOpenAI, OpenAIProvider} from "@ai-sdk/openai";

export class SambaNova extends Provider {
    id = 'sambanova';
    name = 'SambaNova';
    description = `Sambanova is an AI platform for natural language processing that offers advanced models for text generation and understanding.`;
    models = [
        {
            id: `${this.id}/Qwen2.5-Coder-32B-Instruct`,
            name: 'Qwen 2.5 (32B) Coder Instruct',
            description: ``,
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 8192, output: 1600},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000015000, output: 0.0000030000},
        },
        {
            id: `${this.id}/Qwen2.5-72B-Instruct`,
            name: 'Qwen 2.5 (72B) Instruct',
            description: ``,
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 8192, output: 1600},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000020000, output: 0.0000040000},
        },
        {
            id: `${this.id}/Meta-Llama-3.3-70B-Instruct`,
            name: 'Llama 3.3 (70B) Instruct',
            description: ``,
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 4096, output: 1600},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000006000, output: 0.0000012000},
        },
        {
            id: `${this.id}/Llama-3.2-90B-Vision-Instruct`,
            name: 'Llama 3.2 (90B) Vision Instruct',
            description: ``,
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 4096, output: 1600},
                text: {input: true, output: true},
                image: {input: true, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000008000, output: 0.0000016000},
        },
        {
            id: `${this.id}/Llama-3.2-11B-Vision-Instruct`,
            name: 'Llama 3.2 (11B) Vision Instruct',
            description: ``,
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 4096, output: 1600},
                text: {input: true, output: true},
                image: {input: true, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000001500, output: 0.0000003000},
        },
        {
            id: `${this.id}/Llama-3.2-3B-Instruct`,
            name: 'Llama 3.2 (3B) Instruct',
            description: ``,
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 4096, output: 1600},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000000800, output: 0.0000001600},
        },
        {
            id: `${this.id}/Llama-3.2-1B-Instruct`,
            name: 'Llama 3.2 (1B) Instruct',
            description: ``,
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 4096, output: 1600},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000000400, output: 0.0000000800},
        },
        {
            id: `${this.id}/Meta-Llama-3.1-405B-Instruct`,
            name: 'Llama 3.1 (405B) Instruct',
            description: ``,
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 4096, output: 1600},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000050000, output: 0.0000100000},
        },
        {
            id: `${this.id}/Meta-Llama-3.1-70B-Instruct`,
            name: 'Llama 3.1 (70B) Instruct',
            description: ``,
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 4096, output: 1600},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000006000, output: 0.0000012000},
        },
        {
            id: `${this.id}/Meta-Llama-3.1-8B-Instruct`,
            name: 'Llama 3.1 (8B) Instruct',
            description: ``,
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 4096, output: 1600},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000001000, output: 0.0000002000},
        },
    ];
    apiURL = 'https://api.sambanova.ai/v1';
    pricingURL = 'https://cloud.sambanova.ai/pricing';

    create(apiKey: string): OpenAIProvider {
        return createOpenAI({name: this.name, baseURL: this.apiURL, apiKey: this.apiKey(apiKey)});
    }

    languageModel(model: string, apiKey: string = ''): LanguageModel {
        return this.create(apiKey)(model);
    }

    embeddingModel(_model: string, _apiKey: string): EmbeddingModel<string> {
        throw new Error(`Provider ${this.name} does not support embeddings`);
    }

    async check(apiKey: string) {
        try {
            await generateText({
                model: this.languageModel(apiKey, 'Llama-3.2-1B-Instruct'),
                prompt: `hi`,
                maxTokens: 1,
            });

            return true;
        } catch (e) {
            return false;
        }
    }
}