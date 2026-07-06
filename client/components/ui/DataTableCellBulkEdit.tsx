import * as React from 'react';
import styles from './DataTableCellBulkEdit.module.css';

interface CommonProps {
  'aria-label'?: string;
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
}

export interface DataTableCellBulkEditTextAreaProps
  extends Omit<React.ComponentPropsWithoutRef<'td'>, 'onChange'>,
    CommonProps {
  /** IDs referencing header + unique row identifier for a11y. */
  a11yTextAreaLabelledBy: string;
  /** Helper text when edited. @default "Edited" */
  editedHelperTextLabel?: string;
  /** Error message. */
  error?: React.ReactNode;
  /** Whether the cell has been edited. @default false */
  isEdited?: boolean;
  /** Callback on textarea change. */
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** Extra textarea props. */
  textAreaProps?: React.ComponentPropsWithRef<'textarea'>;
  /** Current value. @default "" */
  value?: string;
  /** @default "alphanumeric" */
  variant?: 'alphanumeric' | 'numeric';
}

/**
 * Bulk-editable cell with an always-visible textarea. Shows "Edited" helper
 * text when modified and error text when invalid.
 */
export const DataTableCellBulkEditTextArea = React.forwardRef<
  HTMLTableCellElement,
  DataTableCellBulkEditTextAreaProps
>(
  (
    {
      a11yTextAreaLabelledBy,
      editedHelperTextLabel = 'Edited',
      error,
      isEdited = false,
      onChange,
      textAreaProps,
      value = '',
      variant = 'alphanumeric',
      UNSAFE_className,
      UNSAFE_style,
      ...props
    },
    ref,
  ) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const isNumeric = variant === 'numeric';

    // Auto-resize textarea on value changes
    React.useEffect(() => {
      if (textareaRef.current) {
        const el = textareaRef.current;
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;
      }
    }, [value]);

    const cellClassName = [styles.cell, UNSAFE_className]
      .filter(Boolean)
      .join(' ');

    const textareaClassName = [
      styles.textarea,
      isNumeric && styles.textareaNumeric,
      error && styles.textareaError,
    ]
      .filter(Boolean)
      .join(' ');

    const showHelper = isEdited || error;

    return (
      <td ref={ref} className={cellClassName} style={UNSAFE_style} {...props}>
        <div className={styles.wrapper}>
          <textarea
            ref={textareaRef}
            className={textareaClassName}
            value={value}
            onChange={(e) => {
              onChange(e);
              const el = e.target;
              el.style.height = 'auto';
              el.style.height = `${el.scrollHeight}px`;
            }}
            aria-labelledby={a11yTextAreaLabelledBy}
            rows={1}
            {...textAreaProps}
          />
          {showHelper && (
            <span
              className={[
                styles.helperText,
                error ? styles.errorText : styles.editedText,
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {error || editedHelperTextLabel}
            </span>
          )}
        </div>
      </td>
    );
  },
);
DataTableCellBulkEditTextArea.displayName = 'DataTableCellBulkEditTextArea';
