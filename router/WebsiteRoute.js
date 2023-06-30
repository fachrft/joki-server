import express from 'express';
import { getWebsite, getWebsiteById, createWebsite, updateWebsite, deleteWebsite } from '../controller/WebsiteController.js';
import { verfyUser } from '../middleware/AuthUser.js'

const router = express.Router();

router.get('/website', verfyUser, getWebsite)
router.get('/website/:id', verfyUser, getWebsiteById)
router.post('/website', verfyUser, createWebsite)
router.patch('/website/:id', verfyUser, updateWebsite)
router.delete('/website/:id', verfyUser, deleteWebsite)


export default router