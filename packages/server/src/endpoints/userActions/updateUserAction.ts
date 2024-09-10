import { CreateUserAction, UpdateUserAction, UserAction } from '@careminder/shared/types';
import { Request, Response } from 'express';
import { NotFoundError, UnauthorizedError} from '@careminder/shared/error';
import { UserActionDao } from '../../db/dao/UserActionDao';

export const updateUserAction = async (req: Request<{ id: number}, {}, CreateUserAction>, res: Response<UserAction>) => {
    const dao = new UserActionDao();
    
    const userId = req.auth?.userId;
    if (!userId) throw new UnauthorizedError();

    // TODO: Update previous gropu end date + change group id if changing something from the future
    const updatedAction = await dao.update(req.params.id, req.body);
    if (!updatedAction) throw new NotFoundError("UserAction");

    return res.status(200).json(updatedAction);
}