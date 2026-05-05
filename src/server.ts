import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import appRouter from './appRouter';
import { errorHandler } from './middleware/error.middleware';

const app: express.Application = express();
app.use(cors());
const port = process.env.PORT || 3000;
const address: string = `0.0.0.0:${port}`;

app.use(bodyParser.json());
app.use('/api', appRouter);

app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, function () {
    console.log(`starting app on: ${address}`);
  });
}

export default app;
