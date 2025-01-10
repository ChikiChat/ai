import {DateTimeResolver, JSONResolver, UUIDResolver} from 'graphql-scalars';

const resolvers = {
    DateTime: DateTimeResolver,
    JSON: JSONResolver,
    UUID: UUIDResolver,
    Query: {},
    Mutation: {},
    Subscription: {},
}

export default resolvers