import React, { useState } from 'react';
import { Sparkles, Send, X, Loader2, Bot } from 'lucide-react';
import { getAIInsights } from '../services/geminiService';
import { Organisation } from '../types';

interface AssistantProps {
  organizations: Organisation[];
}

const Assistant: React.FC<AssistantProps> = ({ organizations }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([]);

  const handleSend = async () => {
    if (!query.trim() || loading) return;

    const userMsg = query;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setQuery('');
    setLoading(true);

    const result = await getAIInsights(userMsg, organizations);
    
    setMessages(prev => [...prev, { role: 'bot', text: result || "I couldn't generate a response." }]);
    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-[#7970af] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 group"
      >
        <Sparkles className="w-8 h-8 group-hover:animate-pulse" />
      </button>

      {/* Side Panel */}
      <div className={`fixed inset-y-0 right-0 w-full sm:w-[400px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l border-[#e1e9de] ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-[#e1e9de] flex items-center justify-between bg-[#e1e9de]/30">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#7970af] rounded-xl flex items-center justify-center text-white mr-3 shadow-lg shadow-purple-100">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-[#282e3e] uppercase tracking-wider text-sm">Advocacy Assistant</h3>
                <p className="text-[10px] text-[#1db4ab] font-black uppercase tracking-tighter">Directory Intelligence</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-[#282e3e]/30 hover:text-[#282e3e]">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-white">
            {messages.length === 0 && (
              <div className="text-center py-10 px-4">
                <div className="flex justify-center mb-6">
                   <div className="flex space-x-1">
                     <div className="w-2 h-2 rounded-full bg-[#1db4ab]"></div>
                     <div className="w-2 h-2 rounded-full bg-[#7970af]"></div>
                     <div className="w-2 h-2 rounded-full bg-[#b2a942]"></div>
                   </div>
                </div>
                <p className="text-sm text-[#282e3e]/60 font-medium italic">
                  "Hello! I can help you find organizations or answer questions about animal advocacy in Africa."
                </p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user' 
                  ? 'bg-[#1db4ab] text-white rounded-tr-none font-bold' 
                  : 'bg-[#e1e9de]/50 text-[#282e3e] rounded-tl-none font-medium'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#e1e9de]/30 px-4 py-3 rounded-2xl rounded-tl-none flex items-center">
                  <Loader2 className="w-4 h-4 animate-spin text-[#1db4ab] mr-2" />
                  <span className="text-[10px] text-[#282e3e]/40 font-black uppercase tracking-widest">Analyzing Directory...</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-[#e1e9de] bg-[#e1e9de]/10">
            <div className="flex gap-2 relative">
              <input
                type="text"
                placeholder="Ask me anything..."
                className="w-full px-5 py-3 pr-12 rounded-xl border-2 border-[#e1e9de] bg-white focus:outline-none focus:border-[#1db4ab] text-sm font-bold text-[#282e3e] placeholder:text-gray-400"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button
                onClick={handleSend}
                disabled={loading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#1db4ab] disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-[#282e3e]/20 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Assistant;