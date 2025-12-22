
import React from 'react';
import { WINNERS_RACK_DATA } from '../constants';
import { RackSymbol } from '../types';

interface PyramidProps {
  onSymbolClick: (symbol: RackSymbol) => void;
  selectedSymbol?: RackSymbol;
}

const Pyramid: React.FC<PyramidProps> = ({ onSymbolClick, selectedSymbol }) => {
  return (
    <div className="relative flex flex-col items-center py-12 px-4 select-none">
      <div className="absolute inset-0 pyramid-gradient opacity-30 pointer-events-none" />
      
      <div className="mb-6 text-center">
        <h2 className="font-cinzel text-amber-500 tracking-widest text-xl mb-1">THE WINNER'S RACK</h2>
        <div className="h-px w-32 bg-amber-900 mx-auto" />
      </div>

      <div className="flex flex-col items-center space-y-4">
        {WINNERS_RACK_DATA.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-col items-center group">
            <div className="flex space-x-4 md:space-x-8">
              {row.symbols.map((symbol, symIndex) => (
                <button
                  key={`${rowIndex}-${symIndex}`}
                  onClick={() => onSymbolClick(symbol)}
                  className={`
                    w-12 h-12 md:w-16 md:h-16 flex items-center justify-center 
                    text-2xl md:text-3xl font-cinzel transition-all duration-300
                    border border-amber-900/30 rounded-lg hover:border-amber-500
                    hover:scale-110 hover:bg-amber-500/10
                    ${selectedSymbol?.char === symbol.char ? 'bg-amber-500/20 border-amber-500 glow-gold scale-110' : 'bg-black/40'}
                  `}
                >
                  {symbol.char}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Visual Connections/Enclosure simulation */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[300px] md:w-[500px] h-[400px] border-t-2 border-l-2 border-r-2 border-amber-800/20 rounded-t-[100%] pointer-events-none" />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[200px] h-[50px] border-b-2 border-amber-800/40 rounded-b-[50%] pointer-events-none" />
    </div>
  );
};

export default Pyramid;
