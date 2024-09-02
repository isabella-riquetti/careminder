import { Express } from 'express';
import { getActions } from "./getActions";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

export function createActionsEndpoints(app: Express) {
    app.use(ClerkExpressRequireAuth());
    
    app.get('/actions', getActions);
}
