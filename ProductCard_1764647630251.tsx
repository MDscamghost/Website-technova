import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Info } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group relative glass-panel rounded-3xl overflow-hidden h-[500px] flex flex-col"
    >
      {/* Image Section */}
      <div className="relative h-3/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/90 z-10" />
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 z-20">
          <span className="bg-black/50 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider">
            {product.category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-20 p-6 flex-1 flex flex-col justify-between -mt-12">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-2xl font-bold font-display text-white group-hover:text-neon-blue transition-colors">
              {product.name}
            </h3>
            <span className="text-xl font-light text-neon-blue">
              ${product.price}
            </span>
          </div>
          <p className="text-sm text-gray-400 line-clamp-2 mb-4">
            {product.description}
          </p>
          
          {/* Specs Pills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {product.specs.slice(0, 2).map((spec, i) => (
              <span key={i} className="text-[10px] px-2 py-1 rounded border border-white/10 bg-white/5 text-gray-300">
                {spec}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={() => onAddToCart(product)}
            className="flex-1 bg-white text-black font-bold py-3 rounded-xl hover:bg-neon-blue transition-colors flex items-center justify-center gap-2 group/btn"
          >
            <ShoppingCart size={18} />
            <span className="group-hover/btn:hidden">Add to Cart</span>
            <span className="hidden group-hover/btn:inline">Buy Now</span>
          </button>
          <button className="p-3 rounded-xl border border-white/20 hover:bg-white/10 transition-colors text-white">
            <Info size={18} />
          </button>
        </div>
      </div>
      
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-neon-blue/30 rounded-3xl transition-colors pointer-events-none" />
    </motion.div>
  );
};

export default ProductCard;