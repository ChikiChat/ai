import fs from 'fs';
import {parse} from 'csv-parse/sync';
import yaml from 'yaml';

type Sample = {
    statement: string;
    expect: string;
}

/**
 * Represents a collection of samples for testing a model.
 * Each sample consists of a statement and its expected response.
 * This class ensures no duplicate samples based on content.
 */
export class Dataset {
    private samples: Set<Sample>;

    /**
     * Constructs a new Dataset instance.
     * If a filename is provided, it loads samples from the specified file.
     *
     * @param filename - The path to the file containing the samples (optional).
     */
    constructor(filename?: string) {
        this.samples = new Set();
        if (filename) {
            this.fromFile(filename);
        }
    }

    /**
     * Loads samples from a file into the dataset.
     * Supported file formats are CSV, JSON, YAML, and YML.
     *
     * @param filename - The path to the file containing the samples.
     * @throws Will throw an error if the file format is unsupported.
     * @throws Will throw an error if the file does not exist.
     * @throws Will throw an error if the file content is not an array of samples.
     */
    public fromFile(filename: string): void {
        const ext = filename.split('.').pop()?.toLowerCase();
        if (!ext || !['csv', 'json', 'yaml', 'yml'].includes(ext)) {
            throw new Error(`Unsupported file format: ${ext}`);
        }

        if (!fs.existsSync(filename)) {
            throw new Error(`File not found: ${filename}`);
        }

        const content = fs.readFileSync(filename, 'utf8');
        let data: any[] = [];

        switch (ext) {
            case 'csv':
                data = parse(content, {columns: true});
                break;
            case 'json':
                data = JSON.parse(content);
                break;
            case 'yaml':
            case 'yml':
                data = yaml.parse(content);
                break;
        }

        if (!Array.isArray(data)) {
            throw new Error(`${ext.toUpperCase()} file must contain an array of samples`);
        }

        data.forEach((row: any) => {
            const statement = row.statement ?? (Array.isArray(row) ? row[0] : '');
            const expect = row.expect ?? (Array.isArray(row) ? row[1] : '');

            this.set(statement, expect)
        });
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
