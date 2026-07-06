import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-lg animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    style={{
      backgroundColor: 'var(--ld-semantic-color-surface-inverted, #2E2F32)',
      color: 'var(--ld-semantic-color-text-inverted, #FFFFFF)',
      fontFamily: 'var(--ld-semantic-font-family-sans)',
      fontSize: 'var(--ld-semantic-font-body-small-size, 0.875rem)',
      lineHeight: 'var(--ld-semantic-font-body-small-lineheight, 1.25rem)',
      padding: 'var(--ld-primitive-scale-space-50, 0.25rem) var(--ld-primitive-scale-space-100, 0.5rem)',
      boxShadow: 'var(--ld-semantic-elevation-200)',
    }}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
