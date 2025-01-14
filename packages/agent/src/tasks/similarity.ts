import {Task} from "./task";
import {DEFAULT_EMBEDDING_MODEL_NAME, embeddingModel, EmbeddingModelInit, embeddingModelInit} from "@chikichat/model";
import {cosineSimilarity, embedMany} from "ai";

/**
 * TaskSimilarity class extends Task to compute the cosine similarity between two strings.
 * It uses an embedding model to convert strings into vectors and then calculates the similarity.
 */
export class TaskSimilarity extends Task<number> {
    /**
     * The identifier of the embedding model to be used.
     */
    private readonly init: EmbeddingModelInit

    constructor(model: string = DEFAULT_EMBEDDING_MODEL_NAME) {
        super('Similarity', 'Computes the cosine similarity between two strings.');

        this.init = embeddingModelInit(model);
    }

    /**
     * Computes the cosine similarity between two input strings.
     * @param a - The first string to compare.
     * @param b - The second string to compare.
     * @returns A promise that resolves to the cosine similarity score between the two strings.
     *          The score is a number between 0 and 1, where 1 means the strings are identical in terms of embedding.
     */
    async run(a: string, b: string): Promise<number> {
        const {embeddings} = await embedMany({
            model: embeddingModel(this.init.model),
            values: [a, b],
        });
        const [embeddingA, embeddingB] = embeddings;

        return embeddingA !== undefined && embeddingB !== undefined
            ? cosineSimilarity(embeddingA, embeddingB)
            : 0.0;
    }
}
