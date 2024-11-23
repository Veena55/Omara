import Order from '../models/order.js';
import { Op } from 'sequelize';
export const getAll = async (req, res) => {
    const cursor = Number(req.query.cursor) || 0;
    const limit = Number(req.query.limit) || 0;
    try {
        const allRecords = await Order.findAll({
            where: {
                id: {
                    [Op.gt]: cursor,
                },
            },
            order: [['id', 'ASC']],
            limit,
        });
        const nextCursor = allRecords.length > 0 ? allRecords[allRecords.length - 1] : null;
        res.json({
            data: allRecords,
            nextCursor
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching records' });
    }
};
