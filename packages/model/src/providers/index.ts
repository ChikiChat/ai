export * from './provider'
export * from './AI21'
export * from './Anthropic'
export * from './Cohere'
export * from './DeepSeek'
export * from './GoogleGenerativeAI'
export * from './Groq'
export * from './Mistral'
export * from './Nvidia'
export * from './OpenAI'
export * from './OpenRouter'
export * from './SambaNova'
export * from './xAI'

import {Provider} from "./provider";
import {AI21} from "./AI21";
import {Anthropic} from "./Anthropic";
import {Cohere} from "./Cohere";
import {DeepSeek} from "./DeepSeek";
import {GoogleGenerativeAI} from "./GoogleGenerativeAI";
import {Groq} from "./Groq";
import {Mistral} from "./Mistral";
import {Nvidia} from "./Nvidia";
import {OpenAI} from "./OpenAI";
import {OpenRouter} from "./OpenRouter";
import {SambaNova} from "./SambaNova";
import {xAI} from "./xAI";

/**
 * List of all providers.
 */
export const providers: Array<Provider> = [
    new AI21(),
    new Anthropic(),
    new Cohere(),
    new DeepSeek(),
    new GoogleGenerativeAI(),
    new Groq(),
    new Mistral(),
    new Nvidia(),
    new OpenAI(),
    new OpenRouter(),
    new SambaNova(),
    new xAI(),
];

/**
 * Flatten the list of models from all providers.
 */
export const models = providers.flatMap(provider => provider.models);