import './bootstrap.js' // This  needs to be imported at the top in order for environment variables to be loaded successfully.

import express from 'express';
import { router as usersRouter } from './routes/auth-router.js';
import { router as loggerRouter } from './routes/logger-router.js';
import {errorMiddleware} from 'custom-exceptions-express'
import cookieParser from 'cookie-parser'
import reqLoggerExpress from 'req-logger-express';

const app = express();
app.use(express.json());
app.use(cookieParser())

//* Custom middleware
app.use(reqLoggerExpress('Oauth_API'))
//Routes
app.use('/api',  usersRouter);
app.use('/api',  loggerRouter);



//* Error Middleware
app.use(errorMiddleware) // Optional, recommended

//* I exported the app for testing in vitest without running the server:
export default app
