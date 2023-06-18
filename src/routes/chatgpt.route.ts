import { Router } from 'express';
import chatGptController from '../controllers/chatgpt.controller';

const router = Router();

router.post('/', chatGptController.createChatGptCompletion);

export default router;
