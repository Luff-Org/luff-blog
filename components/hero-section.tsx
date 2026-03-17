"use client";

import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <header className="relative pt-20 pb-16 text-center px-4">
      <div className="z-10 relative flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest"
        >
          Welcome to Luff Blog
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight"
        >
          Insights for the <span className="text-primary">Modern Era</span>.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
        >
          Exploring technology, design, and the creative processes that shape our world today. Clear thoughts, deep dives, and fresh perspectives.
        </motion.p>
      </div>
    </header>
  );
}
