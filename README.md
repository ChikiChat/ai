# AI SDK 👋

The AI SDK is a TypeScript toolkit designed to help you build AI-powered applications
using popular frameworks like Next.js, React, Svelte, Vue and runtimes like Bun or Node.js.

We are based on the [AI SDK](https://sdk.vercel.ai).

## Motivation

The AI SDK is driven by several key motivations:

* **Simplification of AI Integration**: Many providers offer AI services, but integrating these services into
  applications can be complex and time-consuming. The AI SDK aims to simplify this process by providing a unified
  interface for interacting with multiple AI providers.
* **Cost Tracking and Optimization**: With the increasing use of AI services, it's essential to track and manage costs
  effectively. The AI SDK provides features for tracking usage and costs across different providers, enabling developers
  to optimize their AI spend.
* **One-Stop Shop for AI Services**: The AI SDK offers a single platform for accessing a wide range of AI services from
  various providers, including AI21 Labs, Anthropic, Cohere, Google Generative AI, and many more. This eliminates the
  need for developers to manage multiple APIs and credentials.
* **Seamless Switching between Providers**: The AI SDK allows developers to easily switch between different AI
  providers, enabling them to compare services, test new models, and choose the best option for their specific use case.
* **Streamlined Development and Deployment**: By providing a standardized interface for AI services, the AI SDK
  accelerates development and deployment of AI-powered applications, enabling businesses to bring their products to
  market faster.

Key benefits of the AI SDK include:

* **Unified Interface**: A single interface for interacting with multiple AI providers
* **Multi-Provider Support**: Access to a wide range of AI services from various providers
* **Cost Tracking and Optimization**: Features for tracking usage and costs across different providers
* **Simplified Development and Deployment**: Accelerated development and deployment of AI-powered applications

By addressing these motivations and providing these key benefits, the AI SDK aims to become the go-to platform for
developers building AI-powered applications.

## Installation

You will need Bun or Node.js 18+ and pnpm installed on your local development machine.

```shell
bun i @chikichat/ai
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
- [ ] OpenRouter AI
- [ ] Perplexity
- [ ] Qwen
- [x] SambaNova
- [ ] Together
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
import {languageModel, usageModel} from '@chikichat/ai';

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
import {embeddingModel} from '@chikichat/ai';

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
you to review our [Contribution Guidelines](CONTRIBUTING.md) to make sure you have smooth experience contributing to AI
SDK.

## License

This project is licensed under the Apache License Version 2.0 License - see the [LICENSE](LICENSE) file for details.
