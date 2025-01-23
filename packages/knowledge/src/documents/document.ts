import {v4 as uuidv4} from 'uuid';
import {Meta, Options, Part, Parts} from './types';

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

    constructor() {
        this.id = uuidv4();
        this.meta = {} as META;
        this.parts = {} as Parts<PART>;
    }

    /**
     * Gets or sets options for the document.
     *
     * @param options - An object containing options for the document.
     * @returns The options object.
     */
    abstract options(options?: Options): Options;

    /**
     * Loads the content of a document from a file.
     *
     * @param name - The name of the document to load.
     * @param options - An object containing options for loading the document.
     * @returns A promise that resolves to a boolean indicating whether the document was successfully loaded.
     */
    abstract load(name: string, options?: Options): Promise<boolean>;

    /**
     * Saves the content of a document to a file.
     *
     * @param name - The name of the document to save.
     * @param options - An object containing options for saving the document.
     * @returns A promise that resolves to a boolean indicating whether the document was successfully saved.
     */
    abstract save(name: string, options?: Options): Promise<boolean>;
}
