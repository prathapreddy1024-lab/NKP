import React, { useState } from 'react';
import { StylePreference } from '../types';
import { ImageUploader } from './ImageUploader';
import { motion } from 'motion/react';
import { ChevronRight, Loader2 } from 'lucide-react';

interface StyleFormProps {
  onSubmit: (prefs: StylePreference, visual?: any) => void;
  isLoading: boolean;
}

const GENDERS = ["Men", "Women", "Unisex"];
const OCCASIONS = ["Casual", "Formal", "Business", "Date Night", "Wedding", "Streetwear", "Gym"];
const STYLES = ["Minimalist", "Bohemian", "Classic", "Edgy", "Preppy", "Vintage", "Avant-Garde"];
const BUDGETS = ["Budget-Friendly", "Mid-Range", "Luxury", "Investment Pieces"];

export const StyleForm: React.FC<StyleFormProps> = ({ onSubmit, isLoading }) => {
  const [prefs, setPrefs] = useState<StylePreference>({
    gender: "Women",
    occasion: "Casual",
    budget: "Mid-Range",
    preferredColors: ["Neutral"],
    styleType: "Minimalist"
  });
  const [visualInput, setVisualInput] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(prefs, visualInput);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          {/* Gender Selection */}
          <div>
            <label className="block text-sm font-medium text-white/60 uppercase tracking-widest mb-4">I am shopping for</label>
            <div className="flex flex-wrap gap-3">
              {GENDERS.map(g => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setPrefs({ ...prefs, gender: g })}
                  className={`px-6 py-2 rounded-full text-sm transition-all ${
                    prefs.gender === g ? 'bg-brand-gold text-brand-dark' : 'glass hover:bg-white/10'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Occasion */}
          <div>
            <label className="block text-sm font-medium text-white/60 uppercase tracking-widest mb-4">The Occasion</label>
            <select 
              value={prefs.occasion}
              onChange={(e) => setPrefs({ ...prefs, occasion: e.target.value })}
              className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-gold transition-colors"
            >
              {OCCASIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>

          {/* Style Type */}
          <div>
            <label className="block text-sm font-medium text-white/60 uppercase tracking-widest mb-4">Your Aesthetic</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {STYLES.map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setPrefs({ ...prefs, styleType: s })}
                  className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition-all border ${
                    prefs.styleType === s ? 'border-brand-gold bg-brand-gold/10 text-brand-gold' : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium text-white/60 uppercase tracking-widest mb-4">Budget Preference</label>
            <div className="space-y-2">
              {BUDGETS.map(b => (
                <label key={b} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="budget" 
                    checked={prefs.budget === b}
                    onChange={() => setPrefs({ ...prefs, budget: b })}
                    className="hidden"
                  />
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                    prefs.budget === b ? 'border-brand-gold' : 'border-white/20 group-hover:border-white/40'
                  }`}>
                    {prefs.budget === b && <div className="w-2.5 h-2.5 rounded-full bg-brand-gold" />}
                  </div>
                  <span className={`text-sm ${prefs.budget === b ? 'text-white' : 'text-white/60'}`}>{b}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <ImageUploader onImageSelect={setVisualInput} />
          
          <div className="p-6 rounded-2xl bg-brand-gold/5 border border-brand-gold/10">
            <h4 className="text-brand-gold font-serif text-lg mb-2">Pro Tip</h4>
            <p className="text-sm text-white/60 leading-relaxed">
              Uploading a photo of an item you already own or a look you love helps our AI Stylist understand your unique vibe even better.
            </p>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-white/5">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-5 bg-white text-brand-dark rounded-full font-bold text-lg hover:bg-brand-gold transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              Curating Your Look...
            </>
          ) : (
            <>
              Generate Recommendations
              <ChevronRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};
