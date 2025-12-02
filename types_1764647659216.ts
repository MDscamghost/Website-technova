export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  specs: string[];
  image: string;
  category: 'phone' | 'wearable' | 'audio' | 'home';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  image?: string; // Base64 string
  isThinking?: boolean;
}

export type ViewState = 'home' | 'shop' | 'cart';

export interface CartItem extends Product {
  quantity: number;
}
