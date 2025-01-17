import {tool} from 'ai';
import {z} from 'zod';
import {TaskHttpFetch} from '../../tasks';

/**
 * Defines a tool for fetching content from a given URL using the TaskFetch class.
 * This tool retrieves the content of a specified URL and returns it as a string.
 */
export const toolHttpFetch = tool({
    description: 'Fetch the content from a given URL',
    parameters: z.object({url: z.string().describe('The URL of the website to fetch')}),
    execute: async ({url}) => (await (new TaskHttpFetch()).execute({url})).output
})