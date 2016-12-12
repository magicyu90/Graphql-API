import {UserModel} from '../../data/models/userModel';
import jwt from 'jsonwebtoken';
import {jwtConfig} from '../../config';
import UserService from '../../logic/userService';
import throwError from '../../lib/throwError';

export const UserResolver = {

    Query: {
        //call logic code
        login: async(root, args, {viewer}) => {

            const result = await UserService.login(args, viewer);

            return result;
        },
        test: async(root, args, {viewer}) => {

            const result = await UserService.test(args,viewer);
            return result;

        }
    },

    Mutation: {
        //call logic code
        register: async(root, args) => {

            const result = await UserService.register(args);
            return result;
        }
    }
}