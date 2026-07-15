import { Router } from 'express';
import { StudentController } from '../controllers/student.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();
const controller = new StudentController();

router.get('/', authenticate, authorize('ADMIN', 'FACULTY'), controller.getStudents);
router.get('/:id', authenticate, authorize('ADMIN', 'FACULTY', 'STUDENT'), controller.getStudentById);

export default router;
