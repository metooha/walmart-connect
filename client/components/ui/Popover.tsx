import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import styles from "./Popover.module.css";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverArrow = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Arrow>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Arrow>
>(({ className, ...props }, ref) => (
  <PopoverPrimitive.Arrow
    ref={ref}
    className={cn(styles.popoverArrow, className)}
    {...props}
  />
));
PopoverArrow.displayName = "PopoverArrow";

export interface PopoverContentProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  /**
   * Alignment of the popover relative to the trigger
   * @default "center"
   */
  align?: "start" | "center" | "end";
  
  /**
   * Distance in pixels from the trigger
   * @default 8
   */
  sideOffset?: number;
  
  /**
   * Whether to show the arrow/nubbin
   * @default false
   */
  showArrow?: boolean;
}

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(({ 
  className, 
  align = "center", 
  sideOffset = 8, 
  showArrow = false,
  children,
  ...props 
}, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(styles.popoverContent, className)}
      {...props}
    >
      {children}
      {showArrow && <PopoverArrow />}
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = "PopoverContent";

export { Popover, PopoverTrigger, PopoverAnchor, PopoverContent, PopoverArrow };
