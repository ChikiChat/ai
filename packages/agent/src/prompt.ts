/**
 * Interface for a parser that can convert a string input into a specific type T.
 *
 * @template T - The type of the parsed output.
 * @method parse - A method that takes a string input and returns a value of type T.
 */
export interface IParser<T = string> {
    parse(...input: any): T;
}

/**
 * Interface for a prompt that can parse an input string into a specific type T.
 *
 * @template T - The type of the parsed output.
 * @method parse - A method that takes a string input and returns a value of type T.
 */
export interface IPrompt<T = string> extends IParser<T> {
    variables(): string[];

    toString(variables?: { [key: string]: any }): string;
}

/**
 * Default implementation of the IParser interface.
 * This parser simply trims the input string and returns it as a string.
 */
class DefaultParser implements IParser {
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

/**
 * Represents a template-based prompt for generating text.
 * This class allows for the creation of dynamic prompts by using placeholders
 * that can be replaced with specific values at runtime.
 *
 * @param template - A string template that may contain placeholders in the format `${variableName}`.
 *                   These placeholders will be replaced with actual values when the `toString` method is called.
 */
export class Prompt<T = string> implements IPrompt<T> {
    private readonly template: string;
    private readonly parser: IParser<T>;

    constructor(template: string, parser: IParser<T> = new DefaultParser() as IParser<T>) {
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
        const regex = /\$\{([^}]+)}/g;
        const matches = this.template.match(regex) || [];

        return [...new Set(matches.map((match) => match.slice(1, -1)))];
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

        return Object.keys(variables).reduce((result, variable) => {
            const regex = new RegExp(`\\$\{${variable}\}`, 'g');

            return result.replace(regex, variables[variable]);
        }, this.template);
    }

    /**
     * Parses the input string using the parser provided to the prompt.
     *
     * @param input - The input string to be parsed.
     *
     * @returns The parsed result of the input string.
     */
    public parse(input: string): T {
        return this.parser.parse(input);
    }
}

// Define a prompt template for evaluating
export const EvaluatePrompt = new Prompt(`
Please answer the following question very accurately; a one- to five-word response is ideal:
\${statement}
`);
