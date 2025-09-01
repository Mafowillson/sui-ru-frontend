import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Brain, X, MessageSquare } from 'lucide-react';
import axiosInstance from '../../axiosInstance';

const ChatbotOverlay = () => {
  const { colors } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hi! I\'m your AI assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await axiosInstance.post('/api/openai/ask/', { question: inputMessage });
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: response.data.answer || 'Sorry, I could not get an answer. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: messages.length + 2,
        type: 'bot',
        content: 'Sorry, there was an error connecting to the AI service.',
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 group"
          style={{ 
            background: colors.gradientPrimary,
            boxShadow: `0 8px 32px ${colors.primary}40`
          }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Animated AI Icon */}
            <div className="relative">
              <Brain 
                className={`w-8 h-8 text-white transition-all duration-300 ${
                  isOpen ? 'rotate-180 scale-0' : 'rotate-0 scale-100'
                }`} 
              />
              <X 
                className={`absolute inset-0 w-8 h-8 text-white transition-all duration-300 ${
                  isOpen ? 'rotate-0 scale-100' : 'rotate-180 scale-0'
                }`} 
              />
            </div>
            
            {/* Pulse Animation */}
            <div 
              className="absolute inset-0 rounded-full animate-ping opacity-20"
              style={{ backgroundColor: colors.primary }}
            />
            
            {/* Notification Dot */}
            {!isOpen && (
              <div 
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full animate-pulse"
                style={{ backgroundColor: colors.success }}
              >
                <div className="w-full h-full rounded-full animate-ping" style={{ backgroundColor: colors.success }} />
              </div>
            )}
          </div>
        </button>
      </div>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 left-4 sm:left-auto z-50 w-auto sm:w-80 h-96 transition-all duration-300 transform">
          <div 
            className="w-full h-full rounded-xl shadow-2xl border backdrop-blur-md overflow-hidden"
            style={{ 
              backgroundColor: colors.bgCard,
              borderColor: colors.border,
              boxShadow: `0 20px 60px ${colors.primary}20`
            }}
          >
            {/* Header */}
            <div 
              className="p-4 border-b"
              style={{ 
                background: colors.gradientPrimary,
                borderColor: colors.border 
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">AI Assistant</h3>
                    <p className="text-xs text-white text-opacity-80">Online</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto h-64 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      message.type === 'user' 
                        ? 'rounded-br-none' 
                        : 'rounded-bl-none'
                    }`}
                    style={{
                      backgroundColor: message.type === 'user' ? colors.primary : colors.bgTertiary,
                      color: message.type === 'user' ? '#ffffff' : colors.text
                    }}
                  >
                    <p>{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div
                    className="max-w-xs px-3 py-2 rounded-lg rounded-bl-none"
                    style={{ backgroundColor: colors.bgTertiary }}
                  >
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t" style={{ borderColor: colors.border }}>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{
                    backgroundColor: colors.bgSecondary,
                    borderColor: colors.border,
                    color: colors.text
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="px-3 py-2 rounded-lg transition-all duration-200 disabled:opacity-50"
                  style={{ 
                    background: colors.gradientPrimary,
                    color: '#ffffff'
                  }}
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


export default ChatbotOverlay;