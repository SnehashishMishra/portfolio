"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div
      className="
        fixed z-[9999] flex flex-col gap-3
        top-6 left-1/2 -translate-x-1/2
        sm:right-6 sm:left-auto sm:translate-x-0
      "
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="relative rounded-xl p-[2px] w-[90vw] max-w-[380px]
                       bg-linear-to-r from-primary to-secondary shadow-lg shadow-primary/25"
          >
            <div className="bg-background/95 backdrop-blur-xl rounded-xl p-4 border border-border">
              <div className="flex justify-between items-start gap-3">
                <div>
                  <p className="font-semibold text-foreground">{toast.title}</p>
                  {toast.description && (
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
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
