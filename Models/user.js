import mongoose from 'mongoose';

let UserSchema = new mongoose.Schema({

    name: {
        type: String
    },
    password: {
        type: String, required: true
    },
    email: {
        type: String, required: true
    },
    // createdAt: {
    //     createdAt: {type: Date, default: Date.now}
    // },
    address: {
        type: String, required: true
    }

}, {
    versionKey: false

});


// UserSchema.pre('save', next => {
//
//     let now = new Date();
//     if (!this.createdAt) {
//         this.createdAt = now;
//     }
//     next();
// });


export default mongoose.model('User', UserSchema);
