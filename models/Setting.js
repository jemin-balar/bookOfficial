import mongoose from 'mongoose';

const SettingSchema = new mongoose.Schema({
    number1: {
        type: String,
        required: [true, 'Please provide number for new ID'],
        trim: true
    },
    number2: {
        type: String,
        required: [true, 'Please provide number for master ID'],
        trim: true
    }
}, {
    timestamps: true
});

// Check if the model is already defined to prevent overwriting
export default mongoose.models.Setting || mongoose.model('Setting', SettingSchema); 