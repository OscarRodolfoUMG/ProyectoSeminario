import { Router } from "express";
import { getProyect, getAllProyect, createProyect, updateProyect, deleteProyect } from '../controllers/proyect.controllers.js';

const router = Router();

router.get('/proyects', getAllProyect);
router.get('/proyects/:id', getProyect);
router.post('/proyects', createProyect);
router.delete('/proyects/:id', deleteProyect);
router.put('/proyects/:id', updateProyect);

export default router;