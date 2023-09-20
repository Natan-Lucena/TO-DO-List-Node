const tasksModel = require('../models/tasksModel');

const getAll = async (req,res) => {
    try{
        const jwt = decodeURIComponent(req.params.jwt)
        const tasks = await tasksModel.getAll(jwt);
        console.table(tasks.rows);
        res.status(200).json(tasks.rows);
    }catch(error){
        console.error('Erro ao executar a consulta:', error);
        res.status(500).send('Erro ao consultar o banco de dados');
    }
};

const getNotActive = async (req,res) => {
    try{
        const jwt = decodeURIComponent(req.params.jwt)
        const tasks = await tasksModel.getNotActive(jwt);
        console.log(tasks.rows);
        res.status(200).json(tasks.rows);
    }catch(error){
        console.error('Erro ao executar a consulta:', error);
        res.status(500).send('Erro ao consultar o banco de dados');
    }
};

const insertData = async (req,res) => {
    try{
        let diasSemana = ["Segunda","Terca","Quarta","Quinta","Sexta","Sabado","Domingo"];
        const { nome, hora , jwt, desc, dias} = req.body;
        if(dias == "Todos"){
            for(let i = 0; i < diasSemana.length; i++){
                let dia = diasSemana[i];
                await tasksModel.insertData(nome, hora , jwt, desc, dia);
            }
            return res.status(200).send('Tarefa inserido com sucesso!');
        }else{
            await tasksModel.insertData(nome, hora , jwt, desc, dias);
            res.status(200).send('Tarefa inserido com sucesso!');
        }
    }catch(error){
        console.error('Erro ao executar a consulta:', error);
        res.status(500).send('Erro ao consultar o banco de dados');
    }
};

const deleteData = async (req,res) => {
    try{
        const { nome , jwt, id} = req.body;
        await tasksModel.deleteData(nome,jwt,id);
        res.status(200).send('Tarefa excluida com sucesso!');
    } catch(error){
        console.error('Erro ao executar a consulta:', error);
        res.status(500).send('Erro ao consultar o banco de dados');
    }
};

const setActive = async (req,res) => {
    try{
        const {nome,jwt} =  req.body;
        await tasksModel.setActive(nome,jwt);
        res.status(200).send('Tarefa ativa com sucesso!');
    } catch(error){
        console.error('Erro ao executar a consulta:', error);
        res.status(500).send('Erro ao consultar o banco de dados');
    } 
};

const updateTask = async (req,res) => {
    try{
        const {nome,hora,id,jwt,feito,desc,dias} = req.body;
        if(dias == "Todos") {
            let diasSemana = ["Segunda","Terca","Quarta","Quinta","Sexta","Sabado","Domingo"];
            await tasksModel.deleteData(nome, jwt, id);
            for(let i = 0; i < diasSemana.length; i++){
                let dia = diasSemana[i];
                await tasksModel.insertData(nome, hora , jwt, desc, dia);
            }
            return res.status(200).send('Tarefa atualizada com sucesso!');
        }
        let feitoBoolean;
        if(feito == 0){ feitoBoolean = "FALSE"}else{feitoBoolean = "TRUE"}
        await tasksModel.updateTask(nome,hora,feitoBoolean,id,jwt,desc,dias);
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
    updateTask,
    getNotActive,
    setActive
};
