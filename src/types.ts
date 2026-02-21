export type StylePreference = {
  gender: string;
  occasion: string;
  budget: string;
  preferredColors: string[];
  styleType: string; // e.g., Minimalist, Streetwear, Formal, Bohemian
};

export type Recommendation = {
  outfitDescription: string;
  stylingTips: string[];
  keyPieces: string[];
  trendInsight: string;
};

export type VisualInput = {
  base64: string;
  mimeType: string;
};
