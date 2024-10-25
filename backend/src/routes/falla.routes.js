import { Router } from "express";
import { getFalla, getAllFalla, createFalla, updateFalla, deleteFalla } from '../controllers/falla.controllers.js';

const router = Router();

router.get('/fallas', getAllFalla);
router.get('/fallas/:id', getFalla);
router.post('/fallas', createFalla);
router.delete('/fallas/:id', deleteFalla);
router.put('/fallas/:id', updateFalla);

export default router;