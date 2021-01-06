import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import csurf from 'csurf';
import security from './security/security';
import csrfMiddleware from './security/csrf/csrf.middleware';
import securityRouter from './security/security.router';
import config from './core/config';
import appRouter from './app.router';
import userRouter from './security/users/user.router';

const app = express();
const { secret } = config;

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({ secret }));
app.use(security.initialize());
app.use(security.session());
app.use(security.authenticate('remember-me'));
app.use(csurf());

app.use(csrfMiddleware);
app.use(express.static('public'));
app.use('uploads', express.static('uploads'));

app.use('/api/security', securityRouter);
app.use('/api/users', userRouter);
app.use(appRouter);

export default app;
