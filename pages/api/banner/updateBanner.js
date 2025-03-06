import dbConnect from "../../../lib/dbConnect";
import bannerModel from "../../../model/banner.model";
import upload from "../../../lib/multerConfig";
import fs from "fs";
import path from "path";

export const config = { api: { bodyParser: false } }; // Required for Multer

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    await dbConnect();

    return new Promise((resolve, reject) => {
        upload.single("image")(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }

            try {
                const { id, name } = req.body;
                const banner = await bannerModel.findById(id);

                if (!banner) {
                    return res.status(404).json({ error: "Banner not found" });
                }

                let updateData = { updatedAt: new Date() };

                if (name) updateData.name = name;

                // Handle Image Upload
                if (req.file) {
                    // Delete old image
                    if (banner.image) {
                        const oldImagePath = path.join("public", "view", path.basename(banner.image));
                        if (fs.existsSync(oldImagePath)) {
                            fs.unlinkSync(oldImagePath);
                        }
                    }

                    // Save new image URL
                    updateData.image = `${process.env.LOCALHOST_URL}/view/${req.file.filename}`;
                }

                // Update Banner
                const query = { _id: id };
                const update = { $set: updateData };
                await bannerModel.updateOne(query, update);
                const bannerData = await bannerModel.findById(id);

                res.status(200).json({ message: "Banner updated successfully", data: bannerData });
                resolve();
            } catch (error) {
                console.error("Update Banner Error:", error);
                res.status(500).json({ error: "Internal Server Error" });
                reject(error);
            }
        });
    });
};