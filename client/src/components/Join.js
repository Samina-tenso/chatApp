import { Link } from "react-router-dom"
import React, { useState } from "react"
import { Socket } from "socket.io-client"

function Join() {

    const [room, setRoom] = useState("")
    const [userName, setUserName] = useState("")


    return (
        <div className="test">
            < div className="login">
                <div className="input">

                    <h1 className="heading"> Join</h1>
                    <input type="text" className="joinInput" placeholder="Name..." onChange={(e) => setUserName(e.target.value)} />
                    <input type="text" className="joinInput" placeholder="Room..." onChange={(e) => setRoom(e.target.value)} />
                </div>
                <Link onClick={event => (!userName || !room) ? event.preventDefault() : null} to={`/chat?userName=${userName}&room=${room}`}>
                    <button className="enterChat" type="submit"> Enter Chat</button>
                </Link>
            </div >

        </div >
    )
}
export default Join