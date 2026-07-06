import * as React from 'react';
import styles from './DataTableCellText.module.css';

interface CommonProps {
  'aria-label'?: string;
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
}

export type DataTableCellVariant = 'alphanumeric' | 'numeric';

export interface DataTableCellProps
  extends Omit<React.ComponentPropsWithoutRef<'td'>, 'align' | 'className' | 'style'>,
    CommonProps {
  children: React.ReactNode;
  /** Content type styling. @default "alphanumeric" */
  variant?: DataTableCellVariant;
}

/**
 * Basic data cell for DataTable. Supports alphanumeric (left-aligned) and
 * numeric (right-aligned, monospace) variants.
 */
export const DataTableCell = React.forwardRef<HTMLTableCellElement, DataTableCellProps>(
  ({ children, variant = 'alphanumeric', UNSAFE_className, UNSAFE_style, ...props }, ref) => {
    const variantClass =
      variant === 'numeric' ? styles.cellNumeric : styles.cellAlphanumeric;

    const className = [styles.cell, variantClass, UNSAFE_className]
      .filter(Boolean)
      .join(' ');

    return (
      <td ref={ref} className={className} style={UNSAFE_style} {...props}>
        {children}
      </td>
    );
  },
);
DataTableCell.displayName = 'DataTableCell';
