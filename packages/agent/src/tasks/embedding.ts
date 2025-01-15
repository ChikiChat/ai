import {Task} from "./task";
import {DEFAULT_EMBEDDING_MODEL_NAME, embeddingModel, embeddingModelInit, EmbeddingModelInit} from "@chikichat/model";
import {embedMany, EmbedManyResult} from "ai";

/**
 * TaskEmbedding class extends Task to compute the embedding of a string.
 * It uses an embedding model to convert the string into a vector.
 */
export class TaskEmbedding extends Task<EmbedManyResult<string>> {
    /**
     * The identifier of the embedding model to be used.
     */
    readonly init: EmbeddingModelInit

    constructor(model: string = DEFAULT_EMBEDDING_MODEL_NAME) {
        super('Embedding', 'Computes the embedding of a string.');

        this.init = embeddingModelInit(model);
    }

    /**
     * Computes the embedding of the input string.
     * @returns A promise that resolves to the embedding vector of the input string.
     * @param values
     */
    async run(values: string[]): Promise<EmbedManyResult<string>> {
        return await embedMany({
            model: embeddingModel(this.init.model),
            values: values,
        });
    }
}