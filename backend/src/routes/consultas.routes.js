import { Router } from "express";
import { 
    contarDesarrolladores, 
    contarAnalistas, 
    contarProyectos, 
    contarPruebas, 
    contarTareasCompletadas, 
    contarTareasNoCompletadas, 
    contarTareasPendientes, 
    contarTareasPorProyecto, 
    contarTareasCompletadasPorProyecto,
    obtenerErroresPorProyecto
} from '../controllers/consultas.controllers.js';

const router = Router();
//Rutas para las consultas 
router.get('/consulta1', contarDesarrolladores); 
router.get('/consulta2', contarAnalistas); 
router.get('/consulta3', contarProyectos); 
router.get('/consulta4', contarPruebas); 
router.get('/consulta5', contarTareasCompletadas); 
router.get('/consulta6', contarTareasNoCompletadas); 
router.get('/consulta7', contarTareasPendientes); 
router.get('/consulta8/:id', contarTareasPorProyecto); 
router.get('/consulta9/:id', contarTareasCompletadasPorProyecto); 
router.get('/consulta10', obtenerErroresPorProyecto); 

export default router;
