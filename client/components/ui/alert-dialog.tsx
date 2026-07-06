import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

import { cn } from "@/lib/utils";
import { Button, type ButtonVariant, type ButtonSize } from "@/components/ui/Button";

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    style={{
      backgroundColor: 'var(--ld-semantic-color-scrim, rgba(0, 0, 0, 0.6))',
    }}
    {...props}
    ref={ref}
  />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        className,
      )}
      style={{
        backgroundColor: 'var(--ld-semantic-color-surface-overlay, #FFFFFF)',
        color: 'var(--ld-semantic-color-text, #2E2F32)',
        boxShadow: 'var(--ld-semantic-elevation-300)',
        padding: 'var(--ld-primitive-scale-space-300, 1.5rem)',
        gap: 'var(--ld-primitive-scale-space-200, 1rem)',
        fontFamily: 'var(--ld-semantic-font-family-sans)',
        borderRadius: 'var(--ld-primitive-scale-borderradius-100, 16px)',
      }}
      {...props}
    />
  </AlertDialogPortal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col", className)}
    style={{ gap: 'var(--ld-primitive-scale-space-100, 0.5rem)' }}
    {...props}
  />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end",
      className,
    )}
    style={{ gap: 'var(--ld-primitive-scale-space-150, 0.75rem)', marginTop: 'var(--ld-primitive-scale-space-100, 0.5rem)' }}
    {...props}
  />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn(className)}
    style={{
      fontFamily: 'var(--ld-semantic-font-heading-medium-family, var(--ld-semantic-font-family-sans))',
      fontSize: 'var(--ld-semantic-font-heading-medium-size, 20px)',
      fontWeight: 'var(--ld-semantic-font-heading-medium-weight-default, 700)' as any,
      lineHeight: 'var(--ld-semantic-font-heading-medium-lineHeight, 28px)',
      color: 'var(--ld-semantic-color-text, #2E2F32)',
      margin: 0,
    }}
    {...props}
  />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn(className)}
    style={{
      fontFamily: 'var(--ld-semantic-font-body-medium-family, var(--ld-semantic-font-family-sans))',
      fontSize: 'var(--ld-semantic-font-body-medium-size, 16px)',
      fontWeight: 'var(--ld-semantic-font-body-medium-weight-default, 400)' as any,
      lineHeight: 'var(--ld-semantic-font-body-medium-lineHeight, 24px)',
      color: 'var(--ld-semantic-color-text-subtle, #515357)',
      margin: 0,
    }}
    {...props}
  />
));
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName;

interface AlertDialogActionProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>,
    'asChild'
  > {
  /** LD Button variant. @default "primary" */
  variant?: ButtonVariant;
  /** LD Button size. @default "small" */
  size?: ButtonSize;
}

const AlertDialogAction = React.forwardRef<
  HTMLButtonElement,
  AlertDialogActionProps
>(({ children, variant = 'primary', size = 'small', className, ...props }, ref) => (
  <AlertDialogPrimitive.Action asChild {...props}>
    <Button ref={ref as React.Ref<HTMLButtonElement>} variant={variant} size={size} UNSAFE_className={className}>
      {children}
    </Button>
  </AlertDialogPrimitive.Action>
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

interface AlertDialogCancelProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>,
    'asChild'
  > {
  /** LD Button variant. @default "secondary" */
  variant?: ButtonVariant;
  /** LD Button size. @default "small" */
  size?: ButtonSize;
}

const AlertDialogCancel = React.forwardRef<
  HTMLButtonElement,
  AlertDialogCancelProps
>(({ children, variant = 'secondary', size = 'small', className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel asChild {...props}>
    <Button ref={ref as React.Ref<HTMLButtonElement>} variant={variant} size={size} UNSAFE_className={className}>
      {children}
    </Button>
  </AlertDialogPrimitive.Cancel>
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
