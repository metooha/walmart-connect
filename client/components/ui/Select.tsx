'use client';

import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { cn } from '@/lib/utils';
import styles from './Select.module.css';

/**
 * Living Design 3.5 Select Component
 * 
 * A dropdown select component with support for:
 * - Two sizes (small, large)
 * - Error states with error messages
 * - Magic (AI) variant with gradient styling
 * - Helper text
 * - Leading icons
 * - Full keyboard accessibility via Radix UI
 * 
 * @example
 * ```tsx
 * <Select label="Choose option" value={value} onValueChange={setValue}>
 *   <SelectItem value="1">Option 1</SelectItem>
 *   <SelectItem value="2">Option 2</SelectItem>
 * </Select>
 * ```
 */

// Re-export Radix primitives for advanced usage
export const SelectRoot = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;

export interface SelectProps {
  /** Label text displayed above the select */
  label: string;
  
  /** Currently selected value */
  value?: string;
  
  /** Callback when value changes */
  onValueChange?: (value: string) => void;
  
  /** Placeholder text when no value selected */
  placeholder?: string;
  
  /** Whether the select is disabled */
  disabled?: boolean;
  
  /** Size variant - large is default */
  size?: 'small' | 'large';
  
  /** Whether the select has an error */
  error?: boolean;
  
  /** Error message to display */
  errorMessage?: string;
  
  /** Whether to show magic (AI) variant styling */
  isMagic?: boolean;
  
  /** Helper text displayed below the select */
  helperText?: string;
  
  /** Leading icon element */
  leadingIcon?: React.ReactNode;
  
  /** SelectItem children */
  children: React.ReactNode;
  
  /** Additional className for the container */
  className?: string;
  
  /** HTML id attribute */
  id?: string;
  
  /** HTML name attribute */
  name?: string;
  
  /** Whether the field is required */
  required?: boolean;
  
  /** Default value when uncontrolled */
  defaultValue?: string;
}

/**
 * Main Select component following LD 3.5 design specifications
 */
export function Select({
  label,
  value,
  onValueChange,
  placeholder = 'Select option...',
  disabled = false,
  size = 'large',
  error = false,
  errorMessage,
  isMagic = false,
  helperText,
  leadingIcon,
  children,
  className,
  id,
  name,
  required = false,
  defaultValue,
}: SelectProps) {
  const labelId = id ? `${id}-label` : undefined;
  const errorId = error && errorMessage ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;

  return (
    <div className={cn(styles.select, className)}>
      {/* Label with optional magic icon */}
      <div className={styles.labelContainer}>
        {isMagic && (
          <MagicIcon
            size={size}
            disabled={disabled}
            className={cn(styles.magicIcon, styles[`magicIcon--${size}`])}
          />
        )}
        <label
          id={labelId}
          className={cn(
            styles.label,
            styles[`label--size-${size}`],
            disabled && styles['label--disabled']
          )}
        >
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      </div>

      {/* Select trigger */}
      <SelectPrimitive.Root
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        name={name}
        defaultValue={defaultValue}
      >
        <SelectPrimitive.Trigger
          id={id}
          className={cn(
            styles.trigger,
            styles[`trigger--size-${size}`],
            error && styles['trigger--error'],
            isMagic && !error && styles['trigger--magic'],
            disabled && styles['trigger--disabled']
          )}
          aria-labelledby={labelId}
          aria-describedby={cn(errorId, helperId)}
          aria-invalid={error}
          aria-required={required}
        >
          <div className={styles.valueContainer}>
            {leadingIcon && (
              <span className={styles.leadingIcon}>{leadingIcon}</span>
            )}
            <SelectPrimitive.Value placeholder={placeholder} />
          </div>
          <SelectPrimitive.Icon asChild>
            <ChevronDownIcon className={styles.chevron} />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className={styles.content}
            position="popper"
            sideOffset={4}
          >
            <SelectPrimitive.Viewport className={styles.viewport}>
              {children}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>

      {/* Error message */}
      {error && errorMessage && (
        <div id={errorId} className={styles.errorContainer}>
          <ErrorIcon className={styles.errorIcon} />
          <span className={styles.errorText}>{errorMessage}</span>
        </div>
      )}

      {/* Helper text */}
      {helperText && !error && (
        <div id={helperId} className={styles.helperText}>
          {helperText}
        </div>
      )}
    </div>
  );
}

/**
 * SelectItem component for individual options
 */
export interface SelectItemProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {
  children: React.ReactNode;
  value: string;
}

export const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  SelectItemProps
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(styles.item, className)}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <SelectPrimitive.ItemIndicator className={styles.itemIndicator}>
      <CheckIcon />
    </SelectPrimitive.ItemIndicator>
  </SelectPrimitive.Item>
));
SelectItem.displayName = 'SelectItem';

/**
 * SelectSeparator for grouping options
 */
export const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn(styles.separator, className)}
    {...props}
  />
));
SelectSeparator.displayName = 'SelectSeparator';

/**
 * SelectLabel for option groups
 */
export const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(styles.groupLabel, className)}
    {...props}
  />
));
SelectLabel.displayName = 'SelectLabel';

// Icon components
function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M11.4356 15.4934C11.578 15.6562 11.7837 15.7495 12 15.7495C12.2163 15.7495 12.422 15.6562 12.5644 15.4934L17.8144 9.49339C18.0082 9.27192 18.0546 8.95758 17.933 8.6896C17.8114 8.42162 17.5443 8.24951 17.25 8.24951H6.75001C6.45573 8.24951 6.18864 8.42162 6.06704 8.6896C5.94544 8.95758 5.99179 9.27192 6.18558 9.49339L11.4356 15.4934Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M13.5 4.5L6 12L2.5 8.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ErrorIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM7.36905 9.19612L7.08333 4.12012H8.91667L8.64286 9.19612H7.36905ZM8 11.8721C7.71429 11.8721 7.47619 11.7921 7.28571 11.6321C7.09524 11.4641 7 11.2321 7 10.9361C7 10.6561 7.09524 10.4281 7.28571 10.2521C7.47619 10.0761 7.71429 9.98812 8 9.98812C8.27778 9.98812 8.5119 10.0761 8.70238 10.2521C8.90079 10.4281 9 10.6561 9 10.9361C9 11.2321 8.90079 11.4641 8.70238 11.6321C8.5119 11.7921 8.27778 11.8721 8 11.8721Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MagicIcon({ 
  size, 
  disabled,
  className 
}: { 
  size: 'small' | 'large'; 
  disabled?: boolean;
  className?: string;
}) {
  const iconSize = size === 'small' ? 16 : 24;

  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        styles.magicIconSvg,
        disabled && styles['magicIconSvg--disabled'],
        className
      )}
      aria-label="AI-assisted"
    >
      <defs>
        <linearGradient id="magic-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--ld-semantic-color-border-magic-start, #0053E2)" />
          <stop offset="50%" stopColor="var(--ld-semantic-color-border-magic-middle, #3D90EC)" />
          <stop offset="100%" stopColor="var(--ld-semantic-color-border-magic-stop, #79CDF6)" />
        </linearGradient>
      </defs>
      <path
        d="M11.1458 2.79167L12.3333 2.33333L12.7708 1.16667C12.7917 1.0625 12.8958 1 13 1C13.0833 1 13.1875 1.0625 13.2083 1.16667L13.6667 2.33333L14.8333 2.79167C14.9375 2.8125 15 2.91667 15 3C15 3.10417 14.9375 3.20833 14.8333 3.22917L13.6667 3.66667L13.2083 4.85417C13.1875 4.9375 13.0833 5 13 5C12.8958 5 12.7917 4.9375 12.7708 4.85417L12.3333 3.66667L11.1458 3.22917C11.0625 3.20833 11 3.10417 11 3C11 2.91667 11.0625 2.8125 11.1458 2.79167Z"
        fill={disabled ? 'currentColor' : 'url(#magic-gradient)'}
      />
      <path
        d="M1.28346 8.5288L1.8189 8.3089L2.07087 8.18325H2.10236L4.87402 6.89529L6.16535 4.09948L6.29134 3.84817L6.54331 3.31414C6.6063 3.12565 6.79528 3 6.98425 3C7.17323 3 7.3622 3.12565 7.45669 3.31414L7.70866 3.84817L7.80315 4.09948L7.83465 4.13089L9.09449 6.89529L11.8976 8.18325L12.1496 8.3089L12.685 8.56021C12.874 8.62304 13 8.81152 13 9C13 9.18848 12.874 9.37696 12.685 9.4712L12.1496 9.6911L11.8976 9.81675L9.09449 11.1047L7.80315 13.8691V13.9005L7.67717 14.1518L7.45669 14.6859C7.3622 14.8743 7.17323 15 6.98425 15C6.79528 15 6.6063 14.8743 6.54331 14.6859L6.29134 14.1518L6.16535 13.9005V13.8691L4.87402 11.1047L2.10236 9.81675H2.07087L1.8189 9.6911L1.28346 9.4712C1.09449 9.37696 1 9.18848 1 9C1 8.81152 1.09449 8.62304 1.28346 8.5288ZM3.89764 9L5.50394 9.75393C5.8189 9.87958 6.10236 10.1623 6.25984 10.4764L6.98425 12.0785L7.74016 10.4764C7.89764 10.1623 8.14961 9.87958 8.46457 9.75393L10.0709 9L8.46457 8.24607C8.14961 8.12042 7.89764 7.8377 7.74016 7.52356L6.98425 5.92147L6.25984 7.52356C6.10236 7.8377 5.8189 8.12042 5.50394 8.24607L3.89764 9Z"
        fill={disabled ? 'currentColor' : 'url(#magic-gradient)'}
      />
    </svg>
  );
}
