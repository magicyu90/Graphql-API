import passport from 'koa-passport';
import {Strategy} from 'passport-local';
import UserModel from './models/userModel';

passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());
passport.use(new Strategy(UserModel.authenticate()));