import { Action } from '@careminder/shared/types';
import { Request, Response } from 'express';
import { ActionDao } from "../../db/dao/ActionDao";
import NotFoundError from '@careminder/shared/error/NotFoundError';

export const createAction = async (req: Request<{}, {}, Action>, res: Response<Action>) => {
    const dao = new ActionDao();

    const createdAction = await dao.create(req.body);
    if (!createdAction) throw new NotFoundError("Action");

    return res.status(201).json(createdAction);
}