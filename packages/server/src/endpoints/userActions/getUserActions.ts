import { CreateUserAction, UserAction } from '@careminder/shared/types';
import { Request, Response } from 'express';
import { NotFoundError, UnauthorizedError} from '@careminder/shared/error';
import { UserActionDao } from '../../db/dao/UserActionDao';

export const getUserActions = async (req: Request<{}, {}, {}>, res: Response<UserAction[]>) => {
    const dao = new UserActionDao();
    
    const userId = req.auth?.userId;
    if (!userId) throw new UnauthorizedError();

    const allUserActions = await dao.getAllFromUser(userId);
    if (!allUserActions) throw new NotFoundError("UserAction");

    return res.status(200).json(allUserActions);
}