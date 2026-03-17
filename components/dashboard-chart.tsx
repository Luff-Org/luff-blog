"use client";

import { Card } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { motion } from "framer-motion";

const data = [
  { name: "Mon", views: 400 },
  { name: "Tue", views: 300 },
  { name: "Wed", views: 600 },
  { name: "Thu", views: 800 },
  { name: "Fri", views: 500 },
  { name: "Sat", views: 900 },
  { name: "Sun", views: 1100 },
];

export function DashboardChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mb-12"
    >
      <Card className="p-8 rounded-[2.5rem] border-muted/30 bg-background/50 backdrop-blur-3xl shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          <div>
            <h3 className="text-2xl font-black tracking-tight">Post views</h3>
            <p className="text-muted-foreground font-medium">Activity from the last 7 days</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-primary" />
            <span className="text-sm font-bold opacity-70 uppercase tracking-widest">Total views</span>
          </div>
        </div>

        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(var(--border))" opacity={0.5} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'oklch(var(--muted-foreground))', fontSize: 12, fontWeight: 500 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'oklch(var(--muted-foreground))', fontSize: 12, fontWeight: 500 }}
                dx={-10}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'oklch(var(--background))', 
                  borderRadius: '16px', 
                  border: '1px solid oklch(var(--border))',
                  boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' 
                }}
                labelStyle={{ fontWeight: 800, color: 'oklch(var(--foreground))', marginBottom: '4px' }}
                itemStyle={{ fontWeight: 600, color: 'var(--primary)' }}
              />
              <Area
                type="monotone"
                dataKey="views"
                stroke="var(--primary)"
                strokeWidth={4}
                fillOpacity={1}
                fill="url(#colorViews)"
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </motion.div>
  );
}
