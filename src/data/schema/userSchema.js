import mongoose,{Schema} from 'mongoose';
import userDesign from '../design/userDesign';


const options = {
    timestamps: true,
    versionKey:false
};

const UserSchema = new Schema(Object.assign({}, userDesign),options);

export const UserModel=mongoose.model('User',UserSchema);

