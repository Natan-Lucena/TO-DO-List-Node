const connect = require('./elephantsql');

const getAll = async(jwt) => {
    const client = await connect();
    const tasks = await client.query('SELECT id, hora, nome, feito FROM tasks WHERE jwt = $1', [jwt]);
    client.release();
    return tasks;
};

const insertData = async(nome, hora, jwt) => {
    const client = await connect();
    await client.query('INSERT INTO tasks (nome, hora, jwt, feito) VALUES ($1, $2, $3, $4)', [nome, hora, jwt, "FALSE"]);
    client.release();
    return;
};

const deleteData = async(nome, jwt) => {
    const client = await connect();
    await client.query('DELETE FROM tasks WHERE nome = $1 AND jwt = $2', [nome, jwt]);
    client.release();
    return;
};

const updateTask = async(nome, hora ,feito, id, jwt) => {
    const client = await connect();
    await client.query('UPDATE tasks SET hora = $1, nome = $2, feito = $3 WHERE id = $4 AND jwt = $5', [hora, nome,feito,id,jwt]);
    client.release();
    return;
};

module.exports = {
    getAll,
    insertData,
    deleteData,
    updateTask
};