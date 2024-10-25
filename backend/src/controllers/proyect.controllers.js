import { pool } from "../db.js";

const nTabla = 'proyecto';
const nId = 'id_proyecto';

export const getAllProyect = async (req, res) => {
    try {
        const allProyects = await pool.query(`Select * from ${nTabla}`);
        res.json(allProyects.rows);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const getProyect = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`SELECT * FROM ${nTabla} WHERE ${nId} = $1`, [id]);

        if (result.rows.length === 0)
            return res.status(404).json({ message: "Proyect not found" });

        res.json(result.rows[0]);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong" });
    }
};


export const createProyect = async (req, res) => {
    try {
        let { nombre, fecha_inicio, fecha_final} = req.body;

        fecha_inicio = fecha_inicio === '' ? null : fecha_inicio;
        fecha_final = fecha_final === '' ? null : fecha_final;

        const newProyect = await pool.query(`Insert into ${nTabla} (nombre, fecha_inicio, fecha_final) VALUES ($1, $2, $3) RETURNING *`, [nombre, fecha_inicio, fecha_final]);
        return res.status(200).json({ message: "Proyecto Agregado"});
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong: "});
    }
};

export const updateProyect = async (req, res) => {
    try {
        const { id } = req.params;
        let { nombre, fecha_inicio, fecha_final} = req.body;

        fecha_inicio = fecha_inicio === '' ? null : fecha_inicio;
        fecha_final = fecha_final === '' ? null : fecha_final;

        const result = await pool.query(
            `UPDATE ${nTabla} SET nombre = $1, fecha_inicio = $2, fecha_final = $3 WHERE ${nId} = $4 RETURNING *`,
            [nombre,  fecha_inicio, fecha_final, id]
        );

        if (result.rows.length === 0)
            return res.status(404).json({ message: "Proyect not found" });

        return res.json(result.rows[0]);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong: "});
    }
};

export const deleteProyect = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("ID: ",id);
        const result = await pool.query(`DELETE FROM ${nTabla} WHERE ${nId} = $1`, [id]);

        if (result.rowCount === 0)
            return res.status(404).json({ message: "Proyect not found" });
        return res.sendStatus(204);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong: "});
    }
};



