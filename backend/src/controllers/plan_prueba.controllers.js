import { pool } from "../db.js";

const nTabla = 'plan_prueba';
const nId = 'id_plan_prueba';

export const getAllPlanPrueba = async (req, res) => {
    try {
        const allPlanPruebas = await pool.query(`Select * from ${nTabla}`);
        res.json(allPlanPruebas.rows);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const getPlanPrueba = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`SELECT * FROM ${nTabla} WHERE ${nId} = $1`, [id]);

        if (result.rows.length === 0)
            return res.status(404).json({ message: "PlanPrueba not found" });

        res.json(result.rows[0]);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const createPlanPrueba = async (req, res) => {
    try {
        const { id } = req.params;
        const newPlanPrueba = await pool.query(
            `INSERT INTO ${nTabla} (fk_id_proyecto) VALUES ($1) RETURNING *`,
            [id]
        );
        return res.status(200).json({ message: "Plan de Prueba Agregado", plan: newPlanPrueba.rows[0] });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

export const updatePlanPrueba = async (req, res) => {
    try {
        const { id } = req.params;
        const { descripcion, anotaciones, fecha, fk_id_proyecto } = req.body;

        const result = await pool.query(
            `UPDATE ${nTabla} SET descripcion = $1, anotaciones = $2, fecha = $3, fk_id_proyecto = $4 WHERE ${nId} = $5 RETURNING *`,
            [descripcion, anotaciones, fecha, fk_id_proyecto, id]
        );

        if (result.rows.length === 0)
            return res.status(404).json({ message: "Plan de Prueba no encontrado" });

        return res.json(result.rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

export const deletePlanPrueba = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("ID: ",id);
        const result = await pool.query(`DELETE FROM ${nTabla} WHERE ${nId} = $1`, [id]);

        if (result.rowCount === 0)
            return res.status(404).json({ message: "PlanPrueba not found" });
        return res.sendStatus(204);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong: "});
    }
};



