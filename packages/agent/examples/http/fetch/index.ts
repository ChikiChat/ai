import {DEFAULT_LANGUAGE_MODEL_NAME} from "@chikichat/model";
import {Agent, registry as tools} from "@chikichat/agent";

/**
 * The Agent class is designed to perform specific tasks based on the provided configuration.
 * It can be used to summarize text, answer questions, or perform other language-related tasks.
 * The class takes a name, a description, and a configuration object that includes the model and prompt.
 */
const fetch = new Agent({
    name: 'http/fetch',
    description: 'An agent that fetches content from a URL.',
    init: {
        prompt: `
You are an HTTP fetch expert. Please use the appropriate tools to fetch the content from the provided URL and extract the following information:
  - Title
  - Description
  - Images
  - Links

**Input:** $\{input}

Please ensure that you handle any potential errors and provide the extracted information in a structured format.
        `,
        /**
         * The language model to be used for summarization.
         * This can be overridden by the environment variable LANGUAGE_MODEL_NAME.
         */
        model: DEFAULT_LANGUAGE_MODEL_NAME,

        tools: {
            fetch: tools['http/fetch'],
        },
    },
});

fetch.execute({
    'input': `Use this URL: https://15min.lt`
}).then(console.log)

