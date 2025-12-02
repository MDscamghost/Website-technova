import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Paperclip, BrainCircuit, Image as ImageIcon, Loader2, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';
import { generateGeminiResponse } from '../services/geminiService';

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Hello! I am your TechNova AI assistant. Ask me about our products, or upload an image of a gadget to analyze it. Enable "Deep Think" for complex comparisons.',
      timestamp: Date.now()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isThinkingMode, setIsThinkingMode] = useState(false);
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if ((!inputValue.trim() && !attachedImage) || isLoading) return;

    const userText = inputValue;
    const userImage = attachedImage;
    
    // Reset input state
    setInputValue('');
    setAttachedImage(null);

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: userText,
      image: userImage || undefined,
      timestamp: Date.now(),
      isThinking: isThinkingMode
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Call Gemini
    const responseText = await generateGeminiResponse(
      messages, 
      userText, 
      userImage || undefined, 
      isThinkingMode
    );

    const modelMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, modelMessage]);
    setIsLoading(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAttachedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-24 right-4 md:right-8 w-[90vw] md:w-[450px] h-[600px] glass-panel rounded-2xl overflow-hidden flex flex-col shadow-2xl z-40 border border-white/10"
        >
          {/* Header */}
          <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-tr from-neon-blue to-neon-purple rounded-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white">Nova Assistant</h3>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-gray-400">Online • Gemini 3 Pro</span>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X size={20} className="text-gray-400" />
            </button>
          </div>

          {/* Toggle Thinking Mode */}
          <div className="px-4 py-2 bg-black/20 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <BrainCircuit size={14} className={isThinkingMode ? "text-neon-purple" : "text-gray-500"} />
              <span>Deep Thinking Mode</span>
            </div>
            <button 
              onClick={() => setIsThinkingMode(!isThinkingMode)}
              className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${isThinkingMode ? 'bg-neon-purple' : 'bg-gray-700'}`}
            >
              <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-300 ${isThinkingMode ? 'left-6' : 'left-1'}`} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] rounded-2xl p-4 ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-none' 
                      : 'bg-white/10 border border-white/5 text-gray-100 rounded-bl-none'
                  }`}
                >
                  {msg.image && (
                    <img 
                      src={msg.image} 
                      alt="User upload" 
                      className="w-full h-32 object-cover rounded-lg mb-3 border border-white/20"
                    />
                  )}
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  {msg.role === 'user' && msg.isThinking && (
                    <div className="flex items-center gap-1 mt-2 text-[10px] text-white/70 opacity-70">
                      <BrainCircuit size={10} />
                      <span>Thinking Mode Active</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 rounded-2xl p-4 flex items-center gap-3">
                  <Loader2 className="w-4 h-4 animate-spin text-neon-blue" />
                  <span className="text-xs text-gray-400">
                    {isThinkingMode ? "Reasoning deeply..." : "Analyzing..."}
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-black/20 border-t border-white/10 backdrop-blur-xl">
            {attachedImage && (
              <div className="relative inline-block mb-2">
                <img src={attachedImage} alt="Preview" className="h-16 w-16 object-cover rounded-lg border border-neon-blue" />
                <button 
                  onClick={() => setAttachedImage(null)}
                  className="absolute -top-2 -right-2 bg-red-500 rounded-full p-0.5 border border-black"
                >
                  <X size={12} className="text-white" />
                </button>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-gray-400 hover:text-neon-blue hover:bg-white/5 rounded-full transition-colors"
                title="Analyze Image"
              >
                <ImageIcon size={20} />
              </button>
              <input 
                type="file" 
                ref={fileInputRef}
                className="hidden" 
                accept="image/*"
                onChange={handleFileSelect}
              />
              
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={isThinkingMode ? "Ask a complex question..." : "Ask about products..."}
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all"
              />
              
              <button 
                onClick={handleSendMessage}
                disabled={isLoading || (!inputValue && !attachedImage)}
                className="p-2 bg-neon-blue text-black rounded-full hover:bg-neon-blue/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatWidget;