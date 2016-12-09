import {UserModel} from '../../data/schema/userSchema';
import jwt from 'jsonwebtoken';
import {jwtConfig} from '../../config';

export  const UserResolver= {

    Query: {
        login: (root, args) => {
            return new Promise((resolve, reject) => {
                UserModel.findOne({
                    email: args.email
                }).then((userData) => {
                    if (userData && userData._doc) {

                        console.log('user' + args.email + ' login in');
                        resolve({
                            token: jwt.sign(userData._doc,jwtConfig.secret)
                        })
                    }
                })

            });
        }
    },

    Mutation: {

        register: (root, args) => {
            return new Promise((resolve, reject) => {

                UserModel.findOne({email: args.email}).then((userData) => {
                    if (userData === null) {
                        UserModel.create({
                            name: args.name,
                            email: args.email,
                            username: args.username,
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
                }).catch((err) => {
                    console.log(err);
                });
            });
        }
    }
}