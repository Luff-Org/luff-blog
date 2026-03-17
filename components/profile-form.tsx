"use client";

import { useState, useRef } from "react";
import { updateProfile } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Camera, User, Check } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

export function ProfileForm() {
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(session?.user?.name || "");
  const [image, setImage] = useState(session?.user?.image || "");
  const [preview, setPreview] = useState(session?.user?.image || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size must be less than 2MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreview(base64String);
        setImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    try {
      const result = await updateProfile({ name, image });
      if (result.success) {
        await update({ name, image });
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10"
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative group">
          <Avatar className="h-32 w-32 ring-4 ring-primary/10 group-hover:ring-primary/30 transition-all duration-500 shadow-2xl">
            <AvatarImage src={preview} />
            <AvatarFallback className="text-3xl font-bold bg-primary/5 text-primary">
              {name?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 ring-4 ring-background"
          >
            <Camera className="h-5 w-5" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
        </div>
        <div className="text-center">
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest opacity-60">Profile picture</p>
          <p className="text-xs text-muted-foreground mt-1 font-medium italic">JPG, PNG or WEBPs. Max 2MB.</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="name" className="text-sm font-extrabold uppercase tracking-tight opacity-70 flex items-center gap-2">
            <User className="h-4 w-4" />
            Display Name
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            className="h-14 text-lg rounded-2xl bg-muted/10 border-muted/20 focus:border-primary/30 transition-all shadow-sm font-semibold px-6"
          />
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-extrabold uppercase tracking-tight opacity-70 flex items-center gap-2">
            Email address
          </Label>
          <Input
            value={session?.user?.email || ""}
            disabled
            className="h-14 text-lg rounded-2xl bg-muted/5 border-muted/10 text-muted-foreground cursor-not-allowed font-medium px-6"
          />
          <p className="text-xs text-muted-foreground font-medium opacity-50 italic">Email cannot be changed as it is linked to your Google account.</p>
        </div>
      </div>

      <div className="pt-6 border-t border-muted/10">
        <Button
          type="submit"
          disabled={loading}
          className="w-full h-14 rounded-2xl font-black text-lg group bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          {loading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Check className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
          )}
          {loading ? "Saving changes..." : "Save profile"}
        </Button>
      </div>
    </motion.form>
  );
}
