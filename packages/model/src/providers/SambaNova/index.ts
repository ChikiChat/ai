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
            id: `${this.id}/DeepSeek-R1`,
            name: 'DeepSeek R1',
            description: '',
            architecture: 'DeepseekV3ForCausalLM',
            capabilities: {
                embedding: false,
                tool_call: false,
                rerank: false,
                features: [],
                size: {vocab: 129280, embedding: 7168, input: 16384, output: 4096},
                text: {input: true, output: true},
                image: {input: true, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000050000, output: 0.0000070000},
        },
        {
            id: `${this.id}/DeepSeek-R1-Distill-Llama-70B`,
            name: 'DeepSeek (70B) R1 Distill Llama',
            description: '',
            architecture: 'LlamaForCausalLM',
            capabilities: {
                embedding: false,
                tool_call: false,
                rerank: false,
                features: [],
                size: {vocab: 128256, embedding: 8192, input: 131072, output: 4096},
                text: {input: true, output: true},
                image: {input: true, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000007000, output: 0.0000014000},
        },
        {
            id: `${this.id}/Qwen3-32B`,
            name: 'Qwen 3 (32B)',
            description: '',
            architecture: 'Qwen3ForCausalLM',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 151936, embedding: 5120, input: 40960, output: 4096},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000004000, output: 0.0000008000},
        },
        {
            id: `${this.id}/QwQ-32B`,
            name: 'QwQ (32B) ',
            description: '',
            architecture: 'Qwen2ForCausalLM',
            capabilities: {
                embedding: false,
                tool_call: false,
                rerank: false,
                features: [],
                size: {vocab: 152064, embedding: 5120, input: 16384, output: 4096},
                text: {input: true, output: true},
                image: {input: true, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000005000, output: 0.0000010000},
        },
        {
            id: `${this.id}/DeepSeek-V3-0324`,
            name: 'DeepSeek V3',
            description: '',
            architecture: 'DeepseekV3ForCausalLM',
            capabilities: {
                embedding: false,
                tool_call: false,
                rerank: false,
                features: [],
                size: {vocab: 129280, embedding: 7168, input: 16384, output: 4096},
                text: {input: true, output: true},
                image: {input: true, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000010000, output: 0.0000015000},
        },
        {
            id: `${this.id}/Llama-4-Maverick-17B-128E-Instruct`,
            name: 'LLaMA 4 (128x17B) Maverick',
            description: '',
            architecture: 'Llama4ForConditionalGeneration',
            capabilities: {
                embedding: false,
                tool_call: false,
                rerank: false,
                features: [],
                size: {vocab: 202048, embedding: 5120, input: 8192, output: 4096},
                text: {input: true, output: true},
                image: {input: true, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000006300, output: 0.0000018000},
        },
        {
            id: `${this.id}/Llama-4-Scout-17B-16E-Instruct`,
            name: 'LLaMA 4 (16x17B) Scout',
            description: '',
            architecture: 'Llama4ForConditionalGeneration',
            capabilities: {
                embedding: false,
                tool_call: false,
                rerank: false,
                features: [],
                size: {vocab: 202048, embedding: 5120, input: 8192, output: 4096},
                text: {input: true, output: true},
                image: {input: true, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000004000, output: 0.0000007000},
        },
        {
            id: `${this.id}/Meta-Llama-3.3-70B-Instruct`,
            name: 'LLaMa 3.3 (70B)',
            description: '',
            architecture: 'LlamaForCausalLM',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 128256, embedding: 8192, input: 131072, output: 3072},
                text: {input: true, output: true},
                image: {input: true, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000006000, output: 0.0000012000},
        },
        {
            id: `${this.id}/Meta-Llama-3.2-3B-Instruct`,
            name: 'LLaMa 3.2 (3B)',
            description: '',
            architecture: 'LlamaForCausalLM',
            capabilities: {
                embedding: false,
                tool_call: false,
                rerank: false,
                features: [],
                size: {vocab: 128256, embedding: 3072, input: 8192, output: 4096},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000000800, output: 0.0000001600},
        },
        {
            id: `${this.id}/Meta-Llama-3.2-1B-Instruct`,
            name: 'LLaMa 3.2 (1B)',
            description: '',
            architecture: 'LlamaForCausalLM',
            capabilities: {
                embedding: false,
                tool_call: false,
                rerank: false,
                features: [],
                size: {vocab: 128256, embedding: 2048, input: 16384, output: 4096},
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
            description: '',
            architecture: 'LlamaForCausalLM',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 128256, embedding: 16384, input: 16384, output: 4096},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000050000, output: 0.0000100000},
        },
        {
            id: `${this.id}/Meta-Llama-3.1-8B-Instruct`,
            name: 'LLaMa 3.1 (8B) Instruct',
            description: '',
            architecture: 'LlamaForCausalLM',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 128256, embedding: 4096, input: 16384, output: 4096},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000001000, output: 0.0000002000},
        },
        {
            id: `${this.id}/Meta-Llama-Guard-3-8B`,
            name: 'LLaMa (8B) Guard',
            description: '',
            architecture: 'LlamaForCausalLM',
            capabilities: {
                embedding: false,
                tool_call: false,
                rerank: false,
                features: [],
                size: {vocab: 128256, embedding: 4096, input: 16384, output: 4096},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000003000, output: 0.0000003000},
        },
        {
            id: `${this.id}/E5-Mistral-7B-Instruct`,
            name: 'E5 Mistral (7B) Instruct',
            description: '',
            architecture: 'MistralModel',
            capabilities: {
                embedding: true,
                tool_call: false,
                rerank: false,
                features: [],
                size: {vocab: 32000, embedding: 4096, input: 4096, output: 0},
                text: {input: true, output: false},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000001300, output: 0.0000000000},
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

    embeddingModel(model: string, init: RequestInit = {}): EmbeddingModel<string> {
        return this.create(init).embedding(model)
    }
}