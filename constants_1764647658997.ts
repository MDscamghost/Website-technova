import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Xenon Ultra 5G',
    price: 1299,
    description: 'The absolute pinnacle of smartphone engineering. Featuring a holographic display and quantum processor.',
    specs: ['Holographic OLED', 'Quantum Snap 9 Gen 5', '200MP Camera', '1TB Storage'],
    image: 'https://picsum.photos/800/600?random=1',
    category: 'phone'
  },
  {
    id: '2',
    name: 'Sonic Flow Pro',
    price: 349,
    description: 'Experience audio like never before with neural-linked noise cancellation.',
    specs: ['Neural ANC', '80h Battery', 'Graphene Drivers', 'Spatial Audio'],
    image: 'https://picsum.photos/800/600?random=2',
    category: 'audio'
  },
  {
    id: '3',
    name: 'Visionary Glass',
    price: 2499,
    description: 'Augmented reality glasses that overlay the digital world seamlessly onto the physical.',
    specs: ['MicroLED', 'Eye Tracking', 'Gesture Control', 'All-Day Comfort'],
    image: 'https://picsum.photos/800/600?random=3',
    category: 'wearable'
  },
  {
    id: '4',
    name: 'Nebula Watch X',
    price: 499,
    description: 'Your health, your universe. Tracks biometrics with clinical precision.',
    specs: ['Bio-Sensor Array', 'Sapphire Glass', '7-Day Battery', 'LTE'],
    image: 'https://picsum.photos/800/600?random=4',
    category: 'wearable'
  },
  {
    id: '5',
    name: 'Core Hub Max',
    price: 299,
    description: 'The central brain of your smart home. Recognizes gestures and voice commands instantly.',
    specs: ['Matter Support', '10" Display', 'Face Match', 'Thread Border Router'],
    image: 'https://picsum.photos/800/600?random=5',
    category: 'home'
  },
  {
    id: '6',
    name: 'Titan Tab S9',
    price: 1199,
    description: 'Power of a workstation, portability of a tablet. For the creators.',
    specs: ['14.6" AMOLED', 'S-Pen Included', '16GB RAM', 'Water Resistant'],
    image: 'https://picsum.photos/800/600?random=6',
    category: 'phone'
  }
];

export const GEMINI_MODEL_STANDARD = 'gemini-3-pro-preview';
export const GEMINI_MODEL_THINKING = 'gemini-3-pro-preview';
