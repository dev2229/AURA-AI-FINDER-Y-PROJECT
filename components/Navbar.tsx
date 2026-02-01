import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-8 md:px-12 py-8 flex items-center justify-between pointer-events-none">
      <Link to="/" className="flex items-center space-x-4 group pointer-events-auto">
        <div className="w-11 h-11 bg-white rounded-lg flex items-center justify-center text-black font-black text-2xl shadow-[0_0_30px_rgba(255,255,255,0.4)] group-hover:scale-110 transition-all duration-500">
          A
        </div>
        <span className="text-2xl font-black tracking-tighter text-white uppercase group-hover:text-[#ff2d55] transition-colors">
          AURA AI
        </span>
      </Link>

      <div className="hidden md:flex items-center space-x-12 mono-font text-[11px] tracking-[0.5em] font-bold uppercase pointer-events-auto">
        <Link 
          to="/" 
          className={`transition-all duration-300 hover:tracking-[0.8em] ${location.pathname === '/' ? 'text-[#ff2d55]' : 'text-gray-500 hover:text-white'}`}
        >
          Home
        </Link>
        <Link 
          to="/categories" 
          className={`transition-all duration-300 hover:tracking-[0.8em] ${location.pathname === '/categories' ? 'text-[#ff2d55]' : 'text-gray-500 hover:text-white'}`}
        >
          Categories
        </Link>
        <Link 
          to="/about" 
          className={`transition-all duration-300 hover:tracking-[0.8em] ${location.pathname === '/about' ? 'text-[#ff2d55]' : 'text-gray-500 hover:text-white'}`}
        >
          About
        </Link>
        <Link 
          to="/submit" 
          className="border border-white/10 px-8 py-3 rounded-lg text-white hover:border-[#ff2d55] hover:text-[#ff2d55] transition-all font-black text-[10px] tracking-[0.2em]"
        >
          SUBMIT TOOL
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;