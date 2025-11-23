import React from 'react';
import { DomainValuation } from '../types';
import MetricsChart from './MetricsChart';
import { CheckCircle2, XCircle, Tag, DollarSign, BarChart3, ArrowRight, Lightbulb, ExternalLink } from 'lucide-react';

interface ValuationReportProps {
  data: DomainValuation;
}

const ValuationReport: React.FC<ValuationReportProps> = ({ data }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Top Summary Card */}
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden mb-8">
        <div className="p-8 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-slate-100 text-slate-600 text-sm font-medium">
              Valuation Report for
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-2 break-all">
              {data.domainName}
            </h2>
            <div className="flex items-center gap-4 mt-6">
              <div className="flex-1">
                <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-1">Estimated Value</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl md:text-5xl font-bold text-brand-600 tracking-tight">
                    {data.estimatedValueRange}
                  </span>
                </div>
              </div>
            </div>
            <p className="mt-6 text-slate-600 leading-relaxed text-lg">
              {data.executiveSummary}
            </p>
          </div>
          
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
             <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-brand-500" />
                  Domain Scorecard
                </h3>
             </div>
             <MetricsChart metrics={data.metrics} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Strengths & Weaknesses */}
        <div className="md:col-span-2 space-y-8">
           <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Analysis Details</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h4 className="flex items-center gap-2 font-semibold text-green-700 mb-4">
                    <CheckCircle2 className="w-5 h-5" /> Strengths
                  </h4>
                  <ul className="space-y-3">
                    {data.strengths.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="flex items-center gap-2 font-semibold text-red-700 mb-4">
                    <XCircle className="w-5 h-5" /> Weaknesses / Risks
                  </h4>
                  <ul className="space-y-3">
                    {data.weaknesses.map((w, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100">
                <h4 className="font-semibold text-slate-900 mb-4">Potential End Users</h4>
                <div className="flex flex-wrap gap-2">
                  {data.potentialUses.map((use, i) => (
                    <span key={i} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium">
                      {use}
                    </span>
                  ))}
                </div>
              </div>
           </div>
        </div>

        {/* Comparable Sales */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 h-full">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Tag className="w-5 h-5 text-brand-500" />
              Comparable Sales
            </h3>
            <div className="space-y-4">
              {data.similarSales.map((sale, i) => (
                <div key={i} className="group p-4 rounded-xl border border-slate-100 hover:border-brand-200 hover:bg-brand-50/50 transition-all">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-slate-900">{sale.domain}</span>
                    <span className="text-brand-600 font-bold bg-white px-2 py-0.5 rounded shadow-sm text-sm">{sale.price}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-500">
                    <span>Sold in {sale.year}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-brand-400" />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-xs text-slate-400 text-center">
              *Comparable sales are estimated based on market patterns and similar keywords.
            </div>
          </div>
        </div>
      </div>

      {/* NEW SECTION: Alternatives */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            Smart Alternatives & Suggestions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.alternatives?.map((alt, i) => (
                <div key={i} className="flex flex-col p-5 rounded-xl bg-slate-50 border border-slate-100 hover:border-brand-300 hover:shadow-md transition-all group">
                    <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-lg text-slate-800">{alt.domain}</span>
                        <span className="text-xs font-semibold bg-white text-brand-600 px-2 py-1 rounded border border-brand-100">
                            {alt.estimatedPrice}
                        </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-4 flex-grow">{alt.reason}</p>
                    <a 
                      href={`https://www.google.com/search?q=buy+${alt.domain}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="mt-auto inline-flex items-center justify-center gap-2 w-full py-2 bg-white border border-slate-200 hover:bg-brand-50 hover:border-brand-200 text-slate-700 hover:text-brand-700 text-sm font-medium rounded-lg transition-colors"
                    >
                        Check Availability <ExternalLink className="w-3 h-3" />
                    </a>
                </div>
            ))}
        </div>
      </div>

    </div>
  );
};

export default ValuationReport;