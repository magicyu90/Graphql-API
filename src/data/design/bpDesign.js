import {Schema} from 'mongoose';

// the schema is base open m health schema design
// more information see here, http://www.openmhealth.org/documentation
const time_interval = new Schema({

    start_date_time: {
        type: Date
    },
    end_date_time: {
        type: Date
    }
});

const effective_time_frame = new Schema({
    time_interval: time_interval
});

const bpDesign = {
    systolic_blood_pressure: {
        value: {
            type: Number,
            required: [true, 'Lack of systolic_blood_pressure'],
            min: 1,
            max: 500
        },
        unit: {
            type: String,
            enum: ['mmHg'],
            required: [true, 'Lack of blood pressure unit']
        }
    },
    diastolic_blood_pressure: {
        value: {
            type: Number,
            required: [true, 'Lack of diastolic_blood_pressure'],
            min: 1,
            max: 500
        },
        unit: {
            type: String,
            enum: ['mmHg'],
            required: [true, 'Lack of blood pressure unit']
        }
    },
    // heartRate: {
    //     value: {
    //         type: Number,
    //         required: [true, 'Lack of hear rate'],
    //         min: 1,
    //         max: 300
    //     },
    //     unit: {
    //         type: String,
    //         enum: ['beats/min'],
    //         required: [true, 'Lack of hear rate unit']
    //     }
    // },
    //todo effective_time_frame?
    //effective_time_frame:effective_time_frame,
    body_posture: {
        type: String,
        enum: ['sitting', 'lying down', 'standing', 'semi-recumbent']
    },
    arrhythmia: Boolean
};

export default bpDesign;