import React from 'react';
import { Sparkles, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

export const Hero = () => {
  return (
    <section className="relative pt-40 pb-20 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-20">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-brand-gold/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1 rounded-full border border-white/10 text-xs uppercase tracking-[0.2em] mb-6 text-white/60">
            Powered by Gemini AI
          </span>
          <h1 className="text-6xl md:text-8xl font-serif mb-8 leading-[1.1]">
            Your Personal <br />
            <span className="italic gold-gradient">AI Stylist</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
            Elevate your wardrobe with intelligent, personalized fashion recommendations tailored to your unique style, occasion, and preferences.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#recommend" className="w-full sm:w-auto px-10 py-4 bg-white text-brand-dark rounded-full font-medium hover:bg-brand-gold transition-colors flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              Get Styled Now
            </a>
            <a href="#trends" className="w-full sm:w-auto px-10 py-4 glass rounded-full font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              <TrendingUp className="w-4 h-4" />
              View Trends
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
