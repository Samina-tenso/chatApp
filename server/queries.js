
const db = require("./database")


function insertMessage(room, message, userName, time) {

    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO Messages (room,userName,  message, time )VALUES(?,?,?,?);`;
        db.run(sql, [room, userName, message, time], (error) => {
            if (error) {
                console.log(error.message)
                console.log("notworking")
                reject(error)
            } else {
                const message = "message added to room"
                console.log(room, message, "new")
                resolve(message)
            }

        })

    })
}

function joinRoom(userName, roomName) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO Rooms ( RoomName, Username)VALUES (?,?);`;
        db.run(sql, [userName, roomName], (error) => {
            if (error) {
                console.log(error.message)
                console.log("notworking")
                reject(error)
            } else {
                const message = "user added to room"
                resolve(message)
            }

        })
    })
}

function deleteRoom(room) {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM Messages WHERE RoomName = (?)`;
        db.run(sql, [room], (error) => {
            if (error) {
                console.log(error.message)
                console.log("notworking")
                reject(error)
            } else {
                console.log(room)
                const message = "room and messages deleted"
                resolve(message)
            }

        })
    })
}

function getMessages(room) {
    return new Promise((resolve, reject) => {
        console.log(room, "hh")
        const sql = `SELECT * FROM Messages WHERE room = (?);`;
        db.all(sql, [room], (error, result) => {
            console.log(result, error)
            if (error) {
                console.log(error.message)
                console.log("notworking")
                reject(error)
            } else {
                console.log(room)
                console.log("messages were retrived")
                console.log(result)
                resolve(result)
            }

        })
    })
}

module.exports = { joinRoom, insertMessage, deleteRoom, getMessages }
