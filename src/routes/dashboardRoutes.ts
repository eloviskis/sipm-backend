import { Router } from 'express';
import { getDashboardData } from '../controllers/dashboardController';

const router = Router();

router.get('/dashboard', getDashboardData);

export default router;
