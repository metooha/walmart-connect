# LD 3.5 Data Table Components - Implementation Plan

## Overview
Create Living Design 3.5 Data Table components based on Figma designs to replace the current shadcn table component. The new components will use LD semantic tokens and provide specialized cell types for editable data, status display, bulk actions, and more.

## Current State Analysis

### Files Using Shadcn Table Component
1. `client/components/examples/TableExample.tsx` - Example page
2. `client/pages/component-library/Themes.tsx` - Token documentation tables
3. `client/components/recommendations/RecommendationsContent.tsx` - Recommendations panel tables

### Files Using Native HTML Tables
1. `client/pages/Index.tsx` - Main dashboard with campaign table
2. `client/pages/AllCampaigns.tsx` - Campaign list table
3. `client/pages/DisplayAdvertisingCampaigns.tsx` - Display ad campaigns table
4. `client/features/advertising/DisplayDashboard.tsx`
5. `client/features/sponsored-search/SponsoredSearchDashboard.tsx`
6. `client/pages/ItemHealth.tsx`
7. `client/pages/OmniROAS.tsx`
8. `client/pages/SellerCenter.tsx`

### Current Shadcn Table Component
- **File**: `client/components/ui/table.tsx`
- **Uses**: Tailwind utilities (`border-b`, `hover:bg-muted/50`, `p-4`, etc.)
- **No LD tokens**: Generic shadcn design with no semantic tokens

---

## Components to Create (Based on Figma Designs)

### 1. **DataTableHeader** Component
**File**: `client/components/ui/DataTableHeader.tsx`
**CSS Module**: `client/components/ui/DataTableHeader.module.css`

**Features**:
- Sortable columns (none, ascending, descending states)
- Interactive states (enabled, hovered, focused, pressed)
- Alignment options (left, right)
- Sort icons (ascending/descending arrows)
- LD semantic tokens for typography and colors

**Variants**:
- `sort`: "none" | "ascending" | "descending"
- `align`: "left" | "right"
- Total: 48 variants (Sort × State × Alignment × Two-lined)

**LD Tokens Used**:
- Color: `--ld-semantic-color-text`
- Font: `--ld-semantic-font-body-medium-family`, `--ld-semantic-font-body-medium-weight-alt` (700)
- Icons: `--ld-semantic-scale-icon-small`

---

### 2. **DataTableCellText** Component  
**File**: `client/components/ui/DataTableCellText.tsx`
**CSS Module**: `client/components/ui/DataTableCellText.module.css`

**Features**:
- Static text display (read-only)
- Two variants: alphanumeric (left-aligned) and numeric (right-aligned, monospace)

**Variants**:
- `variant`: "alphanumeric" | "numeric"
- Total: 2 variants

**LD Tokens Used**:
- Alphanumeric: `--ld-semantic-font-body-medium-family` (Everyday Sans UI)
- Numeric: `--ld-semantic-font-body-mono-medium-family` (Everyday Sans Mono TT)
- Color: `--ld-semantic-color-text`
- Size: `--ld-semantic-font-body-medium-size` (16px)

---

### 3. **DataTableCellInlineEdit** Component
**File**: `client/components/ui/DataTableCellInlineEdit.tsx`
**CSS Module**: `client/components/ui/DataTableCellInlineEdit.module.css`

**Features**:
- Inline editing for single cells
- Edit icon appears on hover/focus
- Save/Cancel actions in floating container
- Error states with validation messages
- Saved indicator (green checkmark)
- Supports both alphanumeric and numeric data

**States**:
- View mode (enabled, hovered, focused, pressed)
- Edit mode (open state with save/cancel buttons)
- Saved state (shows green checkmark icon)
- Error state (red background, error message)

**Variants**:
- `variant`: "alphanumeric" | "numeric"
- `state`: "enabled" | "hovered" | "focused" | "pressed"
- `saved`: boolean
- `open`: boolean (edit mode active)
- `error`: boolean
- Total: 48 variants

**LD Tokens Used**:
- Surface: `--ld-semantic-color-surface-overlay`
- Field: `--ld-semantic-color-field-fill`, `--ld-semantic-color-field-border`
- Negative states: `--ld-semantic-color-field-border-negative`, `--ld-semantic-color-field-fill-negative`
- Text: `--ld-semantic-color-field-text-onfill`, `--ld-semantic-color-text-onfill-negative-subtle`
- Icons: edit icon, saved icon (green checkmark), error icon
- Elevation: box-shadow for floating edit container

---

### 4. **DataTableCellBulkEdit** Component
**File**: `client/components/ui/DataTableCellBulkEdit.tsx`
**CSS Module**: `client/components/ui/DataTableCellBulkEdit.module.css`

**Features**:
- For multi-cell editing (wizard flows)
- Always in edit mode - no toggle back to view mode
- Shows "Edited" label when modified
- Error states with validation
- Focus border indicator
- No inline save/cancel (global save at workflow level)

**States**:
- `variant`: "alphanumeric" | "numeric"
- `state`: "enabled" | "hovered" | "focused"
- `edited`: boolean (shows "Edited" label)
- `error`: boolean
- Total: 24 variants

**LD Tokens Used**:
- Same as InlineEdit but without save/cancel container
- Edited indicator: `--ld-semantic-color-text-onfill-edited-subtle`
- Focus border: `--ld-semantic-color-field-border-focused`

---

### 5. **DataTableCellSelect** Component
**File**: `client/components/ui/DataTableCellSelect.tsx`
**CSS Module**: Reuse `client/components/ui/Checkbox.module.css`

**Features**:
- Checkbox for row selection
- Checked/unchecked states
- Uses existing LD Checkbox component

**Variants**:
- `checked`: boolean
- Total: 2 variants

**Implementation**:
- Wrapper around existing `Checkbox` component with proper sizing

---

### 6. **DataTableCellStatus** Component
**File**: `client/components/ui/DataTableCellStatus.tsx`

**Features**:
- Displays status using LD Tag component
- Color-coded status labels

**Implementation**:
- Simple wrapper around `Tag` component
- Props: `label`, `variant` (maps to Tag color variants)

**LD Tokens Used**:
- Delegates to existing `Tag` component

---

### 7. **DataTableCellActions** Component
**File**: `client/components/ui/DataTableCellActions.tsx`
**CSS Module**: `client/components/ui/DataTableCellActions.module.css`

**Features**:
- 1-3 icon buttons for row actions
- Optional overflow button for additional actions
- Right-aligned in cell

**Variants**:
- `actions`: 1 | 2 | 3
- `overflow`: boolean
- Total: 6 variants

**LD Tokens Used**:
- Uses existing `IconButton` component
- Spacing: `--ld-primitive-scale-space-150`, `--ld-primitive-scale-space-200`

---

### 8. **DataTableBulkActions** Component
**File**: `client/components/ui/DataTableBulkActions.tsx`
**CSS Module**: `client/components/ui/DataTableBulkActions.module.css`

**Features**:
- Appears when rows are selected
- Shows selection count ("1 row selected")
- "Select all" and "Clear selected" links
- 1-5 action buttons (customizable)
- Optional overflow menu
- Responsive (mobile vs desktop layout)

**Variants**:
- `smallScreen`: boolean (responsive behavior)
- Total: 2 variants

**LD Tokens Used**:
- Selected icon: checkmark
- Text: `--ld-semantic-color-text-activated` (blue)
- Uses existing `Button` and `LinkButton` components
- Spacing: `--ld-primitive-scale-space-200`, `--ld-primitive-scale-space-400`

---

### 9. **DataTable** (Root Container) Component
**File**: `client/components/ui/DataTable.tsx`
**CSS Module**: `client/components/ui/DataTable.module.css`

**Features**:
- Root table container
- Responsive wrapper
- Consistent spacing and borders
- Sticky header support
- Row hover states

**Props**:
- `children`: table content
- `stickyHeader`: boolean (default true)
- Standard HTML table props

**LD Tokens Used**:
- Background: `--ld-semantic-color-surface-primary`
- Border: `--ld-semantic-color-border-subtle`
- Row hover: subtle background change
- Typography: `--ld-semantic-font-body-medium-family`

---

### 10. **DataTableRow** Component
**File**: `client/components/ui/DataTableRow.tsx`
**CSS Module**: `client/components/ui/DataTableRow.module.css`

**Features**:
- Table row wrapper with LD styling
- Hover states
- Selected states
- Proper padding and borders

**Props**:
- `selected`: boolean
- `onSelect`: callback
- Standard tr props

**LD Tokens Used**:
- Border: `--ld-semantic-color-border-subtle`
- Hover: `--ld-semantic-color-fill-subtle`
- Selected: background color change

---

## Implementation Steps

### Phase 1: Core Cell Components (3-5 components)
1. ✅ **DataTableCellText** - Simplest, static text display
2. ✅ **DataTableCellStatus** - Uses existing Tag component
3. ✅ **DataTableCellSelect** - Uses existing Checkbox component
4. ✅ **DataTableCellActions** - Icon buttons for row actions
5. ✅ **DataTableHeader** - Sortable column headers

### Phase 2: Editable Cell Components (2 components)
6. ✅ **DataTableCellInlineEdit** - Single-cell editing with save/cancel
7. ✅ **DataTableCellBulkEdit** - Multi-cell editing for wizard flows

### Phase 3: Bulk Actions & Container (3 components)
8. ✅ **DataTableBulkActions** - Selection bar with action buttons
9. ✅ **DataTableRow** - Row wrapper with states
10. ✅ **DataTable** - Root container with responsive wrapper

### Phase 4: Create Examples & Documentation
11. ✅ Create comprehensive **DataTableExample** component
12. ✅ Update **Table page** in component library
13. ✅ Create **guidelines/DataTable.md** documentation

### Phase 5: Migration
14. ✅ Replace shadcn Table in `TableExample.tsx`
15. ✅ Replace shadcn Table in `Themes.tsx`
16. ✅ Replace shadcn Table in `RecommendationsContent.tsx`
17. ✅ Remove old `client/components/ui/table.tsx`
18. ✅ Clean up imports and routes

---

## Design Token Mapping

### Typography
- **Headers**: Bold 16px, `--ld-semantic-font-body-medium-weight-alt` (700)
- **Body (Alphanumeric)**: 16px, Everyday Sans UI, `--ld-semantic-font-body-medium-family`
- **Body (Numeric)**: 16px, Everyday Sans Mono TT, `--ld-semantic-font-body-mono-medium-family`
- **Caption/Helper**: 12px, `--ld-semantic-font-caption-family`

### Colors
- **Text**: `--ld-semantic-color-text` (#2E2F32)
- **Border**: `--ld-semantic-color-border-subtle`
- **Field backgrounds**: `--ld-semantic-color-field-fill`
- **Error states**: `--ld-semantic-color-field-fill-negative`, `--ld-semantic-color-text-negative`
- **Success/Saved**: `--ld-semantic-color-text-positive`
- **Activated/Selected**: `--ld-semantic-color-text-activated` (blue)

### Spacing
- **Cell padding**: `--ld-primitive-scale-space-200` (16px vertical/horizontal)
- **Icon gaps**: `--ld-primitive-scale-space-100` (8px)
- **Button gaps**: `--ld-primitive-scale-space-100`
- **Edit container padding**: `--ld-primitive-scale-space-50`, `--ld-primitive-scale-space-150`

### Icons
- **Edit**: 16×16px edit icon
- **Saved**: 16×16px green checkmark in circle
- **Error**: 16×16px error circle icon
- **Sort ascending**: Up arrow
- **Sort descending**: Down arrow
- **Selected**: Checkmark icon

---

## File Structure

```
client/components/ui/
├── DataTable.tsx                    # Root table container
├── DataTable.module.css
├── DataTableRow.tsx                 # Table row wrapper
├── DataTableRow.module.css
├── DataTableHeader.tsx              # Sortable header cell
├── DataTableHeader.module.css
├── DataTableCellText.tsx            # Static text cell
├── DataTableCellText.module.css
├── DataTableCellInlineEdit.tsx      # Inline editing cell
├── DataTableCellInlineEdit.module.css
├── DataTableCellBulkEdit.tsx        # Bulk edit cell
├── DataTableCellBulkEdit.module.css
├── DataTableCellSelect.tsx          # Checkbox selection cell
├── DataTableCellActions.tsx         # Row action icons cell
├── DataTableCellActions.module.css
├── DataTableCellStatus.tsx          # Status tag cell
├── DataTableBulkActions.tsx         # Bulk actions bar
└── DataTableBulkActions.module.css

client/components/examples/
└── DataTableExample.tsx             # Comprehensive examples

client/pages/component-library/
└── Table.tsx                        # Updated to show LD Data Table

guidelines/
└── DataTable.md                     # Documentation
```

---

## Props API Design

### DataTable (Root Container)
```tsx
interface DataTableProps {
  children: React.ReactNode;
  stickyHeader?: boolean; // default: true
  className?: string;
  UNSAFE_className?: string;
}
```

### DataTableHeader
```tsx
interface DataTableHeaderProps {
  children: React.ReactNode;
  sort?: 'none' | 'ascending' | 'descending';
  align?: 'left' | 'right';
  onSort?: () => void;
  sortable?: boolean; // default: false
  UNSAFE_className?: string;
}
```

### DataTableCellText
```tsx
interface DataTableCellTextProps {
  children: React.ReactNode;
  variant?: 'alphanumeric' | 'numeric'; // default: 'alphanumeric'
  UNSAFE_className?: string;
}
```

### DataTableCellInlineEdit
```tsx
interface DataTableCellInlineEditProps {
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  variant?: 'alphanumeric' | 'numeric';
  error?: string;
  saved?: boolean;
  placeholder?: string;
  UNSAFE_className?: string;
}
```

### DataTableCellBulkEdit
```tsx
interface DataTableCellBulkEditProps {
  value: string;
  onChange: (value: string) => void;
  variant?: 'alphanumeric' | 'numeric';
  edited?: boolean;
  error?: string;
  placeholder?: string;
  UNSAFE_className?: string;
}
```

### DataTableCellSelect
```tsx
interface DataTableCellSelectProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  'aria-label': string;
  UNSAFE_className?: string;
}
```

### DataTableCellStatus
```tsx
interface DataTableCellStatusProps {
  label: string;
  variant?: TagVariant; // Reuses Tag variants
  UNSAFE_className?: string;
}
```

### DataTableCellActions
```tsx
interface DataTableCellActionsProps {
  children: React.ReactNode; // IconButton components
  overflow?: boolean;
  onOverflowClick?: () => void;
  UNSAFE_className?: string;
}
```

### DataTableBulkActions
```tsx
interface DataTableBulkActionsProps {
  selectedCount: number;
  onSelectAll?: () => void;
  onClearSelection: () => void;
  actions: React.ReactNode; // Button components
  showSelectAll?: boolean;
  UNSAFE_className?: string;
}
```

### DataTableRow
```tsx
interface DataTableRowProps {
  children: React.ReactNode;
  selected?: boolean;
  onSelect?: () => void;
  UNSAFE_className?: string;
}
```

---

## Migration Strategy

### Step 1: Create LD Components (Phases 1-3)
- Build all 10 components with CSS modules
- Use LD semantic tokens exclusively
- Include all states and variants from Figma

### Step 2: Create Example & Documentation (Phase 4)
- Comprehensive example showing all cell types
- Interactive examples for editing, sorting, selection
- Documentation with usage guidelines

### Step 3: Update Component Library Files (Phase 5)
- Replace in `TableExample.tsx`
- Replace in `Themes.tsx` 
- Replace in `RecommendationsContent.tsx`

### Step 4: Remove Old Component
- Delete `client/components/ui/table.tsx`
- Update any remaining references

### Step 5: Optional - Migrate Native Tables
- **Future work**: Migrate native HTML tables in Index.tsx, AllCampaigns.tsx, etc.
- Not required for this phase - those can continue using native HTML
- LD components provide a path forward when ready

---

## Success Criteria

✅ All 10 LD Data Table components created with CSS modules  
✅ All components use LD 3.5 semantic tokens exclusively  
✅ Comprehensive examples demonstrating all features  
✅ Component library page updated with new components  
✅ Shadcn table.tsx removed from project  
✅ No TypeScript errors  
✅ Build passes successfully  
✅ Components match Figma pixel-perfect design  

---

## Notes

- **Reuse existing components**: Tag, Checkbox, Button, IconButton, LinkButton all already exist and use LD tokens
- **Focus on composition**: Cell components compose existing primitives
- **No breaking changes**: New components don't affect existing native HTML tables
- **Progressive migration**: Pages using native tables can migrate at their own pace
- **Mobile responsive**: BulkActions has small screen variant
- **Accessibility**: Proper ARIA labels, keyboard navigation, focus indicators

---

## Estimated Complexity

- **Simple components** (4): CellText, CellStatus, CellSelect, CellActions - ~30 min each
- **Medium components** (3): Header, Row, Root Table - ~45 min each
- **Complex components** (2): CellInlineEdit, CellBulkEdit - ~90 min each
- **Bulk Actions** (1): ~60 min
- **Examples & Docs** (2): ~90 min total
- **Migration & cleanup**: ~45 min

**Total estimated effort**: ~10-12 hours

---

## Implementation Order

1. **DataTableCellText** → Simplest, establishes patterns
2. **DataTableCellStatus** → Uses existing Tag
3. **DataTableCellSelect** → Uses existing Checkbox
4. **DataTableHeader** → Sortable headers
5. **DataTableCellActions** → Icon buttons
6. **DataTableRow** → Row wrapper
7. **DataTable** → Root container
8. **DataTableCellInlineEdit** → Complex inline editing
9. **DataTableCellBulkEdit** → Simplified bulk editing
10. **DataTableBulkActions** → Selection bar

Then: Examples, Documentation, Migration, Cleanup
