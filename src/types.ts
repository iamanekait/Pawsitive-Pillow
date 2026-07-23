export interface Product {
  id: string;
  name: string;
  category: 'pillow' | 'mug' | 'apparel' | 'blanket' | 'memorial' | 'accessories' | 'frames';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  hoverImage?: string;
  badge?: string;
  description: string;
  features: string[];
  isMemorial?: boolean;
}

export interface CustomizerState {
  petName: string;
  petType: 'dog' | 'cat' | 'bird' | 'rabbit' | 'other';
  photoUrl: string | null;
  cropScale: number;
  rotation: number;
  backgroundRemoved: boolean;
  selectedFont: string;
  fontColor: string;
  size: '12-inch' | '16-inch' | '20-inch' | '24-inch';
  material: 'ultra-velvet' | 'organic-cotton' | 'faux-suede';
  backingPattern: 'beige-solid' | 'paw-prints' | 'floral' | 'rainbow-bridge';
  isMemorialOrder: boolean;
  memorialMessage?: string;
  includeGiftBox: boolean;
  quantity: number;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  category: string;
  price: number;
  size?: string;
  material?: string;
  petName?: string;
  photoUrl?: string;
  isMemorial?: boolean;
  memorialMessage?: string;
  quantity: number;
  image: string;
}

export interface MemorialStory {
  id: string;
  petName: string;
  petSpecies: string;
  years: string;
  story: string;
  ownerName: string;
  location: string;
  productImage: string;
  dateAdded: string;
}

export interface Review {
  id: string;
  author: string;
  petName: string;
  species: 'dog' | 'cat' | 'bird' | 'rabbit' | 'other';
  rating: number;
  date: string;
  verified: boolean;
  title: string;
  comment: string;
  image?: string;
  isMemorial?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

export type Currency = 'USD' | 'INR' | 'EUR' | 'GBP';

export interface CandleTribute {
  id: string;
  petName: string;
  message: string;
  sender: string;
  litAt: string;
}
