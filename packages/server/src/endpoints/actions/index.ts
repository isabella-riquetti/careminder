import { createAction } from "./createAction";
import { Express } from 'express';
import { getActions } from "./getActions";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { getAction } from "./getAction";

export function createActionsEndpoints(app: Express) {
    app.get('/actions', ClerkExpressRequireAuth(), getActions);
    app.get('/actions/:id', ClerkExpressRequireAuth(), getAction);
    app.post('/actions', ClerkExpressRequireAuth(), createAction);
}