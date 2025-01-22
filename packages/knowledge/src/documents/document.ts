import {v4 as uuidv4} from 'uuid';
import {Meta, Part, Parts} from './types';

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
