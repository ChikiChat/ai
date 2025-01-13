import {Dataset} from "./dataset";
import {Request} from "./request";
import {cosineSimilarity, embedMany, generateText} from "ai";
import {embeddingModel, languageModel} from "@chikichat/model";

export const EVALUATE_PROMPT = `
Please answer the following question very accurately; a one- to five-word response is ideal:
\${statement}`;

type Result = {
    statement: string;
    expect: string;
    answer: string;
    similarity: number;
}

/**
 * The Evaluate class is responsible for evaluating a language model using a given dataset.
 * It generates text based on the provided request configuration and compares the generated
 * answers with the expected answers using cosine similarity. The class provides methods to
 * run the evaluation, calculate the average similarity score, and print the results.
 */
export class Evaluate {
    /**
     * The request configuration for generating text.
     */
    readonly request: Request;

    /**
     * The identifier of the embedding model to be used.
     */
    readonly embeddingModel: string;

    /**
     * The dataset containing samples to evaluate the model.
     */
    readonly dataset: Dataset;

    constructor(request: Request, embeddingModel: string, dataset: Dataset) {
        this.request = request
        this.embeddingModel = embeddingModel
        this.dataset = dataset
    }

    /**
     * Evaluates the language model using the dataset.
     *
     * @returns An array of evaluation results.
     */
    public async run(): Promise<Result[]> {
        const results: Result[] = [];

        for (const sample of this.dataset.values()) {
            const {text} = await generateText({
                model: languageModel(this.request.model),
                maxTokens: this.request.maxTokens,
                temperature: this.request.temperature,
                topP: this.request.topP,
                topK: this.request.topK,
                presencePenalty: this.request.presencePenalty,
                frequencyPenalty: this.request.frequencyPenalty,
                maxSteps: 1,
                prompt: this.request.prompt.toString({"statement": sample.statement})
            })

            const answer = this.request.prompt.parse(text);
            const {embeddings} = await embedMany({
                model: embeddingModel(this.embeddingModel),
                values: [sample.expect, answer],
            });

            if (embeddings[0] !== undefined && embeddings[1] !== undefined) {
                results.push({
                    statement: sample.statement,
                    expect: sample.expect,
                    answer: answer,
                    similarity: cosineSimilarity(embeddings[0], embeddings[1])
                })
            }
        }

        return results
    }
}
