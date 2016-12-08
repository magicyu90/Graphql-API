import {Schema} from 'mongoose';

const deviceModel = ['BP5', 'BP7', 'BP7S'];
const commonDesign = {
    userId: {
        type: Schema.ObjectId,
        //ref: 'User',
        required: [true, 'Lack of user'],
    },
    measuredBy: Schema.ObjectId,
    measuredAt: {
        type: Date,
        required: [true, 'Measurement date is required'],
    },
    timeZone: {
        type: Number,
        required: [true, 'Timezone is required'],
    },
    deviceAddress: {
        type: String,
        required: true
    },
    deviceType: {
        type: String,
        required: [true, 'Lack of device type']
    },
    deviceModel: {
        type: String,
        enum: deviceModel,
        required: [true, 'Lack of device model']
    },
    isActive: {
        type: Number, default: 1
    },
    manualInput: Boolean,
    user_notes: String

}

export default commonDesign;