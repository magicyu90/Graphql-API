import mongoose from 'mongoose';

let userSchema = new mongoose.Schema({

    id: {
        type: Number
    },
    name: {
        type: String
    },
    password: {
        type: String, required: true
    },
    email: {
        type: String, require: true
    }

}, {
    versionKey: false

});

export default mongoose.model('User', userSchema);
