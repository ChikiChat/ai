import path from 'path';
import {Logger} from './logger';

/**
 * A logger implementation formatted for Kubernetes environments.
 * It outputs log messages to the console with a specific format that includes
 * timestamps, log levels, and optional key-value pairs. The debug method only
 * logs messages in a development environment.
 */
export class LoggerKubernetes extends Logger {
    /**
     * Logs an informational message to the console.
     * @param message - The message to log.
     * @param keyValuePairs - Optional key-value pairs to include in the log.
     */
    info(message: string, keyValuePairs?: { [key: string]: any }): void {
        console.log(this.format('I', message, keyValuePairs));
    }

    /**
     * Logs an error message to the console.
     * @param error - The error to log.
     * @param keyValuePairs - Optional key-value pairs to include in the log.
     */
    error(error: Error, keyValuePairs?: { [key: string]: any }): void {
        console.error(this.format('E', error.message, keyValuePairs));
    }

    /**
     * Logs a warning message to the console.
     * @param message - The message to log.
     * @param keyValuePairs - Optional key-value pairs to include in the log.
     */
    warn(message: string, keyValuePairs?: { [key: string]: any }): void {
        console.warn(this.format('W', message, keyValuePairs));
    }

    /**
     * Logs a debug message to the console only in a development environment.
     * @param message - The message to log.
     * @param keyValuePairs - Optional key-value pairs to include in the log.
     */
    debug(message: string, keyValuePairs?: { [key: string]: any }): void {
        if (process.env.NODE_ENV === 'development') {
            console.log(this.format('D', message, keyValuePairs));
        }
    }

    /**
     * Formats the log message with a specific format suitable for Kubernetes.
     * @param level - The log level (I for Info, E for Error, W for Warn, D for Debug).
     * @param message - The message to log.
     * @param keyValuePairs - Optional key-value pairs to include in the log.
     * @returns The formatted log message.
     */
    private format(level: string, message: string, keyValuePairs?: { [key: string]: any }): string {
        const timestamp = new Date();
        const month = String(timestamp.getMonth() + 1).padStart(2, '0');
        const day = String(timestamp.getDate()).padStart(2, '0');
        const hours = String(timestamp.getHours()).padStart(2, '0');
        const minutes = String(timestamp.getMinutes()).padStart(2, '0');
        const seconds = String(timestamp.getSeconds()).padStart(2, '0');
        const milliseconds = String(timestamp.getMilliseconds()).padStart(6, '0');
        const formattedTimestamp = `${month}${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;

        let formattedMessage = `'${message}'`;

        if (keyValuePairs) {
            for (const key in keyValuePairs) {
                const value = keyValuePairs[key];
                formattedMessage += ` ${key}=${JSON.stringify(value)}`;
            }
        }

        const originalPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = (_err, stack) => stack;
        const stack = new Error().stack as unknown as NodeJS.CallSite[];
        Error.prepareStackTrace = originalPrepareStackTrace;

        if (stack && stack.length > 2) {
            const callSite = stack[2];
            const filename = path.basename(callSite?.getFileName() ?? '');
            const lineNumber = callSite?.getLineNumber();
            return `${level}${formattedTimestamp} ${this.name} ${filename}:${lineNumber}] ${formattedMessage}`;
        }

        return `${level}${formattedTimestamp} ${this.name}] ${formattedMessage}`;
    }
}
