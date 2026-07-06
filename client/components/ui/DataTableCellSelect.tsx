import * as React from 'react';
import { Checkbox } from '@/components/ui/Checkbox';
import styles from './DataTableCellSelect.module.css';

interface CommonProps {
  'aria-label'?: string;
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
}

/* ─── DataTableCellSelect (body row checkbox) ─── */

export interface DataTableCellSelectProps
  extends Omit<React.ComponentPropsWithoutRef<'td'>, 'className' | 'onChange' | 'style'>,
    CommonProps {
  /** ID(s) of visible label element(s) for a11y. */
  a11yLabelledBy: string;
  checked?: boolean;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  value?: string;
}

export const DataTableCellSelect = React.forwardRef<HTMLTableCellElement, DataTableCellSelectProps>(
  (
    {
      a11yLabelledBy,
      checked = false,
      disabled = false,
      onChange,
      name,
      value,
      UNSAFE_className,
      UNSAFE_style,
      ...props
    },
    ref,
  ) => {
    const className = [styles.cell, UNSAFE_className].filter(Boolean).join(' ');

    const handleCheckedChange = React.useCallback(
      (newChecked: boolean | 'indeterminate') => {
        // Synthesize a change-like event for the consumer
        onChange({
          target: { checked: newChecked === true, name, value },
        } as unknown as React.ChangeEvent<HTMLInputElement>);
      },
      [onChange, name, value],
    );

    return (
      <td ref={ref} className={className} style={UNSAFE_style} {...props}>
        <Checkbox
          checked={checked}
          disabled={disabled}
          onCheckedChange={handleCheckedChange}
          name={name}
          value={value}
          aria-label={`Select row`}
        />
      </td>
    );
  },
);
DataTableCellSelect.displayName = 'DataTableCellSelect';

/* ─── DataTableHeaderSelect (header "select all" checkbox) ─── */

export interface DataTableHeaderSelectProps
  extends Omit<React.ComponentPropsWithoutRef<'td'>, 'className' | 'onChange' | 'style'>,
    CommonProps {
  a11yCheckboxLabel?: string;
  checked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  value?: string;
}

export const DataTableHeaderSelect = React.forwardRef<HTMLTableCellElement, DataTableHeaderSelectProps>(
  (
    {
      a11yCheckboxLabel = 'Toggle all rows',
      checked = false,
      disabled = false,
      indeterminate = false,
      onChange,
      name,
      value,
      UNSAFE_className,
      UNSAFE_style,
      ...props
    },
    ref,
  ) => {
    const className = [styles.cell, UNSAFE_className].filter(Boolean).join(' ');

    const handleCheckedChange = React.useCallback(
      (newChecked: boolean | 'indeterminate') => {
        onChange({
          target: { checked: newChecked === true, name, value },
        } as unknown as React.ChangeEvent<HTMLInputElement>);
      },
      [onChange, name, value],
    );

    return (
      <th ref={ref} className={className} style={UNSAFE_style} scope="col" {...props}>
        <Checkbox
          checked={indeterminate ? 'indeterminate' : checked}
          disabled={disabled}
          onCheckedChange={handleCheckedChange}
          name={name}
          value={value}
          aria-label={a11yCheckboxLabel}
        />
      </th>
    );
  },
);
DataTableHeaderSelect.displayName = 'DataTableHeaderSelect';
