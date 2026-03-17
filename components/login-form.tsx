"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { loginWithCredentials, register } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Mail, Lock, User, Github, Chrome } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";

export function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      if (isLogin) {
        const result = await loginWithCredentials(formData);
        if (result?.error) {
          toast.error(result.error);
        }
      } else {
        const result = await register(formData);
        if (result?.error) {
          toast.error(result.error);
        } else {
          toast.success("Account created! You can now login.");
          setIsLogin(true);
        }
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="p-8 rounded-[2.5rem] border-muted/30 bg-background/50 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 h-40 w-40 bg-primary/5 rounded-full -mr-20 -mt-20 blur-3xl text-sm" />
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black tracking-tight mb-2">
            {isLogin ? "Welcome back" : "Create account"}
          </h1>
          <p className="text-muted-foreground font-medium opacity-70">
            {isLogin ? "Login to manage your blog" : "Join the Luff Blog community"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                key="name"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <Label htmlFor="name" className="text-sm font-bold uppercase tracking-tight opacity-70 flex items-center gap-2">
                  <User className="h-4 w-4" /> Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  required={!isLogin}
                  className="h-12 rounded-2xl bg-muted/10 border-muted/20 focus:border-primary/30 font-semibold px-5"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-bold uppercase tracking-tight opacity-70 flex items-center gap-2">
              <Mail className="h-4 w-4" /> Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              required
              className="h-12 rounded-2xl bg-muted/10 border-muted/20 focus:border-primary/30 font-semibold px-5"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-bold uppercase tracking-tight opacity-70 flex items-center gap-2">
              <Lock className="h-4 w-4" /> Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              className="h-12 rounded-2xl bg-muted/10 border-muted/20 focus:border-primary/30 font-semibold px-5"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-2xl font-black text-lg group bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/20 transition-all hover:scale-[1.02]"
          >
            {loading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : isLogin ? "Login" : "Register"}
          </Button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-muted/20"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-4 text-muted-foreground font-bold tracking-widest opacity-50">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="h-12 rounded-2xl font-bold border-muted/20 hover:bg-muted/10 flex items-center gap-3 transition-all"
          >
            <Chrome className="h-5 w-5 fill-current" />
            Google account
          </Button>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors"
          >
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </button>
        </div>
      </Card>
    </div>
  );
}
