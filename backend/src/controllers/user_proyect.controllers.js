import { pool } from "../db.js";

const nTabla = 'proyecto_usuario';

export const getAllUser_Proyect = async (req, res) => {
    const { id_proyecto } = req.query;  // Filtra por proyecto si se proporciona
    try {
        let query = `SELECT * FROM ${nTabla}`;
        let values = [];

        if (id_proyecto) {
            query += ` WHERE fk_id_proyecto = $1`;
            values.push(id_proyecto);
        }

        const allUser_Proyects = await pool.query(query, values);
        res.json(allUser_Proyects.rows);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};


export const getUser_Proyect = async (req, res) => {
    try {
        const { id_user, id_proyect } = req.params;
        const result = await pool.query(`SELECT * FROM ${nTabla} WHERE fk_id_usuario = $1 AND fk_id_proyecto = $2`, [id_user, id_proyect]);

        if (result.rows.length === 0)
            return res.status(404).json({ message: "User_Proyect not found" });

        res.json(result.rows[0]);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong" });
    }
};


export const createUser_Proyect = async (req, res) => {
    try {
        const { id_user, id_proyect } = req.params;
        const newUser_Proyect = await pool.query(`Insert into ${nTabla} (fk_id_usuario, fk_id_proyecto) VALUES ($1, $2) RETURNING *`, [id_user, id_proyect]);
        return res.status(200).json({ message: "User_Proyecto Agregado" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong: " });
    }
};

export const updateUser_Proyect = async (req, res) => {
    try {
        const { id_user, id_proyect } = req.params;
        const { new_id_user, new_id_proyect } = req.body;

        const result = await pool.query(
            `UPDATE ${nTabla} SET fk_id_usuario = $1, fk_id_proyecto = $2 WHERE fk_id_usuario = $1 AND fk_id_proyecto = $2 RETURNING *`,
            [new_id_user, new_id_proyect, id_user, id_proyect]
        );

        if (result.rows.length === 0)
            return res.status(404).json({ message: "User_Proyect not found" });

        return res.json(result.rows[0]);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong: " });
    }
};

export const deleteUser_Proyect = async (req, res) => {
    try {
        const { id_user, id_proyect } = req.params;
        const result = await pool.query(`DELETE FROM ${nTabla} where fk_id_usuario = $1 AND fk_id_proyecto = $2 RETURNING *`, [id_user, id_proyect]);

        if (result.rowCount === 0)
            return res.status(404).json({ message: "User_Proyect not found" });
        return res.sendStatus(204);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong: " });
    }
};



