/**
 * Represents a request for generating a completion based on a given prompt.
 * This class encapsulates all the necessary parameters required to configure
 * the behavior of the text generation model.
 *
 * @param model - The identifier of the model to be used for generating the completion.
 * @param prompt - The input prompt that the model will use to generate a response.
 * @param maxTokens - The maximum number of tokens to generate in the completion. Defaults to 2048.
 * @param temperature - Controls the randomness of predictions by scaling the logits before applying softmax.
 *                      Lower values make the model more deterministic, while higher values increase randomness. Defaults to 0.8.
 * @param topP - Implements nucleus sampling, where the model considers the smallest set of tokens whose cumulative probability exceeds this value.
 *               This parameter is used for controlling the diversity of the generated text. Defaults to 0.90.
 * @param topK - Limits the model to consider only the top K most likely next tokens. This parameter is used for controlling the diversity of the generated text. Defaults to 40.
 * @param presencePenalty - Penalizes new tokens based on whether they appear in the text so far.
 *                          Increases the model's likelihood to talk about new topics. Defaults to 0.0.
 * @param frequencyPenalty - Penalizes new tokens based on their existing frequency in the text so far.
 *                           Decreases the model's likelihood to repeat the same line verbatim. Defaults to 0.0.
 */
export class CompletionRequest {
    readonly model: string;
    readonly prompt: Prompt;
    maxTokens: number;
    temperature: number;
    topP: number;
    topK: number;
    presencePenalty: number;
    frequencyPenalty: number;

    constructor(
        model: string,
        prompt: Prompt,
        maxTokens: number = 2048,
        temperature: number = 0.8,
        topP: number = 0.90,
        topK: number = 40,
        presencePenalty: number = 0.0,
        frequencyPenalty: number = 0.0
    ) {
        this.model = model;
        this.prompt = prompt;
        this.maxTokens = maxTokens;
        this.temperature = temperature;
        this.topP = topP;
        this.topK = topK;
        this.presencePenalty = presencePenalty;
        this.frequencyPenalty = frequencyPenalty;
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
export class Prompt {
    private readonly template: string;

    constructor(template: string) {
        this.template = template;
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
        const matches = this.template.match(regex);

        return matches ? matches.map(match => match.slice(2, -1)) : [];
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
}