import mongoose,{Schema} from 'mongoose';
import userDesign from '../design/userDesign';
import passportLocalMongoose from 'passport-local-mongoose';


const options = {
    timestamps: true,
    versionKey:false
};

const UserSchema = new Schema(Object.assign({}, userDesign),options);

UserSchema.plugin(passportLocalMongoose,{
    //interval:400,
    usernameField:'email'
})

export const UserModel=mongoose.model('User',UserSchema);

