import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  loginUser,
  deleteUser
} from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', createUser);
router.post('/signin', loginUser);



router.get('/', getAllUsers);


router.get('/:id', getUserById);


router.put('/:id', updateUser);


router.delete('/:id', deleteUser);

export default router;
