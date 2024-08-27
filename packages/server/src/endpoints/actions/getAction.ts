import { RequestHandler } from 'express';
import { ActionDao } from "../../db/dao/ActionDao";


export const getAction: RequestHandler = async (req, res) => {
    const dao = new ActionDao();
    const actionId = parseInt(req.params["id"], 10);

    if (isNaN(actionId)) return res.status(400);

    try {
        const action = await dao.getById(actionId);

        if (action) {
            return res.status(200).json(action);
        } else {
            return res.status(404).send();
        }
    } catch (error) {
        console.error('Error fetching action:', error);
        return res.status(500);
    }
};
