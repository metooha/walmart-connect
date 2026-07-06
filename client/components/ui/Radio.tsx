import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import styles from './Radio.module.css';

export interface RadioProps {
  /**
   * The value for this radio option (required for Radix RadioGroup coordination).
   */
  value: string;

  /**
   * Optional visible label text rendered beside the radio circle.
   */
  label?: React.ReactNode;

  /**
   * Whether to show the label. When false, the label is visually hidden.
   * @default true
   */
  showLabel?: boolean;

  /**
   * Whether the radio button is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * HTML id for label association.
   */
  id?: string;

  /**
   * Accessible label (when no visible label is provided).
   */
  'aria-label'?: string;

  /**
   * Escape hatch for additional CSS classes on the radio root.
   */
  UNSAFE_className?: string;

  /**
   * Escape hatch for inline styles on the radio root.
   */
  UNSAFE_style?: React.CSSProperties;
}

/**
 * LD 3.5 Radio component.
 *
 * Built on Radix UI RadioGroup.Item for accessibility and state management.
 * Uses CSS modules with LD 3.5 semantic input tokens exclusively.
 *
 * Must be used inside a `<RadioGroup>` container.
 */
export const Radio = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioProps
>(
  (
    {
      value,
      label,
      showLabel = true,
      disabled = false,
      id,
      'aria-label': ariaLabel,
      UNSAFE_className,
      UNSAFE_style,
    },
    ref,
  ) => {
    const radioClassName = [styles.radio, UNSAFE_className]
      .filter(Boolean)
      .join(' ');

    const radio = (
      <RadioGroupPrimitive.Item
        ref={ref}
        id={id}
        value={value}
        disabled={disabled}
        aria-label={!label || !showLabel ? ariaLabel : undefined}
        className={radioClassName}
        style={UNSAFE_style}
      >
        <RadioGroupPrimitive.Indicator className={styles.indicator}>
          <span className={styles.dot} />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
    );

    if (label && showLabel) {
      return (
        <RadioLabel disabled={disabled} value={value}>
          {radio}
          <span className={styles.label} data-radio-label="">
            {label}
          </span>
        </RadioLabel>
      );
    }

    return radio;
  },
);

Radio.displayName = 'Radio';

/**
 * Internal wrapper that handles the checked-label-bold logic.
 * Reads the RadioGroup context to know if this value is selected.
 */
function RadioLabel({
  children,
  disabled,
  value,
}: {
  children: React.ReactNode;
  disabled: boolean;
  value: string;
}) {
  const wrapperRef = React.useRef<HTMLLabelElement>(null);

  // Observe the data-state attribute on the Radix Item to toggle label weight.
  // Radix sets data-state="checked"|"unchecked" on the Item element.
  React.useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const radioButton = wrapper.querySelector<HTMLButtonElement>(
      '[role="radio"]',
    );
    if (!radioButton) return;

    const updateLabel = () => {
      const labelEl = wrapper.querySelector<HTMLElement>('[data-radio-label]');
      if (!labelEl) return;

      const isChecked = radioButton.getAttribute('data-state') === 'checked';

      if (isChecked) {
        labelEl.classList.add(styles['label--checked']);
      } else {
        labelEl.classList.remove(styles['label--checked']);
      }

      if (radioButton.hasAttribute('data-disabled')) {
        labelEl.classList.add(styles['label--disabled']);
      } else {
        labelEl.classList.remove(styles['label--disabled']);
      }
    };

    // Initial update
    updateLabel();

    // Watch for attribute changes (Radix toggles data-state on click/keyboard)
    const observer = new MutationObserver(updateLabel);
    observer.observe(radioButton, {
      attributes: true,
      attributeFilter: ['data-state', 'data-disabled'],
    });

    return () => observer.disconnect();
  }, [value, disabled]);

  const wrapperClassName = [
    styles.wrapper,
    disabled && styles['wrapper--disabled'],
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label ref={wrapperRef} className={wrapperClassName}>
      {children}
    </label>
  );
}
