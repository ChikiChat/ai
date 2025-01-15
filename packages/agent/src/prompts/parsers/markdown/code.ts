import {IParser} from "../parser";

export type CodeBlock = {
    language: string;
    code: string;
}

/**
 * Parser for extracting Markdown code blocks from a given input string.
 * This parser uses a regular expression to identify code blocks and extracts
 * both the language and the code content.
 */
export class ParserMarkdownCode implements IParser<CodeBlock[]> {

    /**
     * Parses the input string to extract Markdown code blocks.
     *
     * @param input - The input string containing Markdown code blocks.
     * @returns An array of CodeBlock objects, each containing the language and code content.
     * @throws Will throw an error if the input is not a string.
     */
    parse(input: string): CodeBlock[] {
        const blocks: CodeBlock[] = [];
        const regex = /```(?<language>\w+)?\n(?<code>[\s\S]+?)\n```/g;
        let match;

        while ((match = regex.exec(input)) !== null) {
            if (!match.groups) continue;

            blocks.push({
                language: match.groups.language?.trim() ?? '',
                code: match.groups.code?.trim() ?? '',
            });
        }

        return blocks;
    }
}