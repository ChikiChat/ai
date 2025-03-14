import {EmbeddingModel, LanguageModel} from "ai";
import {createMistral, MistralProvider} from "@ai-sdk/mistral";
import {Provider} from '../provider';
import {RequestInit} from "../../types";

export class Mistral extends Provider {
    id = 'mistral';
    name = 'Mistral';
    description = `Mistrals models provide cutting-edge generative capabilities for a variety of use cases.`;
    models = [
        {
            id: `${this.id}/mistral-saba-latest`,
            name: 'Saba',
            description: `Custom-trained model to serve specific geographies, markets, and customers.`,
            architecture: 'MistralForCausalLM',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 32768, output: 0},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000002000, output: 0.0000006000},
        },
        {
            id: `${this.id}/mistral-large-latest`,
            name: 'Large',
            description: `Top-tier reasoning for high-complexity tasks and sophisticated problems.`,
            architecture: 'MistralForCausalLM',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 32768, embedding: 12288, input: 131072, output: 0},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000020000, output: 0.0000060000},
        },
        {
            id: `${this.id}/pixtral-large-latest`,
            name: 'Pixtral',
            description: `Vision-capable large model with frontier reasoning capabilities.`,
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 32768, embedding: 28672, input: 131072, output: 0},
                text: {input: true, output: true},
                image: {input: true, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000020000, output: 0.0000060000},
        },
        {
            id: `${this.id}/ministral-8b-latest`,
            name: 'Ministral (8B) 24.10',
            description: `Powerful model for on-device use casesl`,
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
            price: {input: 0.0000001000, output: 0.0000001000},
        },
        {
            id: `${this.id}/ministral-3b-latest`,
            name: 'Ministral (3B) 24.10',
            description: `Most efficient edge model`,
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
            price: {input: 0.0000000400, output: 0.0000000400},
        },
        {
            id: `${this.id}/open-mistral-nemo`,
            name: 'Mistral Nemo',
            description: `Official open-mistral-nemo Mistral AI model`,
            architecture: 'MistralForCausalLM',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 131072, embedding: 5120, input: 131072, output: 0},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000001500, output: 0.0000001500},
        },
        {
            id: `${this.id}/pixtral-12b`,
            name: 'Pixtral (12B)',
            description: `Official pixtral-12b-2409 Mistral AI model`,
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 131072, embedding: 14336, input: 131072, output: 0},
                text: {input: true, output: true},
                image: {input: true, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000001500, output: 0.0000001500},
        },
        {
            id: `${this.id}/codestral-latest`,
            name: 'Codestral',
            description: `State-of-the-art Mistral model trained specifically for code tasks`,
            architecture: 'MistralForCausalLM',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 32768, embedding: 6144, input: 32768, output: 0},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000003000, output: 0.0000009000},
        },
        {
            id: `${this.id}/mistral-small-latest`,
            name: 'Mistral Small',
            description: `Cost-efficient, fast, and reliable option for use cases such as translation, summarization, and sentiment analysis.`,
            architecture: 'MistralForCausalLM',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 32768, embedding: 6144, input: 32768, output: 0},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000001000, output: 0.0000003000},
        },
        {
            id: `${this.id}/open-mixtral-8x22b`,
            name: 'Mixtral (8X22B)',
            description: `Official open-mixtral-8x22b Mistral AI model`,
            architecture: 'MixtralForCausalLM',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 32000, embedding: 6144, input: 65536, output: 0},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000020000, output: 0.0000060000},
        },
        {
            id: `${this.id}/open-mixtral-8x7b`,
            name: 'Mixtral (8X7B)',
            description: `Official open-mixtral-8x7b Mistral AI model`,
            architecture: 'MixtralForCausalLM',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 32000, embedding: 4096, input: 32768, output: 0},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000007000, output: 0.0000007000},
        },
        {
            id: `${this.id}/open-mistral-7b`,
            name: 'Mistral (7B)',
            description: `Official open-mistral-7b Mistral AI model`,
            architecture: 'MistralForCausalLM',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 32000, embedding: 4096, input: 32768, output: 0},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000002500, output: 0.0000002500},
        },
        {
            id: `${this.id}/mistral-embed`,
            name: 'Mistral Embed',
            description: `State-of-the-art semantic for extracting representation of text extracts.`,
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 1024, input: 8192, output: 0},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000001000, output: 0.0000000000},
        },
    ];
    default = {
        baseURL: 'https://api.mistral.ai/v1',
        pricingURL: 'https://mistral.ai/technology',
        manageAPIKeysURL: 'https://console.mistral.ai/api-keys/',
        model: 'open-mistral-7b',
    };

    create(init: RequestInit = {}): MistralProvider {
        return createMistral({baseURL: this.baseUrl(init.baseURL), apiKey: this.apiKey(init.apiKey), headers: init.headers});
    }

    languageModel(model: string, init: RequestInit = {}): LanguageModel {
        return this.create(init)(model);
    }

    embeddingModel(model: string, init: RequestInit = {}): EmbeddingModel<string> {
        return this.create(init).textEmbeddingModel(model);
    }
}