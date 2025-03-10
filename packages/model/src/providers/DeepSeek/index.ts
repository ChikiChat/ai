import {EmbeddingModel, LanguageModel} from "ai";
import {createOpenAI, OpenAIProvider} from "@ai-sdk/openai";
import {Provider} from '../provider';
import {RequestInit} from "../../types";

export class DeepSeek extends Provider {
    id = 'deepseek';
    name = 'DeepSeek';
    description = `DeepSeek, unravel the mystery of AGI with curiosity. Answer the essential question with long-termism.`;
    models = [
        {
            id: `${this.id}/deepseek-reasoner`,
            name: 'DeepSeek R1',
            description: ``,
            architecture: 'DeepseekV3ForCausalLM',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 129280, embedding: 7168, input: 65536, output: 8192},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000005500, output: 0.0000021900},
        },
        {
            id: `${this.id}/deepseek-chat`,
            name: 'DeepSeek V3',
            description: ``,
            architecture: 'DeepseekV3ForCausalLM',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 129280, embedding: 7168, input: 65536, output: 8192},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000002700, output: 0.0000011000},
        },
    ];
    default = {
        baseURL: 'https://api.deepseek.com/v1',
        pricingURL: 'https://api-docs.deepseek.com/quick_start/pricing',
        manageAPIKeysURL: 'https://platform.deepseek.com/apiKeys',
        model: 'deepseek-chat',
    };

    create(init: RequestInit = {}): OpenAIProvider {
        return createOpenAI({name: this.name, baseURL: this.baseUrl(init.baseURL), apiKey: this.apiKey(init.apiKey), headers: init.headers});
    }

    languageModel(model: string, init: RequestInit = {}): LanguageModel {
        return this.create(init)(model);
    }

    embeddingModel(_model: string, _init: RequestInit = {}): EmbeddingModel<string> {
        throw new Error(`Provider ${this.name} does not support embeddings`);
    }
}