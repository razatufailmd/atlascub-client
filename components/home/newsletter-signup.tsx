"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsLoading(false);
    setEmail("");
    
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section className="py-20 md:py-28 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <Mail className="mx-auto mb-4 h-12 w-12 opacity-80" />
          <h2 className="heading-lg mb-3">Join the Community</h2>
          <p className="mb-8 text-primary-foreground/80">
            Subscribe to receive updates on new arrivals, special offers, and exclusive content.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading || isSubmitted}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20"
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading || isSubmitted}
              variant="secondary"
              className="gap-2"
            >
              {isLoading ? (
                "Subscribing..."
              ) : isSubmitted ? (
                <>
                  Subscribed!
                  <CheckCircle className="h-4 w-4" />
                </>
              ) : (
                <>
                  Subscribe
                  <Send className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <p className="mt-4 text-xs text-primary-foreground/60">
            No spam, unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}