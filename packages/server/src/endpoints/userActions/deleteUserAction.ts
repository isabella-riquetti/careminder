import { Request, Response } from 'express';
import { UserActionDao } from '../../db/dao/UserActionDao';

export const deleteUserAction = async (req: Request, res: Response<string>) => {
    const dao = new UserActionDao();
    
    await dao.deleteByGroup(req.params["id"]);

    return res.status(200).json("Finished");
}