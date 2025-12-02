import { useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import Shop from './components/Shop';
import Cart from './components/Cart';
import ChatWidget from './components/ChatWidget';
import { PRODUCTS, type ViewState, type Product, type CartItem } from '@shared/schema';

function TechNovaApp() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-neon-blue selection:text-black">
      {/* Background Grid Animation */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-20" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', 
          backgroundSize: '50px 50px' 
        }}
      />

      {/* Main Content Area */}
      <main className="relative z-10 pb-32">
        {currentView === 'home' && (
          <>
            <Hero onShopNow={() => setCurrentView('shop')} />
            <div className="max-w-7xl mx-auto px-4 py-20">
              <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
                <h2 
                  className="text-3xl md:text-4xl font-display font-bold"
                  data-testid="text-featured-title"
                >
                  Featured Drops
                </h2>
                <button 
                  onClick={() => setCurrentView('shop')} 
                  className="text-neon-blue hover:underline"
                  data-testid="button-view-all"
                >
                  View All
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {PRODUCTS.slice(0, 3).map(product => (
                  <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                ))}
              </div>
            </div>
          </>
        )}

        {currentView === 'shop' && (
          <Shop products={PRODUCTS} onAddToCart={addToCart} />
        )}

        {currentView === 'cart' && (
          <Cart cart={cart} removeFromCart={removeFromCart} setView={setCurrentView} />
        )}
      </main>

      {/* Floating Navigation */}
      <Navigation 
        currentView={currentView} 
        setView={setCurrentView} 
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
        toggleChat={() => setIsChatOpen(!isChatOpen)}
        isChatOpen={isChatOpen}
      />

      {/* Chat Widget */}
      <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <TechNovaApp />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
