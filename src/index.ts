import {Model, Provider, UsageModel} from "./types";
import {AI21} from "./AI21";
import {Anthropic} from "./Anthropic";
import {Cohere} from "./Cohere";
import {GoogleGenerativeAI} from "./GoogleGenerativeAI";
import {Groq} from "./Groq";
import {Mistral} from "./Mistral";
import {OpenAI} from "./OpenAI";
import {SambaNova} from "./SambaNova";
import {xAI} from "./xAI";
import {EmbeddingModel, EmbeddingModelUsage, LanguageModel, LanguageModelUsage} from "ai";

export * from "./types";
export {AI21, Anthropic, Cohere, GoogleGenerativeAI, Groq, Mistral, OpenAI, SambaNova, xAI};

export const DEFAULT_LANGUAGE_MODEL_NAME: string = 'anthropic/claude-3-5-sonnet-20241022';
export const DEFAULT_EMBEDDING_MODEL_NAME: string = 'mistral/mistral-embed';

export const providers: Array<Provider> = [
    new AI21(),
    new Anthropic(),
    new Cohere(),
    new GoogleGenerativeAI(),
    new Groq(),
    new Mistral(),
    new OpenAI(),
    new SambaNova(),
    new xAI(),
];

export const models = providers.flatMap(provider => provider.models);

export const languageModel = (model: string, apiKey: string = ''): LanguageModel => {
    return <LanguageModel>getModel(model, apiKey, (provider: Provider, modelID: string, apiKey: string) => provider.languageModel(modelID, apiKey));
};

export const embeddingModel = (model: string, apiKey: string = ''): EmbeddingModel<string> => {
    return <EmbeddingModel<string>>getModel(model, apiKey, (provider: Provider, modelID: string, apiKey: string) => provider.embeddingModel(modelID, apiKey));
}

export const usageModel = (model: string, usage: LanguageModelUsage | EmbeddingModelUsage): UsageModel => {
    const {model: m} = providerAndModel(model);

    if (isEmbeddingModelUsage(usage)) {
        return {
            tokens: {
                input: usage.tokens,
                output: 0
            },
            cost: {
                input: m.price.input * usage.tokens,
                output: 0
            }
        };
    }

    return {
        tokens: {
            input: usage.promptTokens,
            output: usage.completionTokens
        },
        cost: {
            input: m.price.input * usage.promptTokens,
            output: m.price.output * usage.completionTokens
        }
    };
}

export const providerAndModel = (model: string): {
    provider: Provider,
    model: Model,
    providerID: string,
    modelID: string
} => {
    const providerID = model.split('/')[0]?.toLowerCase() ?? '';
    const p = providers.find(p => p.id === providerID);
    if (!p) {
        throw new Error(`Provider ${providerID} not found`);
    }

    const modelID = model.split('/').slice(1).join('/');
    const m = p.models.find(m => m.id === model);
    if (!m) {
        throw new Error(`Provider ${p.name} does not have model ${modelID}`);
    }

    return {provider: p, model: m, providerID, modelID};
};

const getModel = (model: string, apiKey: string, fn: (provider: Provider, modelID: string, apiKey: string) => LanguageModel | EmbeddingModel<string>): LanguageModel | EmbeddingModel<string> => {
    const {provider, modelID} = providerAndModel(model);

    return fn(provider, modelID, apiKey);
};

const isEmbeddingModelUsage = (usage: LanguageModelUsage | EmbeddingModelUsage): usage is EmbeddingModelUsage => {
    return (usage as EmbeddingModelUsage).tokens !== undefined;
};
