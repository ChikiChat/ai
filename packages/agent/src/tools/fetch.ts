import {tool} from 'ai';
import {z} from 'zod';
import {TaskFetch} from "../tasks";

/**
 * Defines a tool for fetching content from a given URL using the TaskFetch class.
 * This tool retrieves the content of a specified URL and returns it as a string.
 */
export const toolFetch = tool({
    description: 'Fetch the content from a given URL',
    parameters: z.object({url: z.string().describe('The URL of the website to fetch')}),
    execute: async ({url}) => (await (new TaskFetch()).execute({url})).output
})