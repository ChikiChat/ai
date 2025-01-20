import {IParser} from './parsers';

/**
 * Interface for a prompt that can parse an input string into a specific type OUTPUT.
 *
 * @template OUTPUT - The type of the parsed output.
 * @method variables - A method that returns an array of variable names used in the prompt.
 * @method toString - A method that returns the prompt string with variables replaced by their values.
 */
export interface IPrompt<OUTPUT extends string> extends IParser<OUTPUT> {
    variables(): string[];

    toString(variables?: { [key: string]: any }): string;
}