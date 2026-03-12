import { Router } from 'express';
import { getProgress, saveReflection, submitAssignment } from '../controllers/assignmentController.js';

const router = Router();

router.post('/assignment/submit', submitAssignment);
router.get('/progress', getProgress);
router.post('/reflection', saveReflection);

export default router;
