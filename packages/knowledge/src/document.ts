import {v4 as uuidv4} from 'uuid';
import {Meta} from './types';

/**
 * Represents a document with metadata and content.
 *
 * @template META - The type of metadata, which must extend the `Meta` type.
 * @template CONTENT - The type of content, which defaults to `string`.
 */
export class Document<META extends Meta, CONTENT = string> {
    /**
     * A unique identifier for the document.
     */
    readonly id: string;

    /**
     * The metadata associated with the document.
     */
    readonly meta: META;

    /**
     * The content of the document.
     */
    content: CONTENT;

    /**
     * Creates a new document.
     *
     * @param meta - The metadata associated with the document.
     * @param content - The content of the document.
     */
    constructor(meta: META, content: CONTENT) {
        this.id = uuidv4();
        this.meta = meta;
        this.content = content;
    }
}
