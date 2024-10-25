import { Router } from "express";
import { getUser, getUserType, getAllUser, createUser, updateUser, deleteUser } from '../controllers/user.controllers.js';

const router = Router();

router.get('/users', getAllUser);
router.get('/users/:id', getUser);

router.get('/usersType/:type', getUserType);

router.post('/users', createUser);
router.delete('/users/:id', deleteUser);
router.put('/users/:id', updateUser);

// router.get('/Users', authRequired, getAllUser);
// router.get('/Users/:id', authRequired, getUser);
// router.post('/Users', authRequired, validateSchema(createUserSchema), createUser);
// router.delete('/Users/:id', authRequired, deleteUser);
// router.put('/Users/:id', authRequired, updateUser);


export default router;