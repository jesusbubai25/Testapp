const app = require('express')();
const bodyparser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql2')

app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors())
app.use(require('express').json());

const PORT = 8000;

const pool = mysql.createPool({
    host: "141.136.43.151",
    user: 'u188495358_pvAPMDB1',
    password: '9830pvAPM9831@@',
    database: 'u188495358_pvAPMDB1',
    waitForConnections: true,
    multipleStatements: true
})
const promisePool = pool.promise();

app.get("/getdata", async (req, res) => {
    let connection;
    try {
        connection = await promisePool.getConnection()
        await connection.beginTransaction();
        const [result, fields] = await connection.query("select * from testingTbl")
        await connection.commit();
        return res.status(200).json({ result: result, sucess: true });

    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ error: error.message, sucess: false });

    }
})


process.on("uncaughtException", err => {
    console.log("Server is closing due to uncaughtException occured!")
    console.log("Error :", err.message)
    server.close(() => {
        process.exit(1);
    })
})

const server = app.listen(PORT, () => {
    console.log("server is running at port : ", server.address().port)
})
console.log("Express application running fine")

process.on("unhandledRejection", err => {
    console.log("Server is closing due to unhandledRejection occured!")
    console.log("Error is:", err.message)
    server.close(() => {
        process.exit(1);
    })
})
