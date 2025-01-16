import {cosineSimilarity} from "ai";
import {z} from "zod";
import {Task} from "./task";
import {TaskEmbedding} from "./embedding";

// Define the input schema for the TaskSimilarity task
const InputSchema = z.object({
    model: z.string(),
    a: z.string(),
    b: z.string(),
});

// Define the output schema for the TaskSimilarity task
const OutputSchema = z.object({
    output: z.number(),
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
 * TaskSimilarity class extends Task to compute the cosine similarity between two strings.
 * It uses an embedding model to convert strings into vectors and then calculates the similarity.
 */
export class TaskSimilarity extends Task<typeof InputSchema, typeof OutputSchema> {
    constructor(logger: Logger) {
        super('Similarity', 'Computes the cosine similarity between two strings using an embedding model.', logger);
    }

    /**
     * Returns the input and output schemas for the TaskSimilarity task.
     *
     * @returns An object containing the input and output schemas.
     */
    schema(): { input: typeof InputSchema, output: typeof OutputSchema } {
        return {input: InputSchema, output: OutputSchema};
    }

    /**
     * Perform the similarity computation.
     *
     * @param input - The input object containing the model name and two strings to compare.
     * @returns An object containing the cosine similarity score and usage details.
     */
    protected async perform(input: Input): Promise<Output> {
        const {model, a, b} = this.schema().input.parse(input);
        const {output, usage} = await (new TaskEmbedding(this.logger).execute({model, values: [a, b]}));
        const [embeddingA, embeddingB] = output;
        const similarity = cosineSimilarity(embeddingA, embeddingB);

        this.logger.debug('task(similarity)', {model, a, b, similarity, usage});

        return {
            output: similarity,
            usage: usage
        };
    }
}
