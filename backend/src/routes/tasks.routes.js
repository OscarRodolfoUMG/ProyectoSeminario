import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getTask, getAllTask, createTask, updateTask, deleteTask } from '../controllers/task.controllers.js';
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createTaskSchema } from "../schemas/task.schema.js";

const router = Router();

router.get('/tasks', getAllTask);
router.get('/tasks/:id', getTask);
router.post('/tasks', createTask);
router.delete('/tasks/:id', deleteTask);
router.put('/tasks/:id', updateTask);

export default router;

// router.get('/tasks', authRequired, getAllTask);
// router.get('/tasks/:id', authRequired, getTask);
// router.post('/tasks', authRequired, validateSchema(createTaskSchema), createTask);
// router.delete('/tasks/:id', authRequired, deleteTask);
// router.put('/tasks/:id', authRequired, updateTask);

