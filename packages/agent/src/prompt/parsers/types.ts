/**
 * Interface for a parser that can convert a string input into a specific type OUTPUT.
 *
 * @template OUTPUT - The type of the parsed output.
 * @method parse - A method that takes a string input and returns a value of type OUTPUT.
 */
export interface IParser<OUTPUT> {
    parse(input: string): OUTPUT;
}
