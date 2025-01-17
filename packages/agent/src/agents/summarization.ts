import { LanguageModelInit } from '@chikichat/model';
import { Agent } from './agent';
import { Prompt } from '../prompts';

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
     * @param prompt - An optional custom prompt. If not provided, a default prompt will be used.
     */
    constructor(init: LanguageModelInit, prompt: string = '') {
        super(
            'Summarization',
            'Summarizes the provided text.',
            init,
            new Prompt(prompt || `
You are a summarization expert. Please summarize the text according to the following instructions:
- Summarize the text up to 100 words.
- Summarize the text up to 5 bullet points.
- Create a summary of the text up to 3 sentences.
- Create a quote.

Text: \${text}
`)
        );
    }

    /**
     * Executes the summarization task with the provided text.
     *
     * @param text - The text to be summarized.
     * @returns A promise that resolves to the summarized output.
     */
    async execute(text: string): Promise<OUTPUT> {
        return super.execute({ text });
    }
}
