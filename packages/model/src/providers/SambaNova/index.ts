import {EmbeddingModel, LanguageModel} from "ai";
import {createOpenAI, OpenAIProvider} from "@ai-sdk/openai";
import {Provider} from '../provider';
import {RequestInit} from "../../types";

export class SambaNova extends Provider {
    id = 'sambanova';
    name = 'SambaNova';
    description = `SambaNova is a leading enterprise AI company specializing in advanced AI platforms.`;
    models = [
        {
            id: `${this.id}/Qwen2.5-Coder-32B-Instruct`,
            name: 'Qwen 2.5 (32B) Coder Instruct',
            description: ``,
            architecture: 'Qwen2ForCausalLM',
            capabilities: {
                embedding: false,
                tool_call: false,
                rerank: false,
                features: [],
                size: {vocab: 152064, embedding: 5120, input: 8192, output: 1600},
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
            architecture: 'Qwen2ForCausalLM',
            capabilities: {
                embedding: false,
                tool_call: false,
                rerank: false,
                features: [],
                size: {vocab: 152064, embedding: 8192, input: 8192, output: 1600},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000020000, output: 0.0000040000},
        },
        {
            id: `${this.id}/Meta-Llama-3.3-70B-Instruct`,
            name: 'LLaMa 3.3 (70B) Instruct',
            description: ``,
            architecture: 'LlamaForCausalLM',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 128256, embedding: 8192, input: 4096, output: 1600},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000006000, output: 0.0000012000},
        },
        {
            id: `${this.id}/Llama-3.2-90B-Vision-Instruct`,
            name: 'LLaMa 3.2 (90B) Vision Instruct',
            description: ``,
            architecture: 'MllamaForConditionalGeneration',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 128256, embedding: 8192, input: 4096, output: 1600},
                text: {input: true, output: true},
                image: {input: true, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000008000, output: 0.0000016000},
        },
        {
            id: `${this.id}/Llama-3.2-11B-Vision-Instruct`,
            name: 'LLaMa 3.2 (11B) Vision Instruct',
            description: ``,
            architecture: 'MllamaForConditionalGeneration',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 128256, embedding: 4096, input: 4096, output: 1600},
                text: {input: true, output: true},
                image: {input: true, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000001500, output: 0.0000003000},
        },
        {
            id: `${this.id}/Llama-3.2-3B-Instruct`,
            name: 'LLaMa 3.2 (3B) Instruct',
            description: ``,
            architecture: 'LlamaForCausalLM',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 128256, embedding: 3072, input: 4096, output: 1600},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000000800, output: 0.0000001600},
        },
        {
            id: `${this.id}/Llama-3.2-1B-Instruct`,
            name: 'LLaMa 3.2 (1B) Instruct',
            description: ``,
            architecture: 'LlamaForCausalLM',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 128256, embedding: 2048, input: 4096, output: 1600},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000000400, output: 0.0000000800},
        },
        {
            id: `${this.id}/Meta-Llama-3.1-405B-Instruct`,
            name: 'LLaMa 3.1 (405B) Instruct',
            description: ``,
            architecture: 'LlamaForCausalLM',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 128256, embedding: 16384, input: 4096, output: 1600},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000050000, output: 0.0000100000},
        },
        {
            id: `${this.id}/Meta-Llama-3.1-70B-Instruct`,
            name: 'LLaMa 3.1 (70B) Instruct',
            description: ``,
            architecture: 'LlamaForCausalLM',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 128256, embedding: 8192, input: 4096, output: 1600},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000006000, output: 0.0000012000},
        },
        {
            id: `${this.id}/Meta-Llama-3.1-8B-Instruct`,
            name: 'LLaMa 3.1 (8B) Instruct',
            description: ``,
            architecture: 'LlamaForCausalLM',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 128256, embedding: 4096, input: 4096, output: 1600},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000001000, output: 0.0000002000},
        },
    ];
    default = {
        baseURL: 'https://api.sambanova.ai/v1',
        pricingURL: 'https://cloud.sambanova.ai/pricing',
        manageAPIKeysURL: 'https://cloud.sambanova.ai/apis',
        model: `Llama-3.2-1B-Instruct`,
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