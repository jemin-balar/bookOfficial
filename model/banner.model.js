import mongoose from "mongoose";

const BannerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        }, // URL of the uploaded image
        is_active: {
            type: Boolean,
            default: true
        },
    },
    { timestamps: true }
);

// Check if the model exists before creating it
export default mongoose.models.banner || mongoose.model("banner", BannerSchema);