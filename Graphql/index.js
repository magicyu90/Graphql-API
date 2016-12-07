import {
    GraphQLObjectType,
    GraphQLSchema
} from 'graphql';

import userQuery from './queries';
import userMutation from './mutations';

const Schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        description: "User Query",
        fields: userQuery
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        description: "User Mutation",
        fields: userMutation
    })
});


export  default  Schema;
