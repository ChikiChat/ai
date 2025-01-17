import {Logger} from './logger';

/**
 * A dummy logger implementation that does not output any log messages.
 * This class is useful for testing or scenarios where logging is not required.
 */
export class LoggerDummy extends Logger {
    /**
     * Logs an informational message (no output).
     * @param _message - The message to log.
     * @param _keyValuePairs - Optional key-value pairs to include in the log.
     */
    info(_message: string, _keyValuePairs?: { [key: string]: any }): void {
        // No output
    }

    /**
     * Logs an error message (no output).
     * @param _error - The error to log.
     * @param _keyValuePairs - Optional key-value pairs to include in the log.
     */
    error(_error: Error, _keyValuePairs?: { [key: string]: any }): void {
        // No output
    }

    /**
     * Logs a warning message (no output).
     * @param _message - The message to log.
     * @param _keyValuePairs - Optional key-value pairs to include in the log.
     */
    warn(_message: string, _keyValuePairs?: { [key: string]: any }): void {
        // No output
    }

    /**
     * Logs a debug message (no output).
     * @param _message - The message to log.
     * @param _keyValuePairs - Optional key-value pairs to include in the log.
     */
    debug(_message: string, _keyValuePairs?: { [key: string]: any }): void {
        // No output
    }
}