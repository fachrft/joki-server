import express from 'express';
import { getPPT, getPPTById, createPPT, updatePPT, deletePPT } from '../controller/PPTController.js';
import { verfyUser } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/PPT',verfyUser, getPPT)
router.get('/PPT/:id', verfyUser, getPPTById)
router.post('/PPT',verfyUser, createPPT)
router.patch('/PPT/:id', verfyUser, updatePPT)
router.delete('/PPT/:id', verfyUser, deletePPT)


export default router