
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import {
  Bot,
  User,
  Send,
  Wand2,
  MessageSquare,
  GripVertical,
} from "lucide-react";
import { AIAssistantService } from "../../services/aiAssistantService";

interface RightSidebarProps {
  slides: any[];
  currentSlide: number;
  rightPanelWidth: number;
  isResizingRight: boolean;
  setIsResizingRight: (resizing: boolean) => void;
}

/**
 * Right Sidebar Component - AI Assistant
 * 
 * Contains:
 * - AI chat interface
 * - Quick action buttons
 * - Message history
 * - Input field for user messages
 */
export const RightSidebar: React.FC<RightSidebarProps> = ({
  slides,
  currentSlide,
  rightPanelWidth,
  // isResizingRight,
  setIsResizingRight,
}) => {
  // State for chat messages and input
  const [messages, setMessages] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState("");

  // Load initial AI messages on component mount
  useEffect(() => {
    const loadInitialMessages = async () => {
      try {
        const initialMessages = await AIAssistantService.getInitialMessages();
        setMessages(initialMessages);
      } catch (error) {
        console.error("Failed to load initial messages:", error);
      }
    };
    loadInitialMessages();
  }, []);

  // Send message to AI assistant
  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message to chat
    const userMessage = {
      id: messages.length + 1,
      type: "user" as const,
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");

    try {
      // Get AI response
      const aiResponse = await AIAssistantService.sendMessage(
        inputMessage,
        slides[currentSlide],
      );
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Failed to get AI response:", error);
    }
  };

  // Handle Enter key press in input field
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      {/* Resize Handle */}
      <div
        className="w-1 bg-zinc-800 hover:bg-zinc-700 cursor-col-resize flex items-center justify-center group"
        onMouseDown={() => setIsResizingRight(true)}
      >
        <GripVertical className="w-3 h-3 text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Sidebar Panel */}
      <div
        className="bg-zinc-900 border-l border-zinc-800 flex flex-col"
        style={{ width: `${rightPanelWidth}px` }}
      >
        {/* Header */}
        <div className="p-3 border-b border-zinc-800">
          <div className="flex items-center gap-3 mb-2">
            <Bot className="w-5 h-5 text-purple-400" />
            <h3 className="text-sm font-semibold text-zinc-300">
              AI Assistant
            </h3>
          </div>
          <p className="text-xs text-zinc-500">
            Get help with your presentation
          </p>
        </div>

        {/* Chat Messages */}
        <ScrollArea className="flex-1 p-3">
          <div className="space-y-3">
            {messages.map((message: any) => (
              <div
                key={message.id}
                className={`flex gap-2 ${message.type === "user" ? "justify-end" : "justify-start"
                  }`}
              >
                <div
                  className={`flex gap-2 max-w-[85%] ${message.type === "user" ? "flex-row-reverse" : ""
                    }`}
                >
                  {/* Message Avatar */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${message.type === "ai" ? "bg-purple-600" : "bg-blue-600"
                      }`}
                  >
                    {message.type === "ai" ? (
                      <Bot className="w-3 h-3" />
                    ) : (
                      <User className="w-3 h-3" />
                    )}
                  </div>

                  {/* Message Content */}
                  <div
                    className={`rounded-lg p-2 ${message.type === "ai"
                        ? "bg-zinc-800 text-zinc-300"
                        : "bg-blue-600 text-white"
                      }`}
                  >
                    <p className="text-xs leading-relaxed whitespace-pre-line">
                      {message.content}
                    </p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Footer with Quick Actions and Input */}
        <div className="p-3 border-t border-zinc-800">
          {/* Quick Action Buttons */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-zinc-400 hover:text-white hover:bg-zinc-800 justify-start text-xs"
              onClick={() => {
                setInputMessage("Help me improve this slide");
              }}
            >
              <Wand2 className="w-3 h-3 mr-1" />
              Improve
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-zinc-400 hover:text-white hover:bg-zinc-800 justify-start text-xs"
              onClick={() => {
                setInputMessage("Add speaker notes for this slide");
              }}
            >
              <MessageSquare className="w-3 h-3 mr-1" />
              Notes
            </Button>
          </div>

          {/* Message Input */}
          <div className="flex gap-2">
            <Input
              placeholder="Ask AI for help..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="bg-zinc-800 border-zinc-700 text-zinc-300 placeholder-zinc-500 text-xs"
            />
            <Button
              onClick={sendMessage}
              size="icon"
              className="bg-purple-600 hover:bg-purple-700 text-white h-8 w-8"
              title="Send message"
            >
              <Send className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
