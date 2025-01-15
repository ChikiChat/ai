import {Task} from "../task";
import {languageModel, LanguageModelInit} from "@chikichat/model";
import {IPrompt} from "../../prompts";
import {CoreTool, generateText, GenerateTextResult} from "ai";

export class TaskGenerateText<OUTPUT = string> extends Task<GenerateTextResult<Record<string, CoreTool>, never>> {
    /**
     * The identifier of the language model to be used.
     */
    readonly init: LanguageModelInit;

    /**
     * The prompt to generate text from.
     */
    readonly prompt: IPrompt<OUTPUT>

    constructor(init: LanguageModelInit, prompt: IPrompt<OUTPUT>) {
        super('Generate Text', 'Generates text based on the provided prompt.');

        this.init = init;
        this.prompt = prompt;
    }

    async run(args: { [key: string]: any }): Promise<GenerateTextResult<Record<string, CoreTool>, never>> {
        return generateText({
            prompt: this.prompt.toString(args),
            model: languageModel(this.init.model),
            maxTokens: this.init.maxTokens,
            maxSteps: this.init.maxSteps,
            temperature: this.init.temperature,
            topP: this.init.topP,
            topK: this.init.topK,
            presencePenalty: this.init.presencePenalty,
            frequencyPenalty: this.init.frequencyPenalty,
            tools: this.init.tools,
        })
    }
}