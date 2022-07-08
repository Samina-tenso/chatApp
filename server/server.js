const { Server } = require("socket.io")
const fs = require("fs")

const { joinRoom, insertMessage, deleteRoom, getMessages } = require("./queries")

const io = new Server({
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    socket.use((event, next) => {
        const data = JSON.stringify(event)
        fs.appendFile("./logger.txt", data, { flag: "a" }, err => {
            if (err) {
                console.log(err);
            }
        })
        console.log("wrote to file");
        next();
    })
    console.log(`User connected: ${socket.id}`)

    socket.on("get_messages", async (room) => {
        try {
            const messages = await getMessages(room)

            io.in(room).emit("got_messages", messages)


        } catch (error) {
            console.log(error.message)
            console.log("messages could not be retrived")
        }
    })

    socket.on("join", async ({ userName, room }) => {
        console.log(userName)
        console.log(room)
        const user = { id: socket.id, userName, room }
        socket.user = user
        try {
            const Room = await joinRoom(room, userName)

            const messages = await getMessages(room)
            if (Room) {
                socket.join(user.room)
                io.to(user.room).emit("joined_room", user, messages)
            }
        } catch (error) {
            console.log(error.message)
            console.log("user could not be added")
        }
    })

    socket.on("send_message", async (messageData) => {
        const { room, message, userName, time } = messageData
        console.log(room, message)
        try {
            const sendMessages = await insertMessage(room, message, userName, time)
            if (sendMessages) {

                console.log(messageData)
                io.to(room).emit("returned_message", messageData)
            } else {
                console.log("no messages")
            }
        } catch (error) {
            console.log(error)
        }
    })

    socket.on("disconnect", () => {
        console.log("user left")
        io.emit("message", "a user has left chat")
    })

    socket.on("delete_room", async (room) => {
        console.log(socket.room)
        try {
            const removedRoom = await deleteRoom(room)
            if (removedRoom) {
                console.log(removedRoom)
                let clientsInRoom = 0;
                const clients = io.sockets.adapter.rooms.get(room)
                console.log(clients)
                for (const clientId of clients) {
                    const clientSocket = io.sockets.sockets.get(clientId)
                    clientSocket.leave(room)
                }
                if (io.sockets.adapter.rooms.has(room)) { clientsInRoom = io.sockets.adapter.rooms.get(room).size }
                console.log(clientsInRoom)
                console.log(socket.adapter.rooms)
                io.emit("room_deleted", room)
            }
        } catch (error) {
            console.log(error)
        }
    })


})

io.listen(4000, () => {
    console.log("Server is running")
})
