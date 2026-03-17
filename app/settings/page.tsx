import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ProfileForm } from "@/components/profile-form";
import { Card } from "@/components/ui/card";
import { Settings as SettingsIcon } from "lucide-react";

export default async function SettingsPage() {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  return (
    <div className="max-w-2xl mx-auto py-20 px-6">
      <header className="mb-16 text-center lg:text-left">
        <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <SettingsIcon className="h-6 w-6" />
          </div>
          <h1 className="text-4xl font-black tracking-tight first-letter:uppercase">Account settings</h1>
        </div>
        <p className="text-lg text-muted-foreground font-medium opacity-70">
          Manage your profile information and account preferences.
        </p>
      </header>

      <Card className="p-10 rounded-[2.5rem] border-muted/30 bg-background/50 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 h-40 w-40 bg-primary/5 rounded-full -mr-20 -mt-20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-32 w-32 bg-primary/5 rounded-full -ml-16 -mb-16 blur-3xl text-sm" />
        
        <ProfileForm />
      </Card>

      <div className="mt-12 p-8 rounded-[2rem] bg-amber-500/5 border border-amber-500/10 text-amber-500/80">
        <p className="text-sm font-bold flex items-center gap-2 mb-2 uppercase tracking-tight">
          Important note
        </p>
        <p className="text-xs font-medium leading-relaxed">
          Your profile visibility is set to public. Any changes you make here will be visible to everyone who visits your blog posts.
        </p>
      </div>
    </div>
  );
}
