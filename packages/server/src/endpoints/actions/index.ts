import { Express } from 'express';
import { getActions } from "./getActions";
import asyncHandler from '../../handlers/asyncHandler';

export function createActionsEndpoints(app: Express) {
    app.get('/actions', asyncHandler(getActions));
}
