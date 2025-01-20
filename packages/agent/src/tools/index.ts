import {CoreTool} from "ai";
import {toolCalculate} from "./calculate";
import {toolHttpFetch} from "./http/fetch";

export * from './calculate';
export * from './http/fetch';

/**
 * A registry of tools available for use.
 * Each tool is identified by a unique string key.
 */
export const registry: Record<string, CoreTool> = {
    'calculate': toolCalculate,
    'http/fetch': toolHttpFetch,
};