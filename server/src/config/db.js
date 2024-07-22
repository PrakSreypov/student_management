const mysql = require('mysql2/promise')

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "ANBcambodia3",
    database: "student_management",
    namedPlaceholders: true
});

module.exports = db;