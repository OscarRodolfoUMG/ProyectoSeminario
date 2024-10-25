import { pool } from "../db.js";

const nTabla = 'falla';
const nId = 'id_falla';

export const getAllFalla = async (req, res) => {
    try {
        const allFallas = await pool.query(`SELECT * FROM ${nTabla}`);
        res.json(allFallas.rows);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

export const getFalla = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`SELECT * FROM ${nTabla} WHERE ${nId} = $1`, [id]);

        if (result.rows.length === 0)
            return res.status(404).json({ message: "Falla no encontrada" });

        res.json(result.rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

export const createFalla = async (req, res) => {
    try {
        const { descripcion, fk_id_prueba, fk_id_tarea, fk_id_clasificacion_falla } = req.body;
        console.log("BODY: ", req.body);
        const newFalla = await pool.query(
            `INSERT INTO ${nTabla} (descripcion, fk_id_prueba, fk_id_tarea, fk_id_clasificacion_falla) 
            VALUES ($1, $2, $3, $4) RETURNING *`,
            [descripcion, fk_id_prueba, fk_id_tarea, fk_id_clasificacion_falla]
        );
        return res.status(200).json({ message: "Falla Agregada", falla: newFalla.rows[0] });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

export const updateFalla = async (req, res) => {
    try {
        const { id } = req.params;
        const { descripcion, fk_id_prueba, fk_id_tarea, fk_id_clasificacion_falla } = req.body;

        const result = await pool.query(
            `UPDATE ${nTabla} 
            SET descripcion = $1, fk_id_prueba = $2, fk_id_tarea = $3, fk_id_clasificacion_falla = $4
            WHERE ${nId} = $5 RETURNING *`,
            [descripcion, fk_id_prueba, fk_id_tarea, fk_id_clasificacion_falla, id]
        );

        if (result.rows.length === 0)
            return res.status(404).json({ message: "Falla no encontrada" });

        return res.json(result.rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

export const deleteFalla = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`DELETE FROM ${nTabla} WHERE ${nId} = $1`, [id]);

        if (result.rowCount === 0)
            return res.status(404).json({ message: "Falla no encontrada" });

        return res.sendStatus(204);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Algo salió mal" });
    }
};
