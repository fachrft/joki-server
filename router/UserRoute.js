import express from 'express';
import { getUsers, getUsersById, createUsers, updateUsers, deleteUsers } from '../controller/UsersController.js';
import { verfyUser, adminOnly } from '../middleware/AuthUser.js'

const router = express.Router();

router.get('/Users', verfyUser, adminOnly, getUsers)
router.get('/Users/:id', verfyUser, adminOnly, getUsersById)
router.post('/Users', createUsers)
router.patch('/Users/:id', verfyUser, adminOnly, updateUsers)
router.delete('/Users/:id', verfyUser, adminOnly, deleteUsers)


export default router