import dbConnect from '../../lib/dbConnect';
import Setting from '../../models/Setting';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({
            success: false,
            message: 'Method not allowed'
        });
    }

    try {
        await dbConnect();
        
        const setting = await Setting.findOne().lean();
        
        if (!setting) {
            return res.status(404).json({
                success: false,
                message: 'Settings not found',
                data: null
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Settings retrieved successfully',
            data: setting
        });
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}