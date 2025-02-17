import * as fs from 'fs/promises';
import * as path from 'path';
import {Document} from "./document";
import {Meta, MetaLocal, OptionsBase, Part} from "./types";

/**
 * Represents a document stored locally on the filesystem.
 *
 * @template META - The type of metadata, which extends the `Meta` type.
 * @template PART - The type of part, which extends the `Part` type.
 */
export abstract class DocumentLocal<META extends Meta = MetaLocal, PART extends Part = Part> extends Document<META, PART> {
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
    async contents(name: string, options?: OptionsBase): Promise<string> {
        try {
            const encoding: BufferEncoding = options?.encoding || 'utf-8';
            const resolvedPath = path.resolve(name);
            const contents = await fs.readFile(resolvedPath, encoding);
            const stats = await fs.stat(resolvedPath);

            this.meta = {
                ...this.meta,
                name: resolvedPath,
                uid: stats.uid,
                gid: stats.gid,
                created: stats.birthtime.getTime(),
                modified: stats.mtime.getTime(),
                permissions: stats.mode,
            };

            return contents.trim();
        } catch (error) {
            throw new Error(`Failed to load file from path: ${name}. Error: ${(error as Error).message}`);
        }
    }
}