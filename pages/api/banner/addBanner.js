import dbConnect from "../../../lib/dbConnect";
import bannerModel from "../../../model/banner.model";
import upload from "../../../lib/multerConfig";
import { createRouter } from "next-connect";
import dotenv from "dotenv";
dotenv.config();

export const config = { api: { bodyParser: false } }; // Required for multer

const router = createRouter();

router.use(upload.single("image"));

router.post(async (req, res) => {
    await dbConnect();

    if (!req.file) {
        return res.status(400).json({ error: "Image file is required" });
    }

    try {
        const { name, is_active } = req.body;
        const imageUrl = `${process.env.LOCALHOST_URL}/view/${req.file.filename}`;

        const bannerObj = {
            name,
            image: imageUrl,
            is_active: is_active === "true",
        }

        const newBanner = await bannerModel(bannerObj).save();
        res.status(201).json({ message: "Banner added successfully", data: newBanner });

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router.handler();