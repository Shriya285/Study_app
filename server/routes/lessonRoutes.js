import { Router } from 'express';
import { getDashboardData, getLessonByDay } from '../controllers/lessonController.js';

const router = Router();

router.get('/dashboard', getDashboardData);
router.get('/lesson/:day', getLessonByDay);

export default router;
