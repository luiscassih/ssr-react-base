import express, { Request } from 'express';
import { DashboardProps } from './types';
import Dashboard from './view';

const router = express.Router();
const clientId = 'dashboard';

// This is /dashboard, look src/components/router
router.get('/', (req: Request, res: any) => {
	const props :DashboardProps = {
		counter: 5,
	};
	res.render(Dashboard, clientId, props);
});
export default router;