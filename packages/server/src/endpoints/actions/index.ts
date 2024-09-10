import { Express } from 'express';
import { getActions } from "./getActions";

export function createActionsEndpoints(app: Express) {
    app.get('/actions', getActions);
}
