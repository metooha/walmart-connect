import * as React from 'react';
import styles from './DataTable.module.css';

/* ─── Shared types ─── */
interface CommonProps {
  'aria-label'?: string;
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
}

/* ─── DataTable (root) ─── */
export interface DataTableProps
  extends Omit<React.ComponentPropsWithoutRef<'table'>, 'className' | 'style'>,
    CommonProps {
  children: React.ReactNode;
}

export const DataTable = React.forwardRef<HTMLTableElement, DataTableProps>(
  ({ children, UNSAFE_className, UNSAFE_style, ...props }, ref) => {
    const className = [styles.table, UNSAFE_className].filter(Boolean).join(' ');
    return (
      <div className={styles.wrapper}>
        <table ref={ref} className={className} style={UNSAFE_style} {...props}>
          {children}
        </table>
      </div>
    );
  },
);
DataTable.displayName = 'DataTable';

/* ─── DataTableHead ─── */
export interface DataTableHeadProps
  extends Omit<React.ComponentPropsWithoutRef<'thead'>, 'className' | 'style'>,
    CommonProps {
  children: React.ReactNode;
}

export const DataTableHead = React.forwardRef<HTMLTableSectionElement, DataTableHeadProps>(
  ({ children, UNSAFE_className, UNSAFE_style, ...props }, ref) => {
    const className = [styles.head, UNSAFE_className].filter(Boolean).join(' ');
    return (
      <thead ref={ref} className={className} style={UNSAFE_style} {...props}>
        {children}
      </thead>
    );
  },
);
DataTableHead.displayName = 'DataTableHead';

/* ─── DataTableBody ─── */
export interface DataTableBodyProps
  extends Omit<React.ComponentPropsWithoutRef<'tbody'>, 'className' | 'style'>,
    CommonProps {
  children: React.ReactNode;
}

export const DataTableBody = React.forwardRef<HTMLTableSectionElement, DataTableBodyProps>(
  ({ children, UNSAFE_className, UNSAFE_style, ...props }, ref) => {
    const className = [styles.body, UNSAFE_className].filter(Boolean).join(' ');
    return (
      <tbody ref={ref} className={className} style={UNSAFE_style} {...props}>
        {children}
      </tbody>
    );
  },
);
DataTableBody.displayName = 'DataTableBody';
