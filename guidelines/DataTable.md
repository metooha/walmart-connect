# DataTable Component

Living Design 3.5 Data Table component system for displaying and interacting with tabular data.

## Component Hierarchy

```
DataTable (root <table>)
├── DataTableHead (<thead>)
│   └── DataTableRow (<tr>)
│       ├── DataTableHeaderSelect (<th> with checkbox for select-all)
│       └── DataTableHeader (<th> with optional sorting)
└── DataTableBody (<tbody>)
    └── DataTableRow (<tr> with optional selected state)
        ├── DataTableCellSelect (<td> with row checkbox)
        ├── DataTableCell (<td> — alphanumeric or numeric)
        ├── DataTableCellStatus (<td> — wraps Tag components)
        ├── DataTableCellActions (<td> — wraps IconButton/Menu)
        ├── DataTableCellInlineEditTextArea (<td> — inline edit dialog)
        └── DataTableCellBulkEditTextArea (<td> — always-visible textarea)

DataTableBulkActions (standalone <div> — placed above DataTable)
```

## Import Paths

```tsx
// Root container + structural
import { DataTable, DataTableHead, DataTableBody } from '@/components/ui/DataTable';
import { DataTableRow } from '@/components/ui/DataTableRow';
import { DataTableHeader } from '@/components/ui/DataTableHeader';

// Cell components
import { DataTableCell } from '@/components/ui/DataTableCellText';
import { DataTableCellStatus } from '@/components/ui/DataTableCellStatus';
import { DataTableCellActions } from '@/components/ui/DataTableCellActions';
import { DataTableCellSelect, DataTableHeaderSelect } from '@/components/ui/DataTableCellSelect';

// Editing cells
import { DataTableCellInlineEditTextArea } from '@/components/ui/DataTableCellInlineEdit';
import { DataTableCellBulkEditTextArea } from '@/components/ui/DataTableCellBulkEdit';

// Bulk actions toolbar
import { DataTableBulkActions } from '@/components/ui/DataTableBulkActions';
```

## Basic Usage

```tsx
<DataTable>
  <DataTableHead>
    <DataTableRow>
      <DataTableHeader>Name</DataTableHeader>
      <DataTableHeader alignment="right">Price</DataTableHeader>
    </DataTableRow>
  </DataTableHead>
  <DataTableBody>
    {data.map((item) => (
      <DataTableRow key={item.id}>
        <DataTableCell>{item.name}</DataTableCell>
        <DataTableCell variant="numeric">${item.price}</DataTableCell>
      </DataTableRow>
    ))}
  </DataTableBody>
</DataTable>
```

## Cell Variants

| Component | Purpose | Key Props |
|-----------|---------|-----------|
| `DataTableCell` | Text display | `variant: 'alphanumeric' \| 'numeric'` |
| `DataTableCellStatus` | Status tags | Children: `<Tag>` components |
| `DataTableCellActions` | Row actions | Children: `<IconButton>` components |
| `DataTableCellSelect` | Row checkbox | `checked`, `onChange`, `a11yLabelledBy` |
| `DataTableCellInlineEditTextArea` | Inline editing | `value`, `isOpen`, `onOpen`, `onSave`, `onCancel`, `onChange` |
| `DataTableCellBulkEditTextArea` | Bulk editing | `value`, `onChange`, `isEdited`, `error` |

## Sorting

Headers become sortable when `onSort` is provided:

```tsx
<DataTableHeader
  sort={sortField === 'name' ? sortDirection : 'none'}
  onSort={() => handleSort('name')}
>
  Name
</DataTableHeader>
```

## Selection

Use `DataTableHeaderSelect` + `DataTableCellSelect` together:

```tsx
<DataTableHeaderSelect
  checked={allSelected}
  indeterminate={someSelected}
  onChange={handleToggleAll}
/>

<DataTableCellSelect
  a11yLabelledBy={`cell-${item.id}`}
  checked={selectedIds.includes(item.id)}
  onChange={() => toggleRow(item.id)}
/>
```

## Bulk Actions

Rendered **above** the DataTable when rows are selected:

```tsx
<DataTableBulkActions
  count={selectedIds.length}
  onSelectAll={() => setSelectedIds(allIds)}
  onClearSelected={() => setSelectedIds([])}
  actionContent={<Button variant="secondary" size="small">Delete Selected</Button>}
/>
```

## Design Tokens

All components use LD semantic tokens exclusively:

- **Typography**: `--ld-semantic-font-body-medium-*`, `--ld-semantic-font-body-mono-medium-*`
- **Colors**: `--ld-semantic-color-text`, `--ld-semantic-color-border-subtle`
- **Spacing**: `--ld-primitive-scale-space-*`
- **Focus**: `--ld-semantic-color-action-focus-outline`

## UNSAFE Props

All components accept `UNSAFE_className` and `UNSAFE_style` for escape-hatch styling. Use sparingly.

## Accessibility

- `DataTableHeader` renders `scope="col"` and `aria-sort` for sortable columns
- `DataTableCellSelect` requires `a11yLabelledBy` referencing a visible label cell
- `DataTableHeaderSelect` provides a visually hidden label (default: "Toggle all rows")
- `DataTableCellInlineEditTextArea` requires `a11yDialogLabel` and `a11yTextAreaLabel`
- `DataTableBulkActions` renders as a `role="region"` with configurable `a11yLabel`
