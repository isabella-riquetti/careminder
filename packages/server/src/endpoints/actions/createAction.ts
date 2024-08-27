import { Action } from '@careminder/shared/types';
import { Request, Response } from 'express';
import { ActionDao } from "../../db/dao/ActionDao";

export const createAction = async (req: Request<{}, {}, Action>, res: Response<Action>) => {
    const dao = new ActionDao();

    try {
        const createdAction = await dao.create(req.body);

        if (createdAction) {
            return res.status(201).json(createdAction);
        } else {
            return res.status(500);
        }
    } catch (error) {
        console.error('Error creating action:', error);
        return res.status(500);
    }
}