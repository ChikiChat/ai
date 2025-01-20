import {IParser} from './types';

/**
 * Default implementation of the IParser interface.
 * This parser simply trims the input string and returns it as a string.
 */
export class Parser<OUTPUT = string> implements IParser<OUTPUT> {
    /**
     * Parses the input string by trimming it.
     *
     * @param input - The input string to be parsed.
     * @returns The trimmed input string.
     */
    parse(input: string): OUTPUT {
        return input.trim() as OUTPUT;
    }
}