/**
 * Interface for a logger that provides methods to log messages at different levels.
 * Each method accepts a message and an optional set of key-value pairs to include in the log.
 */
export interface ILogger {
    readonly name: string;

    /**
     * Logs an informational message.
     * @param message - The message to log.
     * @param keyValuePairs - Optional key-value pairs to include in the log.
     */
    info(message: string, keyValuePairs?: { [key: string]: any }): void;

    /**
     * Logs an error message.
     * @param error - The error to log.
     * @param keyValuePairs - Optional key-value pairs to include in the log.
     */
    error(error: Error, keyValuePairs?: { [key: string]: any }): void;

    /**
     * Logs a warning message.
     * @param message - The message to log.
     * @param keyValuePairs - Optional key-value pairs to include in the log.
     */
    warn(message: string, keyValuePairs?: { [key: string]: any }): void;

    /**
     * Logs a debug message.
     * @param message - The message to log.
     * @param keyValuePairs - Optional key-value pairs to include in the log.
     */
    debug(message: string, keyValuePairs?: { [key: string]: any }): void;
}

/**
 * A logger implementation that outputs log messages to the console.
 * It provides methods to log messages at different levels: info, error, warn, and debug.
 * The debug method only logs messages in a development environment.
 */
export class Logger implements ILogger {
    /**
     * The name of the logger.
     */
    readonly name: string;

    /**
     * Creates a new instance of Logger.
     * @param name - The name of the logger.
     */
    constructor(name: string) {
        this.name = name;
    }

    /**
     * Logs an informational message to the console.
     * @param message - The message to log.
     * @param keyValuePairs - Optional key-value pairs to include in the log.
     */
    info(message: string, keyValuePairs?: { [key: string]: any }): void {
        console.log(`[INFO ${this.name}]`, message, keyValuePairs ? JSON.stringify(keyValuePairs) : '');
    }

    /**
     * Logs an error message to the console.
     * @param error - The error to log.
     * @param keyValuePairs - Optional key-value pairs to include in the log.
     */
    error(error: Error, keyValuePairs?: { [key: string]: any }): void {
        console.error(`[ERROR ${this.name}]`, error.message, keyValuePairs ? JSON.stringify(keyValuePairs) : '');
    }

    /**
     * Logs a warning message to the console.
     * @param message - The message to log.
     * @param keyValuePairs - Optional key-value pairs to include in the log.
     */
    warn(message: string, keyValuePairs?: { [key: string]: any }): void {
        console.warn(`[WARN ${this.name}]`, message, keyValuePairs ? JSON.stringify(keyValuePairs) : '');
    }

    /**
     * Logs a debug message to the console only in a development environment.
     * @param message - The message to log.
     * @param keyValuePairs - Optional key-value pairs to include in the log.
     */
    debug(message: string, keyValuePairs?: { [key: string]: any }): void {
        if (process.env.NODE_ENV === 'development') {
            console.log(`[DEBUG ${this.name}]`, message, keyValuePairs ? JSON.stringify(keyValuePairs) : '');
        }
    }
}