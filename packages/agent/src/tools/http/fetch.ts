import {tool} from 'ai';
import {z} from 'zod';
import {TaskHttpFetch} from '../../tasks';

/**
 * Defines a tool for fetching content from a given URL using the TaskFetch class.
 * This tool retrieves the content of a specified URL and returns it as a string.
 */
export const toolHttpFetch = tool({
    description: 'Fetches the raw content from a specified URL using an HTTP request.',
    parameters: z.object({
        url: z.string().url().describe('The URL of the website or resource to fetch. Must be a valid URL.'),
        method: z.enum([
            'ACL', 'BIND', 'CHECKIN', 'CHECKOUT', 'COPY', 'DELETE', 'GET', 'HEAD', 'LABEL', 'LINK', 'LOCK', 'MERGE',
            'MKACTIVITY', 'MKCALENDAR', 'MKCOL', 'MKREDIRECTREF', 'MKWORKSPACE', 'MOVE', 'OPTIONS', 'ORDERPATCH',
            'PATCH', 'POST', 'PRI', 'PROPFIND', 'PROPPATCH', 'PUT', 'REBIND', 'REPORT', 'SEARCH', 'TRACE', 'UNBIND',
            'UNCHECKOUT', 'UNLINK', 'UNLOCK', 'UPDATE', 'UPDATEREDIRECTREF', 'VERSION-CONTROL'
        ]).default('GET').optional().describe('The HTTP method to use for the request. Defaults to "GET" if not specified.'),
        headers: z.record(z.string(), z.string()).optional().describe('A key-value object containing custom headers to include in the request. Each key is a header name and each value is the corresponding header value.'),
        body: z.string().optional().describe('The body content to include in the request. This is typically used for methods like POST or PUT where you need to send data to the server.'),
    }),
    execute: async ({url, method, headers, body}) => await (new TaskHttpFetch()).execute({
        url,
        method,
        headers,
        body,
        maxRetries: 1,
        timeout: 5000
    })
});
