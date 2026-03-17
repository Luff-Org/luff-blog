"use client";

import { Card } from "@/components/ui/card";
import { FileText, Eye, Clock, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface DashboardStatsProps {
  blogsCount: number;
}

export function DashboardStats({ blogsCount }: DashboardStatsProps) {
  // Mocking some premium-looking stats
  const stats = [
    {
      label: "Total posts",
      value: blogsCount,
      icon: FileText,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Total views",
      value: (blogsCount * 142).toLocaleString(),
      icon: Eye,
      color: "text-primary",
      bgColor: "bg-primary/10",
      trend: "+12.5%",
    },
    {
      label: "Avg. reading time",
      value: "4.2 min",
      icon: Clock,
      color: "text-violet-500",
      bgColor: "bg-violet-500/10",
    },
    {
       label: "Engagement rate",
       value: "18.4%",
       icon: TrendingUp,
       color: "text-emerald-500",
       bgColor: "bg-emerald-500/10",
       trend: "+2.1%",
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="p-6 rounded-[2rem] border-muted/30 bg-background/50 backdrop-blur-2xl hover:border-primary/30 transition-all duration-300 shadow-sm">
            <div className="flex items-start justify-between">
              <div className={stat.bgColor + " p-3 rounded-2xl"}>
                <stat.icon className={stat.color + " h-6 w-6"} />
              </div>
              {stat.trend && (
                <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full uppercase tracking-wider">
                  {stat.trend}
                </span>
              )}
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <h3 className="text-3xl font-black tracking-tight mt-1">{stat.value}</h3>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
