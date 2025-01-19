import {DEFAULT_LANGUAGE_MODEL_NAME} from "@chikichat/model";
import {Agent} from "../../src";

/**
 * The Agent class is designed to perform specific tasks based on the provided configuration.
 * It can be used to summarize text, answer questions, or perform other language-related tasks.
 * The class takes a name, a description, and a configuration object that includes the model and prompt.
 */
const summarize = new Agent({
    name: 'Summarize',
    description: 'Summarizes the provided text.',
    init: {
        prompt: `
You are a summarization expert. Please summarize the text according to the following instructions:
  - Summarize the text up to 100 words.
  - Summarize the text up to 5 bullet points.
  - Create a summary of the text up to 3 sentences.
  - Create a quote.

**Input:** $\{input}

Please ensure that the summary is concise, accurate, and captures the key points of the text.
        `,
        /**
         * The language model to be used for summarization.
         * This can be overridden by the environment variable LANGUAGE_MODEL_NAME.
         */
        model: DEFAULT_LANGUAGE_MODEL_NAME,
    },
    maxSteps: 1,
});

summarize.execute({
    'input': `
### Creating an AI Agent: A Comprehensive Guide

In the rapidly evolving landscape of artificial intelligence, the creation of an AI agent has become a pivotal step for businesses and organizations looking to enhance their operational efficiency and customer engagement. An AI agent, whether it's a chatbot, virtual assistant, or automated system, is designed to interact with users, perform tasks, and provide information autonomously. Here’s a detailed guide on how to create an effective AI agent.

#### 1. Define the Purpose and Scope
Before diving into the technical aspects, it's crucial to define the purpose and scope of your AI agent. What specific tasks will it perform? Who is the target audience? What are the key objectives you aim to achieve? Clear objectives will guide the development process and ensure that the AI agent meets the desired outcomes.

#### 2. Choose the Right Platform and Tools
Selecting the right platform and tools is essential for building an AI agent. Popular platforms offer pre-built templates, natural language processing (NLP) capabilities, and integration options that can significantly streamline the development process. Consider platforms that provide robust NLP features, easy-to-use interfaces, and strong community support. Additionally, evaluate the programming languages and frameworks that best suit your project requirements. Choose tools that are scalable, flexible, and compatible with your existing systems.

#### 3. Design the Conversation Flow
The conversation flow is the backbone of any AI agent. It dictates how the agent will interact with users, respond to queries, and handle different scenarios. Designing an intuitive and user-friendly conversation flow involves mapping out potential user interactions, creating dialogue trees, and anticipating common user queries. Tools like flowchart software or specialized conversation design tools can be helpful in this process.

#### 4. Develop and Train the NLP Model
Natural Language Processing (NLP) is the technology that enables AI agents to understand and process human language. Developing and training an NLP model involves several steps:
- **Data Collection**: Gather a diverse set of data that includes various user queries and responses.
- **Data Annotation**: Label the data to help the model understand the context and intent behind the queries.
- **Model Training**: Use machine learning algorithms to train the model on the annotated data.
- **Testing and Iteration**: Continuously test the model and refine it based on user interactions and feedback.

#### 5. Integrate with Backend Systems
For an AI agent to be truly effective, it needs to be integrated with backend systems such as databases, CRM systems, and other enterprise applications. This integration allows the agent to access and manipulate data, perform tasks, and provide personalized responses. Ensure that the integration is seamless and secure to maintain data integrity and user trust.

#### 6. Test and Deploy
Testing is a critical phase that involves evaluating the AI agent's performance, usability, and reliability. Conduct thorough testing to identify and fix any issues before deployment. Once the agent is ready, deploy it in a controlled environment to monitor its performance and gather user feedback. Use this feedback to make further improvements.

#### 7. Monitor and Maintain
After deployment, continuous monitoring and maintenance are essential to ensure the AI agent remains effective and up-to-date. Monitor user interactions, track performance metrics, and update the agent as needed to address new challenges and improve user experience. Regular updates to the NLP model and conversation flow can help the agent adapt to changing user needs and preferences.

#### Conclusion
Creating an AI agent is a multifaceted process that requires careful planning, technical expertise, and continuous improvement. By following these steps, you can develop an AI agent that not only meets your business objectives but also enhances user satisfaction and engagement. As AI technology continues to advance, the potential for AI agents to transform industries is immense, making it an exciting time to be at the forefront of this innovation.

---

This guide provides a foundational understanding of the process involved in creating an AI agent. Depending on the specific requirements and complexity of your project, additional considerations and steps may be necessary.
`,
}).then(console.log)