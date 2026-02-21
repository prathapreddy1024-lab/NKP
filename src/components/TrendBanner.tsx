import React, { useEffect, useState } from 'react';
import { getTrendInsights } from '../services/gemini';
import { motion } from 'motion/react';
import { TrendingUp } from 'lucide-react';

export const TrendBanner = () => {
  const [trend, setTrend] = useState<string>("");

  useEffect(() => {
    getTrendInsights().then(setTrend);
  }, []);

  return (
    <div className="py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="shrink-0">
            <div className="w-24 h-24 rounded-full border border-brand-gold flex items-center justify-center relative">
              <TrendingUp className="w-10 h-10 text-brand-gold" />
              <div className="absolute inset-0 rounded-full border border-brand-gold animate-ping opacity-20" />
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-sm uppercase tracking-[0.3em] text-white/40 mb-4">Global Trend Report</h3>
            <div className="text-2xl md:text-3xl font-serif italic text-white/90 leading-relaxed">
              {trend || "Analyzing global fashion movements..."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
