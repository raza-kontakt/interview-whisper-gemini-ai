
import { useState, useEffect, useRef } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ConversationDisplayProps {
  messages: Message[];
  isProcessing: boolean;
}

const ConversationDisplay = ({ messages, isProcessing }: ConversationDisplayProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-white rounded-lg shadow-sm mb-4 min-h-[300px] max-h-[500px]">
      {messages.length === 0 && (
        <div className="text-center text-gray-500 py-20">
          <p className="text-lg font-medium">Ready for your interview?</p>
          <p className="text-sm mt-2">Click the microphone and ask an interview question</p>
        </div>
      )}
      
      {messages.map((message, index) => (
        <div
          key={index}
          className={`mb-4 p-3 rounded-lg max-w-[80%] ${
            message.role === "user"
              ? "ml-auto bg-purple-100 text-gray-800"
              : "mr-auto bg-gray-100 text-gray-800"
          }`}
        >
          <p className="text-xs font-medium mb-1">
            {message.role === "user" ? "You" : "AI Coach"}
          </p>
          <p>{message.content}</p>
        </div>
      ))}
      
      {isProcessing && (
        <div className="mr-auto bg-gray-100 text-gray-800 p-3 rounded-lg max-w-[80%]">
          <p className="text-xs font-medium mb-1">AI Coach</p>
          <div className="flex space-x-1">
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ConversationDisplay;
