import * as React from 'react';
import { LinkButton } from '@/components/ui/LinkButton';
import { CheckCircleFill } from '@/components/icons/CheckCircleFill';
import styles from './DataTableBulkActions.module.css';

interface CommonProps {
  'aria-label'?: string;
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
}

export interface DataTableBulkActionsProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'>,
    CommonProps {
  /** Accessibility label for the region. @default "Table actions" */
  a11yLabel?: string;
  /** Custom action buttons (e.g. ButtonGroup with Buttons). */
  actionContent?: React.ReactNode;
  /** Number of selected rows. @default 0 */
  count?: number;
  /** Custom count display label. */
  countLabel?: string;
  /** Callback to clear selection. */
  onClearSelected?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Callback to select all rows. */
  onSelectAll?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Toolbar shown above a DataTable when rows are selected, displaying
 * the count and bulk-action buttons.
 */
export const DataTableBulkActions = React.forwardRef<HTMLDivElement, DataTableBulkActionsProps>(
  (
    {
      a11yLabel = 'Table actions',
      actionContent,
      count = 0,
      countLabel,
      onClearSelected,
      onSelectAll,
      UNSAFE_className,
      UNSAFE_style,
      ...props
    },
    ref,
  ) => {
    const className = [styles.root, UNSAFE_className].filter(Boolean).join(' ');
    const label =
      countLabel ?? `${count} row${count === 1 ? '' : 's'} selected`;

    return (
      <div
        ref={ref}
        className={className}
        style={UNSAFE_style}
        role="region"
        aria-label={a11yLabel}
        {...props}
      >
        {/* Count */}
        <div className={styles.countArea}>
          <span className={styles.countIcon}>
            <CheckCircleFill aria-hidden />
          </span>
          <span>{label}</span>
        </div>

        {/* Selection links */}
        <div className={styles.selectionLinks}>
          {onSelectAll && (
            <>
              <LinkButton size="small" onClick={onSelectAll}>
                Select all
              </LinkButton>
              <span className={styles.separator} aria-hidden>
                |
              </span>
            </>
          )}
          {onClearSelected && (
            <LinkButton size="small" onClick={onClearSelected}>
              Clear selected
            </LinkButton>
          )}
        </div>

        {/* Action buttons */}
        {actionContent && (
          <div className={styles.actionsArea}>{actionContent}</div>
        )}
      </div>
    );
  },
);
DataTableBulkActions.displayName = 'DataTableBulkActions';
