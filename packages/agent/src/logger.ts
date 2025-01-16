import path from 'path';

export class Logger {
    private readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    private format(level: string, message: string, keyValuePairs?: { [key: string]: any }): string {
        const timestamp = new Date();
        const month = String(timestamp.getMonth() + 1).padStart(2, '0');
        const day = String(timestamp.getDate()).padStart(2, '0');
        const hours = String(timestamp.getHours()).padStart(2, '0');
        const minutes = String(timestamp.getMinutes()).padStart(2, '0');
        const seconds = String(timestamp.getSeconds()).padStart(2, '0');
        const milliseconds = String(timestamp.getMilliseconds()).padStart(6, '0');
        const formattedTimestamp = `${month}${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;

        let formattedMessage = `"${message}"`;

        for (const key in keyValuePairs) {
            const value = keyValuePairs[key];
            formattedMessage += ` ${key}=${JSON.stringify(value)}`;
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

    info(message: string, keyValuePairs?: { [key: string]: any }) {
        console.log(this.format('I', message, keyValuePairs));
    }

    error(error: Error, keyValuePairs?: { [key: string]: any }) {
        console.error(this.format('E', error.message, keyValuePairs));
    }

    warn(message: string, keyValuePairs?: { [key: string]: any }) {
        console.warn(this.format('W', message, keyValuePairs));
    }

    debug(message: string, keyValuePairs?: { [key: string]: any }) {
        if (process.env.NODE_ENV === 'development') {
            console.log(this.format('D', message, keyValuePairs));
        }
    }
}
