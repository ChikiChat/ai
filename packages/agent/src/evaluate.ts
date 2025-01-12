import {Dataset} from "./dataset";
import {CompletionRequest} from "./completion";

type Result = {
    actual: string;
    score: number;
}

export class Evaluate {
    readonly completionRequest: CompletionRequest
    readonly embeddingModel: string
    readonly dataset: Dataset
    private results: Set<Result>

    constructor(completionRequest: CompletionRequest, embeddingModel: string, dataset: Dataset) {
        this.completionRequest = completionRequest
        this.embeddingModel = embeddingModel
        this.dataset = dataset
        this.results = new Set()
    }

    /**
     * Evaluates the language model using the dataset.
     *
     * @returns The accuracy of the language model.
     */
    public score(): number {
        let total = this.dataset.size()
        let correct = 0

        this.results.clear()

        for (const sample of this.dataset.values()) {

        }

        return correct / total
    }

}
