import {Prompt} from './prompt';

// Define a prompt template for evaluating
export const PromptEvaluate = new Prompt(`
Please answer the following question very accurately; a one- to five-word response is ideal:
\${statement}
`);