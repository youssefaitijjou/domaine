import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { DomainMetrics } from '../types';

interface MetricsChartProps {
  metrics: DomainMetrics;
}

const MetricsChart: React.FC<MetricsChartProps> = ({ metrics }) => {
  const data = [
    { subject: 'Memorability', A: metrics.memorability, fullMark: 10 },
    { subject: 'SEO / Keywords', A: metrics.keywordValue, fullMark: 10 },
    { subject: 'Brandability', A: metrics.brandability, fullMark: 10 },
    { subject: 'TLD Quality', A: metrics.tldQuality, fullMark: 10 },
    { subject: 'Market Demand', A: metrics.marketDemand, fullMark: 10 },
  ];

  return (
    <div className="w-full h-64 sm:h-80 relative">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
          />
          <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
          <Radar
            name="Score"
            dataKey="A"
            stroke="#0ea5e9"
            strokeWidth={3}
            fill="#0ea5e9"
            fillOpacity={0.2}
          />
          <Tooltip 
            formatter={(value: number) => [`${value}/10`, 'Score']}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MetricsChart;
