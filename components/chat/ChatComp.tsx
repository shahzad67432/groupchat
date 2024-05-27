"use client"
import { useEffect, useRef, useState } from 'react'
import MessageList from './MessageList'

function ChatComp({userName}:{userName: string}) {
  const messageListRef = useRef<HTMLDivElement>(null);
  const [socket, setSocket] = useState<null | WebSocket>(null)
  const [latestMessage, setLatestMessage] = useState<Array<{ msg: string, sender: string }>>([]);
  const [senderMessage, setSenderMessage] = useState("")

  useEffect(()=>{
    const socket = new WebSocket("ws://localhost:8080")
    socket.onopen = () =>{
      console.log("connected")
      setSocket(socket)
      socket.send(JSON.stringify({ type: 'setUsername', username: userName }));
    }
    socket.onmessage = (message)=>{
      const data = JSON.parse(message.data)
      console.log("message", data)
      if (data.type === 'message') {
        setLatestMessage((m) => [...m, { msg: data.msg, sender: data.sender }])
      }
    }

    return ()=>{
      socket.close()
    }

  }, [userName])

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [latestMessage]);

  if(!socket){
    return <div>...connecting to the websocket offline</div>
  }

  const handleSendMessage = ()=>{
    const messageData = { type: 'message', msg: senderMessage, sender: userName }
    socket.send(JSON.stringify(messageData))
    setSenderMessage("")
  }

  return (
    <>
      <div className='flex flex-col w-full h-full'>
        <div className='h-full w-full flex flex-1 overflow-y-auto scroll-smooth pb-32 pl-44' ref={messageListRef}> 
          <MessageList newMessage={latestMessage} currentUser={userName}/> 
        </div>
        <div className='fixed bottom-0 left-0 w-full'>
          <div className='p-6 flex items-center text-center justify-between px-64 pl-96'>
            <input
              type='text'
              placeholder='send message'
              value={senderMessage}
              onChange={(e) => setSenderMessage(e.target.value)}
              className='flex flex-1 p-4 items-center justify-start text-start w-full bg-orange-100 rounded-l-2xl'
            />
            <div>
              <button className='border-x-2  border-orange-300 p-4 font-bold text-orange-700 rounded-r-2xl' onClick={handleSendMessage}>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatComp;
