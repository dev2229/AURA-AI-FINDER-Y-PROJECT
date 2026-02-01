import React from 'react';
import { AITool, PricingModel } from '../types';

interface ToolCardProps {
  tool: AITool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const getPricingStyle = (model: PricingModel) => {
    switch (model) {
      case PricingModel.FREE: return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case PricingModel.FREEMIUM: return 'text-[#ff2d55] bg-[#ff2d55]/10 border-[#ff2d55]/20';
      case PricingModel.PAID: return 'text-[#a855f7] bg-[#a855f7]/10 border-[#a855f7]/20';
      default: return 'text-gray-400 bg-white/5 border-white/10';
    }
  };

  return (
    <div className="glass p-8 rounded-[40px] transition-all duration-500 flex flex-col h-full border border-white/5 group hover:border-[#ff2d55]/30">
      <div className="flex justify-between items-start mb-8">
        <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-2xl font-black text-white group-hover:bg-[#ff2d55]/10 group-hover:text-[#ff2d55] transition-all">
          {tool.name[0]}
        </div>
        <div className="flex items-center space-x-1.5 bg-black/40 px-3 py-1.5 rounded-xl border border-white/5">
          <span className="text-[#ff2d55] text-xs">★</span>
          <span className="text-white text-[11px] font-black mono-font tracking-tighter">{tool.rating.toFixed(1)}</span>
        </div>
      </div>

      <div className="mb-8">
        <div className="mono-font text-[9px] uppercase tracking-[0.4em] text-gray-600 mb-2 font-bold group-hover:text-[#ff2d55] transition-colors">
          {tool.category}
        </div>
        <h3 className="text-2xl font-black text-white mb-3 tracking-tight">{tool.name}</h3>
        <p className="text-gray-500 text-sm font-light leading-relaxed line-clamp-3">
          {tool.description}
        </p>
      </div>

      <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
        <span className={`mono-font text-[9px] uppercase font-black px-4 py-2 rounded-xl border ${getPricingStyle(tool.pricing_model)}`}>
          {tool.pricing_model}
        </span>
        
        <a 
          href={tool.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-[10px] mono-font uppercase tracking-widest text-white hover:text-[#ff2d55] transition-all font-black"
        >
          <span>Open Node</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ToolCard;