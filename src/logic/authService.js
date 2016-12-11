// @flow

import throwError from '../lib/throwError';
import UserDB from '../data/schema/userSchema';
import QueryLoader from '../lib/queryLoader';

export class Viewer {

    id: ?string;
    role: string;
    level: number;
    isLoggedIn: boolean;
    token: string;

    constructor(obj: Object) {

        this.level = Viewer.resolveRole(obj);
        this.isLoggedIn = obj && obj._id;

        if (obj) {
            const doc = obj._doc || obj;
            this.id = doc._id;
            this.token = doc.token;
        }

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

export function viewerAuth(viewer: Viewer, doc: Object, action: string): boolean {

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
    username:string,
    password:string
}

export async function fromLogin({username, password}:LoginFromInput): Object {


    const user= await QueryLoader.load(
        UserDB.findOne({username:username,password:password}).lean()
    )

    let viewer=new Viewer(user);
    return viewer;
}