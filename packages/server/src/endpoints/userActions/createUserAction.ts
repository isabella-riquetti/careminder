import { CreateUserAction, UserAction, UserActionSchema } from '@careminder/shared/types';
import { Request, Response } from 'express';
import { BadRequestError, NotFoundError, UnauthorizedError} from '@careminder/shared/error';
import { UserActionDao } from '../../db/dao/UserActionDao';
import { getReocurrences } from '../../../src/util/event';

export const createUserAction = async (req: Request<{}, {}, CreateUserAction>, res: Response<UserAction>) => {
    const dao = new UserActionDao();
    
    const userId = req.auth?.userId;
    if (!userId) throw new UnauthorizedError();

    const newUserAction = UserActionSchema.safeParse(req.body);
    if (newUserAction.error) throw new BadRequestError('Invalid User Action');

    const allReocurrences = getReocurrences(newUserAction.data);

    const createdAction = await dao.createBatch(allReocurrences, userId);
    if (!createdAction) throw new NotFoundError("UserAction");

    return res.status(201).json(createdAction);
}