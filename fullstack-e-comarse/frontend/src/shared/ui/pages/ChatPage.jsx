
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL || "http://localhost:5001";

const apiInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const ChatPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const [sending, setSending] = useState(false);
  const [socketError, setSocketError] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(true);

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  const auth = useSelector((state) => state.auth);

  const accessToken = auth?.accessToken;

  const currentUser =
    auth?.user || auth?.users?.user || auth?.users || {};

  const currentUserId =
    currentUser?.userId ||
    currentUser?._id ||
    currentUser?.id;

  // Format database and socket messages
  const formatMessage = (msg) => {
    const senderId =
      msg.senderId?._id ||
      msg.senderId ||
      msg.sender?._id ||
      "";

    return {
      ...msg,
      _id: String(msg._id || ""),
      senderId: String(senderId),
      content: msg.message || msg.content || "",
      outgoing:
        currentUserId != null &&
        String(senderId) === String(currentUserId),
    };
  };

  // Fetch previous messages
  useEffect(() => {
    let active = true;

    const fetchMessages = async () => {
      if (!accessToken) {
        setLoadingMessages(false);
        setSocketError("Please log in to use chat.");
        return;
      }

      try {
        setLoadingMessages(true);

        const response = await apiInstance.get("/messages", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const oldMessages =
          response.data.messages ||
          response.data.data ||
          [];

        if (active) {
          setMessages(oldMessages.map(formatMessage));
          setSocketError("");
        }
      } catch (error) {
        console.error(
          "Fetch messages error:",
          error.response?.data || error.message
        );

        if (active) {
          setSocketError(
            error.response?.data?.message ||
              "Unable to load previous messages."
          );
        }
      } finally {
        if (active) {
          setLoadingMessages(false);
        }
      }
    };

    fetchMessages();

    return () => {
      active = false;
    };
  }, [accessToken, currentUserId]);

  // Socket connection
  useEffect(() => {
    if (!accessToken) {
      setConnected(false);
      return;
    }

    const socket = io(SOCKET_URL, {
      path: "/socket.io",
      auth: {
        token: accessToken,
      },
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      setConnected(true);
      setSocketError("");
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error.message);
      setConnected(false);
      setSocketError(error.message || "Unable to connect to chat.");
    });

    const handleMessage = (msg) => {
      const newMessage = formatMessage(msg);

      setMessages((previousMessages) => {
        const alreadyExists = previousMessages.some(
          (item) =>
            item._id &&
            newMessage._id &&
            item._id === newMessage._id
        );

        if (alreadyExists) {
          return previousMessages;
        }

        return [...previousMessages, newMessage];
      });
    };

    socket.on("message", handleMessage);

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
      setConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("message", handleMessage);
      socket.off("disconnect");

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
  }, [messages]);

  // Send message
  const handleSubmit = (e) => {
    e.preventDefault();

    const text = inputValue.trim();
    const socket = socketRef.current;

    if (!text || !socket?.connected || sending) {
      return;
    }

    setSending(true);

    socket.timeout(10000).emit(
      "message",
      { message: text },
      (error, response) => {
        setSending(false);

        if (error) {
          setSocketError("Server did not respond. Try again.");
          return;
        }

        if (!response?.success) {
          setSocketError(
            response?.message || "Message could not be saved."
          );
          return;
        }

        setInputValue("");
        setSocketError("");
      }
    );
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <nav className="sticky top-0 z-20 border-b border-gray-100 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white">
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
              <h1 className="text-lg font-extrabold text-gray-900">
                Nexora<span className="text-orange-500">.</span>
              </h1>
              <p className="text-[10px] tracking-widest text-gray-400">
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

      <main className="mx-auto max-w-7xl px-3 py-5 sm:px-6">
        <div className="grid min-h-[calc(100dvh-7.5rem)] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="hidden border-r border-gray-100 lg:block">
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
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600">
                  N
                </div>

                <div>
                  <p className="text-sm font-bold text-gray-900">
                    Nexora Support
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Your conversations
                  </p>
                </div>
              </div>
            </div>
          </aside>

          <section className="flex min-h-[75vh] min-w-0 flex-col lg:min-h-0">
            <header className="flex items-center justify-between border-b border-gray-100 px-4 py-4 sm:px-6">
              <div>
                <h2 className="text-sm font-bold text-gray-900 sm:text-base">
                  Nexora Support
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  {connected ? "Connected to chat" : "Connecting..."}
                </p>
              </div>

              <span className="rounded-lg bg-orange-50 px-3 py-2 text-xs font-semibold text-orange-600">
                {messages.length} messages
              </span>
            </header>

            <div className="flex-1 overflow-y-auto bg-white px-4 py-6 sm:px-6">
              {loadingMessages && (
                <p className="py-8 text-center text-sm text-gray-400">
                  Loading previous messages...
                </p>
              )}

              {!loadingMessages && messages.length === 0 && (
                <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-3xl">
                    💬
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-gray-900">
                    Your conversation starts here
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    Send a message to start chatting.
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-4">
                {messages.map((item, index) => (
                  <div
                    key={item._id || index}
                    className={`flex w-full items-end gap-2 ${
                      item.outgoing ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!item.outgoing && (
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-200 text-sm font-bold text-gray-600">
                        N
                      </div>
                    )}

                    <div
                      className={`flex max-w-[80%] flex-col ${
                        item.outgoing ? "items-end" : "items-start"
                      }`}
                    >
                      <div
                        className={`rounded-2xl px-4 py-3 text-sm leading-6 sm:px-5 ${
                          item.outgoing
                            ? "rounded-br-sm bg-orange-500 text-white"
                            : "rounded-bl-sm border border-gray-200 bg-gray-50 text-gray-800"
                        }`}
                      >
                        <p className="whitespace-pre-wrap break-words">
                          {item.content}
                        </p>
                      </div>

                      <span className="mt-1 px-1 text-[11px] text-gray-400">
                        {item.outgoing ? "You" : "Nexora"}
                        {item.createdAt &&
                          ` · ${new Date(item.createdAt).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}`}
                      </span>
                    </div>

                    {item.outgoing && (
                      <div className="mb-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-600">
                        {currentUser?.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                    )}
                  </div>
                ))}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {socketError && (
              <div className="border-t border-red-100 bg-red-50 px-4 py-2 text-xs text-red-600">
                {socketError}
              </div>
            )}

            <footer className="border-t border-gray-100 bg-white p-3 sm:px-6 sm:py-5">
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 rounded-2xl border border-gray-200 p-2 focus-within:border-orange-400 focus-within:ring-4 focus-within:ring-orange-50"
              >
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  type="text"
                  placeholder={
                    connected
                      ? "Type your message..."
                      : "Waiting for connection..."
                  }
                  autoComplete="off"
                  disabled={!connected || sending}
                  className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm outline-none placeholder:text-gray-400 disabled:opacity-60 sm:text-base"
                />

                <button
                  type="submit"
                  disabled={!inputValue.trim() || !connected || sending}
                  className="rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  {sending ? "Sending..." : "Send"}
                </button>
              </form>

              <p className="mt-3 text-center text-[11px] text-gray-400">
                Powered by Socket.IO
              </p>
            </footer>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
