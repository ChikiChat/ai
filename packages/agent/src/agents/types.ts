import { FinishReason } from "ai";
import type { LanguageModelInit, UsageModel } from '@chikichat/model';
import { ILogger } from '../logger';
import { IParser } from "../prompts";

/**
 * Type for the initialization options of a step.
 * This includes the language model initialization options and an optional parser.
 */
export type Input<OUTPUT = string> = LanguageModelInit & {
    readonly parser?: IParser<OUTPUT>;
}

/**
 * Type for the output of a step or task.
 * This includes the input provided, the raw and parsed output, the finish reason, and usage details.
 */
export type Output<OUTPUT = string> = {
    input: string,          // The input string provided to the task or step.
    output: {
        raw: string,        // The raw output string from the task or step.
        output: OUTPUT      // The parsed output, which can be of any type specified by the parser.
    },
    finishReason: FinishReason, // The reason why the task or step finished.
    usage: UsageModel,          // Usage details, such as tokens used, etc.
}

/**
 * Interface for an agent that performs a specific task.
 */
export interface IAgent<OUTPUT> {
    /**
     * The name of the agent.
     * This should be a unique identifier for the agent.
     */
    readonly name: string;

    /**
     * A description of what the agent does.
     * This should provide a clear and concise explanation of the agent's purpose and functionality.
     */
    readonly description: string;

    /**
     * The logger used by the agent for logging purposes.
     */
    readonly logger: ILogger;

    /**
     * Adds a step to the agent's workflow with the given input configuration.
     *
     * @param input - The configuration for the step, including language model initialization and an optional parser.
     */
    addStep(input: Input<OUTPUT>): void;

    /**
     * Performs the task with the given arguments and optional initialization configuration.
     *
     * @param args - An object containing the arguments needed for the task.
     *               The structure of this object should be consistent with the requirements of the specific task.
     * @returns A promise that resolves to the output of the task.
     *          The output is of type Output<OUTPUT>, which includes the raw output, parsed output, finish reason, and usage details.
     * @throws Will throw an error if the task cannot be performed due to invalid arguments or other issues.
     */
    perform(args: { [key: string]: any }): Promise<Output<OUTPUT>>;
}
