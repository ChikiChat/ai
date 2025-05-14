# AI SDK (model) 👋

The AI SDK is a TypeScript toolkit designed to help you build AI-powered applications
using popular frameworks like Next.js, React, Svelte, Vue and runtimes like Bun or Node.js.

We are based on the [AI SDK](https://sdk.vercel.ai).

## Installation

You will need Bun or Node.js 18+ and pnpm installed on your local development machine.

```shell
pnpm i @chikichat/model
```

## Providers

- [x] AI21 Labs
- [x] Anthropic
- [x] Cohere
- [x] DeepSeek
- [x] Google Generative AI
- [x] Groq
- [ ] Hugging Face
- [x] Mistral
- [ ] Novita
- [x] Nvidia
- [x] OpenAI
- [x] OpenRouter AI
- [ ] Perplexity
- [ ] Qwen
- [x] SambaNova
- [x] Together
- [ ] Vertex AI
- [x] xAI

and SPECIAL

- [ ] Co:Here
- [ ] llama.cpp
- [ ] TensorRT-LLM

## Usage Examples

**Large language models (LLMs) can generate text in response to a prompt, which can contain instructions and information
to process. For example, you can ask a model to come up with a recipe, draft an email, or summarize a document.**

###### @/index.ts (Bun Runtime)

```ts
import {generateText} from 'ai';
import {languageModel, usageModel} from '@chikichat/model';

const model = 'anthropic/claude-3-5-sonnet-20241022';

/**
 * Generate text using a language model.
 */
const {text, usage} = await generateText({
    model: languageModel(model, '<api key>'),
    system: 'You are a friendly assistant!',
    prompt: 'Why is the sky blue?',
});

console.log(text);
console.log(usageModel(model, usage));

// read more: https://sdk.vercel.ai/docs/ai-sdk-core/generating-text 
```

```shell
bun run index.ts
```

**Embeddings are a way to represent words, phrases, or images as vectors in a high-dimensional space. In this space,
similar words are close to each other, and the distance between words can be used to measure their similarity.**

###### @/index.ts (Bun Runtime)

```ts
import {embed} from 'ai';
import {embeddingModel} from '@chikichat/model';

/**
 * Embed a text using an embedding model.
 */
const {embedding} = await embed({
    model: embeddingModel('mistral/mistral-embed', '<api key>'),
    value: 'sunny day at the beach',
});

console.log(embedding);

// read more: https://sdk.vercel.ai/docs/ai-sdk-core/embeddings
```

```shell
bun run index.ts
```

## Contributing

Contributions to the AI SDK are welcome and highly appreciated. However, before you jump right into it, we would like
you to review our [Contribution Guidelines](https://github.com/ChikiChat/ai/blob/main/CONTRIBUTING.md) to make sure you have smooth experience contributing to AI
SDK.

## License

This project is licensed under the Apache License Version 2.0 License - see the [LICENSE](https://github.com/ChikiChat/ai/blob/main/LICENSE) file for details.
