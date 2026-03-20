import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "destructive" | "success" | "gradient";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors",
        {
          "bg-primary/10 text-primary border border-primary/20": variant === "default",
          "bg-secondary/20 text-secondary-foreground border border-secondary/20": variant === "secondary",
          "bg-gradient-to-r from-primary to-accent text-white shadow-sm": variant === "gradient",
          "border border-border text-foreground": variant === "outline",
          "bg-destructive/10 text-destructive border border-destructive/20": variant === "destructive",
          "bg-emerald-100 text-emerald-800 border border-emerald-200": variant === "success",
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };
