const connect = require('./elephantsql');

const getAll = async(jwt) => {
    const client = await connect();
    const tasks = await client.query('SELECT id, hora, nome, feito, "desc", dias FROM tasks WHERE jwt = $1 AND ativo = true', [jwt]);
    client.release();
    return tasks;
};

const getNotActive = async(jwt) => {
    const client = await connect();
    const tasks = await client.query('SELECT id, hora, nome, feito, "desc", dias FROM tasks WHERE jwt = $1 AND ativo = false', [jwt]);
    client.release();
    return tasks;
};

const insertData = async(nome, hora, jwt, desc, dias) => {
    const client = await connect();
    await client.query('INSERT INTO tasks (nome, hora, jwt, feito, "desc", ativo, dias) VALUES ($1, $2, $3, $4, $5, true, $6)', [nome, hora, jwt, "FALSE", desc, dias]);
    client.release();
    return;
};

const deleteData = async(nome, jwt, id) => {
    const client = await connect();
    await client.query('UPDATE tasks SET ativo = false WHERE nome = $1 AND jwt = $2 AND id = $3', [nome, jwt, id]);
    client.release();
    return;
};

const setActive = async(nome,jwt,) => {
    const client = await connect();
    await client.query('UPDATE tasks SET ativo = true WHERE nome = $1 AND jwt = $2', [nome, jwt]);
    client.release();
    return;
};

const updateTask = async(nome, hora ,feito, id, jwt, desc, dias) => {
    const client = await connect();
    await client.query('UPDATE tasks SET hora = $1, nome = $2, feito = $3, "desc" = $4, dias = $5 WHERE id = $6 AND jwt = $7', [hora, nome,feito,desc,dias,id,jwt]);
    client.release();
    return;
};

module.exports = {
    getAll,
    insertData,
    deleteData,
    updateTask,
    getNotActive,
    setActive
};