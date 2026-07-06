import * as React from 'react';
import styles from './DataTableHeader.module.css';
import { SortDown } from '@/components/icons/SortDown';
import { SortUp } from '@/components/icons/SortUp';
import { ArrowsUpDown } from '@/components/icons/ArrowsUpDown';

interface CommonProps {
  'aria-label'?: string;
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
}

export type DataTableHeaderAlignment = 'left' | 'right';
export type DataTableHeaderSort = 'ascending' | 'descending' | 'none';

export interface DataTableHeaderProps
  extends Omit<React.ComponentPropsWithoutRef<'th'>, 'align' | 'className' | 'style'>,
    CommonProps {
  /** Text alignment. @default "left" */
  alignment?: DataTableHeaderAlignment;
  /** Header text label. */
  children: string;
  /** Callback when sorting is requested. Presence enables the sort button. */
  onSort?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  /** Current sort order. @default "none" */
  sort?: DataTableHeaderSort;
  /** Column width. */
  width?: number | string;
}

/**
 * Column header with optional sort button.
 */
export const DataTableHeader = React.forwardRef<HTMLTableCellElement, DataTableHeaderProps>(
  (
    {
      alignment = 'left',
      children,
      onSort,
      sort = 'none',
      width,
      UNSAFE_className,
      UNSAFE_style,
      ...props
    },
    ref,
  ) => {
    const alignClass =
      alignment === 'right' ? styles.headerRight : styles.headerLeft;

    const className = [styles.header, alignClass, UNSAFE_className]
      .filter(Boolean)
      .join(' ');

    const style: React.CSSProperties = {
      ...UNSAFE_style,
      ...(width != null ? { width } : {}),
    };

    const sortIcon =
      sort === 'ascending' ? (
        <SortUp aria-hidden />
      ) : sort === 'descending' ? (
        <SortDown aria-hidden />
      ) : (
        <ArrowsUpDown aria-hidden />
      );

    return (
      <th
        ref={ref}
        className={className}
        style={style}
        scope="col"
        aria-sort={onSort ? (sort === 'none' ? 'none' : sort) : undefined}
        {...props}
      >
        {onSort ? (
          <button
            type="button"
            className={styles.sortButton}
            onClick={onSort}
          >
            {children}
            <span className={styles.sortIcon}>{sortIcon}</span>
          </button>
        ) : (
          children
        )}
      </th>
    );
  },
);
DataTableHeader.displayName = 'DataTableHeader';
