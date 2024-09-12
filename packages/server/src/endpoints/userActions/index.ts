import { Express } from 'express';
import { createUserAction } from './createUserAction';
import { getUserActions } from './getUserActions';
import { deleteUserAction } from './deleteUserAction';
import { updateUserAction } from './updateUserAction';
import asyncHandler from '../../handlers/asyncHandler';

export function createUserActionsEndpoints(app: Express) {    
    app.get('/actions/user', asyncHandler(getUserActions));
    app.post('/actions/user', asyncHandler(createUserAction));
    app.delete('/actions/user/:id', asyncHandler(deleteUserAction));
    app.patch('/actions/user/:id', asyncHandler(updateUserAction));
}
