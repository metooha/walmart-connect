import * as React from "react";
import { cn } from "@/lib/utils";

export interface OLQTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: string;
  size?: "sm" | "md" | "lg";
}

/**
 * OLQTag - A specialized tag component for displaying OLQ (Offer Listing Quality) percentages
 * Uses LD 3.5 design tokens for color-coded status indication:
 * - Red: < 50% (Poor)
 * - Yellow/Spark: 50-79% (Fair)
 * - Green: >= 80% (Good)
 */
const OLQTag = React.forwardRef<HTMLSpanElement, OLQTagProps>(
  ({ value, size = "md", className, ...props }, ref) => {
    const percentage = parseFloat(value);
    
    // Determine variant based on percentage
    const getVariantClasses = () => {
      if (percentage < 50) {
        // Red - Poor OLQ
        return "bg-[var(--ld-semantic-color-fill-accent-red-subtle)] text-[var(--ld-semantic-color-text-accent-red)]";
      } else if (percentage < 80) {
        // Yellow/Spark - Fair OLQ
        return "bg-[var(--ld-semantic-color-fill-accent-spark-subtle)] text-[var(--ld-semantic-color-text-accent-spark)]";
      } else {
        // Green - Good OLQ
        return "bg-[var(--ld-semantic-color-fill-accent-green-subtle)] text-[var(--ld-semantic-color-text-accent-green)]";
      }
    };

    const sizeClasses = {
      sm: "text-xs px-[6px] py-[1px]",
      md: "text-sm px-[8px] py-[2px]",
      lg: "text-base px-[12px] py-[4px]"
    };

    return (
      <span
        ref={ref}
        className={cn(
          // Base tag styles using LD 3.5 design system
          "inline-flex items-center gap-1 font-[var(--ld-semantic-font-family-mono)] font-bold rounded text-center",
          sizeClasses[size],
          getVariantClasses(),
          className
        )}
        {...props}
      >
        {value}
      </span>
    );
  }
);

OLQTag.displayName = "OLQTag";

export { OLQTag };
