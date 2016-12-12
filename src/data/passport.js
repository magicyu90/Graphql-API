
import passport from 'koa-passport';
import {UserModel} from '../data/models/userModel';
import { Strategy } from 'passport-local';

passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());
passport.use(new Strategy(UserModel.authenticate()));

export default passport;
