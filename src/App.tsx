/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StyleForm } from './components/StyleForm';
import { RecommendationDisplay } from './components/RecommendationDisplay';
import { TrendBanner } from './components/TrendBanner';
import { getFashionRecommendation } from './services/gemini';
import { StylePreference, Recommendation, VisualInput } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Shirt, Info, Instagram, Twitter, Facebook } from 'lucide-react';

export default function App() {
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async (prefs: StylePreference, visual?: VisualInput) => {
    setIsLoading(true);
    setRecommendation(null);
    try {
      const result = await getFashionRecommendation(prefs, visual);
      setRecommendation(result);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Hero />

        {/* Styling Section */}
        <section id="recommend" className="py-24 bg-white/[0.02]">
          <div className="max-w-5xl mx-auto px-6">
            <div className="mb-16 text-center">
              <h2 className="text-4xl md:text-5xl font-serif mb-4">Define Your Aesthetic</h2>
              <p className="text-white/50 max-w-xl mx-auto">
                Tell us about your preferences or upload a photo to get started with your personalized styling session.
              </p>
            </div>

            <div className="glass rounded-[2rem] p-8 md:p-12 shadow-2xl">
              <StyleForm onSubmit={handleGenerate} isLoading={isLoading} />
            </div>
          </div>
        </section>

        {/* Results Section */}
        <div ref={resultsRef}>
          <AnimatePresence>
            {recommendation && (
              <section className="py-24 px-6 max-w-7xl mx-auto">
                <RecommendationDisplay recommendation={recommendation} />
              </section>
            )}
          </AnimatePresence>
        </div>

        {/* Trends Section */}
        <section id="trends">
          <TrendBanner />
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6 border-t border-white/5">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-widest text-white/60">
              <Info className="w-3 h-3" />
              The Technology
            </div>
            <h2 className="text-4xl font-serif">Crafting the Future of Fashion</h2>
            <p className="text-lg text-white/60 leading-relaxed font-light">
              StyleSense leverages the latest advancements in Generative AI to bridge the gap between inspiration and reality. By analyzing your preferences and visual inputs, we provide styling guidance that is both trend-aware and deeply personal.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Shirt className="text-brand-gold w-5 h-5" />
            <span className="text-xl font-serif font-bold tracking-tight">StyleSense</span>
          </div>
          
          <div className="text-white/40 text-sm">
            © 2024 StyleSense AI. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="text-white/40 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="text-white/40 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="text-white/40 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
