import {cosineSimilarity} from "ai";
import {DEFAULT_EMBEDDING_MODEL_NAME} from "@chikichat/model";
import {Task} from "./task";
import {TaskEmbedding} from "./embedding";

/**
 * TaskSimilarity class extends Task to compute the cosine similarity between two strings.
 * It uses an embedding model to convert strings into vectors and then calculates the similarity.
 */
export class TaskSimilarity extends Task<number> {
    /**
     * The identifier of the embedding model to be used.
     */
    readonly embedding: TaskEmbedding

    constructor(model: string = DEFAULT_EMBEDDING_MODEL_NAME) {
        super('Similarity', 'Computes the cosine similarity between two strings.');

        this.embedding = new TaskEmbedding(model);
    }

    /**
     * Computes the cosine similarity between two input strings.
     * @param a - The first string to compare.
     * @param b - The second string to compare.
     * @returns A promise that resolves to the cosine similarity score between the two strings.
     *          The score is a number between 0 and 1, where 1 means the strings are identical in terms of embedding.
     */
    async run(a: string, b: string): Promise<number> {
        const [embeddingA, embeddingB] = (await this.embedding.run([a, b])).embeddings

        return embeddingA !== undefined && embeddingB !== undefined
            ? cosineSimilarity(embeddingA, embeddingB)
            : 0.0;
    }
}
