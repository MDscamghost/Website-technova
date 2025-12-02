import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowRight } from 'lucide-react';
import { ViewState } from '../types';

interface HeroProps {
  onShopNow: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShopNow }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950" />
      
      {/* Animated Globs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/30 rounded-full blur-[128px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue/30 rounded-full blur-[128px] animate-pulse-slow delay-1000" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-neon-blue text-sm font-bold tracking-wider mb-6 backdrop-blur-sm">
            WELCOME TO THE FUTURE
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-9xl font-display font-bold mb-8 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 drop-shadow-2xl"
        >
          TECHNOVA
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Experience the next generation of electronics. Powered by AI, designed for humans. 
          Discover technology that thinks as fast as you do.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <button 
            onClick={onShopNow}
            className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden flex items-center gap-2 hover:scale-105 transition-transform duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 group-hover:text-white transition-colors">Explore Products</span>
            <ArrowRight className="relative z-10 group-hover:text-white transition-colors w-5 h-5" />
          </button>
          
          <button className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 transition-colors flex items-center gap-2 backdrop-blur-sm">
            <Zap className="w-5 h-5 text-neon-blue" />
            <span>Watch Keynote</span>
          </button>
        </motion.div>
      </div>

      {/* Floating Elements 3D effect simulation */}
      <motion.div 
        animate={{ y: [-20, 20, -20] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[10%] top-[20%] w-64 h-64 hidden lg:block opacity-40 pointer-events-none"
      >
         <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#00f3ff" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,79.6,-46.3C87.4,-33.5,90.1,-18,88.5,-3.1C86.9,11.8,81,26.1,72.3,38.1C63.6,50.1,52.1,59.8,39.5,66.3C26.9,72.8,13.2,76.1,-0.5,77C-14.2,77.8,-28.7,76.2,-41.5,69.8C-54.3,63.4,-65.4,52.2,-73.6,39.3C-81.8,26.4,-87.1,11.8,-85.9,-2.3C-84.7,-16.4,-77,-31.3,-66.8,-42.8C-56.6,-54.3,-43.9,-62.4,-30.8,-70.2C-17.7,-78,-4.1,-85.5,5.4,-94.8L14.8,-104.1L44.7,-76.4Z" transform="translate(100 100)" />
          </svg>
      </motion.div>
    </div>
  );
};

export default Hero;