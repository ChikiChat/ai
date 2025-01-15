import {DEFAULT_EMBEDDING_MODEL_NAME, LanguageModelInit} from "@chikichat/model";
import {Dataset} from "../dataset";
import {Task} from "./task";
import {TaskSimilarity} from "./similarity";
import {Prompt} from "../prompts";
import {TaskGenerateText} from "./generate/text";

/**
 * Type definition for the result of an evaluation task.
 */
type Result = {
    /**
     * The original statement from the dataset.
     */
    statement: string;

    /**
     * The expected answer based on the dataset.
     */
    expect: string;

    /**
     * The actual answer generated by the language model.
     */
    answer: string;

    /**
     * The similarity score between the expected and actual answers.
     */
    similarity: number;
}

/**
 * Task to evaluate a language model using a dataset.
 */
export class TaskEvaluate extends Task<Result[]> {
    readonly dataset: Dataset;

    /**
     * Constructs a new TaskEvaluate instance.
     *
     * @param {string} datasetPath - The path to the dataset file.
     */
    constructor(datasetPath: string) {
        super('Evaluate', 'Evaluates the language model using the dataset.');

        this.dataset = new Dataset(datasetPath);
    }

    /**
     * Runs the evaluation task.
     *
     * @param {LanguageModelInit} init - The initialization configuration for the language model.
     * @param {string} [embeddingModel=DEFAULT_EMBEDDING_MODEL_NAME] - The name of the embedding model to use.
     * @param {string} [prompt] - The prompt to use for generating answers.
     * @returns {Promise<Result[]>} - A promise that resolves to an array of evaluation results.
     */
    async run(init: LanguageModelInit, embeddingModel: string = DEFAULT_EMBEDDING_MODEL_NAME, prompt: string = ''): Promise<Result[]> {
        const results: Result[] = [];
        const p = new Prompt(prompt ?? `
Please answer the following question very accurately; a one- to five-word response is ideal:
\${statement}
`);
        const generate = new TaskGenerateText(init, p);
        const similarity = new TaskSimilarity(embeddingModel);

        for (const sample of this.dataset.values()) {
            const {text} = await generate.run({statement: sample.statement});
            const answer = p.parse(text);

            results.push({
                statement: sample.statement,
                expect: sample.expect,
                answer: answer,
                similarity: await similarity.run(sample.expect, answer)
            } as Result);
        }

        return results;
    }
}
