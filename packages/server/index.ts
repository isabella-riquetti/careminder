import express from 'express';
import cors from 'cors';
import { createActionsEndpoints } from './src/endpoints/actions';

const app = express();
const port = 3000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use(express.json());

app.get('/', (_, res) => {
    res.send('Server started!');
});

createActionsEndpoints(app);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
