import {UserModel} from '../data/schema/userSchema';
import jwt from 'jsonwebtoken';
import {jwtConfig} from '../config';
import {viewerAuth} from './authService';

export default {

    login: async  (args, viewer)=> {

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
    }
}