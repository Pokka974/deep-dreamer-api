import { Router } from 'express';
import dallEController from '../controllers/dallE.controller';

const router = Router();

router.post('/', dallEController.generateDallEImage);
export default router;
