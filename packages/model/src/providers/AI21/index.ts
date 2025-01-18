import {EmbeddingModel, LanguageModel} from "ai";
import {createOpenAI, OpenAIProvider} from "@ai-sdk/openai";
import {Provider} from '../provider';

export class AI21 extends Provider {
    id = 'ai21';
    name = 'AI21 Labs';
    description = `AI21 Labs builds Foundation Models and AI Systems for the enterprise that accelerate the use of GenAI in production.`;
    models = [
        {
            id: `${this.id}/jamba-1.5-large`,
            name: 'Jamba 1.5 Large',
            description: `The most powerful and efficient long context model`,
            architecture: 'JambaForCausalLM',
            capabilities: {
                embedding: false,
                tool_call: false,
                rerank: false,
                features: [],
                size: {vocab: 65536, embedding: 8192, input: 262144, output: 4096},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000020000, output: 0.0000080000},
        },
        {
            id: `${this.id}/jamba-1.5-mini`,
            name: 'Jamba 1.5 Mini',
            description: `Efficient & lightweight model for a wide range of tasks`,
            architecture: 'JambaForCausalLM',
            capabilities: {
                embedding: false,
                tool_call: false,
                rerank: false,
                features: [],
                size: {vocab: 65536, embedding: 8192, input: 262144, output: 4096},
                text: {input: true, output: true},
                image: {input: false, output: false},
                audio: {input: false, output: false},
                video: {input: false, output: false},
            },
            price: {input: 0.0000002000, output: 0.0000004000},
        },
    ];
    default = {
        apiURL: 'https://api.ai21.com/studio/v1',
        pricingURL: 'https://www.ai21.com/pricing',
        manageAPIKeysURL: 'https://studio.ai21.com/v2/account/api-key',
        model: 'jamba-1.5-mini',
    };

    create(apiKey: string): OpenAIProvider {
        return createOpenAI({name: this.name, baseURL: this.default.apiURL, apiKey: this.apiKey(apiKey)});
    }

    languageModel(model: string, apiKey: string = ''): LanguageModel {
        return this.create(apiKey)(model);
    }

    embeddingModel(_model: string, _apiKey: string): EmbeddingModel<string> {
        throw new Error(`Provider ${this.name} does not support embeddings`);
    }
}