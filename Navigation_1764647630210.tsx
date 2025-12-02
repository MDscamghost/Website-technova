import React from 'react';
import { ShoppingBag, Home, MessageSquare, Search, Zap } from 'lucide-react';
import { ViewState } from '../types';
import { motion } from 'framer-motion';

interface NavigationProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  cartCount: number;
  toggleChat: () => void;
  isChatOpen: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView, cartCount, toggleChat, isChatOpen }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home', action: () => setView('home') },
    { id: 'shop', icon: Search, label: 'Shop', action: () => setView('shop') },
    { id: 'chat', icon: MessageSquare, label: 'AI Assistant', action: toggleChat, active: isChatOpen },
    { id: 'cart', icon: ShoppingBag, label: 'Cart', action: () => setView('cart') },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-panel rounded-full px-6 py-3 flex items-center gap-8 shadow-2xl shadow-neon-blue/20 border border-white/10"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === 'chat' ? item.active : currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={item.action}
              className="relative group flex flex-col items-center justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-tr from-neon-blue to-neon-purple text-white shadow-lg shadow-neon-blue/50' 
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon size={24} />
                {item.id === 'cart' && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-black">
                    {cartCount}
                  </span>
                )}
              </motion.div>
              
              {/* Tooltip */}
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap backdrop-blur-sm border border-white/10 pointer-events-none">
                {item.label}
              </span>
              
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-1 w-1 h-1 bg-neon-blue rounded-full shadow-[0_0_10px_#00f3ff]"
                />
              )}
            </button>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Navigation;