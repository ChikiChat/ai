import {
    DEFAULT_FREQUENCY_PENALTY,
    DEFAULT_LANGUAGE_MODEL_NAME,
    DEFAULT_MAX_STEPS,
    DEFAULT_MAX_TOKENS,
    DEFAULT_PRESENCE_PENALTY,
    DEFAULT_TEMPERATURE,
    DEFAULT_TOP_K,
    DEFAULT_TOP_P,
    languageModel,
    usageModel
} from "@chikichat/model";
import {generateText} from "ai";
import {z} from "zod";
import {Task} from "../task";
import {Logger} from "../../logger";


/**
 * Input schema for the TaskGenerateText task.
 */
const InputSchema = z.object({
    prompt: z.string(),
    model: z.string().default(DEFAULT_LANGUAGE_MODEL_NAME),
    maxTokens: z.optional(z.number().default(DEFAULT_MAX_TOKENS)),
    maxSteps: z.optional(z.number().default(DEFAULT_MAX_STEPS)),
    temperature: z.optional(z.number().min(0).max(2).default(DEFAULT_TEMPERATURE)),
    topP: z.optional(z.number().min(0).max(1).default(DEFAULT_TOP_P)),
    topK: z.optional(z.number().min(0).max(100).default(DEFAULT_TOP_K)),
    presencePenalty: z.optional(z.number().min(0).max(2).default(DEFAULT_PRESENCE_PENALTY)),
    frequencyPenalty: z.optional(z.number().min(0).max(2).default(DEFAULT_FREQUENCY_PENALTY)),
});

/**
 * Output schema for the TaskGenerateText task.
 */
const OutputSchema = z.object({
    output: z.string().trim(),
    usage: z.object({
        tokens: z.object({
            input: z.number(),
            output: z.number(),
        }),
        cost: z.object({
            input: z.number(),
            output: z.number(),
        })
    })
});

type Input = z.infer<typeof InputSchema>;
type Output = z.infer<typeof OutputSchema>;

/**
 * A task class that generates text based on a provided prompt.
 * Extends the base Task class.
 */
export class TaskGenerateText extends Task<typeof InputSchema, typeof OutputSchema> {

    constructor(logger: Logger) {
        super('Generate Text', 'Generates text based on the provided prompt.', logger);
    }

    /**
     * Returns the input and output schemas for the TaskGenerateText task.
     *
     * @returns An object containing the input and output schemas.
     */
    schema(): { input: typeof InputSchema, output: typeof OutputSchema } {
        return {input: InputSchema, output: OutputSchema};
    }

    /**
     * Perform the text generation task.
     *
     * @param input - The input object containing the initialization parameters and prompt.
     * @returns A promise that resolves to the generated text result.
     * @throws Will throw an error if the text generation fails.
     */
    protected async perform(input: Input): Promise<Output> {
        const {
            prompt,
            model,
            maxTokens,
            maxSteps,
            temperature,
            topP,
            topK,
            presencePenalty,
            frequencyPenalty
        } = this.schema().input.parse(input);

        const {text, usage} = await generateText({
            prompt: prompt,
            model: languageModel(model),
            maxTokens: maxTokens,
            maxSteps: maxSteps,
            temperature: temperature,
            topP: topP,
            topK: topK,
            presencePenalty: presencePenalty,
            frequencyPenalty: frequencyPenalty,
        });
        const u = usageModel(model, usage)

        this.logger.debug('task(generateText)', {
            model,
            prompt,
            maxTokens,
            maxSteps,
            temperature,
            topP,
            topK,
            presencePenalty,
            frequencyPenalty,
            output: text,
            usage: u
        });

        return {
            output: text,
            usage: u,
        };
    }
}
