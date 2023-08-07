const tasksModel = require('../models/tasksModel');

const getAll = async (req,res) => {
    try{
        const {jwt} = req.body
        const tasks = await tasksModel.getAll(jwt);
        console.log(tasks.rows);
        res.status(200).json(tasks.rows);
    }catch(error){
        console.error('Erro ao executar a consulta:', error);
        res.status(500).send('Erro ao consultar o banco de dados');
    }
};

const insertData = async (req,res) => {
    try{
        const { nome, hora , jwt} = req.body;
        await tasksModel.insertData(nome, hora , jwt);
        res.status(200).send('Tarefa inserido com sucesso!');
    }catch(error){
        console.error('Erro ao executar a consulta:', error);
        res.status(500).send('Erro ao consultar o banco de dados');
    }
};

const deleteData = async (req,res) => {
    try{
        const { nome , jwt} = req.body;
        await tasksModel.deleteData(nome,jwt);
        res.status(200).send('Tarefa excluida com sucesso!');
    } catch(error){
        console.error('Erro ao executar a consulta:', error);
        res.status(500).send('Erro ao consultar o banco de dados');
    }
};

const updateTask = async (req,res) => {
    try{
        const {nome,hora,id,jwt} = req.body;
        await tasksModel.updateTask(nome,hora,id,jwt);
        res.status(200).send('Tarefa atualizada com sucesso!');
    }catch(error){
        console.error('Erro ao executar a consulta:', error);
        res.status(500).send('Erro ao consultar o banco de dados');
    }   
};

module.exports = {
    getAll,
    insertData,
    deleteData,
    updateTask
};
