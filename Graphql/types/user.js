import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLID

} from 'graphql';

export default new GraphQLObjectType({

    name: "User",
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        password: {
            type: new GraphQLNonNull(GraphQLString)
        },
        email: {
            type: new GraphQLNonNull(GraphQLString)
        },
        name: {
            type: GraphQLString
        }

    }

});