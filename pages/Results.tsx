
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { findToolsForTask } from '../services/geminiService.ts';
import { AITool } from '../types.ts';
import ToolCard from '../components/ToolCard.tsx';

const Results: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [tools, setTools] = useState<AITool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getResults() {
      if (!query) return;
      setLoading(true);
      setError(null);

      try {
        const results = await findToolsForTask(query);
        setTools(results.sort((a, b) => b.rating - a.rating));
      } catch (err) {
        setError('The search engine encountered an error. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    getResults();
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 min-h-screen">
      <div className="mb-12">
        <button 
          onClick={() => navigate('/')}
          className="text-slate-500 hover:text-white flex items-center space-x-2 text-sm font-medium mb-6 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Search</span>
        </button>
        
        <h1 className="text-3xl font-bold text-white">
          Results for <span className="text-indigo-400">"{query}"</span>
        </h1>
        <p className="text-slate-400 mt-2">Showing the top AI matches for your request.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, n) => (
            <div key={n} className="glass p-8 h-64 animate-pulse rounded-3xl">
              <div className="h-10 w-10 bg-slate-800 rounded-xl mb-4"></div>
              <div className="h-6 w-3/4 bg-slate-800 rounded mb-3"></div>
              <div className="h-4 w-full bg-slate-800 rounded"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="glass p-12 text-center rounded-3xl">
          <p className="text-red-400 mb-6">{error}</p>
          <button onClick={() => window.location.reload()} className="btn-primary px-8 py-3 rounded-xl font-bold">Try Again</button>
        </div>
      ) : tools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 glass rounded-3xl">
          <p className="text-slate-400 mb-4">No tools found for this query.</p>
          <button onClick={() => navigate('/')} className="text-indigo-400 font-bold hover:underline">Try a different search</button>
        </div>
      )}
    </div>
  );
};

export default Results;
