
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";

const ChatPage = () => {
  const [inpurValues, setinpurValues] = useState("");
  const [massage, setMassage] = useState([]);
  const [connected, setConnected] = useState(false);
  const [sending, setSending] = useState(false);
  const [socketError, setSocketError] = useState("");

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  const { accessToken, user } = useSelector((state) => state.auth);

  const currentUserId = user?.userId || user?._id || user?.id;

  // Connect Socket.IO
  useEffect(() => {
    if (!accessToken) {
      setConnected(false);
      setSocketError("Please log in to use chat.");
      return;
    }

    const socket = io( {
      auth: {
        token: accessToken,
      },
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setConnected(true);
      setSocketError("");
      console.log("Socket connected:", socket.id);
    });

    socket.on("connect_error", (error) => {
      setConnected(false);
      setSocketError(error.message || "Unable to connect to chat.");
      console.error("Socket connection error:", error.message);
    });

    // Receive messages saved by the server
    const handleMessage = (msg) => {
      const senderId = msg.senderId || msg.sender?._id;

      const outgoing =
        currentUserId != null &&
        senderId != null &&
        String(senderId) === String(currentUserId);

      setMassage((prev) => {
        // Prevent duplicate messages
        if (msg._id && prev.some((item) => item._id === msg._id)) {
          return prev;
        }

        return [
          ...prev,
          {
            ...msg,
            content: msg.message || msg.content || "",
            outgoing,
          },
        ];
      });
    };

    socket.on("message", handleMessage);

    socket.on("disconnect", () => {
      setConnected(false);
    });

    return () => {
      socket.off("message", handleMessage);
      socket.disconnect();
      socketRef.current = null;
    };
  }, [accessToken, currentUserId]);

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [massage]);

  // Send message
  const handleSubmit = (e) => {
    e.preventDefault();

    const text = inpurValues.trim();
    const socket = socketRef.current;

    if (!text || !socket?.connected || sending) {
      return;
    }

    setSending(true);

    socket.emit("message", { message: text }, (response) => {
      setSending(false);

      if (!response?.success) {
        setSocketError(
          response?.message || "Message could not be saved."
        );
        return;
      }

      setinpurValues("");
      setSocketError("");
    });
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Top navigation */}
      <nav className="sticky top-0 z-20 border-b border-gray-100 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white shadow-sm shadow-orange-200">
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 10h8M8 14h5m-8 6 3.5-3H17a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v10a3 3 0 0 0 2 3Z"
                />
              </svg>
            </div>

            <div>
              <h1 className="text-lg font-extrabold tracking-tight text-gray-900">
                Nexora<span className="text-orange-500">.</span>
              </h1>
              <p className="text-[10px] font-medium tracking-widest text-gray-400">
                MESSAGES
              </p>
            </div>
          </div>

          <div
            className={`flex items-center gap-2 rounded-full border px-3 py-2 ${
              connected
                ? "border-green-100 bg-green-50"
                : "border-red-100 bg-red-50"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                connected ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span
              className={`text-xs font-semibold ${
                connected ? "text-green-700" : "text-red-600"
              }`}
            >
              {connected ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </nav>

      {/* Main page */}
      <main className="mx-auto max-w-7xl px-3 py-5 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid min-h-[calc(100dvh-7.5rem)] grid-cols-1 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.04)] lg:min-h-[calc(100dvh-9rem)] lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* Sidebar */}
          <aside className="hidden border-r border-gray-100 bg-white lg:block">
            <div className="border-b border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900">
                Messages
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Stay connected with your people.
              </p>
            </div>

            <div className="p-4">
              <div className="flex items-center gap-3 rounded-xl border border-orange-100 bg-orange-50/70 p-3">
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100 text-lg font-bold text-orange-600">
                  N
                  <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-gray-900">
                    Nexora Support
                  </p>
                  <p className="mt-1 truncate text-xs text-gray-500">
                    Your shopping, your conversations.
                  </p>
                </div>

                <span className="h-2 w-2 rounded-full bg-orange-500" />
              </div>
            </div>

            <div className="mx-5 mt-4 rounded-xl bg-gray-50 p-4">
              <div className="flex items-center gap-2 text-orange-500">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <span className="text-sm font-semibold text-gray-800">
                  Quick support
                </span>
              </div>

              <p className="mt-2 text-xs leading-5 text-gray-500">
                Send a message to start your conversation in real time.
              </p>
            </div>
          </aside>

          {/* Chat area */}
          <section className="flex min-h-[75vh] min-w-0 flex-col bg-white lg:min-h-0">
            {/* Chat header */}
            <header className="flex items-center justify-between gap-3 border-b border-gray-100 bg-white px-4 py-4 sm:px-6 sm:py-5">
              <div className="flex min-w-0 items-center gap-3">
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-100 text-lg font-bold text-orange-600">
                  N
                  <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500" />
                </div>

                <div className="min-w-0">
                  <h2 className="truncate text-sm font-bold text-gray-900 sm:text-base">
                    Nexora Support
                  </h2>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        connected ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                    {connected ? "Connected to chat" : "Connecting..."}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2 rounded-lg bg-orange-50 px-3 py-2">
                <svg
                  className="h-4 w-4 text-orange-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 10h8M8 14h5m-8 6 3.5-3H17a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v10a3 3 0 0 0 2 3Z"
                  />
                </svg>
                <span className="text-xs font-semibold text-orange-600">
                  {massage.length}
                </span>
              </div>
            </header>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-white px-4 py-6 sm:px-6 sm:py-8">
              {massage.length === 0 && (
                <div className="flex min-h-[350px] flex-col items-center justify-center py-8 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-orange-50 ring-1 ring-orange-100">
                    <svg
                      className="h-10 w-10 text-orange-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 10h8M8 14h5m-8 6 3.5-3H17a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v10a3 3 0 0 0 2 3Z"
                      />
                    </svg>
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-gray-900 sm:text-2xl">
                    Your conversation starts here
                  </h3>

                  <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
                    Send your first message and connect with Nexora.
                    We are ready when you are!
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-xs text-gray-400">
                    <span className="text-orange-500">●</span>
                    <span>Simple, fast and real-time messaging</span>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                {massage.map((item) => (
                  <div
                    key={item._id || `${item.senderId}-${item.createdAt}`}
                    className={`flex items-end gap-2.5 ${
                      item.outgoing ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!item.outgoing && (
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-600">
                        N
                      </div>
                    )}

                    <div
                      className={`flex max-w-[85%] flex-col sm:max-w-[70%] ${
                        item.outgoing ? "items-end" : "items-start"
                      }`}
                    >
                      <div
                        className={`rounded-2xl px-4 py-3 text-sm leading-6 sm:px-5 ${
                          item.outgoing
                            ? "rounded-br-sm bg-orange-500 text-white shadow-sm shadow-orange-100"
                            : "rounded-bl-sm border border-gray-200 bg-gray-50 text-gray-800"
                        }`}
                      >
                        <p className="whitespace-pre-wrap break-words">
                          {item.content}
                        </p>
                      </div>

                      <span className="mt-1.5 px-1 text-[11px] text-gray-400">
                        {item.outgoing ? "You" : "Nexora"}
                        {item.createdAt &&
                          ` · ${new Date(item.createdAt).toLocaleTimeString(
                            [],
                            { hour: "2-digit", minute: "2-digit" }
                          )}`}
                      </span>
                    </div>

                    {item.outgoing && (
                      <div className="mb-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-600">
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                    )}
                  </div>
                ))}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Connection / error message */}
            {socketError && (
              <div className="border-t border-red-100 bg-red-50 px-4 py-2 text-xs text-red-600">
                {socketError}
              </div>
            )}

            {/* Input area */}
            <footer className="border-t border-gray-100 bg-white p-3 sm:px-6 sm:py-5">
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white p-2 transition-all focus-within:border-orange-400 focus-within:ring-4 focus-within:ring-orange-50 sm:gap-3 sm:p-2.5"
              >
                <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500 sm:flex">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 10h8M8 14h5m-8 6 3.5-3H17a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v10a3 3 0 0 0 2 3Z"
                    />
                  </svg>
                </div>

                <input
                  value={inpurValues}
                  onChange={(e) => setinpurValues(e.target.value)}
                  type="text"
                  placeholder={
                    connected
                      ? "Type your message..."
                      : "Waiting for connection..."
                  }
                  aria-label="Type your message"
                  autoComplete="off"
                  disabled={!connected || sending}
                  className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-60 sm:px-3 sm:text-base"
                />

                <button
                  type="submit"
                  disabled={
                    !inpurValues.trim() || !connected || sending
                  }
                  className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-300 sm:px-5"
                >
                  <span className="hidden sm:inline">
                    {sending ? "Sending..." : "Send"}
                  </span>

                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m22 2-7 20-4-9-9-4 20-7ZM22 2 11 13"
                    />
                  </svg>
                </button>
              </form>

              <p className="mt-3 text-center text-[11px] text-gray-400">
                Secure connection · Powered by Socket.IO
              </p>
            </footer>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
