import { z } from "zod";

// Product types
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  specs: string[];
  image: string;
  category: 'phone' | 'wearable' | 'audio' | 'home';
}

export interface CartItem extends Product {
  quantity: number;
}

// Chat types
export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  image?: string;
  isThinking?: boolean;
}

// View state
export type ViewState = 'home' | 'shop' | 'cart';

// API schemas
export const chatRequestSchema = z.object({
  message: z.string().min(1),
  history: z.array(z.object({
    id: z.string(),
    role: z.enum(['user', 'model']),
    text: z.string(),
    timestamp: z.number(),
    image: z.string().optional(),
    isThinking: z.boolean().optional(),
  })),
  image: z.string().optional(),
  useThinkingMode: z.boolean().default(false),
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;

export interface ChatResponse {
  text: string;
  error?: string;
}

// Products data
export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Xenon Ultra 5G',
    price: 1299,
    description: 'The absolute pinnacle of smartphone engineering. Featuring a holographic display and quantum processor.',
    specs: ['Holographic OLED', 'Quantum Snap 9 Gen 5', '200MP Camera', '1TB Storage'],
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop',
    category: 'phone'
  },
  {
    id: '2',
    name: 'Sonic Flow Pro',
    price: 349,
    description: 'Experience audio like never before with neural-linked noise cancellation.',
    specs: ['Neural ANC', '80h Battery', 'Graphene Drivers', 'Spatial Audio'],
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop',
    category: 'audio'
  },
  {
    id: '3',
    name: 'Visionary Glass',
    price: 2499,
    description: 'Augmented reality glasses that overlay the digital world seamlessly onto the physical.',
    specs: ['MicroLED', 'Eye Tracking', 'Gesture Control', 'All-Day Comfort'],
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&h=600&fit=crop',
    category: 'wearable'
  },
  {
    id: '4',
    name: 'Nebula Watch X',
    price: 499,
    description: 'Your health, your universe. Tracks biometrics with clinical precision.',
    specs: ['Bio-Sensor Array', 'Sapphire Glass', '7-Day Battery', 'LTE'],
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop',
    category: 'wearable'
  },
  {
    id: '5',
    name: 'Core Hub Max',
    price: 299,
    description: 'The central brain of your smart home. Recognizes gestures and voice commands instantly.',
    specs: ['Matter Support', '10" Display', 'Face Match', 'Thread Border Router'],
    image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=800&h=600&fit=crop',
    category: 'home'
  },
  {
    id: '6',
    name: 'Titan Tab S9',
    price: 1199,
    description: 'Power of a workstation, portability of a tablet. For the creators.',
    specs: ['14.6" AMOLED', 'S-Pen Included', '16GB RAM', 'Water Resistant'],
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=600&fit=crop',
    category: 'phone'
  }
];

// Gemini model constants
export const GEMINI_MODEL_STANDARD = 'gemini-2.5-flash';
export const GEMINI_MODEL_THINKING = 'gemini-2.5-pro';
