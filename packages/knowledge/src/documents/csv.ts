import {DocumentLocal} from "./local";
import {MetaLocal, OptionsCsv, Part} from "./types";

export class DocumentCsv<PART extends Part = Part> extends DocumentLocal<MetaLocal, PART> {
    /**
     * Loads the content of a CSV document from a file.
     *
     * @param name - The name of the document to load.
     * @param options - An object containing options for loading the document.
     * @returns A promise that resolves to a boolean indicating whether the document was successfully loaded.
     */
    async load(name: string, options?: OptionsCsv): Promise<boolean> {
        try {
            options = this.options(options);
            const content = await this.contents(name, options);
            const separator = options.separator;
            const quote = options.quote;
            const escape = options.escape;
            const rows = content.split('\n');
            const headers = rows[0].split(separator);

            rows.slice(1).forEach(row => {
                if (row.split(',').length !== headers.length) {
                    throw new Error('The number of columns in the CSV file does not match the number of headers.');
                }

                const values = row.split(separator).map(
                    value => value.trim()
                );

            })

            const result: Part<Meta>[] = rows.slice(1).map(row => {
                const values = row.split(',');

                // Create the meta object using headers and values
                const meta: Meta = {};
                headers.forEach((header, index) => {
                    meta[header.trim()] = values[index].trim();
                });

                // Create the content object (for simplicity, we'll use the entire row as content)
                const content = values.map(value => value.trim());

                return {
                    meta: meta as Meta,
                    content: content as any
                };
            });

            return result;

            // Create a part for each line.
            // lines.forEach((line, index) => {
            //     this.parts[(index + 1).toString()] = {
            //         meta: {line: index + 1},
            //         content: line,
            //     } as unknown as PART;
            // });

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    /**
     * Saves the content of a CSV document to a file.
     *
     * @param _name - The name of the document to save.
     * @param _options - An object containing options for saving the document.
     * @returns A promise that resolves to a boolean indicating whether the document was successfully saved.
     * @throws Will throw an error if the method is not implemented.
     */
    async save(_name: string, _options: OptionsCsv): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    /**
     * Gets or sets options for the CSV document.
     *
     * @param options - An object containing options for the document.
     * @returns The options object with default values applied.
     */
    options(options?: OptionsCsv): OptionsCsv {
        return {
            encoding: options?.encoding || 'utf-8',
            separator: options?.separator || ',',
            quote: options?.quote || '"',
            escape: options?.escape || '\\',
        };
    }
}
