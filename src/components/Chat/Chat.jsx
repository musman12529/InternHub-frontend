import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";



import ChatHistory from "./ChatHistory";
import Loading from "./Loading";



const ChatBot = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const genAI = new GoogleGenerativeAI(
    "AIzaSyCJbHjIYNE66iuM9Z4zm4_cI1jX2GVa38c"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    setIsLoading(true);
    try {
      const result = await model.generateContent(userInput);
      const response = await result.response;
      setChatHistory([
        ...chatHistory,
        { type: "user", message: userInput },
        { type: "bot", message: response.text() },
      ]);
    } catch {
      console.error("Error sending message");
    } finally {
      setUserInput("");
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setChatHistory([]);
  };

  return (
    <div className="main-chat-container">
      <div className="Botimage">
            <img src="/chatbot.png"  />
          </div>

      <div className="chat-container">
        <ChatHistory chatHistory={chatHistory} />
        <Loading isLoading={isLoading} />
      </div>

      <div className="input-area">
  <input
    type="text"
    className="input"
    placeholder="Type your message..."
    value={userInput}
    onChange={handleUserInput}
  />
  <button
    className="send-button"
    onClick={sendMessage}
    disabled={isLoading}
  >
    Send
  </button>
</div>
      <button
        className="button clear-button"
        onClick={clearChat}
      >
        Clear Chat
      </button>
    </div>
  );
};

export default ChatBot;
