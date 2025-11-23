import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

interface DomainInputProps {
  onAnalyze: (domain: string) => void;
  isLoading: boolean;
}

const DomainInput: React.FC<DomainInputProps> = ({ onAnalyze, isLoading }) => {
  const [domain, setDomain] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (domain.trim()) {
      onAnalyze(domain.trim());
    }
  };

  return (
    <div className="bg-white py-12 sm:py-20 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
          What is your domain <span className="text-brand-600">really worth?</span>
        </h1>
        <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
          Instant, AI-powered valuation using real-time market data, keyword analysis, and brandability metrics.
        </p>

        <form onSubmit={handleSubmit} className="relative max-w-xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-32 py-4 bg-white border-2 border-slate-200 rounded-2xl text-lg placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all shadow-sm"
              placeholder="example.com"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              disabled={isLoading}
            />
            <div className="absolute inset-y-2 right-2">
              <button
                type="submit"
                disabled={isLoading || !domain.trim()}
                className="h-full px-6 bg-brand-600 hover:bg-brand-700 disabled:bg-slate-300 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing
                  </>
                ) : (
                  'Valuate'
                )}
              </button>
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-400 uppercase tracking-wider font-medium">
            Supported TLDs: .com, .net, .io, .ai, .co, .org & more
          </p>
        </form>
      </div>
    </div>
  );
};

export default DomainInput;
