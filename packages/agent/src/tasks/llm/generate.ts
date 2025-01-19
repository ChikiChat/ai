import {
    DEFAULT_FREQUENCY_PENALTY,
    DEFAULT_LANGUAGE_MODEL_NAME,
    DEFAULT_MAX_TOKENS,
    DEFAULT_PRESENCE_PENALTY,
    DEFAULT_TEMPERATURE,
    DEFAULT_TOP_K,
    DEFAULT_TOP_P,
    languageModel,
    usageModel
} from '@chikichat/model';
import {generateText} from 'ai';
import {z} from 'zod';
import {Task} from '../task';

/**
 * Input schema for the TaskLlmGenerate task.
 */
const InputSchema = z.object({
    prompt: z.string(),
    model: z.string().default(DEFAULT_LANGUAGE_MODEL_NAME),
    maxTokens: z.number().default(DEFAULT_MAX_TOKENS),
    temperature: z.number().min(0).max(2).default(DEFAULT_TEMPERATURE),
    topP: z.number().min(0).max(1).default(DEFAULT_TOP_P),
    topK: z.number().min(0).max(100).default(DEFAULT_TOP_K),
    presencePenalty: z.number().min(0).max(2).default(DEFAULT_PRESENCE_PENALTY),
    frequencyPenalty: z.number().min(0).max(2).default(DEFAULT_FREQUENCY_PENALTY),
});

/**
 * Output schema for the TaskLlmGenerate task.
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
export class TaskLlmGenerate extends Task<typeof InputSchema, typeof OutputSchema> {

    constructor() {
        super('Generate', 'Generates text based on a prompt using a language model.');
    }

    /**
     * Returns the input and output schemas for the TaskLlmGenerate task.
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
            temperature: temperature,
            topP: topP,
            topK: topK,
            presencePenalty: presencePenalty,
            frequencyPenalty: frequencyPenalty,
        });

        return {
            output: text,
            usage: usageModel(model, usage),
        };
    }
}
