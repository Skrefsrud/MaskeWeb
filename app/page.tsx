"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Mail, Rocket, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function LaunchingSoon() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const { error } = await res.json().catch(() => ({ error: "Failed" }));
        throw new Error(error || "Failed");
      }
      setIsSubmitted(true);
      setEmail("");
    } catch (err) {
      // optional: show a toast
      console.error(err);
      alert("Could not add your email. Try again?");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <ThemeToggle />

      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-red-600/5" />
      <div className="absolute top-20 left-20 w-32 h-32 bg-red-500/20 dark:bg-red-400/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-red-600/15 dark:bg-red-500/25 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-red-400/10 dark:bg-red-300/20 rounded-full blur-2xl animate-pulse delay-500" />
      <div className="absolute bottom-1/3 left-1/3 w-36 h-36 bg-red-700/10 dark:bg-red-600/20 rounded-full blur-3xl animate-pulse delay-2000" />

      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8">
        {/* Status badge */}
        <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
          <Sparkles className="w-4 h-4 mr-2" />
          Coming Soon
        </Badge>

        {/* Main heading */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-black text-foreground font-[var(--font-montserrat)] text-balance">
            ThetaMask coming soon
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto text-pretty">
            Reduced stress, improved mood, better sleep in just five minutes
          </p>
        </div>

        {/* Email signup form */}
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    disabled={isLoading || !email}
                    className="px-6 bg-red-600 hover:bg-red-700 text-white"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Mail className="w-4 h-4 mr-2" />
                        Notify Me!
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  We&apos;ll never spam you. Unsubscribe at any time.
                </p>
              </form>
            ) : (
              <div className="text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-red-600 mx-auto" />
                <h3 className="text-lg font-semibold text-foreground">
                  You&apos;re on the list!
                </h3>
                <p className="text-sm text-muted-foreground">
                  Thanks for joining! We&apos;ll send you an email as soon as we
                  launch.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Features preview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mx-auto">
              <Rocket className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="font-semibold text-sm">Fast Effect</h3>
            <p className="text-xs text-muted-foreground">
              Five minutes is enough
            </p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-red-400/10 rounded-lg flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="font-semibold text-sm">Efficient Rest</h3>
            <p className="text-xs text-muted-foreground">
              Maximize your recovery
            </p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-red-600/10 rounded-lg flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6 text-red-700" />
            </div>
            <h3 className="font-semibold text-sm">Scientifically Backed</h3>
            <p className="text-xs text-muted-foreground">
              Research-proven methods
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 ThetaMask. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
