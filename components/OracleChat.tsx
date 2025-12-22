
import React, { useState, useRef, useEffect } from 'react';
import { consultOracle } from '../services/geminiService';

const OracleChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'oracle'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await consultOracle(userMsg);
      setMessages(prev => [...prev, { role: 'oracle', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'oracle', content: "Connection severed. Re-establish your intent." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[350px] md:w-[450px] h-[500px] bg-zinc-950 border border-amber-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="p-4 border-b border-amber-900/20 bg-amber-900/10 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <h3 className="font-cinzel text-sm tracking-widest text-amber-500">The Sovereign Oracle</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-black/40">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center px-8 opacity-50">
                <div className="text-4xl mb-4 font-cinzel text-amber-900">Ω</div>
                <p className="text-xs font-cinzel tracking-widest text-zinc-400 uppercase">
                  Consult the depths of the system. Seek mastery over strategy, value, and wealth.
                </p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-xl text-sm leading-relaxed ${
                  m.role === 'user' 
                  ? 'bg-amber-600/10 border border-amber-600/30 text-zinc-200' 
                  : 'bg-zinc-900/50 border border-zinc-800 text-amber-100/90 italic'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-zinc-900/50 border border-zinc-800 p-3 rounded-xl">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-amber-500/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-amber-500/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-amber-500/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="p-4 border-t border-amber-900/20 bg-zinc-950">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask the Oracle..."
                className="w-full bg-black border border-amber-900/40 rounded-full py-2 pl-4 pr-12 text-sm text-zinc-200 focus:outline-none focus:border-amber-500 transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-black disabled:opacity-30 disabled:grayscale transition-all hover:scale-105 active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 group
          ${isOpen ? 'bg-zinc-900 text-amber-500 border border-amber-500/30' : 'bg-amber-600 text-black hover:scale-110 active:scale-95'}
        `}
      >
        <span className="font-cinzel text-xl font-bold group-hover:rotate-12 transition-transform">Ω</span>
      </button>
    </div>
  );
};

export default OracleChat;
