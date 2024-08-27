import express from 'express';
import cors from 'cors';
import { createActionsEndpoints } from './src/endpoints/actions';

const app = express();
const port = 3000;

const corsOptions = {
    origin: process.env.CLIENT_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
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

app.get('/', (_, res) => {
    res.send('Server started!');
});

createActionsEndpoints(app);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
