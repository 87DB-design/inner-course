
import React, { useState } from 'react';
import { InsightResponse, RackSymbol } from '../types';

interface SymbolInsightsProps {
  symbol: RackSymbol;
  insight: InsightResponse | null;
  isLoading: boolean;
}

const SymbolInsights: React.FC<SymbolInsightsProps> = ({ symbol, insight, isLoading }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!insight) return;

    const actionStepsText = insight.actionSteps.map(step => `- ${step}`).join('\n');
    const fullText = `
${insight.title}
--------------------------
Symbol: ${symbol.char} (${symbol.name})
Category: ${symbol.category}

Summary:
${insight.summary}

Tactical Integration:
${actionStepsText}

Philosophical Context:
${insight.philosophicalContext}
    `.trim();

    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const renderSkeleton = () => (
    <div className="flex-1 flex flex-col min-h-0 space-y-8 animate-pulse">
      <div className="space-y-3">
        <div className="h-6 bg-amber-900/20 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-zinc-800/50 rounded w-full"></div>
          <div className="h-4 bg-zinc-800/50 rounded w-5/6"></div>
          <div className="h-4 bg-zinc-800/50 rounded w-4/6"></div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="h-3 bg-zinc-800/30 rounded w-32 mb-2"></div>
        <div className="flex items-center space-x-3">
          <div className="h-2 w-2 bg-amber-900/40 rounded-full"></div>
          <div className="h-4 bg-zinc-800/50 rounded w-full"></div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="h-2 w-2 bg-amber-900/40 rounded-full"></div>
          <div className="h-4 bg-zinc-800/50 rounded w-5/6"></div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="h-2 w-2 bg-amber-900/40 rounded-full"></div>
          <div className="h-4 bg-zinc-800/50 rounded w-4/5"></div>
        </div>
      </div>

      <div className="pt-6 border-t border-zinc-800/50 space-y-2">
        <div className="h-3 bg-zinc-800/30 rounded w-full italic"></div>
        <div className="h-3 bg-zinc-800/30 rounded w-2/3 italic"></div>
      </div>

      <div className="mt-auto h-12 bg-zinc-800/20 border border-zinc-800/30 rounded-lg flex items-center justify-center">
        <div className="h-3 bg-zinc-700/30 rounded w-32"></div>
      </div>
    </div>
  );

  return (
    <div className="bg-zinc-900/50 border border-amber-900/20 rounded-xl p-6 h-full flex flex-col">
      {/* Symbol Identity Header Section */}
      <div className="flex items-start space-x-5 mb-8 border-b border-amber-900/10 pb-6 relative group/header">
        <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center text-5xl font-cinzel bg-amber-900/10 border border-amber-500/40 rounded-xl text-amber-500 shadow-[0_0_20px_rgba(251,191,36,0.1)] group-hover/header:shadow-[0_0_30px_rgba(251,191,36,0.2)] transition-all duration-500">
          {symbol.char}
        </div>
        
        <div className="flex-1 flex flex-col min-w-0 relative group/tooltip">
          <div className="mb-1 flex items-center space-x-2">
            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-[0.2em]">Category:</span>
            <span className="text-[10px] text-zinc-400 uppercase tracking-[0.15em]">{symbol.category}</span>
          </div>
          
          <h3 className="font-cinzel text-2xl text-white mb-2 truncate group-hover/tooltip:text-amber-400 transition-colors duration-300">
            {symbol.name}
          </h3>
          
          <p className="text-sm text-zinc-500 italic line-clamp-2 leading-relaxed cursor-help">
            "{symbol.description}"
          </p>

          {/* Enhanced Tooltip Overlay */}
          <div className="absolute left-0 top-full mt-4 w-80 p-5 bg-zinc-950 border border-amber-500/40 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] opacity-0 scale-95 group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 transition-all duration-300 pointer-events-none z-50 origin-top-left backdrop-blur-sm">
            <div className="text-[10px] text-amber-500 font-bold mb-3 uppercase tracking-[0.3em] border-b border-amber-900/30 pb-2 flex justify-between">
              <span>System Definition</span>
              <span>{symbol.category}</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed italic mb-2">
              {symbol.description}
            </p>
            <div className="h-px w-full bg-gradient-to-r from-amber-900/50 to-transparent my-3" />
            <p className="text-[10px] text-amber-700/80 uppercase tracking-widest">
              Part of the {symbol.category} Tier
            </p>
            {/* Tooltip Arrow */}
            <div className="absolute -top-1.5 left-6 w-3 h-3 bg-zinc-950 border-t border-l border-amber-500/40 rotate-45"></div>
          </div>
        </div>
      </div>

      {isLoading ? (
        renderSkeleton()
      ) : insight ? (
        <div className="flex-1 flex flex-col min-h-0">
          <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar flex-1 mb-4">
            <div className="animate-in fade-in slide-in-from-top-2 duration-500">
              <h4 className="text-amber-500 font-cinzel text-lg mb-2 tracking-wide">{insight.title}</h4>
              <p className="text-zinc-300 leading-relaxed text-sm font-light">{insight.summary}</p>
            </div>

            <div className="animate-in fade-in slide-in-from-top-4 duration-700 delay-100">
              <h5 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4 flex items-center">
                <span className="h-px w-4 bg-amber-900/50 mr-2"></span>
                Tactical Integration
              </h5>
              <ul className="space-y-3">
                {insight.actionSteps.map((step, i) => (
                  <li key={i} className="flex items-start space-x-3 text-sm text-zinc-400 group/item">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-900/60 mt-1.5 group-hover/item:bg-amber-500 transition-colors"></span>
                    <span className="flex-1 group-hover/item:text-zinc-200 transition-colors">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-zinc-800 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-300">
              <p className="text-xs italic text-zinc-500 leading-relaxed font-cinzel tracking-wider">
                {insight.philosophicalContext}
              </p>
            </div>
          </div>

          <button
            onClick={handleCopy}
            className={`
              w-full py-3 rounded-lg flex items-center justify-center space-x-2 
              transition-all duration-300 font-cinzel text-xs tracking-[0.2em] uppercase mt-4
              ${copied 
                ? 'bg-green-900/20 text-green-400 border border-green-500/50' 
                : 'bg-amber-900/10 text-amber-500 border border-amber-900/40 hover:bg-amber-500/10 hover:border-amber-500 shadow-sm hover:shadow-amber-500/5'}
            `}
          >
            {copied ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Insight Archived</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                <span>Copy Insight</span>
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-zinc-600 space-y-4">
          <div className="w-12 h-12 border border-zinc-800 rounded-full flex items-center justify-center text-zinc-800 font-cinzel text-xl italic">
            ?
          </div>
          <p className="text-sm italic text-center max-w-[200px]">
            Select a symbol from the Winner's Rack to unlock deeper mastery insights.
          </p>
        </div>
      )}
    </div>
  );
};

export default SymbolInsights;
