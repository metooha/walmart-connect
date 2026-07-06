import React from 'react';
import styles from './Spinner.module.css';

export type SpinnerColor = 'neutral' | 'white';
export type SpinnerSize = 'large' | 'small';

export interface SpinnerProps
  extends Omit<React.ComponentPropsWithoutRef<'span'>, 'className' | 'style'> {
  /**
   * Accessible label for screen readers
   * @default "Loading…"
   */
  a11yLabel?: string;

  /**
   * Color variant of the spinner
   * @default "neutral"
   */
  color?: SpinnerColor;

  /**
   * Size variant of the spinner
   * @default "large"
   */
  size?: SpinnerSize;

  /**
   * Additional props to pass to the SVG element
   */
  spinnerProps?: React.ComponentPropsWithoutRef<'svg'>;

  /**
   * Unsafe prop to override component styles (use sparingly)
   */
  UNSAFE_className?: string;

  /**
   * Unsafe prop to override component styles (use sparingly)
   */
  UNSAFE_style?: React.CSSProperties;
}

/**
 * Spinner component for loading states
 * 
 * Spinners inform users of processes including data retrieval, loading states, and saving.
 * They visually express an undetermined wait time or unquantifiable task.
 * The spinner dismisses when the process is completed.
 * 
 * @example
 * ```tsx
 * <Spinner />
 * <Spinner color="white" size="small" />
 * <Spinner a11yLabel="Saving your changes…" />
 * ```
 */
export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  (
    {
      a11yLabel = 'Loading…',
      color = 'neutral',
      size = 'large',
      spinnerProps,
      UNSAFE_className,
      UNSAFE_style,
      ...props
    },
    ref
  ) => {
    const className = [
      styles.spinner,
      styles[`spinner--color-${color}`],
      styles[`spinner--size-${size}`],
      UNSAFE_className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span
        ref={ref}
        role="status"
        aria-label={a11yLabel}
        className={className}
        style={UNSAFE_style}
        {...props}
      >
        <svg
          className={styles['spinner__svg']}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...spinnerProps}
        >
          {/* Path 1 - Top left diagonal */}
          <path
            className={styles['spinner__path']}
            style={{ '--path-index': 0 } as React.CSSProperties}
            d="M11.7007 14.9457C10.7614 16.5726 11.3177 18.6522 12.9432 19.5907C13.6551 20.0017 21.6322 23.6559 22.5338 23.8413C23.5673 24.0538 24.6049 23.5942 25.1237 22.6955C25.6426 21.7968 25.5219 20.6684 24.8211 19.8797C24.2097 19.1915 17.0566 14.1103 16.3446 13.6992C14.7191 12.7608 12.64 13.3188 11.7007 14.9457Z"
          />
          {/* Path 2 - Bottom left diagonal */}
          <path
            className={styles['spinner__path']}
            style={{ '--path-index': 1 } as React.CSSProperties}
            d="M11.7007 32.6955C12.64 34.3224 14.7191 34.8804 16.3446 33.942C17.0566 33.5309 24.2097 28.4497 24.8211 27.7615C25.5218 26.9728 25.6426 25.8444 25.1237 24.9457C24.6049 24.047 23.5673 23.5874 22.5338 23.7999C21.6322 23.9853 13.6551 27.6395 12.9432 28.0505C11.3177 28.989 10.7614 31.0686 11.7007 32.6955Z"
          />
          {/* Path 3 - Bottom center */}
          <path
            className={styles['spinner__path']}
            style={{ '--path-index': 2 } as React.CSSProperties}
            d="M23.4014 39.4996C25.28 39.4996 26.8028 37.978 26.8028 36.1011C26.8028 35.279 25.9789 26.5436 25.6886 25.67C25.3559 24.6688 24.4391 24 23.4014 24C22.3637 24 21.4468 24.6688 21.1142 25.67C20.8239 26.5436 20 35.279 20 36.1011C20 37.978 21.5229 39.4996 23.4014 39.4996Z"
          />
          {/* Path 4 - Bottom right diagonal */}
          <path
            className={styles['spinner__path']}
            style={{ '--path-index': 3 } as React.CSSProperties}
            d="M35.1237 32.6955C36.063 31.0686 35.5067 28.989 33.8813 28.0505C33.1693 27.6395 25.1923 23.9853 24.2906 23.7999C23.2571 23.5874 22.2196 24.047 21.7007 24.9457C21.1819 25.8444 21.3026 26.9728 22.0034 27.7615C22.6148 28.4497 29.7679 33.5309 30.4798 33.942C32.1053 34.8804 34.1845 34.3224 35.1237 32.6955Z"
          />
          {/* Path 5 - Top right diagonal */}
          <path
            className={styles['spinner__path']}
            style={{ '--path-index': 4 } as React.CSSProperties}
            d="M35.1237 14.9457C34.1844 13.3188 32.1053 12.7608 30.4798 13.6992C29.7679 14.1103 22.6148 19.1915 22.0034 19.8797C21.3026 20.6684 21.1819 21.7968 21.7007 22.6955C22.2196 23.5942 23.2572 24.0538 24.2906 23.8413C25.1923 23.6559 33.1693 20.0017 33.8813 19.5907C35.5067 18.6522 36.063 16.5726 35.1237 14.9457Z"
          />
          {/* Path 6 - Top center */}
          <path
            className={styles['spinner__path']}
            style={{ '--path-index': 5 } as React.CSSProperties}
            d="M23.4014 8C21.5228 8 20 9.52157 20 11.3985C20 12.2206 20.8239 20.956 21.1142 21.8296C21.4469 22.8308 22.3637 23.4996 23.4014 23.4996C24.4391 23.4996 25.356 22.8308 25.6886 21.8296C25.9789 20.956 26.8028 12.2206 26.8028 11.3985C26.8028 9.52157 25.28 8 23.4014 8Z"
          />
        </svg>
      </span>
    );
  }
);

Spinner.displayName = 'Spinner';
