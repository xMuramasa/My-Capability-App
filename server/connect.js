const Pool = require("pg").Pool;

// Generar conexión con la base de datos
/*
const pool = new Pool({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    database: "mycapability",
    port: 5432, //mismo de postgres
});
*/

const pool = new Pool({
    user: "wylyjpokgsezvr",
    host: "ec2-52-72-125-94.compute-1.amazonaws.com",
    password: "1ecba722ff80eb65d7129fa641156ed2eed1f9edbaea68d794af42ce39ae4c91",
    database: "d2o4kp3msbmf9d",
    port: 5432
});

module.exports = pool;