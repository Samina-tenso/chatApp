import React, { useState, useEffect } from "react"
import queryString from "query-string"
import io from "socket.io-client"
import { Link, useLocation } from "react-router-dom";
let socket;

const PORT = "http://localhost:4000"
socket = io(PORT)
function Chat() {
    const [room, setRoom] = useState("")
    const [userName, setUserName] = useState("")
    const [currentMessage, setCurrentMessage] = useState("")
    const [prevMessages, setPrevMessages] = useState([])

    const [roomExists, setRoomExists] = useState(true)
    let location = useLocation()
    let messageInput = document.getElementById("msg")




    useEffect(() => {
        const { userName, room } = queryString.parse(location.search)

        socket.on("returned_message", (messageData) => {
            console.log("hello")
            console.log(messageData)
            setPrevMessages((message) => [...message, messageData])

        })


        socket.emit("join", ({ userName, room }))

        socket.on("joined_room", (user, messages) => {
            setUserName(user.userName)
            setRoom(user.room)
            console.log(`${user.userName} har joined ${user.room}`)
            console.log(messages)
            setPrevMessages([...messages])

        })

        socket.on("room_deleted", (room) => {
            console.log(`room with name ${room} was deleted`)
            setRoomExists(false)
        })


        return () => {
            socket.off("returned_messages", "got_messages")
        }
    }, [location.search])


    console.log(prevMessages)



    async function submitMessage(e) {
        e.preventDefault()
        const date = new Date()
        if (currentMessage) {
            const messageData = {
                room: room,
                userName: userName,
                message: currentMessage,
                time: date.getHours() + ":" + date.getMinutes()
            }
            await socket.emit("send_message", messageData)
            messageInput.value = ""
            setCurrentMessage("")
        } else if (!currentMessage) {
            socket.emit("")
        }

    }

    function deleteRoom() {
        socket.emit("delete_room", room)

    }

    return (
        <div>
            {roomExists ? (
                <div>
                    < div className="chatcontainer" >
                        <header class="chatheader">
                            <h1>Chat</h1>
                            <h3>Room Name:</h3>
                            <h2 id="room-name">{room}</h2>
                            <h3> Users </h3>
                            <ul id="users">
                                <li> {userName}</li>
                            </ul>
                        </header >
                    </div >
                    <main>
                        <div class="chat-form-container">

                            {prevMessages.map((m) => {
                                return (
                                    <div key={m.room_ID}>
                                        <h1> {m.message}</h1>
                                        <h3> {m.userName}</h3>
                                        <h3> {m.time}</h3>

                                    </div>
                                );
                            })}
                            <form id="chat-form">
                                <input id="msg" type="text" name="message" required placeholder="enter message" onChange={(event) => {

                                    setCurrentMessage(event.target.value)
                                    console.log(currentMessage)

                                }} />
                                <button class="btn" type="submit" onClick={submitMessage} >Send</button>
                            </form>
                            <button onClick={deleteRoom} class="btn" type="submit" >Delete room</button>
                        </div>
                    </main >
                </div >
            ) :
                (<div>
                    <h2> This room has been deleted </h2>
                    <Link to="/"  >
                        <button class="btn" type="submit"> Join a new room </button>
                    </Link>
                </div>)
            }
        </div>
    )
}

export default Chat