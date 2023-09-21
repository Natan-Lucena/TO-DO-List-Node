const { Pool } = require('pg');

const URL = process.env.URL_CONNECTION;

async function connect(){
  if (global.connection)
      return global.connection.connect();

  const pool = new Pool({
      connectionString: URL
  });
  if(!pool){
    console.log("Não foi possível conectar ao banco de dados!");
    return;
  }
  //apenas testando a conexão
  const client = await pool.connect();
  console.log("Criou pool de conexões no PostgreSQL!");

  const res = await client.query('SELECT NOW()');
  console.log(res.rows[0]);

  client.release();

  //guardando para usar sempre o mesmo
  global.connection = pool;
  return pool.connect();
}

module.exports = connect;
