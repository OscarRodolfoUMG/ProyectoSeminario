import bcrypt from 'bcryptjs';
import { pool } from "../db.js";

const nTabla = 'usuario';
const nId = 'id_usuario';

export const getAllUser = async (req, res) => {
    try {
        const allUsers = await pool.query(`Select * from ${nTabla}`);
        res.json(allUsers.rows);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`SELECT * FROM ${nTabla} WHERE ${nId} = $1`, [id]);

        if (result.rows.length === 0)
            return res.status(404).json({ message: "User not found" });

        res.json(result.rows[0]);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const getUserType = async (req, res) => {
    try {
        const { type } = req.params;
        console.log("type: ", type);
        const result = await pool.query(`SELECT * FROM ${nTabla} WHERE fk_tipo_usuario = $1`, [type]);
        console.log("type: ", result);
        if (result.rows.length === 0)
            return res.status(404).json({ message: "User not found" }); 

        res.json(result.rows[0]);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong" });
    }
};



export const createUser = async (req, res) => {
    try {
        const { nombre, email, pass, fk_tipo_usuario} = req.body;
        const newUser = await pool.query(`Insert into ${nTabla} (nombre, email, pass, fk_tipo_usuario) VALUES ($1, $2, $3, $4) RETURNING *`, [nombre, email, pass, fk_tipo_usuario]);
        return res.status(200).json({ message: "Usuario Agregado"});
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong: "});
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, email, pass, fk_tipo_usuario } = req.body;

        const passwordHash = await bcrypt.hash(pass, 10);

        const result = await pool.query(
            `UPDATE ${nTabla} SET nombre = $1, email = $2, pass = $3, fk_tipo_usuario = $4 WHERE ${nId} = $5 RETURNING *`,
            [nombre, email, passwordHash, fk_tipo_usuario, id]
        );

        if (result.rows.length === 0)
            return res.status(404).json({ message: "User not found" });

        return res.json(result.rows[0]);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Something went wrong: "});
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("ID: ",id);
        const result = await pool.query(`DELETE FROM ${nTabla} WHERE ${nId} = $1`, [id]);

        if (result.rowCount === 0)
            return res.status(404).json({ message: "User not found" });
        return res.sendStatus(204);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong: "});
    }
};



