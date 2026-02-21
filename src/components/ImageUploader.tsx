import React, { useState, useRef } from 'react';
import { Camera, Upload, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { VisualInput } from '../types';

interface ImageUploaderProps {
  onImageSelect: (input: VisualInput | null) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreview(base64);
        onImageSelect({ base64, mimeType: file.type });
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setPreview(null);
    onImageSelect(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-white/60 uppercase tracking-widest mb-2">
        Visual Inspiration (Optional)
      </label>
      
      <div className="relative group">
        <AnimatePresence mode="wait">
          {preview ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative aspect-square w-full max-w-xs mx-auto rounded-2xl overflow-hidden border border-white/10"
            >
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              <button 
                onClick={clearImage}
                className="absolute top-2 right-2 p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-red-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-xs text-white/80 flex items-center gap-1">
                  <Check className="w-3 h-3 text-green-400" /> Image uploaded
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-2 border-dashed border-white/10 rounded-2xl p-12 text-center hover:border-brand-gold/50 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-gold/10 transition-colors">
                <Camera className="w-8 h-8 text-white/40 group-hover:text-brand-gold transition-colors" />
              </div>
              <p className="text-sm text-white/60 mb-1">Click to upload or drag and drop</p>
              <p className="text-xs text-white/40 uppercase tracking-tighter">PNG, JPG up to 5MB</p>
            </motion.div>
          )}
        </AnimatePresence>
        
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  );
};
