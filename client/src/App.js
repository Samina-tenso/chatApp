
import React from "react"
import './App.css'

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom"


import Join from "./components/Join"
import Chat from "./components/Chat"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Join />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
      </Routes>
    </Router>
  )

  /*
    const [message, setMessage] = useState("")
    const [messageRecived, setMessageRecived] = useState("")
    const sendMessage = () => {
      socket.emit("send_message", { message });
    };
  
    useEffect(() => {
      /* socket.on("got_message", (data) => {
         setMessageRecived(data.message)
         console.log("ne")
       })
       
  
    }, [])
  
  
  
    return (
  
  
  <input placeholder="Message..." onChange={(e) => {
  setMessage(e.target.value)
  }} />
  <button onClick={sendMessage} > Send Message</button>
  <h1>Message:</h1>
  {messageRecived}
  </div >
  );
  }
  */

}
export default App;
