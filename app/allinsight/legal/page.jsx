"use client";

import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { FileUp, Send, X, AlertCircle } from "lucide-react";

const SkeletonLoader = () => (
  <div className="max-w-[75%] px-4 py-2 rounded-xl bg-green-300 animate-pulse h-6" />
);

const LegalPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const chatBodyRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();

      const botMessage = { role: "assistant", content: data.answer };
      setMessages((prev) => [...prev, botMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "❌ Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePdfUpload = async () => {
    if (!file) return;
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("pdf", file);

      const response = await fetch("http://localhost:8000/upload/pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "✅ PDF uploaded and processed successfully! You can now ask questions about it.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "❌ Failed to process PDF. Please try again.",
        },
      ]);
    } finally {
      setIsUploading(false);
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 px-2 sm:px-4 py-6 sm:py-10">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col h-[85vh] sm:h-[90vh]">
        <header className="flex flex-wrap items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-4">
          <FileUp className="h-8 w-8 sm:h-10 sm:w-10 text-green-500" />
          <h1 className="text-2xl sm:text-3xl font-bold text-green-600 select-none">
            Smart Document Chat
          </h1>
          {file && (
            <div className="mt-2 sm:mt-0 sm:ml-auto flex items-center gap-2 text-xs sm:text-sm bg-white/30 backdrop-blur-sm px-3 py-2 rounded-full shadow max-w-full truncate">
              <FileUp className="w-4 h-4 text-green-600" />
              <span className="truncate font-medium">{file.name}</span>
              <button
                aria-label="Remove uploaded file"
                onClick={() => setFile(null)}
                className="hover:bg-white/40 p-1 rounded-full"
              >
                <X className="w-4 h-4 text-green-600" />
              </button>
            </div>
          )}
        </header>

        <main
          ref={chatBodyRef}
          className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-4 border rounded-md bg-gray-50"
        >
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-gray-700 select-none">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center shadow-inner">
                <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold">Welcome!</h3>
              <p className="max-w-xs text-gray-600">
                Upload a PDF document or start chatting to get assistance.
              </p>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-2 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2 rounded-xl text-sm shadow-md ${
                    msg.role === "user"
                      ? "bg-green-600 text-black rounded-br-none"
                      : "bg-white text-gray-900 rounded-bl-none border border-gray-200"
                  }`}
                  style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
                >
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start gap-2">
              <SkeletonLoader />
            </div>
          )}
        </main>

        <footer className="mt-3 flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            onClick={() => fileInputRef.current?.click()}
            title="Upload PDF"
            aria-label="Upload PDF"
            disabled={isUploading || isLoading}
            className="p-3 rounded-full text-green-600 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          >
            <FileUp className="w-6 h-6" />
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={(e) => {
              if (e.target.files?.[0]) setFile(e.target.files[0]);
            }}
            className="hidden"
          />

          {file && (
            <button
              onClick={handlePdfUpload}
              disabled={isUploading}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
            >
              {isUploading ? "Uploading..." : "Upload PDF"}
            </button>
          )}

          <input
            type="text"
            placeholder="Ask a question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading || isUploading}
            className="flex-1 rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />

          <button
            onClick={sendMessage}
            disabled={isLoading || isUploading || !input.trim()}
            className="bg-green-600 hover:bg-green-700 text-white rounded-full p-2 disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </footer>
      </div>
    </div>
  );
};

export default LegalPage;
