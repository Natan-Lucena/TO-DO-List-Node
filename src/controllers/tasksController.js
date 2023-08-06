const tasksModel = require('../models/tasksModel');

const getAll = async (req,res) => {
    try{
        const tasks = await tasksModel.getAll();
        console.log(tasks.rows);
        res.status(200).json(tasks.rows);
    }catch(error){
        console.error('Erro ao executar a consulta:', error);
        res.status(500).send('Erro ao consultar o banco de dados');
    }
};

const insertData = async (req,res) => {
    try{
        const { nome, hora } = req.body;
        await tasksModel.insertData(nome, hora);
        res.status(200).send('Tarefa inserido com sucesso!');
    }catch(error){
        console.error('Erro ao executar a consulta:', error);
        res.status(500).send('Erro ao consultar o banco de dados');
    }
};

const deleteData = async (req,res) => {
    try{
        const { nome } = req.body;
        console.log(nome)
        await tasksModel.deleteData(nome);
        res.status(200).send('Tarefa excluida com sucesso!');
    } catch(error){
        console.error('Erro ao executar a consulta:', error);
        res.status(500).send('Erro ao consultar o banco de dados');
    }
};

const updateTask = async (req,res) => {
    try{
        const {nome,hora,id} = req.body;
        await tasksModel.updateTask(nome,hora,id);
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
