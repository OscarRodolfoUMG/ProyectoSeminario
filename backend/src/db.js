//import { Sequelize } from "sequelize";
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT, 
});

pool.on('connect', () => console.log('DB connected'));





// export const sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//         host: process.env.DB_HOST,
//         dialect: process.env.DB_DIALECT,
//     }
// );

// // Función para comprobar la conexión
// export const connectDB = async () => {
//     try {
//         await sequelize.authenticate();  // Autentica la conexión
//         console.log('>>> DB is connected');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// };

// import mongoose from "mongoose";


// export const connectDB = async ()=>{
//     try{
//         await mongoose.connect('mongodb://localhost/merndb');
//         console.log(">>> DB is conected");
//     }catch(e){
//         console.log(e);
//     }
// }

// const {NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE} = process.env;
// const MONGODB_URI = `mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DATABASE}`
