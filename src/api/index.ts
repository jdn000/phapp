import { Router } from 'express';
import auth from './routes/auth';
import user from './routes/user';
import test from './routes/test';
import fonasa from './routes/fonasa';
import agendash from './routes/agendash';

// guaranteed to get dependencies
export default () => {
	const app = Router();
	//auth(app);
	//user(app);
	//test(app);
	//fonasa(app);
	//agendash(app);

	return app
}