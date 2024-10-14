
// import { DataTypes } from 'sequelize';
// //import { sequelize } from '../db.js'; 
// import User from './user.model.js'; 

// const Task = sequelize.define('Tareas', {
//     title: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     description: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     date: {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW,
//         allowNull: true,
//     }
// }, {
//     tableName: "TAREAS",
// });

// // Relación con el modelo User (muchas tareas pertenecen a un usuario)
// // Task.belongsTo(User, {
// //     foreignKey: {
// //         allowNull: false,  // El campo user_id no puede ser nulo
// //     },
// //     onDelete: 'CASCADE', // Elimina las tareas si el usuario es eliminado
// // });

// export default Task;

//import mongoose from "mongoose";

// const taskSchema = new mongoose.Schema({
//     title:{
//         type: String,
//         required: true,
//     },
//     description:{
//         type: String,
//         required: true,
//     },
//     date:{
//         type: Date,
//         default: Date.now,
//     },
//     user:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     }
// },{
//     timestamps: true
// });

// export default mongoose.model('Task', taskSchema);