import React, { useState } from 'react';
import Header from './components/Header';
import DomainInput from './components/DomainInput';
import ValuationReport from './components/ValuationReport';
import { analyzeDomain } from './services/geminiService';
import { DomainValuation } from './types';
import { AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [valuationData, setValuationData] = useState<DomainValuation | null>(null);

  const handleAnalyze = async (domain: string) => {
    setLoading(true);
    setError(null);
    setValuationData(null);

    try {
      const data = await analyzeDomain(domain);
      setValuationData(data);
    } catch (err: any) {
      console.error(err);
      setError("We couldn't analyze this domain. It might be invalid or the service is temporarily unavailable. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Header />
      
      <main>
        <DomainInput onAnalyze={handleAnalyze} isLoading={loading} />

        {error && (
          <div className="max-w-2xl mx-auto mt-8 px-4">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-red-800">Analysis Failed</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {valuationData && (
          <ValuationReport data={valuationData} />
        )}
        
        {!valuationData && !loading && !error && (
          <div className="max-w-7xl mx-auto px-6 py-16 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: "Smart Valuation",
                  desc: "Our AI analyzes keyword popularity, length, and extension value."
                },
                {
                  title: "Market Comparison",
                  desc: "We compare against thousands of historical domain sales patterns."
                },
                {
                  title: "Brandability Score",
                  desc: "Get a detailed breakdown of memorability and pronounceability."
                }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
                  <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mx-auto mb-4 text-brand-600 font-bold text-xl">
                    {i + 1}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
