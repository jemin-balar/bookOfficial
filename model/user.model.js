import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email_id: {
            type: String
        },
        password: {
            type: String
        },
    },
    { timestamps: true }
);

// Check if the model exists before creating it
export default mongoose.models.setting || mongoose.model("user", userSchema);