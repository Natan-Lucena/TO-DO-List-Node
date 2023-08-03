const connect = require('./elephantsql');

const getAll = async() => {
    const client = await connect();
    const tasks = await client.query('SELECT * FROM tasks');
    return tasks;
};

const insertData = async(nome, hora) => {
    const client = await connect();
    await client.query('INSERT INTO tasks (nome, hora) VALUES ($1, $2)', [nome, hora]);
    return;
};

const deleteData = async(nome) => {
    const client = await connect();
    await client.query('DELETE FROM tasks WHERE nome = $1', [nome]);
    return;
};

const updateTask = async(nome, hora , id) => {
    const client = await connect();
    await client.query('UPDATE tasks SET hora = $1, nome = $2 WHERE id = $3', [hora, nome,id]);
    return;
};

module.exports = {
    getAll,
    insertData,
    deleteData,
    updateTask
};