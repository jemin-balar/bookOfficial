import dbConnect from "../../../lib/dbConnect";
import bannerModel from "../../../model/banner.model";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    await dbConnect();

    try {
        const bannerList = await bannerModel.find().sort({ created_At: -1 });

        res.status(200).json({ data: bannerList });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}