import {embedMany} from 'ai';
import {z} from 'zod';
import {DEFAULT_EMBEDDING_MODEL_NAME, embeddingModel, usageModel} from '@chikichat/model';
import {Task} from '../task';
import {ILogger} from '../../logger';

// Define the input schema for the TaskLlmEmbedding task
const InputSchema = z.object({
    model: z.string().default(DEFAULT_EMBEDDING_MODEL_NAME),
    values: z.array(z.string().trim())
});

// Define the output schema for the TaskLlmEmbedding task
const OutputSchema = z.object({
    output: z.array(z.array(z.number())),
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
 * TaskLlmEmbedding class extends Task to compute the embedding of strings.
 * It uses an embedding model to convert the strings into vectors.
 */
export class TaskLlmEmbedding extends Task<typeof InputSchema, typeof OutputSchema> {
    constructor(logger: ILogger) {
        super('Embedding', 'Computes the embedding of strings using an embedding model.', logger);
    }

    /**
     * Returns the input and output schemas for the TaskLlmEmbedding task.
     *
     * @returns An object containing the input and output schemas.
     */
    schema(): { input: typeof InputSchema, output: typeof OutputSchema } {
        return {input: InputSchema, output: OutputSchema};
    }

    /**
     * Perform the embedding computation.
     *
     * @param input - The input object containing the model name and an array of strings to embed.
     * @returns An object containing the embeddings and usage details.
     */
    protected async perform(input: Input): Promise<Output> {
        const {model, values} = this.schema().input.parse(input);
        const {embeddings, usage} = await embedMany({
            model: embeddingModel(model),
            values: values,
        });
        const u = usageModel(model, usage);

        this.logger.debug('task(llm/embedding)', {model, values, usage: u});

        return {
            output: embeddings,
            usage: u,
        };
    }
}
