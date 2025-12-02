import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ChatWidget from './components/ChatWidget';
import { ViewState, Product, CartItem } from './types';
import { PRODUCTS } from './constants';
import { ShoppingBag, Trash2 } from 'lucide-react';

const App: React.FC = () => {
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

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-neon-blue selection:text-black">
      {/* Background Grid Animation */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20" 
           style={{ 
             backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', 
             backgroundSize: '50px 50px' 
           }}>
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 pb-32">
        {currentView === 'home' && (
          <>
            <Hero onShopNow={() => setCurrentView('shop')} />
            <div className="max-w-7xl mx-auto px-4 py-20">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-4xl font-display font-bold">Featured Drops</h2>
                <button onClick={() => setCurrentView('shop')} className="text-neon-blue hover:underline">View All</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {PRODUCTS.slice(0, 3).map(product => (
                  <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                ))}
              </div>
            </div>
          </>
        )}

        {currentView === 'shop' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-7xl mx-auto px-4 py-32"
          >
            <h2 className="text-5xl font-display font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
              The Collection
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PRODUCTS.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
              ))}
            </div>
          </motion.div>
        )}

        {currentView === 'cart' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto px-4 py-32"
          >
            <h2 className="text-4xl font-display font-bold mb-12 flex items-center gap-4">
              <ShoppingBag className="text-neon-purple" />
              Your Cart
            </h2>
            
            {cart.length === 0 ? (
              <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                <p className="text-gray-400 text-xl mb-6">Your quantum cart is empty.</p>
                <button onClick={() => setCurrentView('shop')} className="bg-neon-blue text-black px-6 py-2 rounded-full font-bold">
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {cart.map(item => (
                  <div key={item.id} className="glass-panel p-6 rounded-2xl flex items-center justify-between gap-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <p className="text-gray-400">${item.price} x {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-xl text-neon-blue">${item.price * item.quantity}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 hover:bg-red-500/20 hover:text-red-500 rounded-full transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
                
                <div className="mt-12 p-8 glass-panel rounded-3xl border-t border-white/20">
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-2xl text-gray-400">Total</span>
                    <span className="text-4xl font-bold text-white">${cartTotal}</span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-neon-blue to-neon-purple py-4 rounded-xl font-bold text-lg text-white hover:shadow-lg hover:shadow-neon-purple/50 transition-all">
                    Initiate Checkout
                  </button>
                </div>
              </div>
            )}
          </motion.div>
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
};

export default App;