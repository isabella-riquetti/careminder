import { CreateUserAction, GetUserActionsSchema, UserAction } from '@careminder/shared/types';
import { Request, Response } from 'express';
import { BadRequestError, NotFoundError, UnauthorizedError} from '@careminder/shared/error';
import { UserActionDao } from '../../db/dao/UserActionDao';

export const getUserActions = async (req: Request, res: Response<UserAction[]>) => {
    const dao = new UserActionDao();
    
    const userId = req.auth?.userId;
    if (!userId) throw new UnauthorizedError();

    const query = GetUserActionsSchema.safeParse(req.query);
    if (query.error) throw new BadRequestError('Invalid query');
    
    const { start, end } = query.data;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const allUserActions = await dao.getAllFromUser(userId, startDate, endDate);
    if (!allUserActions) throw new NotFoundError("UserAction");

    return res.status(200).json(allUserActions);
}