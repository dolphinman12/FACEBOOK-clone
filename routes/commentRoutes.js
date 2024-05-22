import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { createComment, getComments, updateComment, deleteComment } from '../controllers/commentController.js';

const router = express.Router();

router.post('/', authenticateToken, createComment);
router.get('/:postId', getComments);
router.put('/:id', authenticateToken, updateComment);
router.delete('/:id', authenticateToken, deleteComment);
 
export default router;

