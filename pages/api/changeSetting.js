import dbConnect from "../../lib/dbConnect";
import settingModel from "../../model/setting.model";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    await dbConnect();

    try {
        const { id, number1, number2 } = req.body;
        console.log(id, number1, number2);

        const setting = await settingModel.findById(id);

        if (!setting) {
            return res.status(404).json({ error: "Setting not found" });
        }

        let updateData = { updatedAt: new Date() };

        if (number1) updateData.number1 = number1;
        if (number2) updateData.number2 = number2;

        // Update Setting
        const query = { _id: id };
        const update = { $set: updateData };
        await settingModel.updateOne(query, update);
        const updatedSetting = await settingModel.findById(id);

        res.status(200).json({
            message: "Setting updated successfully",
            data: updatedSetting
        });

    } catch (error) {
        console.error("Update Setting Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}