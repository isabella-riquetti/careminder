import { Action } from "src/db/types";
import { Request, Response } from 'express';
import { ActionDao } from "../../db/dao/ActionDao";

export const getActions = async (req: Request<{}, {}, {}>, res: Response<Action[]>) => {
    const dao = new ActionDao();

    try {
        const actions = await dao.getAll();

        if (actions) {
            return res.status(201).json(actions);
        } else {
            return res.status(500);
        }
    } catch (error) {
        console.error('Error creating action:', error);
        return res.status(500);
    }
}