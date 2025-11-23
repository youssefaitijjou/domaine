import React from 'react';
import { Globe, TrendingUp } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-brand-600 p-2 rounded-lg">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">Domain<span className="text-brand-600">Valuator</span> AI</span>
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
          <a href="#" className="hover:text-brand-600 transition-colors">Methodology</a>
          <a href="#" className="hover:text-brand-600 transition-colors">Market Trends</a>
          <a href="#" className="hover:text-brand-600 transition-colors">API</a>
        </nav>
        <div className="flex items-center gap-2 text-brand-700 bg-brand-50 px-3 py-1.5 rounded-full text-xs font-semibold">
          <TrendingUp className="w-3 h-3" />
          <span>Live Market Data</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
