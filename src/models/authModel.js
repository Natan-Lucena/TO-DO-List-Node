const connect = require('./elephantsql');
const bcrypt = require('bcrypt');
//INSERIR NO BANCO DE DADOS AS SENHAS CRIPTOGRAFADAS
//CHAT GPT JA PASSOU A CALL
//LOGIN VAI SER NO MESMO MODEL E CONTROLLER
const findByUser = async (user) =>{
    const client = await connect();
    const users =  await client.query(`SELECT "User", "Password", "JWT", "Email" FROM users WHERE "User" = $1;`,[user]);
    client.release();
    return users.rows[0];
}

const findByEmail = async (Email) =>{
    const client = await connect();
    const users =  await client.query(`SELECT "User", "Password", "JWT", "Email" FROM users WHERE "Email" = $1;`,[Email]);
    client.release();
    return users.rows[0];
}

const findByJWT = async (jwt) => {
    const client = await connect();
    const users =  await client.query(`SELECT "User", "Password", "JWT", "Email" FROM users WHERE "JWT" = $1;`,[jwt]);
    client.release();
    return users.rows[0];
}

const encryptPassword = async (password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}

const verifyPassword = async (password,hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
} 

const registerUser =  async (user, password, email) => {
    const client = await connect();
    const hashedPassword =  await encryptPassword(password);
    const jwt = await encryptPassword(user);
    await client.query(`INSERT INTO users ("User", "Password", "JWT" , "Email") VALUES ($1, $2, $3, $4)`, [user, hashedPassword, jwt , email])
    return;
    
};

module.exports = {
    findByUser,
    findByEmail,
    registerUser,
    verifyPassword
};