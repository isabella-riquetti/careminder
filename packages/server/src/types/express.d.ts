import { AuthObject } from '@clerk/clerk-sdk-node';

declare module 'express-serve-static-core' {
  interface Request {
    auth?: AuthObject;
  }
}