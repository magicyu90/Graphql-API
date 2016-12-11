import {UserModel} from '../data/schema/userSchema';
import jwt from 'jsonwebtoken';
import {jwtConfig} from '../config';
import {viewerAuth} from './authService';

export default {

    login: async(args, viewer) => {

        //check permission
        viewerAuth(viewer, args, "login");

        //login and return token
        await new Promise((resolve, reject) => {
            UserModel.findOne({
                email: args.email
            }).then((userData) => {
                if (userData && userData._doc) {

                    console.log('user' + args.email + ' login in');
                    resolve({
                        token: jwt.sign(userData._doc, jwtConfig.secret)
                    })
                }
            })
        });
    }

}