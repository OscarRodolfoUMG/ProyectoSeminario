import { Router } from "express";
import { getPrueba, getAllPrueba, createPrueba, updatePrueba, deletePrueba } from '../controllers/prueba.controllers.js';

const router = Router();

router.get('/pruebas', getAllPrueba);
router.get('/pruebas/:id', getPrueba);
router.post('/pruebas', createPrueba);
router.delete('/pruebas/:id', deletePrueba);
router.put('/pruebas/:id', updatePrueba);

export default router;