import express from 'express';

import dashboard from '@/pages/dashboard/controller';

const router = express.Router();
router.use('/dashboard', dashboard);

export default router;