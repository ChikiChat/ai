import {FinishReason} from "ai";
import type {LanguageModelInit, UsageModel} from '@chikichat/model';
import {IParser} from "../prompt";

/**
 * Configuration type for an Agent.
 *
 * @template OUTPUT - The type of the output that the agent will produce.
 */
export type Config<OUTPUT> = {
    /**
     * The name of the configuration.
     */
    readonly name: string;

    /**
     * A description of the configuration.
     */
    readonly description: string;

    /**
     * The initial input for the agent.
     */
    init: Input<OUTPUT>;
};

export type ConfigStep<OUTPUT> = Config<OUTPUT> & {
    /**
     * The maximum number of steps the agent can execute.
     */
    maxSteps: number;

    /**
     * Optional callback function to be executed after each step.
     *
     * @param step - The current step number.
     * @param input - The input for the current step.
     * @param output - The output from the previous step.
     * @returns A promise that resolves to the output for the current step.
     */
    onStepFinish?: (step: number, input: Input<OUTPUT>, output: Output<OUTPUT>) => Promise<Output<OUTPUT>>;
}

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
 * Interface for an Agent that can execute tasks based on a configuration.
 *
 * @template OUTPUT - The type of the output that the agent will produce.
 */
export interface IAgent<OUTPUT> {
    /**
     * Configuration object for the agent.*
     */
    config: Config<OUTPUT> | ConfigStep<OUTPUT>;

    /**
     * Executes the agent's task with the provided arguments.
     *
     * @param args - An object containing key-value pairs as arguments for the execution.
     * @returns A promise that resolves to the output of the execution.
     */
    execute(args: { [key: string]: any }): Promise<Output<OUTPUT>>;
}

