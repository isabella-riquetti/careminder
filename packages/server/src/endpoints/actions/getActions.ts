import { Action } from '@careminder/shared/types';
import { Request, Response } from 'express';
import { ActionDao } from "../../db/dao/ActionDao";
import NotFoundError from '@careminder/shared/error/NotFoundError';

export const getActions = async (req: Request<{}, {}, {}>, res: Response<Action[]>) => {
    const dao = new ActionDao();

    const actions = await dao.getAll();
    if (!actions) throw new NotFoundError("Action");

    return res.status(200).json(actions);
}