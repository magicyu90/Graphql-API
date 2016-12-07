import {
    GraphQLList,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLObjectType,
} from 'graphql';

import  UserModel from '../../Models/user';
import  userType from '../types/user';


module.exports={
    findUserByEmail: {
        description:"Find user by Email",
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
        description:"Get all users",
        type: new GraphQLList(userType),
        resolve: ()=> {
            return UserModel.find({});
        }
    }
}


