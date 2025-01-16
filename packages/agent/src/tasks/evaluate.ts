import {
    DEFAULT_EMBEDDING_MODEL_NAME,
    DEFAULT_FREQUENCY_PENALTY,
    DEFAULT_LANGUAGE_MODEL_NAME,
    DEFAULT_MAX_STEPS,
    DEFAULT_MAX_TOKENS,
    DEFAULT_PRESENCE_PENALTY,
    DEFAULT_TEMPERATURE,
    DEFAULT_TOP_K,
    DEFAULT_TOP_P
} from "@chikichat/model";
import {z} from "zod";
import {Dataset} from "../dataset";
import {Task} from "./task";
import {TaskSimilarity} from "./similarity";
import {Prompt} from "../prompts";
import {TaskGenerateText} from "./generate/text";
import {Logger} from "../logger";

/**
 * Input schema for the TaskEvaluate task.
 * Defines the structure and default values for the input parameters.
 */
const InputSchema = z.object({
    model: z.string().default(DEFAULT_LANGUAGE_MODEL_NAME),
    embeddingModel: z.string().default(DEFAULT_EMBEDDING_MODEL_NAME),
    datasetPath: z.string(),
    prompt: z.optional(z.string()),
    maxTokens: z.optional(z.number().default(DEFAULT_MAX_TOKENS)),
    maxSteps: z.optional(z.number().default(DEFAULT_MAX_STEPS)),
    temperature: z.optional(z.number().min(0).max(2).default(DEFAULT_TEMPERATURE)),
    topP: z.optional(z.number().min(0).max(1).default(DEFAULT_TOP_P)),
    topK: z.optional(z.number().min(0).max(100).default(DEFAULT_TOP_K)),
    presencePenalty: z.optional(z.number().min(0).max(2).default(DEFAULT_PRESENCE_PENALTY)),
    frequencyPenalty: z.optional(z.number().min(0).max(2).default(DEFAULT_FREQUENCY_PENALTY)),
});

/**
 * Output schema for the TaskEvaluate task.
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
export class TaskEvaluate extends Task<typeof InputSchema, typeof OutputSchema> {
    constructor(logger: Logger) {
        super('Evaluate', 'Evaluates the language model using the dataset.', logger);
    }

    /**
     * Returns the input and output schemas for the TaskEvaluate task.
     *
     * @returns An object containing the input and output schemas.
     */
    schema(): { input: typeof InputSchema, output: typeof OutputSchema } {
        return {input: InputSchema, output: OutputSchema};
    }

    /**
     * Executes the TaskEvaluate task.
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
            maxSteps,
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
            const {output} = await new TaskGenerateText(this.logger).execute({
                prompt: p.toString({statement: sample.statement}),
                model,
                maxTokens,
                maxSteps,
                temperature,
                topK,
                topP,
                presencePenalty,
                frequencyPenalty
            });

            const answer = p.parse(output);
            const {output: similarity} = await new TaskSimilarity(this.logger).execute({
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

            this.logger.debug('task(evaluate)', {statement: sample.statement, expect: sample.expect, answer, similarity});
        }

        return {output: results};
    }
}
