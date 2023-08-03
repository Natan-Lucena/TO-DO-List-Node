const tasksModel = require('../models/tasksModel');

const getAll = async (req,res) => {
    
    const tasks = await tasksModel.getAll();
    
    return tasks;
};

const insertData = async (req,res) => {
    const { nome, hora } = req.params;
    await tasksModel.insertData(nome, hora);
    return;
};

const deleteData = async (req,res) => {
    const { nome } = req.params;
    await tasksModel.deleteData(nome);
    return;
};

const updateTask = async (req,res) => {
    const {nome,hora,id} = req.params;
    await tasksModel.updateTask(nome,hora,id);
    return;
}

module.exports = {
    getAll,
    insertData,
    deleteData,
    updateTask
};
