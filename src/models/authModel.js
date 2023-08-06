const connect = require('./elephantsql');

const findByUser = async (user) =>{
    const client = await connect();
    const users =  await client.query(`SELECT "User", "Password", "JWT", "Email" FROM users WHERE "User" = $1;`,[user]);
    client.release();
    return users.rows;
}

const findByEmail = async (Email) =>{
    const client = await connect();
    const users =  await client.query(`SELECT "User", "Password", "JWT", "Email" FROM users WHERE "Email" = $1;`,[Email]);
    client.release();
    return users.rows;
}

module.exports = {
    findByUser,
    findByEmail
};