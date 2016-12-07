import {
    GraphQLList,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLObjectType,
} from 'graphql';

import  UserModel from '../../Models/user';
import  userType from '../types/user';
import jwt from 'jsonwebtoken';
import {jwtConfig} from '../../config/index';


module.exports = {
    getToken: {
        description: "Get token",
        type: new GraphQLObjectType({
            name: "token",
            fields: {
                token: {
                    type: GraphQLString
                }
            }
        }),
        args: {
            email: {
                type: GraphQLString,
                description: "email"
            },
            password: {
                type: GraphQLString,
                description: "password"
            }
        },
        resolve: (root, params) => {
            return new Promise((resolve, reject) => {

                UserModel.findOne({
                    email: params.email,
                    password: params.password
                }).then((userData) => {
                    if (userData && userData._doc) {
                        resolve({
                            token: jwt.sign(userData._doc, jwtConfig.secret)
                        })
                    }
                    else {
                        resolve(null);
                    }
                }).catch((err) => {
                    console.log(err);
                    reject(err);
                })
            })
        }
    },
    findUserByEmail: {
        description: "Find user by Email",
        type: userType,
        args: {
            email: {
                description: "User email",
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve: (root, params, options) => {
            return UserModel.findOne({
                email: params.email
            });
        }
    },
    getAllUsers: {
        description: "Get all users",
        type: new GraphQLList(userType),
        resolve: () => {
            return UserModel.find({});
        }
    }
}


