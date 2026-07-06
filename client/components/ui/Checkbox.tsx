import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import styles from './Checkbox.module.css';

export interface CheckboxProps {
  /**
   * Controlled checked state. Use `'indeterminate'` for partial selection.
   */
  checked?: boolean | 'indeterminate';

  /**
   * Default checked state for uncontrolled usage.
   */
  defaultChecked?: boolean;

  /**
   * Whether the checkbox is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Callback when checked state changes.
   */
  onCheckedChange?: (checked: boolean | 'indeterminate') => void;

  /**
   * Optional visible label rendered beside the checkbox.
   */
  label?: string;

  /**
   * Accessible label (if no visible label is provided).
   */
  'aria-label'?: string;

  /**
   * HTML id for label association.
   */
  id?: string;

  /**
   * Form field name.
   */
  name?: string;

  /**
   * Form field value.
   * @default 'on'
   */
  value?: string;

  /**
   * Whether the checkbox is required.
   * @default false
   */
  required?: boolean;

  /**
   * Escape hatch for additional CSS classes on the checkbox root.
   */
  UNSAFE_className?: string;

  /**
   * Escape hatch for inline styles on the checkbox root.
   */
  UNSAFE_style?: React.CSSProperties;
}

const CheckIcon = () => (
  <svg
    className={styles.checkIcon}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.5 6L5 8.5L9.5 3.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IndeterminateIcon = () => (
  <svg
    className={styles.indeterminateIcon}
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 5H9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * LD 3.5 Checkbox component.
 *
 * Built on Radix UI Checkbox primitive for accessibility and state management.
 * Uses CSS modules with LD 3.5 semantic input tokens exclusively.
 */
export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(
  (
    {
      checked,
      defaultChecked,
      disabled = false,
      onCheckedChange,
      label,
      'aria-label': ariaLabel,
      id,
      name,
      value,
      required,
      UNSAFE_className,
      UNSAFE_style,
    },
    ref,
  ) => {
    const checkboxClassName = [styles.checkbox, UNSAFE_className]
      .filter(Boolean)
      .join(' ');

    const checkbox = (
      <CheckboxPrimitive.Root
        ref={ref}
        id={id}
        name={name}
        value={value}
        required={required}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
        aria-label={!label ? ariaLabel : undefined}
        className={checkboxClassName}
        style={UNSAFE_style}
      >
        <CheckboxPrimitive.Indicator className={styles.indicator}>
          {checked === 'indeterminate' ? (
            <IndeterminateIcon />
          ) : (
            <CheckIcon />
          )}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );

    if (label) {
      const wrapperClassName = [
        styles.wrapper,
        disabled && styles['wrapper--disabled'],
      ]
        .filter(Boolean)
        .join(' ');

      const labelClassName = [
        styles.label,
        disabled && styles['label--disabled'],
      ]
        .filter(Boolean)
        .join(' ');

      return (
        <label className={wrapperClassName}>
          {checkbox}
          <span className={labelClassName}>{label}</span>
        </label>
      );
    }

    return checkbox;
  },
);

Checkbox.displayName = 'Checkbox';
