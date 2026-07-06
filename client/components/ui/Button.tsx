import * as React from 'react';
import styles from './Button.module.css';
import { cva, type VariantProps } from 'class-variance-authority';

export type ButtonSize = 'large' | 'medium' | 'small';
export type ButtonType = 'button' | 'reset' | 'submit';
export type ButtonVariant = 'destructive' | 'primary' | 'secondary' | 'tertiary';

interface CommonProps {
  'aria-label'?: string;
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
}

interface ButtonBaseProps extends CommonProps {
  /**
   * The content for the button.
   */
  children: React.ReactNode;
  
  /**
   * If the button is displayed at full width.
   * @default false
   */
  isFullWidth?: boolean;
  
  /**
   * The leading content for the button (typically an icon).
   */
  leading?: React.ReactNode;
  
  /**
   * The size for the button.
   * @default "small"
   */
  size?: ButtonSize;
  
  /**
   * The trailing content for the button (typically an icon).
   */
  trailing?: React.ReactNode;
  
  /**
   * The variant for the button.
   * @default "secondary"
   */
  variant?: ButtonVariant;
}

/**
 * Props for Button when rendered as an anchor element
 */
export type ButtonAnchorProps = ButtonBaseProps &
  Omit<React.ComponentPropsWithoutRef<'a'>, 'className' | 'style'> & {
    /**
     * The href for the button (makes it render as an anchor).
     */
    href: string;
  };

/**
 * Props for Button when rendered as a button element
 */
export type ButtonButtonProps = ButtonBaseProps &
  Omit<React.ComponentPropsWithoutRef<'button'>, 'className' | 'style'> & {
    /**
     * If the button is disabled.
     * @default false
     */
    disabled?: boolean;
    
    /**
     * The type for the button.
     * @default "button"
     */
    type?: ButtonType;
  };

export type ButtonProps = ButtonAnchorProps | ButtonButtonProps;

/**
 * Type guard to check if props include href (anchor behavior)
 */
function isAnchorProps(props: ButtonProps): props is ButtonAnchorProps {
  return 'href' in props;
}

/**
 * Button component for Living Design 3.5
 * 
 * A versatile clickable button component that can render as either an HTML button or anchor element,
 * featuring multiple variants (primary, secondary, tertiary, destructive), sizes, and support for
 * leading/trailing content.
 */
export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>((props, ref) => {
  const {
    children,
    isFullWidth = false,
    leading,
    size = 'small',
    trailing,
    variant = 'secondary',
    'aria-label': ariaLabel,
    UNSAFE_className,
    UNSAFE_style,
    ...restProps
  } = props;

  const className = [
    styles.button,
    styles[`button--variant-${variant}`],
    styles[`button--size-${size}`],
    isFullWidth && styles['button--fullWidth'],
    UNSAFE_className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {leading && <span className={styles.button__leading}>{leading}</span>}
      <span className={styles.button__content}>{children}</span>
      {trailing && <span className={styles.button__trailing}>{trailing}</span>}
    </>
  );

  // Render as anchor if href is provided
  if (isAnchorProps(props)) {
    const { href, ...anchorProps } = restProps as Omit<ButtonAnchorProps, keyof ButtonBaseProps>;
    
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={className}
        style={UNSAFE_style}
        aria-label={ariaLabel}
        {...anchorProps}
      >
        {content}
      </a>
    );
  }

  // Render as button
  const {
    disabled = false,
    type = 'button',
    ...buttonProps
  } = restProps as Omit<ButtonButtonProps, keyof ButtonBaseProps>;

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      className={className}
      style={UNSAFE_style}
      aria-label={ariaLabel}
      {...buttonProps}
    >
      {content}
    </button>
  );
});

Button.displayName = 'Button';

/**
 * buttonVariants - CVA-based button variants for Shadcn component compatibility
 *
 * @deprecated This is provided only for backward compatibility with Shadcn components
 * (alert-dialog, pagination, calendar) that compose button styles using CVA.
 *
 * For new code, always use the Button component directly with LD 3.5 variants.
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-sm",
        primary: "text-white rounded-full text-sm [background:var(--ld-semantic-color-action-fill-primary)] hover:[background:var(--ld-semantic-color-action-fill-primary-hovered)] active:[background:var(--ld-semantic-color-action-fill-primary-pressed)]",
        secondary: "border rounded-full text-sm [border-color:var(--ld-semantic-color-border-strong)] bg-white [color:var(--ld-semantic-color-text-primary)] hover:[background:var(--ld-semantic-color-action-fill-transparent-hovered)] active:[background:var(--ld-semantic-color-action-fill-transparent-pressed)]",
        destructive: "bg-[var(--ld-semantic-color-action-fill-destructive)] text-white hover:bg-[var(--ld-semantic-color-action-fill-destructive-hovered)] rounded-full text-sm",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm",
        ghost: "hover:bg-accent hover:text-accent-foreground rounded-md text-sm",
        link: "text-primary underline-offset-4 hover:underline text-sm",
      },
      size: {
        default: "h-10 px-6",
        sm: "h-9 px-4 text-sm",
        lg: "h-11 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
