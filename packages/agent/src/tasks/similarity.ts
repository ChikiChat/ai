import {cosineSimilarity} from "ai";
import {z} from "zod";
import {Task} from "./task";
import {TaskEmbedding} from "./embedding";

// Define the input schema for the TaskSimilarity task
const Input = z.object({
    model: z.string(),
    a: z.string(),
    b: z.string(),
});

// Define the output schema for the TaskSimilarity task
const Output = z.object({
    output: z.number(),
});

// Infer the input and output types from their respective schemas
type Input = z.infer<typeof Input>;
type Output = z.infer<typeof Output>;

/**
 * TaskSimilarity class extends Task to compute the cosine similarity between two strings.
 * It uses an embedding model to convert strings into vectors and then calculates the similarity.
 */
export class TaskSimilarity extends Task<Input, Output> {
    constructor() {
        super('Similarity', 'Computes the cosine similarity between two strings.');
    }

    /**
     * Perform the similarity computation.
     *
     * @param input - The input object containing the model name and two strings to compare.
     * @returns An object containing the cosine similarity score.
     */
    async perform(input: Input): Promise<Output> {
        const {model, a, b} = Input.parse(input);
        const {output} = await (new TaskEmbedding().execute({model, values: [a, b]}));
        const [embeddingA, embeddingB] = output;

        return {
            output: embeddingA !== undefined && embeddingB !== undefined
                ? cosineSimilarity(embeddingA, embeddingB) : 0.0
        };
    }
}
