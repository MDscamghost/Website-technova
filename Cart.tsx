import { motion } from 'framer-motion';
import { ShoppingBag, Trash2 } from 'lucide-react';
import type { CartItem, ViewState } from '@shared/schema';

interface CartProps {
  cart: CartItem[];
  removeFromCart: (id: string) => void;
  setView: (view: ViewState) => void;
}

export default function Cart({ cart, removeFromCart, setView }: CartProps) {
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-4 py-32"
    >
      <h2 
        className="text-3xl md:text-4xl font-display font-bold mb-12 flex items-center gap-4"
        data-testid="text-cart-title"
      >
        <ShoppingBag className="text-neon-purple" />
        Your Cart
      </h2>
      
      {cart.length === 0 ? (
        <div 
          className="text-center py-20 bg-white/5 rounded-3xl border border-white/10"
          data-testid="empty-cart-message"
        >
          <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground text-xl mb-6">Your quantum cart is empty.</p>
          <button 
            onClick={() => setView('shop')} 
            className="bg-neon-blue text-black px-6 py-2 rounded-full font-bold hover:bg-neon-blue/80 transition-colors"
            data-testid="button-start-shopping"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {cart.map(item => (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="glass-panel p-4 md:p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              data-testid={`cart-item-${item.id}`}
            >
              <div className="flex items-center gap-4 flex-1">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover"
                  data-testid={`img-cart-item-${item.id}`}
                />
                <div className="flex-1 min-w-0">
                  <h3 
                    className="font-bold text-base md:text-lg truncate"
                    data-testid={`text-cart-item-name-${item.id}`}
                  >
                    {item.name}
                  </h3>
                  <p 
                    className="text-muted-foreground text-sm"
                    data-testid={`text-cart-item-price-${item.id}`}
                  >
                    ${item.price} x {item.quantity}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                <p 
                  className="font-bold text-lg md:text-xl text-neon-blue"
                  data-testid={`text-cart-item-total-${item.id}`}
                >
                  ${item.price * item.quantity}
                </p>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 hover:bg-red-500/20 hover:text-red-500 rounded-full transition-colors"
                  data-testid={`button-remove-cart-item-${item.id}`}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </motion.div>
          ))}
          
          <div className="mt-12 p-6 md:p-8 glass-panel rounded-3xl border-t border-white/20">
            <div className="flex justify-between items-center mb-8">
              <span className="text-xl md:text-2xl text-muted-foreground">Total</span>
              <span 
                className="text-3xl md:text-4xl font-bold text-white"
                data-testid="text-cart-total"
              >
                ${cartTotal}
              </span>
            </div>
            <button 
              className="w-full bg-gradient-to-r from-neon-blue to-neon-purple py-4 rounded-xl font-bold text-lg text-white hover:shadow-lg hover:shadow-neon-purple/50 transition-all"
              data-testid="button-checkout"
            >
              Initiate Checkout
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
