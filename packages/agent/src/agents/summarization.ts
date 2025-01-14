import {LanguageModelInit} from '@chikichat/model';
import {Agent} from './agent';
import {PromptSummarization} from '../prompts';

export class AgentSummarization extends Agent {
    constructor(init: LanguageModelInit) {
        super('Summarization', 'Summarization the text.', PromptSummarization, init);
    }

    async run(text: string): Promise<string> {
        return super.run({text: text});
    }
}