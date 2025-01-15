import {embedMany} from "ai";
import {z} from "zod";
import {embeddingModel} from "@chikichat/model";
import {Task} from "./task";

// Define the input schema for the TaskEmbedding task
const Input = z.object({
    model: z.string(),
    values: z.array(z.string())
});

// Define the output schema for the TaskEmbedding task
const Output = z.object({
    output: z.array(z.array(z.number())),
    usage: z.object({
        tokens: z.number(),
    })
});

// Infer the input and output types from their respective schemas
type Input = z.infer<typeof Input>;
type Output = z.infer<typeof Output>;

/**
 * TaskEmbedding class extends Task to compute the embedding of strings.
 * It uses an embedding model to convert the strings into vectors.
 */
export class TaskEmbedding extends Task<Input, Output> {
    constructor() {
        super('Embedding', 'Computes the embedding of strings.');
    }

    /**
     * Perform the embedding computation.
     * @param input - The input object containing the model name and an array of strings to embed.
     * @returns An object containing the embeddings and usage details.
     */
    protected async perform(input: Input): Promise<Output> {
        const {model, values} = Input.parse(input);
        const result = await embedMany({
            model: embeddingModel(model),
            values: values,
        });

        return {
            output: result.embeddings,
            usage: result.usage
        };
    }
}
