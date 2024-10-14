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
        const { title, description } = req.body;
        const newTask = await pool.query(`Insert into ${nTabla} (title, description) VALUES ($1, $2) RETURNING *`, [title, description]);

        res.json(newTask.rows[0]);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong: "});
    }
};

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const result = await pool.query(
            `UPDATE ${nTabla} SET title = $1, description = $2 WHERE ${nId} = $3 RETURNING *`,
            [title, description, id]
        );

        if (result.rows.length === 0)
            return res.status(404).json({ message: "Task not found" });

        return res.json(result.rows[0]);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong: "});
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



