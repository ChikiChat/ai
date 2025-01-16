import {z} from "zod";
import {Task} from "./task";
import {Logger} from "../logger";

/**
 * Input schema for the TaskFetch task.
 */
const InputSchema = z.object({
    url: z.string().url(),
    method: z.optional(z.enum([
        'ACL', 'BIND', 'CHECKIN', 'CHECKOUT', 'COPY', 'DELETE', 'GET', 'HEAD', 'LABEL', 'LINK', 'LOCK', 'MERGE',
        'MKACTIVITY', 'MKCALENDAR', 'MKCOL', 'MKREDIRECTREF', 'MKWORKSPACE', 'MOVE', 'OPTIONS', 'ORDERPATCH',
        'PATCH', 'POST', 'PRI', 'PROPFIND', 'PROPPATCH', 'PUT', 'REBIND', 'REPORT', 'SEARCH', 'TRACE', 'UNBIND',
        'UNCHECKOUT', 'UNLINK', 'UNLOCK', 'UPDATE', 'UPDATEREDIRECTREF', 'VERSION-CONTROL'
    ]).default('GET')),
    headers: z.optional(z.record(z.string(), z.string()).default({
        'User-Agent': 'ChikiChat-Fetch/0.0.x (+https://chiki.chat)'
    })),
    body: z.optional(z.union([z.string(), z.instanceof(Blob), z.instanceof(FormData), z.instanceof(URLSearchParams), z.instanceof(ReadableStream), z.instanceof(ArrayBuffer)])),
    maxRetries: z.number().default(3),
    timeout: z.number().default(5000)
});

/**
 * Output schema for the TaskFetch task.
 */
const OutputSchema = z.object({
    output: z.string().trim(),
    status: z.number(),
    headers: z.record(z.string(), z.string()),
});

type Input = z.infer<typeof InputSchema>;
type Output = z.infer<typeof OutputSchema>;

/**
 * A task class that fetches data from a specified URL with retry logic.
 * Extends the base Task class and returns a Response object.
 */
export class TaskFetch extends Task<typeof InputSchema, typeof OutputSchema> {
    /**
     * Constructs a new TaskFetch instance.
     */
    constructor(logger: Logger) {
        super('Fetch', 'Fetches data from a specified URL.', logger);
    }

    /**
     * Returns the input and output schemas for the TaskFetch task.
     *
     * @returns An object containing the input and output schemas.
     */
    schema(): { input: typeof InputSchema, output: typeof OutputSchema } {
        return {input: InputSchema, output: OutputSchema};
    }

    /**
     * Perform the fetch operation with retry logic.
     *
     * @param input - The input object containing the URL, method, headers, body, maxRetries, and timeout.
     * @returns A promise that resolves to the Response object from the fetch request.
     * @throws Will throw an error if the fetch request fails after the maximum number of retries.
     */
    protected async perform(input: Input): Promise<Output> {
        const {url, method, headers, body, maxRetries, timeout} = this.schema().input.parse(input);
        let retries = 0;

        while (retries < maxRetries) {
            try {
                const controller = new AbortController();
                const id = setTimeout(() => controller.abort(), timeout);
                const response = await fetch(url, {
                    method: method,
                    headers: headers,
                    body: body,
                    signal: controller.signal,
                });
                const output = await response.text();

                clearTimeout(id);

                const h: Record<string, string> = {};
                response.headers.forEach((value, key) => {
                    h[key] = value;
                });

                this.logger.debug('task(fetch)', {
                    url,
                    method,
                    inputHeaders: headers,
                    body,
                    maxRetries,
                    timeout,
                    retries,
                    output,
                    status: response.status,
                    outputHeaders: h
                });

                return {
                    output: output,
                    status: response.status,
                    headers: h,
                };
            } catch (error: unknown) {
                retries++;
                if (retries >= maxRetries) {
                    throw new Error(`Fetch request to ${url} failed after ${maxRetries} retries.`);
                }

                if (error instanceof Error) {
                    if (error.name === 'AbortError') {
                        this.logger.warn(`Fetch request to ${url} timed out. Retrying...`);
                    } else {
                        this.logger.warn(`Fetch request to ${url} failed with error: ${error.message}. Retrying...`);
                    }
                } else {
                    console.warn(`Fetch request to ${url} failed with an unknown error. Retrying...`);
                }
            }
        }

        throw new Error(`Fetch request to ${url} failed after ${maxRetries} retries.`);
    }
}
