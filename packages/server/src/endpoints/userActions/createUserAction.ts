import { CreateUserAction, UserAction } from '@careminder/shared/types';
import { Request, Response } from 'express';
import { NotFoundError, UnauthorizedError} from '@careminder/shared/error';
import { UserActionDao } from '../../db/dao/UserActionDao';

export const createUserAction = async (req: Request<{}, {}, CreateUserAction>, res: Response<UserAction>) => {
    const dao = new UserActionDao();
    
    const userId = req.auth?.userId;
    if (!userId) throw new UnauthorizedError();

    const createdAction = await dao.create(req.body, userId);
    if (!createdAction) throw new NotFoundError("UserAction");

    return res.status(201).json(createdAction);
}