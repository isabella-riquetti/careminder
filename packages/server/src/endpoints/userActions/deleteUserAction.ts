import { Request, Response } from 'express';
import { UserActionDao } from '../../db/dao/UserActionDao';

export const deleteUserAction = async (req: Request, res: Response<string>) => {
    const dao = new UserActionDao();

    const { id } = req.params as { id: string };
    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
        return res.status(400).send();
    }
    
    await dao.delete(parsedId);

    return res.status(200).json("Finished");
}