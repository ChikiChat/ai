import {Provider} from '../../types';
import {EmbeddingModel, LanguageModel} from "ai";
import {createOpenAI, OpenAIProvider} from "@ai-sdk/openai";

export class DeepSeek extends Provider {
    id = 'deepseek';
    name = 'DeepSeek';
    description = ``;
    models = [
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
            price: {input: 0.0000001400, output: 0.0000002800},
        },
    ];
    default = {
        apiURL: 'https://api.deepseek.com/v1',
        pricingURL: 'https://api-docs.deepseek.com/quick_start/pricing',
        manageAPIKeysURL: 'https://platform.deepseek.com/apiKeys',
        model: 'deepseek-chat',
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