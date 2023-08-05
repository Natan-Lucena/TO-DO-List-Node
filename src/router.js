const express = require('express');
const tasksController = require('./controllers/tasksController');
const { insertData, deleteData, updateTask } = require('./models/tasksModel');

const router = express.Router();

router.post('/insert', async (req, res) => {
  try{
    await insertData(req.body.nome, req.body.hora);
    res.status(200).send('Tarefa inserido com sucesso!');
  } catch (error) {
    console.error('Erro ao executar a consulta:', error);
    res.status(500).send('Erro ao consultar o banco de dados');
  }});

router.get('/tasks', async (req, res) => {
  try{
    let tasks = await tasksController.getAll();
     console.log(tasks.rows);
     res.status(200).json(tasks.rows);
  }
    catch (error) {
    console.error('Erro ao executar a consulta:', error);
    res.status(500).send('Erro ao consultar o banco de dados');
}});

router.delete('/delete', async (req, res) => {
 try{
    console.log(req.body.nome);
    await deleteData(req.body.nome);
    res.status(200).send('Tarefa excluida com sucesso!');
  } catch (error) {
    console.error('Erro ao executar a consulta:', error);
    res.status(500).send('Erro ao consultar o banco de dados');
}});

router.put('/update', async (req,res) => {
  try{
    updateTask(req.body.nome,req.body.hora,req.body.id); 
    res.status(200).send('Tarefa atualizada com sucesso!');
  } catch (error) { 
    console.error('Erro ao executar a consulta:', error);
    res.status(500).send('Erro ao consultar o banco de dados');
}});

module.exports = router;
