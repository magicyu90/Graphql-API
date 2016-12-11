// @flow

import throwError from '../lib/throwError';
import {UserModel} from '../data/schema/userSchema';
import QueryLoader from '../lib/queryLoader';

export class Viewer {

    role: string;
    level: number;
    isLoggedIn: boolean;
    token: string;

    constructor(obj: Object) {

        this.level = Viewer.resolveRole(obj);
        this.isLoggedIn = obj && obj._id;

        this.role= obj.role;
        this.token= obj.token;


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


    const user = await QueryLoader.load(
        UserModel.findOne({name: name, password: password}).lean()
    )

    let viewer = new Viewer(user);
    return viewer;
}