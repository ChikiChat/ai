import {Provider} from '../types';
import {EmbeddingModel, generateText, LanguageModel} from "ai";
import {createMistral, MistralProvider} from "@ai-sdk/mistral";

export class Mistral extends Provider {
    id = 'mistral';
    name = 'Mistral';
    description = `Mistrals models provide cutting-edge generative capabilities for a variety of use cases.`;
    models = [
        {
            id: `${this.id}/mistral-moderation-latest`,
            name: 'Mistral Moderation Latest',
            description: `Official mistral-moderation-2411 Mistral AI model`,
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: false,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 32768, output: 0},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000001000, output: 0.0000000000},
        },
        {
            id: `${this.id}/mistral-moderation-2411`,
            name: 'Mistral Moderation',
            description: `Official mistral-moderation-2411 Mistral AI model`,
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: false,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 32768, output: 0},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000001000, output: 0.0000000000},
        },
        {
            id: `${this.id}/mistral-large-2411`,
            name: 'Mistral Large',
            description: `Official mistral-large-2411 Mistral AI model`,
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
            price: {input: 0.0000020000, output: 0.0000060000},
        },
        {
            id: `${this.id}/pixtral-large-2411`,
            name: 'Pixtral Large',
            description: `Official pixtral-large-2411 Mistral AI model`,
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 131072, output: 0},
                text: {input: true, output: true},
                image: {input: true, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000020000, output: 0.0000060000},
        },
        {
            id: `${this.id}/pixtral-large-latest`,
            name: 'Pixtral Large Latest',
            description: `Official pixtral-large-2411 Mistral AI model`,
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 0, embedding: 0, input: 131072, output: 0},
                text: {input: true, output: true},
                image: {input: true, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000020000, output: 0.0000060000},
        },
        {
            id: `${this.id}/ministral-8b-latest`,
            name: 'Ministral 8b Latest',
            description: `Official ministral-8b-2410 Mistral AI model`,
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
            name: 'Ministral 3b Latest',
            description: `Official ministral-3b-2410 Mistral AI model`,
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
                size: {vocab: 131072, embedding: 0, input: 131072, output: 0},
                text: {input: true, output: true},
                image: {input: true, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000001500, output: 0.0000001500},
        },
        {
            id: `${this.id}/codestral-2405`,
            name: 'Codestral',
            description: `Official codestral-2405 Mistral AI model`,
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
            price: {input: 0.0000002000, output: 0.0000006000},
        },
        {
            id: `${this.id}/mistral-large-2407`,
            name: 'Mistral Large',
            description: `Official mistral-large-2407 Mistral AI model`,
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
            price: {input: 0.0000020000, output: 0.0000060000},
        },
        {
            id: `${this.id}/mistral-small-2409`,
            name: 'Mistral Small',
            description: `Official mistral-small-2409 Mistral AI model`,
            architecture: '',
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
        }, {
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
    apiURL = 'https://api.mistral.ai/v1';
    pricingURL = 'https://mistral.ai/technology';

    create(apiKey: string): MistralProvider {
        return createMistral({baseURL: this.apiURL, apiKey: this.apiKey(apiKey)});
    }

    languageModel(model: string, apiKey: string = ''): LanguageModel {
        return this.create(apiKey)(model);
    }

    embeddingModel(model: string, apiKey: string = ''): EmbeddingModel<string> {
        return this.create(apiKey).textEmbeddingModel(model);
    }

    async check(apiKey: string) {
        try {
            await generateText({
                model: this.languageModel(apiKey, 'open-mistral-7b'),
                prompt: `hi`,
                maxTokens: 1,
            });

            return true;
        } catch (e) {
            return false;
        }
    }
}