/**
 * Type representing metadata as a record of key-value pairs.
 * The values can be of type `boolean`, `string`, or `number`.
 */
export type Meta = Record<string, boolean | string | number>;

/**
 * Type representing options as a record of key-value pairs.
 * The values can be of type `boolean`, `string`, or `number`.
 */
export type Options = Record<string, boolean | string | number>

/**
 * Represents metadata for a local file or directory, extending the base Meta type.
 */
export type MetaLocal = Meta & {
    /**
     * The name of the file or directory.
     */
    name: string;

    /**
     * The user ID associated with the file or directory.
     */
    uid: number;

    /**
     * The group ID associated with the file or directory.
     */
    gid: number;

    /**
     * The timestamp of when the file or directory was created.
     */
    created: number;

    /**
     * The timestamp of when the file or directory was last modified.
     */
    modified: number;

    /**
     * The file permissions, represented as a number.
     */
    permissions: number;
};

/**
 * Represents options for reading and writing files.
 */
export type OptionsBase = Options & {
    /**
     * The character encoding to use when reading or writing the file.
     */
    encoding: BufferEncoding;
}

/**
 * Represents options for reading and writing CSV files.
 */
export type OptionsCsv = OptionsBase & {
    /**
     * The character used to separate fields in the CSV file.
     */
    separator: string;

    /**
     * The character used to quote fields in the CSV file.
     */
    quote: string;

    /**
     * The character used to escape special characters in the CSV file.
     */
    escape: string;
}

/**
 * Type representing a part with metadata and content.
 *
 * @template META - The type of metadata, which extends the `Meta` type.
 * @template CONTENT - The type of content.
 */
export type Part<META extends Meta = Meta, CONTENT = any> = {
    /**
     * Metadata associated with the part, represented as a record of key-value pairs.
     */
    meta: META;

    /**
     * The content of the part, which can be of any type specified by the `CONTENT` template parameter.
     */
    content: CONTENT;
};

/**
 * Type representing a collection of parts, indexed by a unique key.
 *
 * @template PART - The type of part, which extends the `Part` type.
 */
export type Parts<PART extends Part = Part> = Record<string, PART>;