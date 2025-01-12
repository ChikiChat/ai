type Sample = {
    statement: string;
    expect: string;
}

/**
 * Represents a collection of samples for testing a model.
 * Each sample consists of a statement and its expected response.
 * This class uses a `Set` to store unique samples, ensuring no duplicates.
 */
export class Dataset {
    private samples: Set<Sample>;

    constructor() {
        this.samples = new Set();
    }

    /**
     * Adds a statement and its expected response to the dataset.
     *
     * @param statement - The statement to be stored.
     * @param expect - The expected response for the statement.
     */
    public set(statement: string, expect: string): void {
        this.samples.add({statement, expect});
    }

    /**
     * Returns an iterator over the samples in the dataset.
     *
     * @returns An iterator over the samples.
     */
    public values(): IterableIterator<Sample> {
        return this.samples.values();
    }

    /**
     * Clears all samples from the dataset.
     */
    public clear(): void {
        this.samples.clear();
    }

    /**
     * Returns the number of samples in the dataset.
     *
     * @returns The number of samples.
     */
    public size(): number {
        return this.samples.size;
    }
}
