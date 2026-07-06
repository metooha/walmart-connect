import * as React from 'react';
import { Button } from '@/components/ui/Button';
import { LinkButton } from '@/components/ui/LinkButton';
import { Pencil } from '@/components/icons/Pencil';
import { CheckCircleFill } from '@/components/icons/CheckCircleFill';
import styles from './DataTableCellInlineEdit.module.css';

interface CommonProps {
  'aria-label'?: string;
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
}

export interface DataTableCellInlineEditTextAreaProps
  extends Omit<React.ComponentPropsWithoutRef<'td'>, 'onChange'>,
    CommonProps {
  /** Accessible label for the edit dialog. */
  a11yDialogLabel: string;
  /** Accessible label for the textarea. */
  a11yTextAreaLabel: string;
  /** Error message. */
  error?: React.ReactNode;
  /** Whether the edit dialog is open. @default false */
  isOpen?: boolean;
  /** Whether the value is in saved state. @default false */
  isSaved?: boolean;
  /** Called when user cancels editing. */
  onCancel: (event: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) => void;
  /** Called when textarea value changes. */
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** Called when user clicks the trigger to open editing. */
  onOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Called when user saves. */
  onSave: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Props for the save button. */
  saveButtonProps?: { children?: React.ReactNode; disabled?: boolean };
  /** Props for the cancel button. */
  cancelButtonProps?: { children?: React.ReactNode };
  /** Props for the textarea. */
  textAreaProps?: React.ComponentPropsWithRef<'textarea'>;
  /** Current value. */
  value: string;
  /** @default "alphanumeric" */
  variant?: 'alphanumeric' | 'numeric';
}

/**
 * Inline editable cell. Displays the value with a hover edit icon, and opens
 * a dialog with a textarea + Save/Cancel when activated.
 */
export const DataTableCellInlineEditTextArea = React.forwardRef<
  HTMLTableCellElement,
  DataTableCellInlineEditTextAreaProps
>(
  (
    {
      a11yDialogLabel,
      a11yTextAreaLabel,
      error,
      isOpen = false,
      isSaved = false,
      onCancel,
      onChange,
      onOpen,
      onSave,
      saveButtonProps,
      cancelButtonProps,
      textAreaProps,
      value,
      variant = 'alphanumeric',
      UNSAFE_className,
      UNSAFE_style,
      ...props
    },
    ref,
  ) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    // Auto-resize textarea
    React.useEffect(() => {
      if (isOpen && textareaRef.current) {
        const el = textareaRef.current;
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;
        el.focus();
      }
    }, [isOpen, value]);

    // Escape key closes dialog
    React.useEffect(() => {
      if (!isOpen) return;
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onCancel(e);
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onCancel]);

    const isNumeric = variant === 'numeric';

    const triggerClassName = [
      styles.trigger,
      isNumeric && styles.triggerNumeric,
      error && styles.triggerError,
    ]
      .filter(Boolean)
      .join(' ');

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

    return (
      <td ref={ref} className={cellClassName} style={UNSAFE_style} {...props}>
        {/* Trigger button — visible when not editing */}
        {!isOpen && (
          <button
            type="button"
            className={triggerClassName}
            onClick={onOpen}
            aria-label={isSaved ? `Saved: ${value}` : `${value}, Edit Cell`}
          >
            <span className={styles.triggerValue}>{value}</span>
            {isSaved ? (
              <span className={styles.savedIcon}>
                <CheckCircleFill aria-hidden />
              </span>
            ) : (
              <span className={styles.editIcon}>
                <Pencil aria-hidden />
              </span>
            )}
            {error && !isOpen && (
              <span className={styles.triggerErrorText}>{error}</span>
            )}
          </button>
        )}

        {/* Edit dialog */}
        {isOpen && (
          <>
            <div
              className={styles.dialogOverlay}
              onClick={(e) =>
                onCancel(e as unknown as React.MouseEvent<HTMLButtonElement>)
              }
              aria-hidden
            />
            <div
              className={styles.dialog}
              role="dialog"
              aria-label={a11yDialogLabel}
            >
              <textarea
                ref={textareaRef}
                className={textareaClassName}
                value={value}
                onChange={(e) => {
                  onChange(e);
                  // Auto-resize
                  const el = e.target;
                  el.style.height = 'auto';
                  el.style.height = `${el.scrollHeight}px`;
                }}
                aria-label={a11yTextAreaLabel}
                rows={1}
                {...textAreaProps}
              />
              {error && <div className={styles.dialogError}>{error}</div>}
              <div className={styles.dialogActions}>
                <LinkButton
                  size="small"
                  onClick={(e) =>
                    onCancel(
                      e as unknown as React.MouseEvent<HTMLButtonElement>,
                    )
                  }
                >
                  {cancelButtonProps?.children ?? 'Cancel'}
                </LinkButton>
                <Button
                  variant="primary"
                  size="small"
                  onClick={onSave}
                  disabled={saveButtonProps?.disabled}
                >
                  {saveButtonProps?.children ?? 'Save'}
                </Button>
              </div>
            </div>
          </>
        )}
      </td>
    );
  },
);
DataTableCellInlineEditTextArea.displayName = 'DataTableCellInlineEditTextArea';
