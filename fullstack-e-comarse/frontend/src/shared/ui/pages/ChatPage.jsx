import React from "react";

const ChatPage = () => {
  const messages = [
    { id: 1, text: "Hello! Is this product available?", sender: "other" },
    { id: 2, text: "Yes, it is available 😊", sender: "me" },
    { id: 3, text: "When will my order arrive?", sender: "other" },
    { id: 4, text: "It should arrive within 2-4 days.", sender: "me" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 px-4 py-4 text-white">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-xl font-bold">Flipkart Chat</h1>
        </div>
      </header>

      {/* Chat Container */}
      <main className="mx-auto max-w-4xl p-3 sm:p-6">
        <div className="flex h-[75vh] flex-col overflow-hidden rounded-xl bg-white shadow-md">
          
          {/* Chat User */}
          <div className="flex items-center gap-3 border-b p-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-xl">
              👨
            </div>

            <div>
              <h2 className="font-semibold text-gray-800">
                Customer Support
              </h2>
              <p className="text-sm text-green-600">Online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto bg-gray-50 p-4 sm:p-6">
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
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm sm:max-w-[70%] ${
                    message.sender === "me"
                      ? "rounded-br-sm bg-blue-600 text-white"
                      : "rounded-bl-sm border bg-white text-gray-800"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <form
            className="flex items-center gap-2 border-t p-3 sm:p-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              placeholder="Type your message..."
              className="min-w-0 flex-1 rounded-full border px-4 py-3 text-sm outline-none focus:border-blue-500"
            />

            <button
              type="submit"
              className="rounded-full bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Send
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;