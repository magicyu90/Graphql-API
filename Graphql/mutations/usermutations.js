import {
    GraphQLList,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLObjectType,
} from 'graphql';

import  UserModel from '../../Models/user';
import jwt from 'jsonwebtoken';
import {jwtConfig} from '../../config/index';

const TokenType = new GraphQLObjectType({
    name: "Token",
    description: "create token for user",
    fields: {
        token: {
            type: GraphQLString
        },
        message: {
            type: GraphQLString
        }
    }
});


module.exports = {

    registerUser: {

        description: "Register user and return back token",
        type: TokenType,
        args: {
            password: {
                description: "user password",
                type: new GraphQLNonNull(GraphQLString)
            },
            email: {
                description: "user email",
                type: new GraphQLNonNull(GraphQLString)
            },
            name: {
                description: "user name",
                type: new GraphQLNonNull(GraphQLString)
            },
            address: {
                description: "user address",
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve: (root, args) => {

            return new Promise((resolve, reject) => {

                UserModel.findOne({email: args.email}).then((userData) => {
                    if (userData === null) {
                        UserModel.create({
                            name: args.name,
                            email: args.email,
                            password: args.password,
                            address: args.address
                        }).then((user) => {

                            resolve({
                                token: jwt.sign(user, jwtConfig.secret),
                                message: "success"
                            });

                        }).catch((err) => {
                            reject(err);
                            console.log(err);
                        });
                    }
                    else {
                        let message = args.email + ' existed';
                        resolve({
                            token: null,
                            message: message
                        })
                        console.log(message);
                    }
                }).catch((err) => {
                    console.log(err);
                });
            });
        }
    }
}
