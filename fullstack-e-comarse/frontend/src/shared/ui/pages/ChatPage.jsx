import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import io from 'socket.io-client'

const ChatPage = () => {
  const messages = [
    {
      id: 1,
      text: "Hello! Is this product available?",
      sender: "other",
    },
    {
      id: 2,
      text: "Yes, it is available 😊",
      sender: "me",
    },
    {
      id: 3,
      text: "When will my order arrive?",
      sender: "other",
    },
    {
      id: 4,
      text: "It should arrive within 2-4 days.",
      sender: "me",
    },
  ];

  const [inputValues, setInputValues] = useState("")
  const socketRef=useRef(null)
  const handleSubmit=()=>{

   if(!inputValues.trim()) return

   socketRef.current.emit("message",{
    content:inputValues
   })

   setInputValues("")
  }

  const {accessToken}=useSelector((state)=>state.auth)
  useEffect(()=>{
   
    const socket=io({
        extraHeaders:{
            Authorization:`Bearer ${accessToken}`
        }
    })

    socketRef.current=socket
    socket.on("message",(msg)=>{
        console.log(msg)
    })

    return ()=>{
        socket.disconnect()
    }


  },[])

  return (
    <div className="min-h-screen bg-orange-50">
      {/* Header */}
      <header className="bg-orange-500 px-4 py-4 text-white shadow-sm">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-2xl font-bold tracking-wide">
            Nexora
          </h1>
          <p className="text-sm text-orange-100">
            Your shopping, your conversations.
          </p>
        </div>
      </header>

      {/* Chat Container */}
      <main className="mx-auto max-w-4xl p-3 sm:p-6">
        <div className="flex h-[75vh] min-h-[400px] flex-col overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-lg">

          {/* Chat User */}
          <div className="flex items-center gap-3 border-b border-orange-100 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-2xl">
              👨
            </div>

            <div>
              <h2 className="font-semibold text-gray-800">
                Customer Support
              </h2>

              <p className="flex items-center gap-2 text-sm text-gray-500">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                Online
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto bg-orange-50/40 p-4 sm:p-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "me"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 sm:max-w-[70%] ${
                    message.sender === "me"
                      ? "rounded-br-sm bg-orange-500 text-white"
                      : "rounded-bl-sm border border-gray-100 bg-white text-gray-800 shadow-sm"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div
            className="flex items-center gap-2 border-t border-orange-100 bg-white p-3 sm:p-4"
          >
            <input
            value={inputValues}
             onChange={(e)=>setInputValues(e.target.value)}
              type="text"
              placeholder="Type your message..."
              className="min-w-0 flex-1 rounded-full border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />

            <button
            onClick={handleSubmit}
              type="submit"
              className="rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 active:scale-95"
            >
              Send
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;