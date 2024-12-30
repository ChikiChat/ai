# AI SDK 👋

The AI SDK is a TypeScript toolkit designed to help you build AI-powered applications using popular frameworks like Next.js,
React, Svelte, Vue and runtimes like Node.js or Bun.

## Installation

You will need Node.js 18+ and npm installed on your local development machine.

```shell
npm install @chikichat/ai
```

## Providers

- [x] AI21 Labs
- [x] Anthropic
- [x] Cohere
- [ ] DeepSeek
- [x] Google Generative AI
- [x] Groq
- [ ] Hugging Face
- [x] Mistral
- [ ] Novita
- [ ] Nvidia
- [x] OpenAI
- [ ] OpenRouter AI
- [ ] Perplexity
- [ ] Qwen
- [x] SambaNova
- [ ] Together
- [ ] Vertex AI
- [ ] xAI

and SPECIAL

- [ ] Co:Here
- [ ] llama.cpp
- [ ] TensorRT-LLM

## Usage Examples

#### Large language models (LLMs) can generate text in response to a prompt, which can contain instructions and information to process. For example, you can ask a model to come up with a recipe, draft an email, or summarize a document.
###### @/index.ts (Node.js Runtime)

```ts
import {generateText} from 'ai';
import {languageModel} from '@chikichat/ai';

const {text} = await generateText({
    model: languageModel('<api key>', 'anthropic/claude-3-5-sonnet-20241022'),
    system: 'You are a friendly assistant!',
    prompt: 'Why is the sky blue?',
});

console.log(text);
```

#### Embeddings are a way to represent words, phrases, or images as vectors in a high-dimensional space. In this space, similar words are close to each other, and the distance between words can be used to measure their similarity.
###### @/index.ts (Node.js Runtime)

```ts
import {embed} from 'ai';
import {embeddingModel} from '@chikichat/ai';

const { embedding } = await embed({
    model: embeddingModel('<api key>', 'mistral/mistral-embed'),
    value: 'sunny day at the beach',
});

console.log(embedding);
```

## Contributing

Contributions to the AI SDK are welcome and highly appreciated. However, before you jump right into it, we would like you to review our [Contribution Guidelines](CONTRIBUTING.md) to make sure you have smooth experience contributing to AI SDK.

## License

This project is licensed under the Apache License Version 2.0 License - see the [LICENSE](LICENSE) file for details.
