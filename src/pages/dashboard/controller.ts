import express, { Request } from 'express';
import Dashboard from './view';

const router = express.Router();
const clientId = 'dashboard';

// This is /dashboard, look src/components/router
router.get('/', (req: Request, res: any) => {
	res.render(Dashboard, clientId, {counter: 3});
});
export default router;