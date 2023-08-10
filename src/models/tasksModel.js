const connect = require('./elephantsql');

const getAll = async(jwt) => {
    const client = await connect();
    const tasks = await client.query('SELECT id, hora, nome, feito, desc FROM tasks WHERE jwt = $1', [jwt]);
    client.release();
    return tasks;
};

const insertData = async(nome, hora, jwt, desc) => {
    const client = await connect();
    await client.query('INSERT INTO tasks (nome, hora, jwt, feito, desc) VALUES ($1, $2, $3, $4, $5)', [nome, hora, jwt, "FALSE", desc]);
    client.release();
    return;
};

const deleteData = async(nome, jwt) => {
    const client = await connect();
    await client.query('DELETE FROM tasks WHERE nome = $1 AND jwt = $2', [nome, jwt]);
    client.release();
    return;
};

const updateTask = async(nome, hora ,feito, id, jwt, desc) => {
    const client = await connect();
    await client.query('UPDATE tasks SET hora = $1, nome = $2, feito = $3, desc = $4 WHERE id = $5 AND jwt = $6', [hora, nome,feito,desc,id,jwt]);
    client.release();
    return;
};

module.exports = {
    getAll,
    insertData,
    deleteData,
    updateTask
};