import {IParser} from '../types';

/**
 * Represents a code block extracted from a Markdown document.
 * Each code block contains a language identifier and the actual code content.
 */
export type CodeBlock = {
    /**
     * The programming language of the code block.
     * This is typically specified after the opening triple backticks (```).
     * If no language is specified, this field will be an empty string.
     */
    language: string;

    /**
     * The actual code content within the code block.
     * This is the text between the opening and closing triple backticks (```).
     */
    code: string;
};

/**
 * Parser for extracting Markdown code blocks from a given input string.
 * This parser uses a regular expression to identify code blocks and extracts
 * both the language and the code content.
 */
export class ParserMarkdownCode<OUTPUT extends CodeBlock[]> implements IParser<OUTPUT> {

    /**
     * Parses the input string to extract Markdown code blocks.
     *
     * @param input - The input string containing Markdown code blocks.
     * @returns An array of CodeBlock objects, each containing the language and code content.
     * @throws Will throw an error if the input is not a string.
     */
    parse(input: string): OUTPUT {
        const blocks: CodeBlock[] = [];
        const regex = /```(\w*)\n([\s\S]*?)\n```/g;
        let match;

        while ((match = regex.exec(input)) !== null) {
            blocks.push({
                language: match[1] ? match[1].trim() : '',
                code: match[2] ? match[2].trim() : ''
            });
        }

        return blocks as OUTPUT;
    }
}
