import express from 'express';
import cors from 'cors';
import { createActionsEndpoints } from './src/endpoints/actions';
import { createUserActionsEndpoints } from './src/endpoints/userActions';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import errorHandler from './src/handlers/errorHandler';

const app = express();
const port = 3000;

const corsOptions = {
    origin: process.env.CLIENT_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Accept',
        'Origin',
        'User-Agent',
        'sec-ch-ua',
        'sec-ch-ua-mobile',
        'sec-ch-ua-platform',
        'Sec-Fetch-Dest',
        'Sec-Fetch-Mode',
        'Sec-Fetch-Site'
    ],
    credentials: true,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(ClerkExpressRequireAuth());

createActionsEndpoints(app);
createUserActionsEndpoints(app);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
