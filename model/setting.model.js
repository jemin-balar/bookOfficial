import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
    {
        number1: {
            type: String
        },
        number2: {
            type: String
        },
    },
    { timestamps: true }
);

// Check if the model exists before creating it
export default mongoose.models.setting || mongoose.model("setting", settingSchema);