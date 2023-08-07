const connect = require('./elephantsql');

const getAll = async(jwt) => {
    const client = await connect();
    const tasks = await client.query('SELECT * FROM tasks WHERE jwt = $1', [jwt]);
    client.release();
    return tasks;
};

const insertData = async(nome, hora, jwt) => {
    const client = await connect();
    await client.query('INSERT INTO tasks (nome, hora, jwt) VALUES ($1, $2, $3)', [nome, hora, jwt]);
    client.release();
    return;
};

const deleteData = async(nome, jwt) => {
    const client = await connect();
    await client.query('DELETE FROM tasks WHERE nome = $1 AND jwt = $2', [nome, jwt]);
    client.release();
    return;
};

const updateTask = async(nome, hora , id, jwt) => {
    const client = await connect();
    await client.query('UPDATE tasks SET hora = $1, nome = $2 WHERE id = $3 AND jwt = $4', [hora, nome,id,jwt]);
    client.release();
    return;
};

module.exports = {
    getAll,
    insertData,
    deleteData,
    updateTask
};