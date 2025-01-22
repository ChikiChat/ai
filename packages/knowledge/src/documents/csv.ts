import {DocumentLocal} from "./local";
import {MetaLocal, Part, Parts} from "./types";

export class DocumentCsv<PART extends Part = Part> extends DocumentLocal<MetaLocal, PART> {
    constructor(meta: MetaLocal, parts?: Parts<PART>) {
        super(meta, parts);
    }

    async load(name: string, options: Record<string, boolean | string | number>): Promise<boolean> {
        try {
            const content = await this.contents(name, options);
            // const separator = options?.separator as string || ',';
            // const quote = options?.quote as string || '"';
            // const escape = options?.escape as string || '\\';

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