"use client";

import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <header className="relative pt-20 pb-16 text-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="max-w-5xl mx-auto text-center relative z-10"
      >
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 px-6 py-2 rounded-full bg-primary/10 text-primary text-[11px] font-bold tracking-tight border border-primary/20 shadow-sm inline-block"
        >
          Welcome to Luff Blog
        </motion.div>
        
        <h1 className="text-6xl md:text-7xl lg:text-9xl font-black leading-[1.05] tracking-tight mb-12 text-foreground">
          Insights for the <br />
          <span className="bg-linear-to-r from-primary via-violet-600 to-indigo-600 bg-size-[200%_auto] bg-clip-text text-transparent animate-gradient-slow drop-shadow-sm px-4">
            Modern era
          </span>
        </h1>

        <p className="max-w-3xl mx-auto text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium mb-12">
          Exploring <span className="text-foreground font-bold underline decoration-primary/30 decoration-4 underline-offset-4">technology</span>, <span className="text-foreground font-bold underline decoration-indigo-500/30 decoration-4 underline-offset-4">design</span>, and the creative processes that shape our world today.
        </p>

        {/* Dynamic Background Glow - Softened for light mode */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/8 dark:bg-primary/20 rounded-full blur-[140px] -z-10 animate-pulse" />
      </motion.div>
    </header>
  );
}
