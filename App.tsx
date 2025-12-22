
import React, { useState, useEffect, useCallback } from 'react';
import Pyramid from './components/Pyramid';
import SymbolInsights from './components/SymbolInsights';
import OracleChat from './components/OracleChat';
import { FOOTER_STRING, WINNERS_RACK_DATA } from './constants';
import { RackSymbol, InsightResponse } from './types';
import { getInnerCourseInsight } from './services/geminiService';

const App: React.FC = () => {
  const [selectedSymbol, setSelectedSymbol] = useState<RackSymbol | undefined>(WINNERS_RACK_DATA[0].symbols[0]);
  const [insight, setInsight] = useState<InsightResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInsight = useCallback(async (symbol: RackSymbol) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getInnerCourseInsight(symbol.char);
      setInsight(data);
    } catch (err) {
      console.error(err);
      setError("Failed to commune with the Inner Course. Please verify your connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedSymbol) {
      fetchInsight(selectedSymbol);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSymbolClick = (symbol: RackSymbol) => {
    setSelectedSymbol(symbol);
    fetchInsight(symbol);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 flex flex-col font-sans relative">
      {/* Luxury Header */}
      <header className="p-6 border-b border-amber-900/10 flex justify-between items-center bg-black/20 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded bg-amber-600 flex items-center justify-center font-cinzel text-black font-bold">
            W
          </div>
          <h1 className="font-cinzel tracking-[0.2em] text-lg text-amber-500 hidden sm:block">
            THE INNER COURSE
          </h1>
        </div>
        <div className="text-amber-700/60 font-cinzel text-sm tracking-widest uppercase">
          Mastery Dashboard
        </div>
      </header>

      <main className="flex-1 container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-4 lg:p-12 relative">
        {/* Left Side: Pyramid Visualizer */}
        <section className="flex flex-col items-center justify-center space-y-8">
          <div className="text-center max-w-md">
            <h2 className="text-3xl font-cinzel text-white mb-2">The Winner's Rack</h2>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Explore the five levels of systemic mastery. Select a symbol to decode its influence on your trajectory.
            </p>
          </div>
          
          <Pyramid 
            onSymbolClick={handleSymbolClick} 
            selectedSymbol={selectedSymbol}
          />
        </section>

        {/* Right Side: Symbol Analysis */}
        <section className="h-full min-h-[600px] flex flex-col">
          {error ? (
            <div className="bg-red-950/20 border border-red-500/50 p-8 rounded-xl text-center">
              <p className="text-red-400">{error}</p>
              <button 
                onClick={() => selectedSymbol && fetchInsight(selectedSymbol)}
                className="mt-4 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Retry Request
              </button>
            </div>
          ) : (
            selectedSymbol && (
              <SymbolInsights 
                symbol={selectedSymbol} 
                insight={insight} 
                isLoading={loading} 
              />
            )
          )}
        </section>
      </main>

      {/* Oracle Chat Bot Overlay */}
      <OracleChat />

      {/* Global Bottom Bar */}
      <footer className="p-8 border-t border-amber-900/10 bg-black/50 backdrop-blur-sm mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col space-y-1">
            <span className="text-[10px] uppercase tracking-[0.3em] text-amber-700">The Ultimate Signature</span>
            <div className="text-2xl md:text-3xl font-cinzel tracking-widest text-amber-500 hover:text-amber-400 transition-colors cursor-default select-none">
              {FOOTER_STRING}
            </div>
          </div>
          <div className="text-right flex flex-col items-end">
            <p className="text-zinc-600 text-[10px] tracking-widest leading-loose">
              SYSTEMIC MASTERY &bull; PHILOSOPHICAL CAPITAL &bull; GENERATIONAL ANCHORING
            </p>
            <p className="text-amber-900/50 text-[10px] mt-2">
              All symbols protected under § Foundation Clause. EST MCMLXXXIX
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
