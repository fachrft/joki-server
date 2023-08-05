import express from 'express';
import { getUsers, getUsersById, createUsers, updateUsers, deleteUsers } from '../controller/UsersController.js';
import { verfyUser } from '../middleware/AuthUser.js'

const router = express.Router();

router.get('/Users', verfyUser, getUsers)
router.get('/Users/:id', verfyUser, getUsersById)
router.post('/Users', createUsers)
router.patch('/Users/:id', verfyUser, updateUsers)
router.delete('/Users/:id', verfyUser, deleteUsers)


export default router