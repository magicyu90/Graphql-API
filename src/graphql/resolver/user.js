import {UserModel} from '../../data/schema/userSchema';
import jwt from 'jsonwebtoken';
import {jwtConfig} from '../../config';
import UserService from '../../logic/userService';
import throwError from '../../lib/throwError';

export const UserResolver = {

    Query: {
        login: async(root, args, {viewer}) => {
            // return new Promise((resolve, reject) => {
            //     UserModel.findOne({
            //         email: args.email
            //     }).then((userData) => {
            //         if (userData && userData._doc) {
            //
            //             console.log('user' + args.email + ' login in');
            //             resolve({
            //                 token: jwt.sign(userData._doc,jwtConfig.secret)
            //             })
            //         }
            //     })
            //
            // });
            const result = await UserService.login(args, viewer);

            return result;
        }
    },

    Mutation: {
        //call logic code
        register: (root, args) => {
            return new Promise((resolve, reject) => {

                UserModel.findOne({email: args.email}).then((userData) => {
                    if (userData === null) {
                        UserModel.create({
                            name: args.name,
                            email: args.email,
                            role: args.role,
                            password: args.password
                        }).then((user) => {
                            if (user && user._doc) {
                                console.log('user register successfully...');

                                resolve({
                                    token: jwt.sign(user, jwtConfig.secret)
                                });
                            }
                            else {
                                resolve(null);
                            }
                        })
                    }
                    else {
                        reject(throwError('username_duplicated'));
                    }
                }).catch((err) => {
                    reject(err);
                    console.log(err);
                });
            });
        }
    }
}