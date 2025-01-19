import {
    DEFAULT_EMBEDDING_MODEL_NAME,
    DEFAULT_FREQUENCY_PENALTY,
    DEFAULT_LANGUAGE_MODEL_NAME,
    DEFAULT_MAX_TOKENS,
    DEFAULT_PRESENCE_PENALTY,
    DEFAULT_TEMPERATURE,
    DEFAULT_TOP_K,
    DEFAULT_TOP_P
} from '@chikichat/model';
import {z} from 'zod';
import {Dataset} from '../../dataset';
import {Task} from '../task';
import {Prompt} from '../../prompts';
import {TaskLlmSimilarity} from './similarity';
import {TaskLlmGenerate} from './generate';

/**
 * Input schema for the TaskLlmEvaluate task.
 * Defines the structure and default values for the input parameters.
 */
const InputSchema = z.object({
    model: z.string().default(DEFAULT_LANGUAGE_MODEL_NAME),
    embeddingModel: z.string().default(DEFAULT_EMBEDDING_MODEL_NAME),
    datasetPath: z.string(),
    prompt: z.optional(z.string()),
    maxTokens: z.number().default(DEFAULT_MAX_TOKENS),
    temperature: z.number().min(0).max(2).default(DEFAULT_TEMPERATURE),
    topP: z.number().min(0).max(1).default(DEFAULT_TOP_P),
    topK: z.number().min(0).max(100).default(DEFAULT_TOP_K),
    presencePenalty: z.number().min(0).max(2).default(DEFAULT_PRESENCE_PENALTY),
    frequencyPenalty: z.number().min(0).max(2).default(DEFAULT_FREQUENCY_PENALTY),
});

/**
 * Output schema for the TaskLlmEvaluate task.
 * Defines the structure of the output data.
 */
const OutputSchema = z.object({
    output: z.array(z.object({
        statement: z.string(),
        expect: z.string(),
        answer: z.string(),
        similarity: z.number()
    }))
});

type Input = z.infer<typeof InputSchema>;
type Output = z.infer<typeof OutputSchema>;

/**
 * Task to evaluate a language model using a dataset.
 * This task generates text responses for each statement in the dataset
 * and calculates the similarity between the generated response and the expected response.
 */
export class TaskLlmEvaluate extends Task<typeof InputSchema, typeof OutputSchema> {
    constructor() {
        super('Evaluate', 'Evaluates the language model using the dataset.');
    }

    /**
     * Returns the input and output schemas for the TaskLlmEvaluate task.
     *
     * @returns An object containing the input and output schemas.
     */
    schema(): { input: typeof InputSchema, output: typeof OutputSchema } {
        return {input: InputSchema, output: OutputSchema};
    }

    /**
     * Executes the TaskLlmEvaluate task.
     * Generates text responses for each statement in the dataset and calculates similarity.
     *
     * @param input - The input parameters for the task.
     * @returns The output results containing statements, expected answers, generated answers, and similarity scores.
     */
    protected async perform(input: Input): Promise<Output> {
        const {
            model,
            embeddingModel,
            datasetPath,
            prompt,
            maxTokens,
            temperature,
            topK,
            topP,
            presencePenalty,
            frequencyPenalty
        } = this.schema().input.parse(input);

        const dataset = new Dataset(datasetPath);
        const p = new Prompt(prompt ?? `Please answer the following question very accurately; a one- to five-word response is ideal:\${statement}`);
        const results: Output['output'] = [];

        for (const sample of dataset.values()) {
            const {output} = await new TaskLlmGenerate().execute({
                prompt: p.toString({statement: sample.statement}),
                model,
                maxTokens,
                temperature,
                topK,
                topP,
                presencePenalty,
                frequencyPenalty
            });

            const answer = p.parse(output);
            const {output: similarity} = await new TaskLlmSimilarity().execute({
                model: embeddingModel,
                a: sample.expect,
                b: answer
            });

            results.push({
                statement: sample.statement,
                expect: sample.expect,
                answer: answer,
                similarity: similarity
            });
        }

        return {output: results};
    }
}
