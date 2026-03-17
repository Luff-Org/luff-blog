"use client";

import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <header className="relative pt-20 pb-16 text-center px-4">
      <div className="z-10 relative flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 px-5 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold tracking-tight border border-primary/20 shadow-sm"
        >
          Welcome to Luff Blog
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] max-w-4xl"
        >
          Insights for the <span className="bg-clip-text text-transparent bg-linear-to-r from-primary via-indigo-600 to-primary bg-size-[200%_auto] animate-gradient">Modern Era</span>.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed font-medium opacity-80"
        >
          Exploring <span className="text-foreground">technology</span>, <span className="text-foreground">design</span>, and the creative processes that shape our world today.
        </motion.p>
      </div>
      
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10 opacity-30 animate-pulse" />
    </header>
  );
}
