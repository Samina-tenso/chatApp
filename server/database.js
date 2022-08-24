const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database("db.sqlite", (err) => {
    if (err) {
        console.error(err.message)
        throw err
    } else {
        console.log("Connected to database")

    }
})

const roomTable = `CREATE TABLE IF NOT EXISTS rooms(
    Room_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    room VARCHART(100) NOT NULL,
    userName VARCHAR(100) NOT NULL

);`;

const messagesTable = `CREATE TABLE IF NOT EXISTS Messages(
    Room_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    room VARCHART(100) NOT NULL,
    userName VARCHART(100) NOT NULL,
    message VARCHAR(100) NOT NULL,
    time TIME
);`;

db.run(roomTable, err => {

    if (err) {
        console.error(err.message)
        console.log("Table already exists")
        return
    }
    else {
        console.log("Created Room table")

    }
})

db.run(messagesTable, err => {

    if (err) {
        console.error(err.message)
        console.log("Table already exists")
        return
    }
    else {
        console.log("Created Messages table")

    }
})
module.exports = db
