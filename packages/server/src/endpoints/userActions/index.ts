import { Express } from 'express';
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { createUserAction } from './createUserAction';
import { getUserActions } from './getUserActions';

export function createUserActionsEndpoints(app: Express) {
    app.use(ClerkExpressRequireAuth());
    
    app.get('/user/actions', getUserActions);
    app.post('/user/actions', createUserAction);
}
