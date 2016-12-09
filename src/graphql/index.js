import {UserSchema} from './schema/user';
import {UserResolver} from './resolver/user';
import {makeExecutableSchema} from 'graphql-tools';

const graphqlExecutableSchema = makeExecutableSchema({
    typeDefs: [UserSchema],
    resolvers: UserResolver
});

export  default  graphqlExecutableSchema;