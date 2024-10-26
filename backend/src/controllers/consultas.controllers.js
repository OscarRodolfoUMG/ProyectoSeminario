import { pool } from "../db.js";

// Cantidad de desarrolladores
export const contarDesarrolladores = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT COUNT(*) FROM usuario WHERE fk_tipo_usuario = 4`
        );
        res.json({ cantidadDesarrolladores: result.rows[0].count });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

// Cantidad de analistas de calidad
export const contarAnalistas = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT COUNT(*) FROM usuario WHERE fk_tipo_usuario = 3`
        );
        res.json({ cantidadAnalistas: result.rows[0].count });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

// Cantidad de proyectos
export const contarProyectos = async (req, res) => {
    try {
        const result = await pool.query(`SELECT COUNT(*) FROM proyecto`);
        res.json({ cantidadProyectos: result.rows[0].count });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

// Cantidad de pruebas
export const contarPruebas = async (req, res) => {
    try {
        const result = await pool.query(`SELECT COUNT(*) FROM prueba`);
        res.json({ cantidadPruebas: result.rows[0].count });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

// Cantidad de tareas completadas
export const contarTareasCompletadas = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT COUNT(*) FROM tareas WHERE fk_id_estado = 2`
        );
        res.json({ cantidadTareasCompletadas: result.rows[0].count });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

// Cantidad de tareas no completadas
export const contarTareasNoCompletadas = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT COUNT(*) FROM tareas WHERE fk_id_estado != 2`
        );
        res.json({ cantidadTareasNoCompletadas: result.rows[0].count });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

// Cantidad de tareas pendientes
export const contarTareasPendientes = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT COUNT(*) FROM tareas WHERE fk_id_estado = 1`
        );
        res.json({ cantidadTareasPendientes: result.rows[0].count });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

// Contar cuántas tareas tiene un proyecto
export const contarTareasPorProyecto = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            `SELECT COUNT(*) as cantidadTareas 
             FROM tareas WHERE fk_id_proyecto = $1`, [id]
        );
        res.json({ cantidadTareas: result.rows[0].cantidadtareas });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

// Contar las tareas completadas por un proyecto
export const contarTareasCompletadasPorProyecto = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            `SELECT COUNT(*) as cantidadTareasCompletadas 
             FROM tareas WHERE fk_id_proyecto = $1 AND fk_id_estado = 2`, [id]
        );
        res.json({ cantidadTareasCompletadas: result.rows[0].cantidadtareascompletadas });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

// Obtener los errores agrupados por proyecto
export const obtenerErroresPorProyecto = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT p.nombre AS proyecto, f.descripcion AS error, cf.nombre AS tipoError
             FROM falla f
             JOIN tareas t ON t.id_tarea = f.fk_id_tarea
             JOIN proyecto p ON t.fk_id_proyecto = p.id_proyecto
             JOIN clasificacion_falla cf ON f.fk_id_clasificacion_falla = cf.id_clasificacion_falla
             ORDER BY p.nombre`
        );
        const erroresPorProyecto = result.rows.reduce((acc, row) => {
            const { proyecto, error, tipoerror } = row;
            if (!acc[proyecto]) acc[proyecto] = [];
            acc[proyecto].push({ error, tipoerror });
            return acc;
        }, {});
        res.json(erroresPorProyecto);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Algo salió mal" });
    }
};
