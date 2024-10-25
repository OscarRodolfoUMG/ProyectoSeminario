import { pool } from "../db.js";

const nTabla = 'prueba';
const nId = 'id_prueba';

export const getAllPrueba = async (req, res) => {
    try {
        const allPruebas = await pool.query(`SELECT * FROM ${nTabla}`);
        res.json(allPruebas.rows);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const getPrueba = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`SELECT * FROM ${nTabla} WHERE ${nId} = $1`, [id]);

        if (result.rows.length === 0)
            return res.status(404).json({ message: "Prueba not found" });

        res.json(result.rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const createPrueba = async (req, res) => {
    try {
        const { definicion, datos, criterioAceptacion, aprobacion, fk_id_plan_prueba, fk_id_tarea, fk_id_tipo_prueba } = req.body;
        const newPrueba = await pool.query(
            `INSERT INTO ${nTabla} (definicion, datos, criterioAceptacion, aprobacion, fk_id_plan_prueba, fk_id_tarea, fk_id_tipo_prueba) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [definicion, datos, criterioAceptacion, aprobacion, fk_id_plan_prueba, fk_id_tarea, fk_id_tipo_prueba]
        );
        return res.status(200).json({ message: "Prueba Agregada", prueba: newPrueba.rows[0] });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

export const updatePrueba = async (req, res) => {
    try {
        const { id } = req.params;
        const { definicion, datos, criterioAceptacion, aprobacion, fk_id_plan_prueba, fk_id_tarea, fk_id_tipo_prueba } = req.body;

        const result = await pool.query(
            `UPDATE ${nTabla} 
            SET definicion = $1, datos = $2, criterioAceptacion = $3, aprobacion = $4, fk_id_plan_prueba = $5, fk_id_tarea = $6, fk_id_tipo_prueba = $7 
            WHERE ${nId} = $8 RETURNING *`,
            [definicion, datos, criterioAceptacion, aprobacion, fk_id_plan_prueba, fk_id_tarea, fk_id_tipo_prueba, id]
        );

        if (result.rows.length === 0)
            return res.status(404).json({ message: "Prueba no encontrada" });

        return res.json(result.rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

export const deletePrueba = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`DELETE FROM ${nTabla} WHERE ${nId} = $1`, [id]);

        if (result.rowCount === 0)
            return res.status(404).json({ message: "Prueba no encontrada" });

        return res.sendStatus(204);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Algo salió mal" });
    }
};
