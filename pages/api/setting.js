import settingModel from "../../model/setting.model";
import dbConnect from "../../lib/dbConnect";
export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    await dbConnect();

    try {
        const setting = await settingModel.findOne()
        res.status(200).json({ data: setting });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}