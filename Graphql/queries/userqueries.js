import {
    GraphQLList,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLObjectType,
} from 'graphql';

import  UserModel from '../../Models/user';
import  userType from '../types/user';


export default {
    findUserByEmail: {
        type: userType,
        args: {
            email: {
                description: "User email",
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve: (root, params, options)=> {
            return UserModel.findOne({
                email: params.email
            });
        }
    },
    getAllUsers: {
        type: new GraphQLList(userType),
        resolve: ()=> {
            return UserModel.find({});
        }
    }
};


