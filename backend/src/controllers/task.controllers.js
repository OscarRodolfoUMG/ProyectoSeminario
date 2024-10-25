//import Task from '../models/task.model.js';
import { pool } from "../db.js";

const nTabla = 'tareas';
const nId = 'id_tarea';

export const getAllTask = async (req, res) => {
    try {
        const allTasks = await pool.query(`Select * from ${nTabla}`);
        res.json(allTasks.rows);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const getTask = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`SELECT * FROM ${nTabla} WHERE ${nId} = $1`, [id]);

        if (result.rows.length === 0)
            return res.status(404).json({ message: "Task not found" });

        res.json(result.rows[0]);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong" });
    }
};


export const createTask = async (req, res) => {
    try {
        let { nombre, descripcion, fecha_inicio, fecha_final, fecha_completado, fk_id_tipo_tarea, fk_id_estado, fk_id_prioridad, fk_id_proyecto, fk_id_responsable, fk_id_supervisor } = req.body;
        
        fecha_inicio = fecha_inicio === '' ? null : fecha_inicio;
        fecha_final = fecha_final === '' ? null : fecha_final;
        fecha_completado = fecha_completado === '' ? null : fecha_completado;

        const newTask = await pool.query(
            `INSERT INTO ${nTabla} (nombre, descripcion, fecha_inicio, fecha_final, fecha_completado, fk_id_tipo_tarea, fk_id_estado, fk_id_prioridad, fk_id_proyecto, fk_id_responsable, fk_id_supervisor) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
            [nombre, descripcion, fecha_inicio, fecha_final, fecha_completado, fk_id_tipo_tarea, fk_id_estado, fk_id_prioridad, fk_id_proyecto, fk_id_responsable, fk_id_supervisor]
        );

        return res.status(200).json({ message: "Tarea Agregada"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        let { nombre, descripcion, fecha_inicio, fecha_final, fecha_completado, fk_id_tipo_tarea, fk_id_estado, fk_id_prioridad, fk_id_proyecto, fk_id_responsable, fk_id_supervisor } = req.body;

        fecha_inicio = fecha_inicio === '' ? null : fecha_inicio;
        fecha_final = fecha_final === '' ? null : fecha_final;
        fecha_completado = fecha_completado === '' ? null : fecha_completado;

        const result = await pool.query(
            `UPDATE ${nTabla} 
            SET nombre = $1, descripcion = $2, fecha_inicio = $3, fecha_final = $4, fecha_completado = $5, fk_id_tipo_tarea = $6, fk_id_estado = $7, fk_id_prioridad = $8, fk_id_proyecto = $9, fk_id_responsable = $10, fk_id_supervisor = $11 
            WHERE ${nId} = $12 RETURNING *`,
            [nombre, descripcion, fecha_inicio, fecha_final, fecha_completado, fk_id_tipo_tarea, fk_id_estado, fk_id_prioridad, fk_id_proyecto, fk_id_responsable, fk_id_supervisor, id]
        );

        if (result.rows.length === 0)
            return res.status(404).json({ message: "Task not found" });

        return res.json(result.rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("ID: ",id);
        const result = await pool.query(`DELETE FROM ${nTabla} WHERE ${nId} = $1`, [id]);

        if (result.rowCount === 0)
            return res.status(404).json({ message: "Task not found" });
        return res.sendStatus(204);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong: "});
    }
};



