import express from 'express';
import { getDesign, getDesignById, createDesign, updateDesign, deleteDesign } from '../controller/DesignController.js';
import { verfyUser } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/Design', verfyUser, getDesign)
router.get('/Design/:id', verfyUser, getDesignById)
router.post('/Design', verfyUser, createDesign)
router.patch('/Design/:id', verfyUser, updateDesign)
router.delete('/Design/:id', verfyUser, deleteDesign)


export default router
