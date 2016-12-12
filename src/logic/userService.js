import {UserModel} from '../data/models/userModel';
import jwt from 'jsonwebtoken';
import {jwtConfig} from '../config';
import {viewerAuth} from './authService';
import throwError from '../lib/throwError';


export default {

    login: async(args, viewer) => {

        //check permission
        viewerAuth(viewer, args, "login");

        //login and return token
        return new Promise((resolve, reject) => {
            UserModel.findOne({
                email: args.email
            }).then((userData) => {
                if (userData && userData._doc) {

                    console.log('user' + args.email + ' login in');
                    console.log('userData:' + JSON.stringify(userData._doc));
                    let token = jwt.sign(userData._doc, jwtConfig.secret);

                    resolve({
                        token: token
                    })
                }
            }).catch((err) => {
                reject(err);
            })
        });
    },
    register: async(args) => {

        return new Promise((resolve, reject) => {

            const user = {
                name: args.name,
                password: args.password,
                role: args.role,
                email: args.email
            }

            UserModel.register(user, args.password, (err, account) => {
                if (err) {
                    console.log('register error:' + err);
                    reject(err);
                }
                else {

                    let token = jwt.sign(account, jwtConfig.secret);
                    account.token = token;

                    account.save((err, user) => {

                        if (err) {
                            console.log('save user error:' + err);
                            reject(err);
                        }
                        else {
                            console.log('save user successfully...');
                            resolve({
                                token: token
                            })
                        }
                    });
                }
            });

        });


    },
    test: async(args,viewer) => {

        //check permission
        viewerAuth(viewer, args, "test");

        return new Promise((resolve, reject) => {

            const message = args.message;

            resolve({
                message: message
            })
        });
    }
}