import { motion } from 'framer-motion';
import { ShoppingCart, Info } from 'lucide-react';
import type { Product } from '@shared/schema';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group relative glass-panel rounded-3xl overflow-hidden h-[500px] flex flex-col"
      data-testid={`card-product-${product.id}`}
    >
      {/* Image Section */}
      <div className="relative h-3/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90 z-10" />
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          data-testid={`img-product-${product.id}`}
        />
        <div className="absolute top-4 right-4 z-20">
          <span 
            className="bg-black/50 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider"
            data-testid={`badge-category-${product.id}`}
          >
            {product.category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-20 p-6 flex-1 flex flex-col justify-between -mt-12">
        <div>
          <div className="flex justify-between items-start mb-2 gap-2">
            <h3 
              className="text-xl lg:text-2xl font-bold font-display text-white group-hover:text-neon-blue transition-colors"
              data-testid={`text-product-name-${product.id}`}
            >
              {product.name}
            </h3>
            <span 
              className="text-lg lg:text-xl font-light text-neon-blue whitespace-nowrap"
              data-testid={`text-product-price-${product.id}`}
            >
              ${product.price}
            </span>
          </div>
          <p 
            className="text-sm text-muted-foreground line-clamp-2 mb-4"
            data-testid={`text-product-description-${product.id}`}
          >
            {product.description}
          </p>
          
          {/* Specs Pills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {product.specs.slice(0, 2).map((spec, i) => (
              <span 
                key={i} 
                className="text-[10px] px-2 py-1 rounded border border-white/10 bg-white/5 text-gray-300"
                data-testid={`badge-spec-${product.id}-${i}`}
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={() => onAddToCart(product)}
            className="flex-1 bg-white text-black font-bold py-3 rounded-xl hover:bg-neon-blue transition-colors flex items-center justify-center gap-2 group/btn"
            data-testid={`button-add-to-cart-${product.id}`}
          >
            <ShoppingCart size={18} />
            <span className="group-hover/btn:hidden">Add to Cart</span>
            <span className="hidden group-hover/btn:inline">Buy Now</span>
          </button>
          <button 
            className="p-3 rounded-xl border border-white/20 hover:bg-white/10 transition-colors text-white"
            data-testid={`button-info-${product.id}`}
          >
            <Info size={18} />
          </button>
        </div>
      </div>
      
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-neon-blue/30 rounded-3xl transition-colors pointer-events-none" />
    </motion.div>
  );
}
