// @flow

import throwError from '../lib/throwError';
import {UserModel} from '../data/models/userModel';
import QueryLoader from '../lib/queryLoader';

const Name = 'User';

export class Viewer {

    id: ?string;
    _id: Object;
    role: string;
    level: number;
    isLoggedIn: boolean;
    token: string;

    constructor(obj: Object) {

        const doc = obj._doc || obj; // This is important, do not remove.

        this.id = doc._id ? `${Name}:${doc._id}` : null;
        this._id = doc._id;

        this.level = Viewer.resolveRole(obj);
        this.isLoggedIn = obj && obj._id;

        this.role = obj.role;
        this.token = obj.token;

        Object.freeze(this);
    }

    static resolveRole(viewer: Object): number {

        const roles = {
            MEMBER: 1,
            ADMIN: 2,
            SUPER_ADMIN: 3
        };
        return roles[viewer.role];
    }

}

export function viewerAuth(viewer: Viewer, doc: Object, action: string) {


    console.log('enter viewerAuth...');
    if (viewer && doc) {
        const level = Viewer.resolveRole(viewer);

        if (level >= 3) {
            return true;
        }
        else {
            throwError('not_authorized');
        }
    }
}

type LoginFromInput={
    name:string,
    password:string
}

export async function fromLogin({name, password}:LoginFromInput): Object {

    const loggedInUser = await QueryLoader.load(
        UserModel.findOne({name: name, password: password})
    );

    if (!loggedInUser) {
        throwError('user_not_found');
    }
    console.log('password:' + password);

    return new Promise((resolve, reject) => {
        loggedInUser.authenticate(password, (err, user) => {
            if (err || !user) {
                reject(err);
            }
            resolve(new Viewer(user));
        });
    }).catch((err) => {

        console.log('from login error:' + err);
        throwError('incorrect_password');
    });
}