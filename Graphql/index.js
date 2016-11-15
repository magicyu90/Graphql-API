import {
    GraphQLObjectType,
    GraphQLSchema
} from 'graphql';

import userQuery from './queries';

export default new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: userQuery
    })
});

