import { Task } from "./task";

/**
 * A task class that fetches data from a specified URL with retry logic.
 * Extends the base Task class and returns a Response object.
 */
export class TaskFetch extends Task<Response> {
    /**
     * The maximum number of retries for the fetch request.
     */
    private readonly maxRetries: number;

    /**
     * The timeout duration (in milliseconds) for the fetch request.
     */
    private readonly timeout: number;

    /**
     * Constructs a new TaskFetch instance.
     *
     * @param maxRetries - The maximum number of retries for the fetch request (default is 3).
     * @param timeout - The timeout duration (in milliseconds) for the fetch request (default is 5000).
     */
    constructor(maxRetries: number = 3, timeout: number = 5000) {
        super('Fetch', 'Fetches data from a specified URL.');

        this.maxRetries = maxRetries;
        this.timeout = timeout;
    }

    /**
     * Executes the fetch operation with retry logic.
     * Fetches data from the specified URL using the provided method, headers, and body.
     *
     * @param url - The URL from which to fetch data.
     * @param method - The HTTP method to use for the fetch request (default is 'GET').
     * @param headers - The headers to include in the fetch request (default is an empty object).
     * @param body - The body to include in the fetch request (for POST, PUT, etc.).
     * @returns A promise that resolves to the Response object from the fetch request.
     * @throws Will throw an error if the fetch request fails after the maximum number of retries.
     */
    async run(url: string, method: string = 'GET', headers: HeadersInit = {}, body?: BodyInit): Promise<Response> {
        let retries = 0;

        while (retries < this.maxRetries) {
            try {
                const controller = new AbortController();
                const id = setTimeout(() => controller.abort(), this.timeout);

                const response = await fetch(url, {
                    method: method,
                    headers: headers,
                    body: body,
                    signal: controller.signal,
                });

                clearTimeout(id);
                return response;
            } catch (error: unknown) {
                if (error instanceof Error) {
                    if (error.name === 'AbortError') {
                        console.warn(`Fetch request to ${url} timed out. Retrying...`);
                    } else {
                        console.warn(`Fetch request to ${url} failed with error: ${error.message}. Retrying...`);
                    }
                } else {
                    console.warn(`Fetch request to ${url} failed with an unknown error. Retrying...`);
                }

                retries++;
                if (retries >= this.maxRetries) {
                    throw new Error(`Fetch request to ${url} failed after ${this.maxRetries} retries.`);
                }
            }
        }

        throw new Error(`Fetch request to ${url} failed after ${this.maxRetries} retries.`);
    }
}
