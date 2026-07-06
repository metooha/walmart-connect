import * as React from 'react';
import styles from './DataTableCellText.module.css';

interface CommonProps {
  'aria-label'?: string;
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
}

export interface DataTableCellStatusProps
  extends Omit<React.ComponentPropsWithoutRef<'td'>, 'align' | 'className' | 'style'>,
    CommonProps {
  /** Typically Tag components. */
  children: React.ReactNode;
}

/**
 * Specialized cell for displaying status information using Tag components.
 */
export const DataTableCellStatus = React.forwardRef<HTMLTableCellElement, DataTableCellStatusProps>(
  ({ children, UNSAFE_className, UNSAFE_style, ...props }, ref) => {
    const className = [styles.cell, styles.cellAlphanumeric, UNSAFE_className]
      .filter(Boolean)
      .join(' ');

    return (
      <td ref={ref} className={className} style={UNSAFE_style} {...props}>
        {children}
      </td>
    );
  },
);
DataTableCellStatus.displayName = 'DataTableCellStatus';
