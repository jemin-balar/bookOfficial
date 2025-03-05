import dbConnect from "../../../lib/dbConnect";
import bannerModel from "../../../model/banner.model";
// import fs from "fs";
// import path from "path";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    await dbConnect();

    try {
        const { id } = req.query;
        const banner = await bannerModel.findById(id);

        if (!banner) {
            return res.status(404).json({ error: "Banner not found" });
        }

        // Delete image from public/view folder
        // const imagePath = path.join(process.cwd(), "public/view", path.basename(banner.image));
        // if (fs.existsSync(imagePath)) {
        //     fs.unlinkSync(imagePath);
        // }

        await bannerModel.findByIdAndDelete(id);

        res.status(200).json({ message: "Banner deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}