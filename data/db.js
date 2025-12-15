const mysql2 = require("mysql2")

const connection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "Root",
    database: "boolean_blog"
})

connection.connect((err) => {
    if (err) return err
    console.log("connection successful");
})

module.exports = connection