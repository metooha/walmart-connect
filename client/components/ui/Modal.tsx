import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from '@/components/icons';
import { IconButton } from '@/components/ui/IconButton';
import { cn } from '@/lib/utils';
import styles from './Modal.module.css';

export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  className?: string;
  maxWidth?: string;
}

// Root Modal component
export const Modal = DialogPrimitive.Root;

// Trigger component
export const ModalTrigger = DialogPrimitive.Trigger;

// Portal component
export const ModalPortal = DialogPrimitive.Portal;

// Close component
export const ModalClose = DialogPrimitive.Close;

// Overlay component
export const ModalOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(styles.overlay, className)}
    {...props}
  />
));
ModalOverlay.displayName = 'ModalOverlay';

// Content component
export interface ModalContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  size?: 'small' | 'medium' | 'large';
  maxWidth?: string;
  hideClose?: boolean;
}

export const ModalContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  ModalContentProps
>(({ className, children, size = 'medium', maxWidth, hideClose = false, ...props }, ref) => {
  const sizeClass = size === 'small' ? styles.small : size === 'large' ? styles.large : styles.medium;
  
  return (
    <ModalPortal>
      <ModalOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(styles.content, sizeClass, className)}
        style={maxWidth ? { maxWidth } : undefined}
        {...props}
      >
        {children}
        {!hideClose && (
          <DialogPrimitive.Close asChild>
            <IconButton
              variant="ghost"
              size="medium"
              shape="rounded"
              aria-label="Close"
              UNSAFE_className={styles.closeButton}
            >
              <X style={{ width: 20, height: 20 }} />
            </IconButton>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </ModalPortal>
  );
});
ModalContent.displayName = 'ModalContent';

// Header component
export const ModalHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(styles.header, className)}
    {...props}
  />
));
ModalHeader.displayName = 'ModalHeader';

// Title component
export const ModalTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(styles.title, className)}
    {...props}
  />
));
ModalTitle.displayName = 'ModalTitle';

// Description component
export const ModalDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(styles.description, className)}
    {...props}
  />
));
ModalDescription.displayName = 'ModalDescription';

// Footer component
export const ModalFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(styles.footer, className)}
    {...props}
  />
));
ModalFooter.displayName = 'ModalFooter';
