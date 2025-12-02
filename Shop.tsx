import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import type { Product } from '@shared/schema';

interface ShopProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export default function Shop({ products, onAddToCart }: ShopProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 py-32"
    >
      <h2 
        className="text-4xl md:text-5xl font-display font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500"
        data-testid="text-shop-title"
      >
        The Collection
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {products.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </motion.div>
  );
}
