import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SEARCH_IDEAS = [
  { label: 'Logo Systems', query: 'Best AI logo generators 2025' },
  { label: 'Video Production', query: 'AI video generation tools' },
  { label: 'Logic & Code', query: 'AI for professional software engineering' },
  { label: 'Voice Over', query: 'AI realistic text to speech' }
];

const TRENDING_AI = [
  { id: '1', name: 'ChatGPT', pricing: 'Free', category: 'General', icon: 'C', rating: 4.9, desc: 'Advanced conversational agent for all workflows.' },
  { id: '2', name: 'Claude 3.5', pricing: 'Freemium', category: 'Reasoning', icon: 'C', rating: 4.8, desc: 'Highest intelligence for coding and logic.' },
  { id: '3', name: 'Midjourney', pricing: 'Paid', category: 'Art', icon: 'M', rating: 4.7, desc: 'Professional generative aesthetics.' },
  { id: '4', name: 'Runway Gen-3', pricing: 'Paid', category: 'Video', icon: 'R', rating: 4.6, desc: 'Next-gen motion and video synthesis.' }
];

const Home: React.FC = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/results?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleQuickSearch = (q: string) => {
    navigate(`/results?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center pt-16 pb-40 px-6">
      {/* Dynamic Background */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[5%] left-[10%] w-[800px] h-[800px] bg-[#ff2d55] rounded-full blur-[250px] opacity-[0.03]"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-[#a855f7] rounded-full blur-[250px] opacity-[0.03]"></div>
      </div>

      <div className="max-w-6xl w-full flex flex-col items-center">
        
        {/* Version Badge */}
        <div className="animate-reveal opacity-0 inline-flex items-center px-6 py-2.5 rounded-full border border-[#ff2d55]/20 bg-[#ff2d55]/5 mb-14 backdrop-blur-xl">
          <div className="pulse-dot mr-3"></div>
          <span className="mono-font text-[10px] tracking-[0.6em] font-bold text-[#ff2d55]">
            NEURAL NETWORK // V3.2
          </span>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="animate-reveal delay-1 opacity-0 text-6xl md:text-[110px] font-black tracking-tighter leading-[0.85] text-white">
            Execute Your <span className="neon-pink-text">Vision</span>
          </h1>
          <h1 className="animate-reveal delay-2 opacity-0 text-6xl md:text-[110px] font-black tracking-tighter leading-[0.85] text-white">
            <span className="text-[#a855f7]">W</span>ith AI Intelligence
          </h1>
        </div>

        {/* Hero Subtext */}
        <p className="animate-reveal delay-3 opacity-0 text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-16 text-center">
          Access the professional data layer for <span className="text-[#ff2d55] font-bold">AI discovery</span>. Identify specialized categories and integrate them into your workflow.
        </p>

        {/* Main Search Interface */}
        <div className="animate-reveal delay-4 opacity-0 w-full max-w-4xl mb-12 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#ff2d55] to-[#a855f7] rounded-[36px] blur-2xl opacity-[0.08] group-focus-within:opacity-30 transition-all duration-1000"></div>
          
          <form onSubmit={handleSearch} className="relative flex items-center bg-[#070707] border border-white/5 p-3 rounded-[32px] shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search creative assets..."
              className="w-full bg-transparent text-white px-8 py-7 text-2xl font-light outline-none placeholder:text-gray-800"
            />
            <button 
              type="submit"
              className="bg-[#ff2d55] text-white px-12 py-6 rounded-[24px] font-black uppercase text-[12px] tracking-[0.3em] hover:bg-[#ff4065] hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_40px_rgba(255,45,85,0.25)]"
            >
              Execute
            </button>
          </form>
        </div>

        {/* Quick Suggestion Entry Points */}
        <div className="animate-reveal delay-5 opacity-0 flex flex-wrap justify-center items-center gap-4 mb-32">
          <span className="mono-font text-[10px] uppercase tracking-widest text-gray-700 font-bold mr-2">Query Ideas:</span>
          {SEARCH_IDEAS.map((idea) => (
            <button
              key={idea.label}
              onClick={() => handleQuickSearch(idea.query)}
              className="px-6 py-3 rounded-xl border border-white/5 bg-white/[0.01] text-gray-600 text-[11px] font-bold hover:text-white hover:border-[#ff2d55]/20 hover:bg-[#ff2d55]/5 transition-all duration-300"
            >
              {idea.label}
            </button>
          ))}
        </div>

        {/* Trending Section (Free to Paid) */}
        <div className="animate-reveal delay-5 opacity-0 w-full max-w-6xl flex flex-col items-center border-t border-white/5 pt-32">
          <div className="text-center mb-16">
            <div className="mono-font text-[10px] text-[#ff2d55] uppercase tracking-[0.5em] mb-4 font-black">Market Analysis</div>
            <h2 className="text-4xl font-black text-white tracking-tighter">Top Trending Nodes</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {TRENDING_AI.map((tool) => (
              <div 
                key={tool.id}
                onClick={() => handleQuickSearch(tool.name)}
                className="glass-premium hover-card p-8 rounded-[40px] flex flex-col text-left transition-all duration-500 cursor-pointer group border border-white/5 bg-white/[0.02]"
              >
                <div className="flex justify-between items-start mb-10">
                  <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white font-black text-2xl group-hover:bg-[#ff2d55] transition-all">
                    {tool.icon}
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`mono-font text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border mb-2 ${
                      tool.pricing === 'Free' ? 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5' : 
                      tool.pricing === 'Freemium' ? 'text-orange-400 border-orange-400/20 bg-orange-400/5' : 
                      'text-[#a855f7] border-[#a855f7]/20 bg-[#a855f7]/5'
                    }`}>
                      {tool.pricing}
                    </span>
                    <span className="text-[10px] text-gray-700 font-bold tracking-tighter uppercase">Rating: {tool.rating}</span>
                  </div>
                </div>
                
                <h4 className="text-white text-xl font-black mb-1 tracking-tight group-hover:text-[#ff2d55] transition-colors">
                  {tool.name}
                </h4>
                <div className="mono-font text-[9px] text-gray-500 uppercase tracking-[0.2em] font-bold mb-4">
                  {tool.category}
                </div>
                <p className="text-gray-600 text-xs font-light leading-relaxed">
                  {tool.desc}
                </p>
                
                <div className="mt-8 flex items-center text-[#ff2d55] font-black mono-font text-[9px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0">
                  <span>Analyze Hub</span>
                  <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;