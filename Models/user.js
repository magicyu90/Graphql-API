import mongoose from 'mongoose';

let UserSchema = new mongoose.Schema({

    name: {
        type: String
    },
    password: {
        type: String, required: true
    },
    email: {
        type: String, require: true
    },
    createdAt: {
        createdAt: {type: Date, default: Date.now}
    }

}, {
    versionKey: false

});


UserSchema.pre('save', next=> {

    let now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});


export default mongoose.model('User', UserSchema);
