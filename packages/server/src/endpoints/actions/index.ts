import { createAction } from "./createAction";
import { Express } from 'express';
import { getAction } from "./getAction";
import { getActions } from "./getActions";

export function createActionsEndpoints(app: Express) {
    app.get('/actions', getActions);
    app.get('/actions/:id', getAction);
    app.post('/actions', createAction);
}