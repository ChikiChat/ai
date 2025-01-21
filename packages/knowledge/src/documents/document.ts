import * as fs from 'fs/promises';
import * as path from 'path';
import {v4 as uuidv4} from 'uuid';
import {LocalMeta, Meta, Part, Parts} from './types';

/**
 * Represents a document with metadata and content.
 *
 * @template META - The type of metadata, which extends the `Meta` type.
 * @template PART - The type of part, which extends the `Part` type.
 */
export abstract class Document<META = Meta, PART extends Part = Part> {
    /**
     * A unique identifier for the document.
     */
    readonly id: string;

    /**
     * The metadata associated with the document.
     */
    meta: META;

    /**
     * A collection of parts associated with the document.
     */
    parts: Parts<PART>;

    /**
     * Constructs a new Document instance.
     *
     * @param meta - The metadata for the document.
     * @param parts - An optional collection of parts for the document.
     */
    protected constructor(meta?: META, parts?: Parts<PART>) {
        this.id = uuidv4();
        this.meta = meta || {} as META;
        this.parts = parts || {};
    }

    /**
     * Abstract method to load the content of a document from a file.
     *
     * @param name - The name of the document to load.
     * @param options - An object containing options for loading the document.
     * @returns A promise that resolves to the content of the file as a string.
     */
    abstract load(name: string, options: Record<string, boolean | string | number>): Promise<boolean>;
}

/**
 * Represents a document stored locally on the filesystem.
 *
 * @template META - The type of metadata, which extends the `Meta` type.
 * @template PART - The type of part, which extends the `Part` type.
 */
export abstract class LocalDocument<META extends Meta = LocalMeta, PART extends Part = Part> extends Document<META, PART> {
    /**
     * Reads the contents of a file from the local filesystem.
     *
     * @param name - The name or path of the file to be read.
     * @param options - An object containing options for reading the file. Supported
     *                  options include:
     *                  - `encoding`: The character encoding to use when reading the file.
     *                                Defaults to 'utf-8' if not specified.
     * @returns A promise that resolves to the contents of the file as a string.
     * @throws Will throw an error if the file cannot be read, providing a detailed
     *         error message including the file path and the underlying error.
     */
    async contents(name: string, options: Record<string, boolean | string | number>): Promise<string> {
        try {
            const encoding: BufferEncoding = options?.encoding as BufferEncoding || 'utf-8';
            const resolvedPath = path.resolve(name);
            const contents = await fs.readFile(resolvedPath, encoding);
            const stats = await fs.stat(resolvedPath);

            this.meta = {
                ...this.meta,
                name: resolvedPath,
                created: stats.birthtime.toString(),
                modified: stats.mtime.toString(),
            };

            return contents;
        } catch (error) {
            throw new Error(`Failed to load file from path: ${name}. Error: ${(error as Error).message}`);
        }
    }
}

export class CsvDocument<PART extends Part = Part> extends LocalDocument<LocalMeta, PART> {
    constructor(meta: LocalMeta, parts?: Parts<PART>) {
        super(meta, parts);
    }

    async load(name: string, options: Record<string, boolean | string | number>): Promise<boolean> {
        try {
            const content = await this.contents(name, options);
            const lines = content.split('\n');

            // Create a part for each line.
            lines.forEach((line, index) => {
                this.parts[(index + 1).toString()] = {
                    meta: {line: index + 1},
                    content: line,
                } as unknown as PART;
            });

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}
