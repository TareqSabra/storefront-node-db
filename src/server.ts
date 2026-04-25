import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import appRouter from './appRouter'


const app: express.Application = express()
app.use(cors())
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())
app.use('/api', appRouter)

import { errorHandler } from './middleware/error.middleware';
app.use(errorHandler);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
