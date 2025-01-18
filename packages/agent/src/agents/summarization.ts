import {LanguageModelInit} from '@chikichat/model';
import {Agent} from './agent';

/**
 * An agent specialized in summarizing text.
 *
 * @template OUTPUT - The type of the output produced by the agent.
 */
export class AgentSummarization<OUTPUT = string> extends Agent<OUTPUT> {
    /**
     * Constructs a new summarization agent with the given initialization configuration and optional prompt.
     *
     * @param init - The initialization configuration for the language model.
     */
    constructor(init: LanguageModelInit) {
        init.prompt = init.prompt || `
You are a summarization expert. Please summarize the text according to the following instructions:
- Summarize the text up to 100 words.
- Summarize the text up to 5 bullet points.
- Create a summary of the text up to 3 sentences.
- Create a quote.

Input: \${input}
`
        super('Summarization', 'Summarizes the provided text.', init);
    }

    /**
     * Executes the summarization task with the provided input.
     *
     * @param input - The input to be summarized.
     * @returns A promise that resolves to the summarized output.
     */
    async perform(input: string): Promise<OUTPUT> {
        return super.perform({input});
    }
}
