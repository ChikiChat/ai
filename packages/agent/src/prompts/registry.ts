import {Prompt} from './prompt';

// Define a prompt template for evaluating
export const PromptEvaluate = new Prompt(`
Please answer the following question very accurately; a one- to five-word response is ideal:
\${statement}
`);

export const PromptSummarization = new Prompt(`
You are summarization expert. You can summarize the text. Please provide the following instructions:
 - Please summarize the following text up to 100 words.
 - Summarize the text up to 5 bullet points.
 - Create a summary of the text up to 3 sentences.
 - Create a quote.
 
Text: \${text}
`);