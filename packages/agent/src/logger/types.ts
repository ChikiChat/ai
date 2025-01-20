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