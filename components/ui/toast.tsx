"use client";

import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { useToast } from "@/components/ui/use-toast";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed top-6 left-1/2 z-9999 flex -translate-x-1/2 flex-col gap-3 sm:right-6 sm:left-auto sm:translate-x-0">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="from-primary to-secondary shadow-primary/25 relative w-[90vw] max-w-95 rounded-xl bg-linear-to-r p-0.5 shadow-lg"
          >
            <div className="bg-background/95 border-border rounded-xl border p-4 backdrop-blur-xl">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-foreground font-semibold">{toast.title}</p>
                  {toast.description && (
                    <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                      {toast.description}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => dismiss(toast.id)}
                  className="text-muted-foreground hover:text-primary transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
