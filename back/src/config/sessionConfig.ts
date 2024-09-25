import session from 'express-session';
import { RequestHandler } from 'express';

const sessionMiddleware: RequestHandler = session({
    secret: 'your-secret-key', 
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } 
});

export default sessionMiddleware;
