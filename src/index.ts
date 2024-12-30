import {Provider} from "./types";
import {AI21} from "./AI21";
import {Anthropic} from "./Anthropic";
import {Cohere} from "./Cohere";
import {GoogleGenerativeAI} from "./GoogleGenerativeAI";
import {Groq} from "./Groq";
import {Mistral} from "./Mistral";
import {OpenAI} from "./OpenAI";
import {SambaNova} from "./SambaNova";
import {EmbeddingModel, LanguageModel} from "ai";

export * from "./types";
export {AI21, Anthropic, Cohere, GoogleGenerativeAI, Groq, Mistral, OpenAI, SambaNova};

export const providers: Array<Provider> = [
    new AI21(),
    new Anthropic(),
    new Cohere(),
    new GoogleGenerativeAI(),
    new Groq(),
    new Mistral(),
    new OpenAI(),
    new SambaNova(),
];

export const getProvider = (id: string) => providers.find(provider => provider.id === id);
export const models = providers.flatMap(provider => provider.models);
export const DEFAULT_LANGUAGE_MODEL_NAME: string = 'anthropic/claude-3-5-sonnet-20241022';
export const DEFAULT_EMBEDDING_MODEL_NAME: string = 'mistral/mistral-embed';

export const languageModel = (apiKey: string, model: string = DEFAULT_LANGUAGE_MODEL_NAME): LanguageModel => {
    return <LanguageModel>getModel(apiKey, model, (provider, apiKey, modelID) => provider.languageModel(apiKey, modelID));
};

export const embeddingModel = (apiKey: string, model: string = DEFAULT_EMBEDDING_MODEL_NAME): EmbeddingModel<string> => {
    return <EmbeddingModel<string>>getModel(apiKey, model, (provider, apiKey, modelID) => provider.embeddingModel(apiKey, modelID));
}

const getModel = (apiKey: string, model: string, fn: (provider: Provider, apiKey: string, modelID: string) => any): LanguageModel | EmbeddingModel<string> => {
    const providerID = model.split('/')[0] ?? '';
    const provider = getProvider(providerID);
    if (!provider) {
        throw new Error(`Provider ${providerID} not found`);
    }

    const modelID = model.split('/').slice(1).join('/');
    if (!provider.models.find(m => m.id === model)) {
        throw new Error(`Provider ${providerID} does not have model ${modelID}`);
    }

    return fn(provider, apiKey, modelID);
};
