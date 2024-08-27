import { Action } from '@careminder/shared/types';
import { Request, Response } from 'express';
import { ActionDao } from "../../db/dao/ActionDao";

export const getAction = async (req: Request<{ id: number }, {}, {}>, res: Response<Action>) => {
    const dao = new ActionDao();

    try {
        const action = await dao.getById(req.params.id);

        if (action) {
            return res.status(201).json(action);
        } else {
            return res.status(500);
        }
    } catch (error) {
        console.error('Error creating action:', error);
        return res.status(500);
    }
}