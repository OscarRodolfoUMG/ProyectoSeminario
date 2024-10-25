import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/tasks.routes.js';
import userRoutes from './routes/users.routes.js';
import proyectRoutes from './routes/proyect.routes.js';
import userProyectRoutes from './routes/user_proyect.routes.js'
import planPruebaRoutes from './routes/plan_prueba.routes.js'
import pruebaRoutes from './routes/pueba.routes.js'
import fallaRoutes from './routes/falla.routes.js'
import consultasRoutes from './routes/consultas.routes.js'

import { FRONTEND_URL } from './config.js';

const app = express();

app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", taskRoutes);
app.use("/api", userRoutes);
app.use("/api", proyectRoutes);
app.use("/api", userProyectRoutes);
app.use("/api", planPruebaRoutes);
app.use("/api", pruebaRoutes);
app.use("/api", fallaRoutes);
app.use("/api", consultasRoutes);


export default app;