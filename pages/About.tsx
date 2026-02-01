
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_NAME } from '../constants';

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
      <section className="text-center space-y-4 mb-16">
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">{APP_NAME}</h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Providing high-quality intelligence discovery for professionals and creators.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Our Mission</h2>
          <p className="text-slate-400 leading-relaxed font-light">
            With thousands of AI tools launching every month, finding the right one can be overwhelming. {APP_NAME} uses intelligent categorization and smart search to match your specific needs with verified software.
          </p>
          <p className="text-slate-400 leading-relaxed font-light">
            We prioritize quality over quantity, ensuring that every tool listed is active, reliable, and production-ready.
          </p>
        </div>
        <div className="rounded-3xl overflow-hidden border border-slate-800">
          <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800" alt="Tech" className="w-full h-full object-cover" />
        </div>
      </div>

      <section className="glass rounded-3xl p-8 md:p-12 text-center grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-3">
          <div className="text-3xl">✓</div>
          <h4 className="font-bold text-white uppercase text-xs tracking-widest">Verified</h4>
          <p className="text-sm text-slate-400">Every link is manually checked and verified for safety.</p>
        </div>
        <div className="space-y-3">
          <div className="text-3xl">🧠</div>
          <h4 className="font-bold text-white uppercase text-xs tracking-widest">Smart Search</h4>
          <p className="text-sm text-slate-400">Our discovery engine understands intent, not just keywords.</p>
        </div>
        <div className="space-y-3">
          <div className="text-3xl">⚡</div>
          <h4 className="font-bold text-white uppercase text-xs tracking-widest">Real-time</h4>
          <p className="text-sm text-slate-400">Up-to-the-minute data on the latest AI advancements.</p>
        </div>
      </section>
    </div>
  );
};

export default About;
