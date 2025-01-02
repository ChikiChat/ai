import {Provider} from '../../types';
import {EmbeddingModel, LanguageModel} from 'ai';
import {AnthropicProvider, createAnthropic} from '@ai-sdk/anthropic';

export class Anthropic extends Provider {
    id = 'anthropic';
    name = 'Anthropic';
    description = `Anthropic is an AI safety and research company that's working to build reliable, interpretable, and steerable AI systems.`;
    models = [
        {
            id: `${this.id}/claude-3-5-sonnet-20241022`,
            name: 'Claude 3.5 Sonnet',
            description: `Our most intelligent model. Highest level of intelligence and capability.`,
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 200000, output: 8192},
                text: {input: true, output: true},
                image: {input: true, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000030000, output: 0.0000150000},
        },
        {
            id: `${this.id}/claude-3-5-haiku-20241022`,
            name: 'Claude 3.5 Haiku',
            description: `Our fastest model. Intelligence at blazing speeds.`,
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 200000, output: 8192},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000008000, output: 0.0000040000},
        },
        {
            id: `${this.id}/claude-3-opus-20240229`,
            name: 'Claude 3 Opus',
            description: `Powerful model for highly complex tasks. Top-level intelligence, fluency, and understanding.`,
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 200000, output: 4096},
                text: {input: true, output: true},
                image: {input: true, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000150000, output: 0.0000750000},
        },
        {
            id: `${this.id}/claude-3-sonnet-20240229`,
            name: 'Claude 3 Sonnet',
            description: `Balance of intelligence and speed. Strong utility, balanced for scaled deployments.`,
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 200000, output: 4096},
                text: {input: true, output: true},
                image: {input: true, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000030000, output: 0.0000150000},
        },
        {
            id: `${this.id}/claude-3-haiku-20240307`,
            name: 'Claude 3 Haiku',
            description: `Fastest and most compact model for near-instant responsiveness. Quick and accurate targeted performance.`,
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 200000, output: 4096},
                text: {input: true, output: true},
                image: {input: true, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000002500, output: 0.0000012500},
        },
    ];
    default = {
        apiURL: 'https://api.anthropic.com/v1',
        pricingURL: 'https://www.anthropic.com/pricing',
        manageAPIKeysURL: 'https://console.anthropic.com/settings/keys',
        model: 'claude-3-haiku-20240307',
    };

    create(apiKey: string): AnthropicProvider {
        return createAnthropic({baseURL: this.default.apiURL, apiKey: this.apiKey(apiKey)})
    }

    languageModel(model: string, apiKey: string = ''): LanguageModel {
        return this.create(apiKey)(model);
    }

    embeddingModel(_model: string, _apiKey: string): EmbeddingModel<string> {
        throw new Error(`Provider ${this.name} does not support embeddings`);
    }
}