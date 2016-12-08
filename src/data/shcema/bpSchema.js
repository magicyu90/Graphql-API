import mongoose, {Schema} from 'mongoose';
import bpDesign from '../design/bpDesign';
import commonDesign from '../design/commonDesign';
import throwError from '../../lib/throwError';


const BPSchema = new Schema(Object.assign({}, bpDesign, commonDesign), {
    versionKey:false,
    timestamps:true
});

BPSchema.pre('validate', (next) => {
    let error;
    if (!this.manualInput) {
        if (!this.deviceModel || this.deviceAddress) {
            error = throwError('measure_incomplete_device_info');
        }
        else {
            error = throwError('measure_incomplete_data');
        }
    }

    next(error);

});


const BpModel = mongoose.Model('BloodPressure', BPSchema);

export  default  BpModel;