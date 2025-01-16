/**
 * Interface for a parser that can convert a string input into a specific type OUTPUT.
 *
 * @template OUTPUT - The type of the parsed output.
 * @method parse - A method that takes a string input and returns a value of type OUTPUT.
 */
export interface IParser<OUTPUT = string> {
    parse(...input: any): OUTPUT;
}

/**
 * Default implementation of the IParser interface.
 * This parser simply trims the input string and returns it as a string.
 */
export class Parser implements IParser {
    /**
     * Parses the input string by trimming it.
     *
     * @param input - The input string to be parsed.
     * @returns The trimmed input string.
     */
    parse(input: string): string {
        return input.trim();
    }
}