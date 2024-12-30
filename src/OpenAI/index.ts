import {Provider} from '../types';
import {EmbeddingModel, generateText, LanguageModel} from "ai";
import {createOpenAI, OpenAIProvider} from "@ai-sdk/openai";

export class OpenAI extends Provider {
    id = 'openai';
    name = 'OpenAI';
    description = 'OpenAI offers a suite of powerful AI models for various natural language processing tasks.';
    models = [
        {
            id: `${this.id}/gpt-4o`,
            name: 'GPT-4o',
            description: '',
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 128000, output: 16385},
                text: {input: true, output: true},
                image: {input: true, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000025000, output: 0.0000100000},
        },
        {
            id: `${this.id}/gpt-4o-mini`,
            name: 'GPT-4o mini',
            description: '',
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 128000, output: 16385},
                text: {input: true, output: true},
                image: {input: true, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000001500, output: 0.0000006000},
        },
        {
            id: `${this.id}/o1`,
            name: 'OpenAI o1',
            description: '',
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: false,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 0, output: 0},
                text: {input: true, output: true},
                image: {input: true, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000150000, output: 0.0000600000},
        },
        {
            id: `${this.id}/o1-mini`,
            name: 'OpenAI o1-mini',
            description: '',
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: false,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 0, output: 0},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000030000, output: 0.0000120000},
        },
        {
            id: `${this.id}/chatgpt-4o-latest`,
            name: 'ChatGPT 4o',
            description: '',
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 128000, output: 16385},
                text: {input: true, output: true},
                image: {input: true, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000050000, output: 0.0000150000},
        },
        {
            id: `${this.id}/gpt-4-turbo`,
            name: 'GPT 4 Turbo',
            description: '',
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 128000, output: 4096},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000100000, output: 0.0000300000},
        },
        {
            id: `${this.id}/gpt-4`,
            name: 'GPT 4',
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
            price: {input: 0.0000300000, output: 0.0000600000},
        },
        {
            id: `${this.id}/gpt-3.5-turbo-instruct`,
            name: 'GPT 3.5 Turbo Instruct',
            description: '',
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 4096, output: 4096},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000015000, output: 0.0000020000},
        },
        {
            id: `${this.id}/gpt-3.5-turbo`,
            name: 'GPT 3.5 Turbo',
            description: '',
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 16384, output: 4096},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000030000, output: 0.0000060000},
        },
        {
            id: `${this.id}/gpt-3.5-turbo-16k`,
            name: 'GPT 3.5 Turbo 16k',
            description: '',
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 16384, output: 4096},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000030000, output: 0.0000040000},
        },
        {
            id: `${this.id}/text-embedding-3-large`,
            name: 'Text Embedding 3 Large',
            description: '',
            architecture: '',
            capabilities: {
                embedding: true,
                tool_call: false,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 3072, input: 8191, output: 0},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000001300, output: 0.0000000000},
        },
        {
            id: `${this.id}/text-embedding-3-small`,
            name: 'Text Embedding 3 Small',
            description: '',
            architecture: '',
            capabilities: {
                embedding: true,
                tool_call: false,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 1536, input: 8191, output: 0},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000000200, output: 0.0000000000},
        },
        {
            id: `${this.id}/text-embedding-ada-002`,
            name: 'Text Embedding Ada 002',
            description: '',
            architecture: '',
            capabilities: {
                embedding: true,
                tool_call: false,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 1536, input: 8191, output: 0},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000001000, output: 0.0000000000},
        },
    ];
    apiURL = 'https://api.openai.com/v1';
    pricingURL = 'https://openai.com/api/pricing';

    create(apiKey: string): OpenAIProvider {
        return createOpenAI({name: this.name, baseURL: this.apiURL, apiKey: apiKey});
    }

    languageModel(apiKey: string, model: string): LanguageModel {
        return this.create(apiKey)(model);
    }

    embeddingModel(apiKey: string, model: string): EmbeddingModel<string> {
        return this.create(apiKey).embedding(model)
    }

    async check(apiKey: string) {
        try {
            await generateText({
                model: this.languageModel(apiKey, 'gpt-3.5-turbo-0125'),
                prompt: 'hi',
                maxTokens: 1,
            });

            return true;
        } catch (e) {
            return false;
        }
    }
}