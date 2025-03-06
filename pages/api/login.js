import userModel from "../../model/user.model";
import dbConnect from "../../lib/dbConnect";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    await dbConnect();
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email_id: email, password: password });
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        res.status(200).json({ message: "Login successful", data: user });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}