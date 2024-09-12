import { UserAction } from '@careminder/shared/types';
import { Request, Response } from 'express';
import { BadRequestError, NotFoundError, UnauthorizedError} from '@careminder/shared/error';
import { UserActionDao } from '../../db/dao/UserActionDao';

export const updateUserAction = async (req: Request, res: Response<UserAction>) => {
    const dao = new UserActionDao();
    
    const userId = req.auth?.userId;
    if (!userId) throw new UnauthorizedError();

    const actionId = Number(req.params["id"]);
    if (isNaN(actionId)) throw new BadRequestError("Invalid Reminder");

    const updatedAction = await dao.update(actionId, req.body);
    if (!updatedAction) throw new NotFoundError("UserAction");

    return res.status(200).json(updatedAction);
}