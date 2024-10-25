import { Router } from "express";
import { getUser_Proyect, getAllUser_Proyect, createUser_Proyect, updateUser_Proyect, deleteUser_Proyect } from '../controllers/user_proyect.controllers.js';

const router = Router();

router.get('/user_proyects', getAllUser_Proyect);
router.get('/user_proyects/:id_user/:id_proyect', getUser_Proyect);
router.post('/user_proyects/:id_user/:id_proyect', createUser_Proyect);
router.delete('/user_proyects/:id_user/:id_proyect', deleteUser_Proyect);
router.put('/user_proyects/:id_user/:id_proyect', updateUser_Proyect);

export default router;