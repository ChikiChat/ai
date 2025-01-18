import {EmbeddingModel, LanguageModel} from "ai";
import {createGroq, GroqProvider} from "@ai-sdk/groq";
import {Provider} from '../provider';

export class Groq extends Provider {
    id = 'groq';
    name = 'Groq';
    description = `The LPU™ Inference Engine by Groq is a hardware and software platform that delivers exceptional compute speed, quality, and energy efficiency.`;
    models = [
        {
            id: `${this.id}/llama-3.3-70b-specdec`,
            name: 'LLaMA 3.3 (70B) Specdec',
            description: ``,
            architecture: 'LlamaForCausalLM',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 128256, embedding: 8192, input: 8192, output: 8192},
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
            description: ``,
            architecture: 'Gemma2ForCausalLM',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 256000, embedding: 3584, input: 8192, output: 8192},
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
            description: ``,
            architecture: 'LlamaForCausalLM',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 128256, embedding: 8192, input: 131072, output: 8192},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000005900, output: 0.0000007900},
        },
        {
            id: `${this.id}/llama-3.2-90b-vision-preview`,
            name: 'LLaMA 3.2 (90B) Vision (Preview)',
            description: ``,
            architecture: 'MllamaForConditionalGeneration',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 128256, embedding: 8192, input: 8192, output: 4096},
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
            description: ``,
            architecture: 'MllamaForConditionalGeneration',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 128256, embedding: 4096, input: 8192, output: 4096},
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
            description: ``,
            architecture: 'LlamaForCausalLM',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 128256, embedding: 3072, input: 8192, output: 8192},
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
            description: ``,
            architecture: 'LlamaForCausalLM',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 128256, embedding: 2048, input: 8192, output: 8192},
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
            description: ``,
            architecture: 'LlamaForCausalLM',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 128256, embedding: 8192, input: 32768, output: 8192},
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
            description: ``,
            architecture: 'LlamaForCausalLM',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 128256, embedding: 4096, input: 131072, output: 8192},
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
            description: ``,
            architecture: 'LlamaForCausalLM',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 128256, embedding: 8192, input: 8192, output: 8192},
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
            description: ``,
            architecture: 'LlamaForCausalLM',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 128256, embedding: 8192, input: 8192, output: 8192},
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
            description: ``,
            architecture: 'LlamaForCausalLM',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 128256, embedding: 4096, input: 8192, output: 8192},
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
            description: ``,
            architecture: 'LlamaForCausalLM',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 128256, embedding: 4096, input: 8192, output: 8192},
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
            description: ``,
            architecture: '',
            capabilities: {
                embedding: false,
                tool_call: false,
                rerank: false,
                features: [],
                size: {vocab: 128256, embedding: 4096, input: 8192, output: 8192},
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
            description: ``,
            architecture: 'MixtralForCausalLM',
            capabilities: {
                embedding: false,
                tool_call: true,
                rerank: false,
                features: [],
                size: {vocab: 32000, embedding: 4096, input: 32768, output: 32768},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000002400, output: 0.0000002400},
        },
    ];
    default = {
        apiURL: 'https://api.groq.com/openai/v1',
        pricingURL: 'https://groq.com/pricing',
        manageAPIKeysURL: 'https://console.groq.com/keys',
        model: 'llama-3.1-8b-instant',
    };

    create(apiKey: string): GroqProvider {
        return createGroq({baseURL: this.default.apiURL, apiKey: this.apiKey(apiKey)});
    }

    languageModel(model: string, apiKey: string = ''): LanguageModel {
        return this.create(apiKey)(model);
    }

    embeddingModel(_model: string, _apiKey: string): EmbeddingModel<string> {
        throw new Error(`Provider ${this.name} does not support embeddings`);
    }
}