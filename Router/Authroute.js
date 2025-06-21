import express from 'express';
import {signin, signout, signup} from '../controller/Auth.contoller.js';

const authRouter = express.Router(); 

authRouter.post('/sign-in',signin);

authRouter.post('/sign-up', signup);

authRouter.post('/sign-out',signout);

export default authRouter;
