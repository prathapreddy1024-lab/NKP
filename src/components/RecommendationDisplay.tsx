import React from 'react';
import { Recommendation } from '../types';
import { motion } from 'motion/react';
import { CheckCircle2, Lightbulb, ShoppingBag, Zap } from 'lucide-react';

interface RecommendationDisplayProps {
  recommendation: Recommendation;
}

export const RecommendationDisplay: React.FC<RecommendationDisplayProps> = ({ recommendation }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12"
    >
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-serif italic">Your Curated Look</h2>
        <div className="w-24 h-1 bg-brand-gold mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Description */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <ShoppingBag className="w-32 h-32" />
            </div>
            <h3 className="text-2xl font-serif mb-6 flex items-center gap-3">
              <Zap className="text-brand-gold w-6 h-6" />
              The Stylist's Vision
            </h3>
            <p className="text-xl text-white/80 leading-relaxed font-light italic">
              "{recommendation.outfitDescription}"
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Key Pieces */}
            <div className="glass rounded-3xl p-8">
              <h4 className="text-sm uppercase tracking-widest text-brand-gold mb-6">Essential Pieces</h4>
              <ul className="space-y-4">
                {recommendation.keyPieces.map((piece, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/80">
                    <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                    <span>{piece}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trend Insight */}
            <div className="glass rounded-3xl p-8 bg-brand-gold/5">
              <h4 className="text-sm uppercase tracking-widest text-brand-gold mb-6">Trend Analysis</h4>
              <p className="text-white/70 leading-relaxed">
                {recommendation.trendInsight}
              </p>
            </div>
          </div>
        </div>

        {/* Styling Tips Sidebar */}
        <div className="space-y-8">
          <div className="glass rounded-3xl p-8 border-brand-gold/20">
            <h4 className="text-sm uppercase tracking-widest text-brand-gold mb-8 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Styling Guidance
            </h4>
            <div className="space-y-8">
              {recommendation.stylingTips.map((tip, i) => (
                <div key={i} className="relative pl-8">
                  <span className="absolute left-0 top-0 text-4xl font-serif text-brand-gold/20 leading-none">
                    0{i + 1}
                  </span>
                  <p className="text-white/80 text-sm leading-relaxed relative z-10">
                    {tip}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-full py-4 glass rounded-full text-sm uppercase tracking-widest hover:bg-white/10 transition-all"
          >
            Refine Preferences
          </button>
        </div>
      </div>
    </motion.div>
  );
};
