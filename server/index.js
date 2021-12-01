const express = require("express");
const app = express();
const cors = require("cors");
const { Client } = require("pg");

//midddleware
app.use(cors());
app.use(express.json());

// coneccion a las BD
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    }
});
client.connect();

// creacion de tablas
const startDB = async () => {
    try {
        //await client.query("DROP TABLE IF EXISTS Users")
        //await client.query("DROP TABLE IF EXISTS Newest")

        //create table Results
        await client.query(
            `CREATE TABLE IF NOT EXISTS Results(
            id SERIAL PRIMARY KEY,
            user_id INT,
            result FLOAT,
            type INT,
            date TIMESTAMP
            )`)

        await client.query(
            `CREATE TABLE IF NOT EXISTS Users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(64) NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(64) NOT NULL,
            age INT,
            gender VARCHAR(64),
            height FLOAT,
            weight FLOAT,
            fat_percent FLOAT
            )`)


        console.log("Tablas creadas en Base de Datos")
    } catch (err) {
        console.error(err)
    }
};

startDB()

//Results Routes
//add result
app.post("/results", async (req, res) => {
    try {
        const data = req.body;
        var datetime = new Date().toJSON().slice(0,16); // 2021-07-21T00:00:00.000Z -> 2021-07-21T00:00
        const newData = await client.query(
            "INSERT INTO results (user_id, result, type, date) VALUES($1, $2, $3, $4) RETURNING *",
            [data.user_id, data.result, data.type, datetime]
        );
        res.json(newData.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get all results
app.get("/results", async (_, res) => {
    try {
        const allData = await client.query("SELECT * FROM results ORDER BY date DESC");
        res.json(allData.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get results by user id
app.get("/results/:user_id", async (req, res) => {
    try {
        const id = req.params.user_id;
        const data = await client.query("SELECT * FROM results WHERE user_id=$1 ORDER BY date DESC", [parseInt(id)]);
        res.json(data.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get newest results by user id
app.get("/bestResult/:user_id/", async (req, res) => {
    try {
        const id = req.params.user_id;
        const data = await client.query(
            `   
                (SELECT t1.id, t1.user_id, t1.result, t1.type, t1.date
                FROM results t1 
                INNER JOIN
                (
                    SELECT Max(date) date, type
                    FROM   results
                    GROUP BY type
                ) AS t2 
                    ON t1.type = t2.type
                    AND t1.date = t2.date 
                    AND user_id=$1
                    AND t1.type = 0
                ORDER BY t1.id DESC
                LIMIT 1)

                UNION ALL

                (SELECT t1.id, t1.user_id, t1.result, t1.type, t1.date
                FROM results t1 
                INNER JOIN
                (
                    SELECT Max(date) date, type
                    FROM   results
                    GROUP BY type
                ) AS t2 
                    ON t1.type = t2.type
                    AND t1.date = t2.date 
                    AND user_id=$1
                    AND t1.type = 1
                ORDER BY t1.id DESC
                LIMIT 1)

                UNION ALL

                (SELECT t1.id, t1.user_id, t1.result, t1.type, t1.date
                FROM results t1 
                INNER JOIN
                (
                    SELECT Max(date) date, type
                    FROM   results
                    GROUP BY type
                ) AS t2 
                    ON t1.type = t2.type
                    AND t1.date = t2.date 
                    AND user_id=$1
                    AND t1.type = 2
                ORDER BY t1.id DESC
                LIMIT 1)
            `
            , [parseInt(id)]);
        res.json(data.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//delete result by id
app.delete("/results/:result_id", async (req, res) => {
    try {
        const id = req.params.result_id;
        const data = await client.query("DELETE FROM results WHERE id=$1", [parseInt(id)]);
        console.log("server data:", data)
        res.json("Resultado eliminado");
    } catch (err) {
        console.error(err.message);
    }
});


//User Routes
//add user
app.post("/user", async (req, res) => {
    try {
        const data = req.body;
        const newData = await client.query(
            "INSERT INTO Users (username, password, email) VALUES ($1, $2, $3) RETURNING *",
            [data.username, data.password, data.email]
        );
        
        res.json(newData.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get all users
app.get("/users", async (_, res) => {
    try {
        const allData = await client.query("SELECT * FROM Users ORDER BY score ASC");
        res.json(allData.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get user by user id
app.get("/user/:user_id", async (req, res) => {
    try {
        const id = req.params.user_id;
        const data = await client.query("SELECT * FROM Users WHERE id=$1", [parseInt(id)]);
        res.json(data.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//delete user by id
app.delete("/user/:result_id", async (req, res) => {
    try {
        const id = req.params.result_id;
        const data = await client.query("DELETE FROM Users WHERE id=$1", [parseInt(id)]);
        res.json("Resultado eliminado");
    } catch (err) {
        console.error(err.message);
    }
});

//update user by id
app.patch("/user_update", async (req, res) => {
    try {
        const data = req.body;
        const newData = await client.query(
            "UPDATE Users SET age=$1, gender=$2, height=$3, weight=$4, fat_percent=$5 WHERE id=$6", 
            [data.age, data.gender, data.height, data.weight, data.fat_percent, data.id]
        );
        res.json("Usuario Actualizado");
    } catch (err) {
        console.error(err.message);
    }
});

//update user score by id
app.patch("/score_update", async (req, res) => {
    try {
        const data = req.body;
        const newData = await client.query(
            "UPDATE Users SET score=$1 WHERE id=$2", 
            [data.score, data.id]
        );
        res.json("Puntaje de usuario actualizado");
    } catch (err) {
        console.error(err.message);
    }
});

//get check user
app.post("/check", async (req, res) => {
    try {
        const data = req.body;
        const newData = await client.query(
            "SELECT id, email, password FROM Users WHERE email=$1 AND password=$2",
            [data.email, data.password]
        );
        res.json(newData.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get check email
app.post("/check_email", async (req, res) => {
    try {
        const data = req.body;
        const newData = await client.query(
            "SELECT EXISTS(SELECT email, password FROM Users WHERE email=$1)",
            [data.email]
        );
        res.json(newData.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});


//initialize
const conn_port = process.env.PORT || 5000
app.listen(conn_port, () => {
    console.log("El servidor inició en el puerto ", conn_port);
    console.log("Database_URL", process.env.DATABASE_URL);
})