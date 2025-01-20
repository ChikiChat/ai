import {IParser, Parser} from './parsers';
import {IPrompt} from './types';

/**
 * Represents a template-based prompt for generating text.
 * This class allows for the creation of dynamic prompts by using placeholders
 * that can be replaced with specific values at runtime.
 *
 * @param template - A string template that may contain placeholders in the format `${variableName}`.
 *                   These placeholders will be replaced with actual values when the `toString` method is called.
 * @param parser - An instance of IParser used to parse the input string.
 */
export class Prompt<OUTPUT extends string = string> implements IPrompt<OUTPUT> {
    private readonly template: string;
    private readonly parser: IParser<OUTPUT>;

    constructor(template: string, parser: IParser<OUTPUT> = new Parser() as IParser<OUTPUT>) {
        this.template = template;
        this.parser = parser;
    }

    /**
     * Extracts variable names from the template.
     *
     * @returns An array of variable names found in the template.
     *          For example, given the template "Hello, ${name}! Today is ${day}.",
     *          this method will return `["name", "day"]`.
     */
    variables(): string[] {
        const regex = /\$\{([^}]+)\}/g;
        const matches = this.template.match(regex);
        if (!matches) return [];

        return [...new Set(matches.map(match => match.slice(2, -1)))];
    }

    /**
     * Replaces variables in the template with their corresponding values.
     *
     * @param variables An object where keys are variable names and values are the values to replace them with.
     *                  For example, given the template "Hello, ${name}! Today is ${day}.",
     *                  and the variables `{ name: "Alice", day: "Monday" }`,
     *                  this method will return "Hello, Alice! Today is Monday.".
     *
     * @returns The template string with all variables replaced by their corresponding values.
     *          If no variables are provided, the original template is returned.
     */
    public toString(variables?: { [key: string]: any }): string {
        if (!variables) {
            return this.template;
        }

        return this.template.replace(/\$\{([^}]+)\}/g, (match, key) => variables[key] !== undefined ? variables[key] : match);
    }

    /**
     * Parses the input string using the parser provided to the prompt.
     *
     * @param input - The input string to be parsed.
     *
     * @returns The parsed result of the input string.
     */
    public parse(input: string): OUTPUT {
        return this.parser.parse(input);
    }
}