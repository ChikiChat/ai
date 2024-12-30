import {Provider} from '../types';
import {EmbeddingModel, generateText, LanguageModel} from "ai";
import {createXai, XaiProvider} from "@ai-sdk/xai";

export class xAI extends Provider {
    id = 'xai';
    name = 'xAI';
    description = `xAI is a grok model provider.`;
    models = [
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
    apiURL = 'https://api.x.ai/v1';
    pricingURL = 'https://docs.x.ai/docs/models';

    create(apiKey: string): XaiProvider {
        return createXai({baseURL: this.apiURL, apiKey: this.apiKey(apiKey)});
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
                model: this.languageModel(apiKey, 'grok-2-1212'),
                prompt: `hi`,
                maxTokens: 1,
            });

            return true;
        } catch (e) {
            return false;
        }
    }
}