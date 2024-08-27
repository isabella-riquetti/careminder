import { RequestHandler } from 'express';
import { ActionDao } from "../../db/dao/ActionDao";
import NotFoundError from "@careminder/shared/error/NotFoundError";
import BadRequestError from "@careminder/shared/error/BadRequestError";

export const getAction: RequestHandler = async (req, res) => {
    const dao = new ActionDao();
    const actionId = parseInt(req.params["id"]);

    if (isNaN(actionId)) throw new BadRequestError("Invalid Action Id");

    const action = await dao.getById(actionId);
    if (!action) throw new NotFoundError("Action", actionId);

    return res.status(200).json(action);
};
