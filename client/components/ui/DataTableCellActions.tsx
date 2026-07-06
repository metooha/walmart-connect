import * as React from 'react';
import styles from './DataTableCellActions.module.css';

interface CommonProps {
  'aria-label'?: string;
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
}

export interface DataTableCellActionsProps
  extends Omit<React.ComponentPropsWithoutRef<'td'>, 'align' | 'className' | 'style'>,
    CommonProps {
  /** Typically IconButton or Menu components. */
  children: React.ReactNode;
}

/**
 * Container cell for row-level action buttons.
 */
export const DataTableCellActions = React.forwardRef<HTMLTableCellElement, DataTableCellActionsProps>(
  ({ children, UNSAFE_className, UNSAFE_style, ...props }, ref) => {
    const className = [styles.cell, UNSAFE_className].filter(Boolean).join(' ');

    return (
      <td ref={ref} className={className} style={UNSAFE_style} {...props}>
        <div className={styles.actions}>{children}</div>
      </td>
    );
  },
);
DataTableCellActions.displayName = 'DataTableCellActions';
