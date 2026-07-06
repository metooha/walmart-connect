import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import styles from "./Toggle.module.css";

export type ToggleSize = "small" | "medium" | "large";
export type ToggleVariant = "default" | "outline";
export type ToggleShape = "square" | "rounded";

/**
 * CVA stub kept for ToggleGroup context compatibility.
 * Actual styling is driven entirely by the CSS module using LD 3.5 tokens.
 */
const toggleVariants = cva("", {
  variants: {
    variant: {
      default: "",
      outline: "",
    },
    size: {
      default: "",
      sm: "",
      lg: "",
      small: "",
      medium: "",
      large: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

/* Maps legacy CVA size keys to CSS module size keys */
function resolveSize(size: string | null | undefined): ToggleSize {
  switch (size) {
    case "sm":
    case "small":
      return "small";
    case "lg":
    case "large":
      return "large";
    default:
      return "medium";
  }
}

export interface ToggleProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>,
    "className" | "style"
  > {
  /** Visual variant. @default "default" */
  variant?: ToggleVariant;
  /** Size of the toggle button. @default "medium" */
  size?: ToggleSize | "default" | "sm" | "lg";
  /** Shape of the toggle button. @default "square" */
  shape?: ToggleShape;
  /** Escape-hatch class name. */
  UNSAFE_className?: string;
  /** Escape-hatch inline style. */
  UNSAFE_style?: React.CSSProperties;
  /** @deprecated Use UNSAFE_className instead. Kept for Shadcn compat. */
  className?: string;
}

/**
 * Toggle component – Living Design 3.5
 *
 * A two-state button that mirrors LD 3.5 Icon Button tokens for background,
 * border, text/icon colour, hover, pressed, focus-outline, and disabled states.
 *
 * @example
 * ```tsx
 * <Toggle pressed={isBold} onPressedChange={setIsBold} aria-label="Bold">
 *   <BoldIcon />
 * </Toggle>
 * ```
 */
const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  ToggleProps
>(
  (
    {
      variant = "default",
      size = "medium",
      shape = "square",
      UNSAFE_className,
      UNSAFE_style,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const resolved = resolveSize(size);

    const cls = [
      styles.toggle,
      styles[`toggle--variant-${variant}`],
      styles[`toggle--size-${resolved}`],
      styles[`toggle--shape-${shape}`],
      UNSAFE_className,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <TogglePrimitive.Root
        ref={ref}
        className={cls}
        style={UNSAFE_style}
        {...props}
      >
        <span className={styles.toggle__content}>{children}</span>
      </TogglePrimitive.Root>
    );
  },
);

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
