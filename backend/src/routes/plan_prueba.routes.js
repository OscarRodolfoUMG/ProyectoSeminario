import { Router } from "express";
import { getPlanPrueba, getAllPlanPrueba, createPlanPrueba, updatePlanPrueba, deletePlanPrueba } from '../controllers/plan_prueba.controllers.js';

const router = Router();

router.get('/planPrueba', getAllPlanPrueba);
router.get('/planPrueba/:id', getPlanPrueba);
router.post('/planPrueba/:id', createPlanPrueba);
router.delete('/planPrueba/:id', deletePlanPrueba);
router.put('/planPrueba/:id', updatePlanPrueba);

export default router;