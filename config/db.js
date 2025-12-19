const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "diva1234",
    database: "db_klinik_gigi",
    port: 3380
});

db.connect((err) => {
    if (err) throw err;
    console.log("MySQL Connected!");
});

module.exports = db;
