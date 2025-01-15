import {LanguageModelInit} from '@chikichat/model';
import {Agent} from './agent';
import {Prompt} from '../prompts';

export class AgentSummarization extends Agent {
    constructor(init: LanguageModelInit, prompt: string = '') {
        super('Summarization', 'Summarization the text.', init, new Prompt(prompt ?? `
You are summarization expert. You can summarize the text. Please provide the following instructions:
 - Please summarize the following text up to 100 words.
 - Summarize the text up to 5 bullet points.
 - Create a summary of the text up to 3 sentences.
 - Create a quote.
 
Text: \${text}
`));
    }

    async run(text: string): Promise<string> {
        return super.run({text: text});
    }
}