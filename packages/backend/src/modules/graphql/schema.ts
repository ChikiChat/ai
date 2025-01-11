const schema = `
scalar DateTime
scalar JSON
scalar UUID

""" The ID scalar represents a unique identifier """
interface Node {
    """ The unique identifier for the node """
    id: ID!

    """ The timestamp at which the node was created """
    created_at: DateTime!

    """ The timestamp at which the node was last updated """
    updated_at: DateTime!
}

enum ContentType {
    Text
    Image
    Video
    Audio
    File
}

enum FeatureKind {
    Management
    Integration
}

enum MessageRole {
    System
    User
    Assistant
    Tool
}

enum OrganizationRole {
    Owner
    Editor
    Viewer
}

type Feature implements Node {
    id: ID!
    code: String!
    name: String!
    description: String
    kind: FeatureKind!
    enabled: Boolean!
    integrations: [Integration!]!
    created_at: DateTime!
    updated_at: DateTime!
}

type Integration implements Node {
    id: ID!
    feature_code: String!
    name: String!
    credentials: String!
    settings: JSON!
    enabled: Boolean!
    feature: Feature!
    created_at: DateTime!
    updated_at: DateTime!
}

type Invite implements Node {
    id: ID!
    organization_id: UUID!
    email: String!
    role: OrganizationRole!
    code: UUID!
    expires: DateTime!
    created_at: DateTime!
    updated_at: DateTime!
}

type Member implements Node {
    id: ID!
    user_id: UUID!
    role: String!
    created_at: DateTime!
    updated_at: DateTime!
}

type ProjectPrompt implements Node {
    id: ID!
    project_id: UUID!
    tool_id: UUID
    name: String!
    description: String
    system: String
    user: String!
    meta: Boolean!
    created_at: DateTime!
    updated_at: DateTime!
    project: Project!
    tool: ProjectTool
    thread_presets: [ProjectThreadPreset!]!
}

type ProjectThreadMessage implements Node {
    id: ID!
    thread_id: UUID!
    role: MessageRole!
    content_type: ContentType!
    content: String!
    created_at: DateTime!
    updated_at: DateTime!
    thread: ProjectThread!
}

type ProjectThreadPreset implements Node {
    id: ID!
    project_id: UUID!
    prompt_id: UUID!
    name: String!
    description: String
    model: String!
    temperature: Float!
    max_tokens: Int!
    top_p: Float!
    top_k: Int!
    min_p: Float!
    frequency_penalty: Float!
    presence_penalty: Float!
    repetition_penalty: Float!
    created_at: DateTime!
    updated_at: DateTime!
    project: Project!
    prompt: ProjectPrompt!
}

type ProjectThread implements Node {
    id: ID!
    project_id: UUID!
    name: String!
    description: String
    model: String!
    temperature: Float!
    max_tokens: Int!
    top_p: Float!
    top_k: Int!
    min_p: Float!
    frequency_penalty: Float!
    presence_penalty: Float!
    repetition_penalty: Float!
    created_at: DateTime!
    updated_at: DateTime!
    project: Project!
    messages: [ProjectThreadMessage!]!
}

type ProjectTool implements Node {
    id: ID!
    project_id: UUID!
    name: String!
    description: String
    parameters: JSON!
    code: String!
    created_at: DateTime!
    updated_at: DateTime!
    project: Project!
    prompts: [ProjectPrompt!]!
}

type Project implements Node {
    id: ID!
    name: String!
    description: String
    default: Boolean!
    created_at: DateTime!
    updated_at: DateTime!
    tools: [ProjectTool!]!
    prompts: [ProjectPrompt!]!
    thread_presets: [ProjectThreadPreset!]!
    threads: [ProjectThread!]!
}

type Session implements Node {
    id: ID!
    user_id: UUID
    session_token: String!
    user_agent: String!
    expires: DateTime!
    created_at: DateTime!
    updated_at: DateTime!
    user: User
}

type User implements Node {
    id: ID!
    first_name: String!
    last_name: String!
    email: String
    password: String
    email_verified: DateTime
    image: String
    bio: String
    website: String
    last_seen: DateTime
    created_at: DateTime!
    updated_at: DateTime!
    sessions: [Session!]!
    members: [Member!]!
}

type Query {
    """ Get all users """
    users: [User!]!
}

type Mutation {
    """ Create a new user """
    createUser(email: String!, name: String!, password: String!): User!
}

type Subscription {
    """ Subscribe to new users """
    newUser: User!
}`

export default schema